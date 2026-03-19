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
        let msg = error.message;
        if (msg.includes('Invalid login credentials')) {
          msg = 'Invalid email or password. Please check your credentials.';
        } else if (msg.includes('Email not confirmed')) {
          msg = 'Please confirm your email address before logging in.';
        }
        console.error('Login error:', msg);
        return { success: false, error: msg };
      }

      navigate('/catalog');
      return { success: true };
    } catch (err) {
      console.error('Unexpected login error:', err);
      return { success: false, error: 'Connection error. Please try again later.' };
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

      if (data.user && data.session === null) {
        return { success: true, message: 'Registration successful! Please check your email for a confirmation link.' };
      }

      navigate('/catalog');
      return { success: true };
    } catch (err) {
      console.error('Unexpected registration error:', err);
      return { success: false, error: 'Registration failed. Please check your connection.' };
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
