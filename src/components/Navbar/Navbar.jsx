import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar, Menu, MenuItem } from "@mui/material";

const Navbar = ({ toggleDarkMode, darkMode, toggle, setToggle }) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // Lấy thông tin user và hàm cập nhật
  const [anchorEl, setAnchorEl] = useState(null); // Trạng thái mở/đóng menu

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // Mở dropdown tại vị trí avatar
  };

  const handleClose = () => {
    setAnchorEl(null); // Đóng dropdown
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login"); // Chuyển hướng đến trang đăng nhập
  };
  return (
    <nav>
      <i className="bx bx-menu" onClick={() =>{setToggle(!toggle)}}></i>
      <a href="#" className="nav-link">Dashboard</a>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <i className="bx bx-search"></i>
          </button>
        </div>
      </form>
      <input
        type="checkbox"
        id="swith-mode"
        checked={darkMode}
        onChange={toggleDarkMode}
        hidden
      />
      <label htmlFor="swith-mode" className="swith-mode"></label>
      <a href="#" className="notification">
        <i className="bx bxs-bell"></i>
        <span className="num">3</span>
      </a>
      <div className="buttons-container">
              {user ? ( // Nếu đã đăng nhập
                <div className="user-info">
                  <Avatar
                    alt={user.username}
                    src={user.avatar || "/default-avatar.jpg"}
                    onClick={handleAvatarClick} // Mở dropdown khi click
                    style={{ cursor: "pointer" }}
                  />
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)} // Dropdown mở khi anchorEl có giá trị
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => navigate("/edit-profile")}>
                      Chỉnh sửa thông tin
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/history")}>
                      Lịch sử lịch trình
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                  </Menu>
                </div>
              ) : (
                // Nếu chưa đăng nhập
                <>
                  <button
                    className="btn login-btn"
                    onClick={() => navigate("/login")}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.069 12.8737C13.0246 12.9536 12.9608 13.0199 12.884 13.066C12.8072 13.1121 12.72 13.1364 12.6313 13.1364H0.504754C0.416105 13.1363 0.329039 13.1119 0.2523 13.0658C0.175561 13.0196 0.11185 12.9533 0.0675642 12.8734C0.0232786 12.7936 -2.27425e-05 12.703 1.66562e-08 12.6108C2.27758e-05 12.5187 0.0233688 12.4281 0.0676938 12.3483C1.02961 10.6191 2.51195 9.37922 4.24188 8.79145C3.38618 8.26177 2.72135 7.45466 2.3495 6.49407C1.97764 5.53349 1.91932 4.47254 2.18348 3.47415C2.44765 2.47576 3.0197 1.59514 3.81178 0.967523C4.60386 0.339907 5.57218 0 6.56802 0C7.56387 0 8.53219 0.339907 9.32427 0.967523C10.1164 1.59514 10.6884 2.47576 10.9526 3.47415C11.2167 4.47254 11.1584 5.53349 10.7866 6.49407C10.4147 7.45466 9.74987 8.26177 8.89417 8.79145C10.6241 9.37922 12.1064 10.6191 13.0684 12.3483C13.1128 12.4281 13.1363 12.5187 13.1364 12.6109C13.1365 12.7031 13.1132 12.7937 13.069 12.8737Z"
                        fill="white"
                      />
                    </svg>
                    Đăng nhập
                  </button>
                  <button
                    className="btn register-btn"
                    onClick={() => navigate("/register")}
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </div>
    </nav>
  );
};

export default Navbar;
