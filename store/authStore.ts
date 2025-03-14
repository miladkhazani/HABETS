import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import * as AppleAuthentication from 'expo-apple-authentication';

export type UserProfile = Database['public']['Tables']['user_profiles']['Row'];

interface User {
  id: string;
  email?: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        set({ 
          user: data.user, 
          profile: profile || null,
          isAuthenticated: true 
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  loginWithApple: async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error('No identity token received from Apple');
      }

      // Sign in with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user data received');

      // Get or create profile
      let { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      // If no profile exists, create one
      if (!profile) {
        try {
          const { data: newProfile } = await supabase
            .from('user_profiles')
            .insert({
              id: authData.user.id,
              full_name: credential.fullName?.givenName 
                ? `${credential.fullName.givenName} ${credential.fullName.familyName || ''}`
                : null,
              username: credential.email?.split('@')[0],
              avatar_url: null,
              streak_count: 0,
              total_challenges: 0,
              wins_count: 0,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .select()
            .single();
          
          profile = newProfile;
        } catch (error) {
          console.error('Failed to create profile:', error);
          // If profile creation fails but auth succeeded, still proceed
          if (typeof error === 'object' && error !== null && 'code' in error && error.code === '23505') {
            const { data: existingProfile } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('id', authData.user.id)
              .single();
            profile = existingProfile;
          }
        }
      }

      // Set auth state
      set({
        user: authData.user as unknown as User,
        profile: profile || null,
        isAuthenticated: true,
        isLoading: false
      });

    } catch (error: any) {
      if (error.code === 'ERR_REQUEST_CANCELED') {
        console.log('User canceled Apple sign in');
        set({ isLoading: false }); // Ensure loading state is reset
        return;
      }
      console.error('Apple sign-in error:', error);
      set({ isLoading: false }); // Ensure loading state is reset
      throw error;
    }
  },

  loginWithGoogle: async () => {
    try {
      const redirectUrl = Linking.createURL('');

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        }
      });

      if (error) throw error;

      if (data?.url) {
        if (Platform.OS === 'web') {
          window.location.href = data.url;
        } else {
          const authResponse = await WebBrowser.openAuthSessionAsync(
            data.url,
            redirectUrl,
            {
              showInRecents: true,
              dismissButtonStyle: 'close',
            }
          );

          if (authResponse.type === 'success') {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
              const { data: profile } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', user.id)
                .single();

              if (!profile) {
                const { error: profileError } = await supabase
                  .from('user_profiles')
                  .insert([
                    {
                      id: user.id,
                      full_name: user.user_metadata.full_name,
                      username: user.email?.split('@')[0],
                      avatar_url: user.user_metadata.avatar_url
                    }
                  ]);

                if (profileError) throw profileError;
              }

              set({ 
                user: user as unknown as User,
                profile: profile || {
                  id: user.id,
                  full_name: user.user_metadata.full_name,
                  username: user.email?.split('@')[0],
                  avatar_url: user.user_metadata.avatar_url,
                  streak_count: 0,
                  total_challenges: 0,
                  wins_count: 0,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                },
                isAuthenticated: true 
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  },

  register: async (email: string, password: string, fullName: string) => {
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              id: user.id,
              full_name: fullName,
              username: email.split('@')[0],
            },
          ]);

        if (profileError) throw profileError;

        set({ 
          user,
          profile: {
            id: user.id,
            full_name: fullName,
            username: email.split('@')[0],
            avatar_url: null,
            streak_count: 0,
            total_challenges: 0,
            wins_count: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          isAuthenticated: true 
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, profile: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  updateProfile: async (updates: Partial<UserProfile>) => {
    const { user } = get();
    if (!user) throw new Error('No user logged in');

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      set(state => ({
        profile: state.profile ? { ...state.profile, ...updates } : null
      }));
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },
}));