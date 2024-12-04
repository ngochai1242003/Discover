import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [showNewDestinationModal, setShowNewDestinationModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [modalMode, setModalMode] = useState("view");

  const toggleNewDestinationModal = () =>
    setShowNewDestinationModal(!showNewDestinationModal);

  const toggleModal = (mode = "view") => {
    setModalMode(mode);
    setShowModal(!showModal);
  };
  const toggleConfirmation = () => setShowConfirmation(!showConfirmation);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("New destination added successfully!");
    toggleNewDestinationModal();
  };

  return (
    <div className="c11">
      <a href="#" className="new-user-btn" onClick={toggleNewDestinationModal}>
        <i className="fas fa-user-plus"></i> New Destination
      </a>

      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Picture</th>
            <th>Name</th>
            <th>Category</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <img src="https://via.placeholder.com/40" alt="User" />
            </td>
            <td>John Doe</td>
            <td>Phoenix</td>
            <td>1234567890</td>
            <td>2023-07-04</td>
            <td>
              <button
                className="action-btn view"
                onClick={() => toggleModal("view")}
              >
                View
              </button>
              <button
                className="action-btn edit"
                onClick={() => toggleModal("edit")}
              >
                Edit
              </button>
              <button
                className="action-btn delete"
                onClick={toggleConfirmation}
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* New Destination Modal */}
      {showNewDestinationModal && (
        <div id="modal-new-user">
          <div className="modal-header">
            <h2>Add New Destination</h2>
            <button className="close-btn" onClick={toggleNewDestinationModal}>
              ✖
            </button>
          </div>
          <div className="modal-body">
            <form id="new-user-form" onSubmit={handleFormSubmit}>
              <label>
                Name: <input type="text" name="name" required />
              </label>
              <label>
                Description: <input type="number" name="Description" required />
              </label>
              <label>
                Category: <input type="text" name="Category" required />
              </label>
              <label>
                Price: <input type="text" name="Price" required />
              </label>
              <label>
                Rating: <input type="text" name="Rating" required />
              </label>
              <label>
                Location: <input type="text" name="location" required />
              </label>
              <label>
                Open_hours: <input type="text" name="open_hours" required />
              </label>
              <label>
                Service: <input type="text" name="service" required />
              </label>
              <label>
                Type: <input type="text" name="type" required />
              </label>
              <label>
                Lat: <input type="text" name="lat" required />
              </label>
              <label>
                Lng: <input type="text" name="lng" required />
              </label>
              <label>
                Start Date: <input type="date" name="startDate" disabled />
              </label>
              <button type="submit" className="action-btn save">
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View/Edit Modal */}
      {showModal && (
        <div id="modal">
          <div className="modal-header">
            <h2 id="modal-title">
              {modalMode === "view"
                ? "View Destination Details"
                : "Edit Destination Details"}
            </h2>
            <button className="close-btn" onClick={() => toggleModal()}>
              ✖
            </button>
          </div>
          <div className="modal-body">
            <form id="modal-form">
              <label>
                Name:{" "}
                <input
                  type="text"
                  name="name"
                  disabled={modalMode === "view"}
                />
              </label>
              <label>
                Description:{" "}
                <input
                  type="number"
                  name="Description"
                  disabled={modalMode === "view"}
                />
              </label>
              <label>
                Category:{" "}
                <input
                  type="text"
                  name="Category"
                  disabled={modalMode === "view"}
                />
              </label>
              <label>
                Price:{" "}
                <input
                  type="text"
                  name="Price"
                  disabled={modalMode === "view"}
                />
              </label>
              <label>
                Rating:{" "}
                <input
                  type="text"
                  name="Rating"
                  disabled={modalMode === "view"}
                />
              </label>
              <label>
                Location:{" "}
                <input
                  type="text"
                  name="location"
                  disabled={modalMode === "view"}
                />
              </label>
              <label>
                Open_hours:{" "}
                <input
                  type="text"
                  name="open_hours"
                  disabled={modalMode === "view"}
                />
              </label>
              <label>
                Service:{" "}
                <input
                  type="text"
                  name="service"
                  disabled={modalMode === "view"}
                />
              </label>
              <label>
                Type:{" "}
                <input
                  type="text"
                  name="type"
                  disabled={modalMode === "view"}
                />
              </label>
              <label>
                Lat:{" "}
                <input type="text" name="lat" disabled={modalMode === "view"} />
              </label>
              <label>
                Lng:{" "}
                <input type="text" name="lng" disabled={modalMode === "view"} />
              </label>
              <label>
                Start Date: <input type="date" name="startDate" disabled />
              </label>
              {modalMode === "edit" && (
                <button type="submit" className="action-btn save">
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div id="confirmation">
          <div className="modal-header">
            <h2>Confirm Delete</h2>
            <button className="close-btn" onClick={toggleConfirmation}>
              ✖
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this destination?</p>
            <button className="confirm-btn" onClick={toggleConfirmation}>
              Delete
            </button>
            <button className="cancel-btn" onClick={toggleConfirmation}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardDestination;
