import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  
  return response.data;
  
};

// Forgot password
const forgotPassword = async (username) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { username });
  return response.data;
};

// Reset password
const resetPassword = async (token, password) => {
  const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
  return response.data;
};

export default {
  register,
  login,
  forgotPassword,
  resetPassword
};