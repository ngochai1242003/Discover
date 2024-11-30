import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1';

export const registerUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/auth/signup`, userData);
};

// export const loginUser = async (credentials) => {
//     const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
//     const token = response.data.token;
//     localStorage.setItem('authToken', token); 
//     return response;
// };


export const sendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sendOtp/send-otp`, { email });
    console.log(response.data); // Dùng cho development
    return response.data.message; // Trả về message thay vì OTP
  } catch (error) {
    throw error.response?.data || { message: 'Failed to send OTP' };
  }
};
