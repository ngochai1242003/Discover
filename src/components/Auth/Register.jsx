import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });
  const navigate = useNavigate();

  const handleOTP = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/sendOtp/send-otp", { email: formData.email });
      alert("OTP đã được gửi!");
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi gửi OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/auth/signup", formData);
      alert("Đăng ký thành công! Chuyển về trang đăng nhập.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="button" onClick={handleOTP}>
          Gửi OTP
        </button>
        <input
          type="text"
          placeholder="OTP"
          onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
