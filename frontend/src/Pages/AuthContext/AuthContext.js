// src/Pages/AuthContext/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    const res = await axios.post('http://localhost:5000/api/users/login', userData);
    setUser(res.data);
  };

  const signup = async (userData) => {
    const res = await axios.post('http://localhost:5000/api/users/signup', userData);
    setUser(res.data);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
