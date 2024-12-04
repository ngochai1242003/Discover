import React, { useState } from "react";
import "./DashboardUser.css";

const DashboardUser = () => {
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [modalMode, setModalMode] = useState("view");

  const toggleNewUserModal = () => {
    setShowNewUserModal(!showNewUserModal);
    setShowOverlay(!showOverlay); 
  };


  const toggleModal = (mode = "view") => {
    setModalMode(mode);
    setShowModal(!showModal);
  };
  const toggleConfirmation = () => setShowConfirmation(!showConfirmation);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("New user added successfully!");
    toggleNewUserModal();
  };

  return (
    <div className="c11">
      <a href="#" className="new-user-btn" onClick={toggleNewUserModal}>
        <i className="fas fa-user-plus"></i> New User
      </a>

      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Picture</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Start Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><img src="https://via.placeholder.com/40" alt="User" /></td>
            <td>John Doe</td>
            <td>30</td>
            <td>Phoenix</td>
            <td>john123@gmail.com</td>
            <td>1234567890</td>
            <td>Officer</td>
            <td>2023-07-04</td>
            <td>
              <button className="action-btn view" onClick={() => toggleModal("view")}>View</button>
              <button className="action-btn edit" onClick={() => toggleModal("edit")}>Edit</button>
              <button className="action-btn delete" onClick={toggleConfirmation}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div id="overlay3" class="hidden"></div>

      {/* New User Modal */}
      {showNewUserModal && (
        <div id="modal-new-user">
          <div className="modal-header">
            <h2>Add New User</h2>
            <button className="close-btn" onClick={toggleNewUserModal}>✖</button>
          </div>
          <div className="modal-body">
            <form id="new-user-form" onSubmit={handleFormSubmit}>
              <label>Name: <input type="text" name="name" required /></label>
              <label>Age: <input type="number" name="age" required /></label>
              <label>City: <input type="text" name="city" required /></label>
              <label>Email: <input type="email" name="email" required /></label>
              <label>Phone: <input type="text" name="phone" required /></label>
              <label>Position: <input type="text" name="position" required /></label>
              <label>Start Date: <input type="date" name="startDate" required /></label>
              <button type="submit" className="action-btn save">Save</button>
            </form>
          </div>
        </div>
      )}

      {/* View/Edit Modal */}
      {showModal && (
        <div id="modal">
          <div className="modal-header">
            <h2 id="modal-title">{modalMode === "view" ? "View User Details" : "Edit User Details"}</h2>
            <button className="close-btn" onClick={() => toggleModal()}>✖</button>
          </div>
          <div className="modal-body">
            <form id="modal-form">
              <label>Name: <input type="text" name="name" disabled={modalMode === "view"} /></label>
              <label>Age: <input type="text" name="age" disabled={modalMode === "view"} /></label>
              <label>City: <input type="text" name="city" disabled={modalMode === "view"} /></label>
              <label>Email: <input type="email" name="email" disabled={modalMode === "view"} /></label>
              <label>Phone: <input type="text" name="phone" disabled={modalMode === "view"} /></label>
              <label>Position: <input type="text" name="position" disabled={modalMode === "view"} /></label>
              <label>Start Date: <input type="date" name="startDate" disabled={modalMode === "view"} /></label>
              {modalMode === "edit" && <button type="submit" className="action-btn save">Update</button>}
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div id="confirmation">
          <div className="modal-header">
            <h2>Confirm Delete</h2>
            <button className="close-btn" onClick={toggleConfirmation}>✖</button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this user?</p>
            <button className="confirm-btn" onClick={toggleConfirmation}>Delete</button>
            <button className="cancel-btn" onClick={toggleConfirmation}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardUser;
