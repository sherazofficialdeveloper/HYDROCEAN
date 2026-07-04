import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../utils/api';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await API.get('/auth/me');
      if (response.data && response.data.user) {
        setUser(response.data.user);
      } else {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Fetch user error:', error);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIX: Login function with proper error handling
  const login = async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      
      // ✅ Check if response has data
      if (!response || !response.data) {
        throw new Error('No response from server');
      }

      const { token, user } = response.data;
      
      // ✅ Check if token and user exist
      if (!token || !user) {
        throw new Error('Invalid response from server');
      }

      // ✅ Save token to localStorage
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      // ✅ Re-throw error for component to handle
      throw error;
    }
  };

  // ✅ FIX: Register function
  const register = async (userData) => {
    try {
      const response = await API.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  // ✅ FIX: Verify OTP function
  const verifyOTP = async (email, otp) => {
    try {
      const response = await API.post('/auth/verify-otp', { email, otp });
      const { token, user } = response.data;
      
      if (token && user) {
        localStorage.setItem('token', token);
        setToken(token);
        setUser(user);
      }
      
      return user;
    } catch (error) {
      console.error('OTP verify error:', error);
      throw error;
    }
  };

  // ✅ FIX: Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    verifyOTP,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.role === 'sub_admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};