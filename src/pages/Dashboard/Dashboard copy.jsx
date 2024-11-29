import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import MainContent from "../../components/MainContent/MainContent";
import "./Dashboard.css";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <section id="content">
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <MainContent />
      </section>
    </div>
  );
};

export default Dashboard;
