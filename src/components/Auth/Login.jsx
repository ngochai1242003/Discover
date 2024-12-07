import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { BiHide, BiShow } from "react-icons/bi"; // Import thêm BiShow để hiển thị mật khẩu
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State để điều khiển ẩn/hiện mật khẩu
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        formData
      );
      
      localStorage.setItem("accessToken", response.data.accessToken);
      if(response.data.data.user_type === 'admin'){
        navigate("/dashboard")
      } else{
        navigate("/");
      }
      
      const user = {
        id: response.data.data._id,
        username: response.data.data.username,
        avatar: response.data.data.avatar || null,
        role: response.data.data.user_type
      };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      alert(error.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="wrapper_auth">
      <div className="container1">
        <div className="form-container">
          <h2 className="h2_login">Đăng nhập</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Tên người dùng</label>
              <input
                type="text"
                id="username"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
                placeholder="Nhập tên người dùng"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"} // Điều chỉnh type theo showPassword
                  id="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  placeholder="Nhập Mật Khẩu"
                />
                <div 
                  className="password-toggle-icon" 
                  onClick={() => setShowPassword(!showPassword)} // Toggle mật khẩu
                >
                  {showPassword ? <BiShow /> : <BiHide />} 
                </div>
              </div>
            </div>
            <button className="btn_login" type="submit">Đăng nhập</button>
          </form>
          <div className="switch-form">
            Chưa có tài khoản?{" "}
            <a style={{cursor: "pointer"}} onClick={() => navigate("/register")}>Đăng ký ngay</a>
          </div>
          <div className="switch-form">
            <a style={{cursor: "pointer"}} onClick={() => navigate("/forgotpassword")}>Quên Mật Khẩu</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
