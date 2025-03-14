import { useEffect } from 'react';
import { useAuth } from '@/store/authStore';
import { supabase } from '@/lib/supabase';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          useAuth.setState({ 
            user: session.user,
            profile: profile || null,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          useAuth.setState({ 
            user: null, 
            profile: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return children;
}