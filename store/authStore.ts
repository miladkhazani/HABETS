import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

export type UserProfile = Database['public']['Tables']['user_profiles']['Row'];

interface User {
  id: string;
  email: string;
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
        // Create user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              id: user.id,
              full_name: fullName,
              username: email.split('@')[0], // Default username from email
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