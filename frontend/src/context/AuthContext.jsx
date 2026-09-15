import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bookstore_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('bookstore_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bookstore_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await api.login(email, password);
      setUser(data);
      return data;
    } catch (err) {
      setAuthError(err.message || 'Login failed. Please check credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await api.register(userData);
      setUser(data);
      return data;
    } catch (err) {
      setAuthError(err.message || 'Registration failed. Try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthError(null);
    localStorage.removeItem('bookstore_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, authError, setAuthError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
