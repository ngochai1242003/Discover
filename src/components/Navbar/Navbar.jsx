import React from "react";

const Navbar = ({ toggleDarkMode, darkMode, toggle, setToggle }) => {
  return (
    <nav>
      <i className="bx bx-menu" onClick={() =>{setToggle(!toggle)}}></i>
      <a href="#" className="nav-link">Categories</a>
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
      <a href="#" className="profile">
        <img src="img/profil.png" alt="Profile" />
      </a>
    </nav>
  );
};

export default Navbar;
