import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/users";

const fetchUsers = async (token) => {
  if (!token) throw new Error("No token provided");
  
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const fetchUserById = async (userId, token) => {
  if (!token) throw new Error("No token provided");

  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user by ID");
  }
};

const deleteUser = async (userId, token) => {
  if (!token) throw new Error("No token provided");

  const response = await axios.delete(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const updateUser = async (userId, userData, token) => {
  if (!token) throw new Error("No token provided");

  const response = await axios.put(`${API_URL}/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default { fetchUsers, deleteUser, updateUser,fetchUserById };
