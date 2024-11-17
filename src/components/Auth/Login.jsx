import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "./Auth.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Gọi API login
      const response = await login(username, password);
      localStorage.setItem("token", response.accessToken);
      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div className="wrapper_auth">

    <div className="container1">
      <div id="loginForm" className="form-container">
        <h2>Đăng nhập</h2>
        <form id="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Tên người dùng</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Mật khẩu</label>
            <input
              type="password"
              id="loginPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="btn_login" type="submit">Đăng nhập</button>
        </form>
        <div className="switch-form">
          <a href="/register">Chưa có tài khoản? Đăng ký ngay</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
