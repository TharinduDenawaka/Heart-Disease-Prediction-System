import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      setUser(res.data);
      toast.success('Login successfully');
      return res.data
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await axios.put('http://localhost:5000/api/users/change-password', { currentPassword, newPassword }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Password changed successfully');
      return res.data
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Password change failed');
    }
  };

  const forgotPassword = async (email, newPassword) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/forgot-password', { email, newPassword });
      toast.success('Password reset successfully');
      return res.data
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Password reset failed');
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/signup', { email, password });
      setUser(res.data);
      toast.success('Signup successful');
      return res.data
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Signup failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, changePassword, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
