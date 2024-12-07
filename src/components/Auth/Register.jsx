import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    otp: '',
  });

  const [passwordValid, setPasswordValid] = useState({
    length: false,
    upperCase: false,
    number: false,
    specialChar: false,
  });

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });

    setPasswordValid({
      length: password.length >= 8,
      upperCase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleOTP = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/sendOtp/send-otp", {
        email: formData.email,
      });
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

  // Function to navigate to login page
  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="wrapper_auth">
      <div className="container1">
        <div className="form-container">
          {/* Nút nhỏ tròn quay lại đăng nhập */}
          <button 
            className="go-back-btn"
            onClick={handleGoToLogin}
          >
            &#8592; {/* Dấu mũi tên trái */}
          </button>
          
          <h2 className="h2_login">Đăng kí</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="regUsername">Tên người dùng</label>
              <input
                type="text"
                id="regUsername"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
                placeholder="Nhập Tên người dùng"
              />
            </div>
            <div className="form-group">
              <label htmlFor="regEmail">Email</label>
              <input
                type="email"
                id="regEmail"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                placeholder="Nhập email của bạn"
              />
            </div>
            <div className="form-group">
              <label htmlFor="regPhone">Số điện thoại</label>
              <input
                type="text"
                id="regPhone"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                placeholder="Nhập Số Điện thoại"
              />
            </div>

            <div className="form-group">
              <label htmlFor="regPassword">Mật khẩu</label>
              <input
                type="password"
                id="regPassword"
                value={formData.password}
                onChange={handlePasswordChange}
                required
                placeholder="Nhập Mật Khẩu"
              />
              
              <div className="password-conditions">
                <div className="password-column">
                  <p style={{ color: passwordValid.length ? 'green' : 'red' }}>
                    {passwordValid.length ? '✔ Ít nhất 8 ký tự' : '❌ Ít nhất 8 ký tự'}
                  </p>
                  <p style={{ color: passwordValid.upperCase ? 'green' : 'red' }}>
                    {passwordValid.upperCase ? '✔ Chứa chữ cái hoa' : '❌ Chứa chữ cái hoa'}
                  </p>
                </div>
                <div className="password-column">
                  <p style={{ color: passwordValid.number ? 'green' : 'red' }}>
                    {passwordValid.number ? '✔ Chứa ít nhất 1 số' : '❌ Chứa ít nhất 1 số'}
                  </p>
                  <p style={{ color: passwordValid.specialChar ? 'green' : 'red' }}>
                    {passwordValid.specialChar ? '✔ Chứa ký tự đặc biệt' : '❌ Chứa ký tự đặc biệt'}
                  </p>
                </div>
              </div>
            </div>

            <div className="form-group1">
              <button
                className="form-group1_button"
                type="button"
                onClick={handleOTP}
              >
                Gửi OTP
              </button>
              <input
                className="form-group1_input"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
                required
              />
            </div>

            <button className="btn_login" type="submit">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;