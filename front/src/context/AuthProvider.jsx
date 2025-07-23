import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('oriem_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);

  const login = (userData) => {
    localStorage.setItem('oriem_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('oriem_user');
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = !!user;

  // Redirect after login based on role
  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
