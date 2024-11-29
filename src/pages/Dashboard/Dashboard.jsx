import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
// import MainContent from "../../components/MainContent/MainContent";
import { Outlet } from "react-router-dom"; // Import Outlet
import "./Dashboard.css";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [toggle, setToggle] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  return (
    <div className="dashboard">
      <Sidebar toggle={toggle} />
      <section id="content">
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggle={toggle} setToggle={setToggle} />
        <Outlet/>

      </section>
    </div>
  );
};

export default Dashboard;
