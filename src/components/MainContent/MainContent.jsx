import React from "react";

const MainContent = () => {
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Overview</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Overview</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">Home</a>
            </li>
          </ul>
        </div>
        <a href="#" className="btn-download">
          <i className="bx bxs-cloud-download"></i>
          <span className="text">Download PDF</span>
        </a>
      </div>

      <ul className="box-info">
        <li>
          <i className="bx bxs-location-plus" style={{ color: "#4915d0" }}></i>
          <span className="text">
            <h3>500</h3>
            <p>Destination</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-group"></i>
          <span className="text">
            <h3>1500</h3>
            <p>User</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-dollar-circle"></i>
          <span className="text">
            <h3>$ 8655</h3>
            <p>Total Sales</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Recently Added Locations</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date Added</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Marie", date: "14-08-2024", location: "Đà Nẵng", status: "completed" },
                { name: "Bineta", date: "14-08-2024", location: "Huế", status: "pending" },
                { name: "Ibrahim", date: "14-08-2024", location: "Hội An", status: "process" },
                { name: "Maimouna", date: "14-08-2024", location: "Bà Nà", status: "pending" }
              ].map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={`img/p${index + 1}.png`} alt={`Profile ${index + 1}`} />
                    <p>{item.name}</p>
                  </td>
                  <td>{item.date}</td>
                  <td>
                    <span className={`status ${item.status}`}>{item.location}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="todo">
          <div className="head">
            <h3>List Users</h3>
            <i className="bx bx-plus"></i>
            <i className="bx bx-filter"></i>
          </div>
          <ul className="todo-list">
            {[
              { status: "completed", text: "A Faire" },
              { status: "not-completed", text: "A Faire" },
              { status: "completed", text: "A Faire" },
              { status: "not-completed", text: "A Faire" },
              { status: "completed", text: "A Faire" },
            ].map((item, index) => (
              <li key={index} className={item.status}>
                <p>{item.text}</p>
                <i className="bx bx-dots-vertical-rounded"></i>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
