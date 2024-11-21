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

  return (
    <div className="wrapper_auth">
      <div className="container1">
        <div className="form-container">
          <h2 className="h2_login">Đăng kí</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="regUsername">Tên người dùng</label>
              <input
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label for="regEmail">Email</label>
              <input
                type="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label for="regPassword">Số điện thoại</label>
              <input
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label for="regPassword">Mật khẩu</label>
              <input
                type="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group1">
              <button className="form-group1_button" type="button" onClick={handleOTP}>
                Gửi OTP
              </button>
              <input className="form-group1_input"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
                required
              />
            </div>
            <button className="btn_login" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
