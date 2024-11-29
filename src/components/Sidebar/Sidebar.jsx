import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({toggle}) => {
  const [active, setActive] = useState("overview");

  const handleMenuClick = (menu) => {
    setActive(menu);
  };

  return (
    <section id="sidebar" className={toggle ? "hide" : ""}>
      <a href="#" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">Captone1</span>
      </a>

      <ul className="side-menu top">
        <li className={active === "overview" ? "active" : ""}>
          <Link to="/dashboard" onClick={() => handleMenuClick("overview")}>
            <i className="bx bxs-dashboard"></i>
            <span className="text">Overview</span>
          </Link>
        </li>
        <li className={active === "user" ? "active" : ""}>
          <Link to="/dashboard/dashboard-user" onClick={() => handleMenuClick("user")}>
            <i className="bx bxs-group"></i>
            <span className="text">User</span>
          </Link>
        </li>
        <li className={active === "destination" ? "active" : ""}>
          <Link to="/dashboard/dashboard-destination" onClick={() => handleMenuClick("destination")}>
            <i className="bx bxs-shopping-bag-alt"></i>
            <span className="text">Destination</span>
          </Link>
        </li>
        <li className={active === "status" ? "active" : ""}>
          <a href="#" onClick={() => handleMenuClick("status")}>
            <i className="bx bxs-doughnut-chart"></i>
            <span className="text">Status</span>
          </a>
        </li>
        <li className={active === "messages" ? "active" : ""}>
          <a href="#" onClick={() => handleMenuClick("messages")}>
            <i className="bx bxs-message-dots"></i>
            <span className="text">Messages</span>
          </a>
        </li>
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
