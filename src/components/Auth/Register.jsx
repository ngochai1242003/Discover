import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "./Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  //   const navigate = useNavigate();

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      setMessage(response.message);
      alert(
        "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản."
      );
    } catch (err) {
      setError(err.message || "Đăng ký thất bại.");
    }
  };

  return (
    <div className="wrapper_auth">
      <div className="container1">
        <div id="registerForm" className="form-container">
          <h2>Đăng ký</h2>
          <form id="register-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="regUsername">Tên người dùng</label>
              <input
                type="text"
                id="regUsername"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="regEmail">Email</label>
              <input
                type="email"
                id="regEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="regPassword">Mật khẩu</label>
              <input
                type="password"
                id="regPassword"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button className="btn_login" type="submit">
              Đăng ký
            </button>
          </form>
          <div className="switch-form">
            <a href="/login">Đã có tài khoản? Đăng nhập</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
