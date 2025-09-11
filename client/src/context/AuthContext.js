import React, { createContext, useState } from 'react';
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from '../api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    setUser(data);
  };

  const signup = async (email, password) => {
    const data = await apiSignup(email, password);
    setUser(data);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};