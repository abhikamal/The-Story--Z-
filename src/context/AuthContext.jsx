import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('nexus_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Hardcoded Admin Check
    if (email === 'siri' && password === '99887766') {
      const adminUser = {
        id: 'admin-1',
        name: 'Siri',
        email: 'siri',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('nexus_user', JSON.stringify(adminUser));
      navigate('/catalog');
      return { success: true };
    }
    
    // Mock normal user login
    const normalUser = {
      id: 'user-1',
      name: email.split('@')[0],
      email: email,
      role: 'user'
    };
    setUser(normalUser);
    localStorage.setItem('nexus_user', JSON.stringify(normalUser));
    navigate('/catalog');
    return { success: true };
  };

  const register = (name, email, password) => {
    // Mock registration
    const newUser = {
      id: `user-${Date.now()}`,
      name: name,
      email: email,
      role: 'user'
    };
    setUser(newUser);
    localStorage.setItem('nexus_user', JSON.stringify(newUser));
    navigate('/catalog');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexus_user');
    navigate('/login');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
