import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Hàm lấy danh sách địa điểm từ API
  const fetchDestinations = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:4000/api/v1/admin/all-destination",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDestinations(response.data || []);
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };

  // Hàm mở modal (view hoặc edit)
  const handleModalOpen = (mode, destination) => {
    setSelectedDestination({ ...destination }); // Sao chép dữ liệu để chỉnh sửa
    setModalMode(mode);
    setShowModal(true);
  };

  // Đóng modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedDestination(null);
  };

  // Hàm cập nhật thông tin destination
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:4000/api/v1/admin/update-destination/${selectedDestination._id}`,
        selectedDestination,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Destination updated successfully!");
      closeModal();
      fetchDestinations(); // Cập nhật danh sách sau khi chỉnh sửa
    } catch (err) {
      console.error("Error updating destination:", err);
      alert("Failed to update destination!");
    }
  };

  // Hàm xử lý thay đổi dữ liệu trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedDestination((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div className="dashboard-destination">
      <h1>Dashboard: Destinations</h1>

      {/* Bảng danh sách địa điểm */}
      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Picture</th>
            <th>Name</th>
            <th>Category</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(destinations) && destinations.length > 0 ? (
            destinations.map((destination, index) => (
              <tr key={destination._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={
                      destination.image_url || "https://via.placeholder.com/40"
                    }
                    alt="Destination"
                    style={{ width: "40px", height: "40px" }}
                  />
                </td>
                <td>{destination.name}</td>
                <td>{destination.category}</td>
                <td>{destination.location}</td>
                <td>
                  <button
                    className="action-btn view"
                    onClick={() => handleModalOpen("view", destination)}
                  >
                    View
                  </button>
                  <button
                    className="action-btn edit"
                    onClick={() => handleModalOpen("edit", destination)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No destinations available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal hiển thị hoặc chỉnh sửa thông tin */}
      {showModal && selectedDestination && (
        <div id="modal">
          <div className="modal-header">
            <h2 id="modal-title">
              {modalMode === "view"
                ? "View Destination Details"
                : "Edit Destination Details"}
            </h2>
            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>
          </div>
          <div className="modal-body">
            <form id="modal-form" onSubmit={modalMode === "edit" ? handleUpdate : null}>
              <label>
                Name:{" "}
                <input
                  type="text"
                  name="name"
                  value={selectedDestination.name || ""}
                  disabled={modalMode === "view"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Description:{" "}
                <input
                  type="text"
                  name="description"
                  value={selectedDestination.description || ""}
                  disabled={modalMode === "view"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Category:{" "}
                <input
                  type="text"
                  name="category"
                  value={selectedDestination.category || ""}
                  disabled={modalMode === "view"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Price:{" "}
                <input
                  type="text"
                  name="price"
                  value={selectedDestination.price || ""}
                  disabled={modalMode === "view"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Rating:{" "}
                <input
                  type="text"
                  name="rating"
                  value={selectedDestination.rating || ""}
                  disabled={modalMode === "view"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Location:{" "}
                <input
                  type="text"
                  name="location"
                  value={selectedDestination.location || ""}
                  disabled={modalMode === "view"}
                  onChange={handleChange}
                />
              </label>
              {/* Các trường khác tương tự... */}
              {modalMode === "edit" && (
                <button type="submit" className="action-btn save">
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardDestination;
