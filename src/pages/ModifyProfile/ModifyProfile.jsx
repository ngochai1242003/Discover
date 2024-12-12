import { useEffect, useState } from "react";
import "./ModifyProfile.css";
import axios from "axios";
import { sendOtp } from "../../components/services/authService";
import { useNavigate } from "react-router-dom";

function ModifyProfile() {
  const [{ email, phoneNumber, otp }, setInfo] = useState({
    email: "",
    phoneNumber: "",
    otp: "",
  });
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const data = await sendOtp(email);
      alert("Gửi OTP thành công");
    } catch (error) {
      alert("Email đã được đăng ký");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.put(
        "http://localhost:4000/api/v1/users/update-user-details",
        {
          email: email,
          phone: phoneNumber,
          otp: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (data.status === 200) {
        if (otp) alert("Cập nhật thông tin thành công");
        else alert("Vui lòng kiểm tra email để nhận mã OTP");
      }
    } catch (error) {
      console.log(error.message);
      alert("Đã xảy ra lỗi trong quá trình cập nhật");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("http://localhost:4000/api/v1/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (data.status === 200) {
          const infoUser = data.data.data;
          setUsername(infoUser.username);
          setInfo({ email: infoUser.email, phoneNumber: infoUser.phone });
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <div className="wrapper_auth">
      <div className="container-profile">
        <div className="form-container">
          <h2 className="h2_login">Chỉnh sửa thông tin cá nhân</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="regEmail">Tên đăng nhập</label>
              <input type="username" value={username} disabled />
            </div>
            <div className="form-group">
              <label for="regEmail">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setInfo((pre) => ({ ...pre, email: e.target.value }));
                }}
              />
            </div>
            <div className="form-group">
              <label for="regPassword">Số điện thoại</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  setInfo((pre) => ({ ...pre, phoneNumber: e.target.value }));
                }}
              />
            </div>
            <div className="form-group1">
              <button
                className="form-group1_button"
                onClick={handleSendOtp}
                type="button"
              >
                Gửi OTP
              </button>
              <input
                className="form-group1_input"
                type="text"
                value={otp}
                onChange={(e) => {
                  setInfo((pre) => ({ ...pre, otp: e.target.value }));
                }}
              />
            </div>
            <button className="btn_login" type="submit">
              Xác nhận
            </button>
            <span
              onClick={() => {
                navigate(-1);
              }}
              className="btn_back"
            >
              Quay lại
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModifyProfile;
