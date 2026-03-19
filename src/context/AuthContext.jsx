import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// List of emails that have admin privileges
const ADMIN_EMAILS = [
  'siri7@example.com',
  'siri',
  'abhikamal2020@gmail.com',
  'umav4000@gmail.com',
].map(e => e.toLowerCase());

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        return { success: false, error: error.message };
      }

      navigate('/catalog');
      return { success: true };
    } catch (err) {
      console.error('Unexpected login error:', err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        console.error('Registration error:', error.message);
        return { success: false, error: error.message };
      }

      navigate('/catalog');
      return { success: true };
    } catch (err) {
      console.error('Unexpected registration error:', err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAdmin: user && ADMIN_EMAILS.includes(user.email?.toLowerCase())
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
