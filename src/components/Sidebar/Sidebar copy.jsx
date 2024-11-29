import React, { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState("overview");

  const handleMenuClick = (menu) => {
    setActive(menu);
  };

  

  return (
    <section id="sidebar">
      <a href="#" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">Sunudeals</span>
      </a>

      <ul className="side-menu top">
        {["overview", "user", "destination", "status", "messages"].map((menu) => (
          <li key={menu} className={active === menu ? "active" : ""}>
            <a href="#" onClick={() => handleMenuClick(menu)}>
              <i className={`bx bxs-${menu === "overview" ? "dashboard" : menu}`}></i>
              <span className="text">{menu.charAt(0).toUpperCase() + menu.slice(1)}</span>
            </a>
          </li>
        ))}
      </ul>

      <ul className="side-menu top">
        <li>
          <a href="#">
            <i className="bx bxs-cog"></i>
            <span className="text">Setting</span>
          </a>
        </li>
        <li>
          <a href="#" className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
