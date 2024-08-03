import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5000/api/users/login', {email, password});
    setUser(res.data);
  };

  const logout = () => {
    setUser(null);
  };

  const changePassword = async (currentPassword, newPassword) => {
    await axios.put('http://localhost:5000/api/users/change-password', { currentPassword, newPassword }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
  };

  const forgotPassword = async (email, newPassword) => {
    await axios.post('http://localhost:5000/api/users/forgot-password', { email, newPassword });
  };

  const signup = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', { email, password });
      console.log('Response:', response.data);
      // setUser(response.data)
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, signup, logout, changePassword, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

