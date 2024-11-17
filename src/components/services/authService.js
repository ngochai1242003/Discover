import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/auth';

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/verify?token=${token}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
