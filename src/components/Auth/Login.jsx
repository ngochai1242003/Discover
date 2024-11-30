import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import './Auth.css'

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
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
      if(response.data.user_type === 'admin'){
        navigate("/dashboard")
      } else{
        navigate("/");
      }
      
      const user = {
        id: response.data._id,
        username: response.data.username,
        avatar: response.data.avatar || null,
        role: response.data.user_type
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
              <label>UserName</label>
              <input
                type="text"
              
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <button className="btn_login" type="submit">Đăng nhập</button>
          </form>
          <div className="switch-form">
            Chưa có tài khoản?{" "}
            <a style={{cursor: "pointer"}} onClick={() => navigate("/register")}>Đăng ký ngay</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
