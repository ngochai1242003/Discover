import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/auth/login", formData);
      alert("Đăng nhập thành công!");
      console.log(response.data);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Chưa có tài khoản?{" "}
        <button onClick={() => navigate("/register")}>Đăng ký</button>
      </p>
    </div>
  );
};

export default Login;
