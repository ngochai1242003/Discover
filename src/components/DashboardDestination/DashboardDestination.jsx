import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [formData, setFormData] = useState({
    price: "",
    description: "",
    open_hours: "",
    close_hours: "",
    image_url: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showToast, setShowToast] = useState(false);

  const showSuccessToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setShowDeleteModal(false);
  };

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

  useEffect(() => {
    fetchDestinations();
  }, []);

  const openModal = (mode, destination) => {
    setModalMode(mode);
    setSelectedDestination(destination);

    if (mode === "edit") {
      setFormData({
        price: destination.price || "",
        description: destination.description || "",
        open_hours: destination.open_hours || "",
        close_hours: destination.close_hours || "",
        place: destination.place || "",
        image_url: destination.image_url || "",
      });
    }

    setShowModal(true);
    document.body.classList.add("no-scroll");
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDestination(null);
    setFormData({
      price: "",
      description: "",
      open_hours: "",
      close_hours: "",
      place: "",
      image_url: "",
    });
    document.body.classList.remove("no-scroll");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `http://localhost:4000/api/v1/admin/update-destination/${selectedDestination._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Destination updated successfully!");
      fetchDestinations();
      closeModal();
    } catch (err) {
      console.error("Error updating destination:", err);
      alert("Failed to update destination!");
    }
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `http://localhost:4000/api/v1/admin/delete-destination/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSuccessToast(); // Hiển thị toast thông báo
      fetchDestinations(); // Cập nhật danh sách
      closeDeleteModal(); // Đóng modal
    } catch (err) {
      console.error("Error deleting destination:", err);
      alert("Failed to delete destination!");
    }
  };

  return (
    <div className="c11">
      <h1>Dashboard: Destinations</h1>

      <a href="#" className="new-user-btn">
        <i className="fas fa-user-plus"></i> New Destination
      </a>

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
                      Array.isArray(destination.img_url) &&
                      destination.img_url.length > 0
                        ? destination.img_url[0]
                        : "https://via.placeholder.com/40"
                    }
                    alt="Destination"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{destination.name}</td>
                <td>{destination.category}</td>
                <td>{destination.location}</td>
                <td>
                  <button
                    className="action-btn view"
                    onClick={() => openModal("view", destination)}
                  >
                    View
                  </button>
                  <button
                    className="action-btn edit"
                    onClick={() => openModal("edit", destination)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => openDeleteModal(destination._id)}
                  >
                    Delete
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

      {/* Modal */}
      {showModal && (
        <>
          <div id="overlay3"></div>
          <div id="modal">
            <div className="modal-header">
              <h2 className="modal-header-h2">
                {modalMode === "view"
                  ? "View Destination Details"
                  : "Edit Destination Details"}
              </h2>
              <button className="close-btn1" onClick={closeModal}>
                ✖
              </button>
            </div>
            <div className="modal-body">
              {modalMode === "view" ? (
                <div>
                  <form>
                    <label>
                      Name:
                      <input
                        type="text"
                        value={selectedDestination.name || ""}
                        readOnly
                      />
                    </label>
                    <label>
                      Description:
                      <textarea
                        value={selectedDestination.description || ""}
                        readOnly
                        style={{
                          width: "100%",
                          height: "auto",
                          minHeight: "100px",
                          resize: "none",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          padding: "10px",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          overflowY: "auto",
                        }}
                      ></textarea>
                    </label>
                    <label>
                      Category:
                      <input
                        type="text"
                        value={selectedDestination.category || ""}
                        readOnly
                      />
                    </label>
                    <label>
                      Price:
                      <input
                        type="text"
                        value={selectedDestination.price || ""}
                        readOnly
                      />
                    </label>
                    <label>
                      New Price:
                      <input
                        type="text"
                        value={selectedDestination.priceNew || ""}
                        readOnly
                      />
                    </label>
                    <label>
                      Rating:
                      <input
                        type="text"
                        value={selectedDestination.rating || ""}
                        readOnly
                      />
                    </label>
                    <label>
                      Location:
                      <input
                        type="text"
                        value={selectedDestination.location || ""}
                        readOnly
                      />
                    </label>
                    <label>
                      Place:
                      <input
                        type="text"
                        value={selectedDestination.place || ""}
                        readOnly
                      />
                    </label>
                    <label>
                      Open Hours:
                      <input
                        type="text"
                        value={selectedDestination.open_hours || ""}
                        readOnly
                      />
                    </label>
                    <label>
                      Close Hours:
                      <input
                        type="text"
                        value={selectedDestination.close_hours || ""}
                        readOnly
                      />
                    </label>
                    <label>
                      Distance:
                      <input
                        type="text"
                        value={selectedDestination.distance || ""}
                        readOnly
                      />
                    </label>
                    <label>
                      Service:
                      <textarea
                        value={selectedDestination.service || ""}
                        readOnly
                        style={{
                          width: "100%",
                          height: "auto",
                          minHeight: "80px",
                          resize: "none",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          padding: "10px",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          overflowY: "auto",
                        }}
                      ></textarea>
                    </label>

                    <label>
                      Type:
                      <input
                        type="text"
                        value={selectedDestination.type || ""}
                        readOnly
                      />
                    </label>
                    <label>
                      Latitude:
                      <input
                        type="text"
                        value={selectedDestination.lat || ""}
                        readOnly
                      />
                    </label>
                    <label>
                      Longitude:
                      <input
                        type="text"
                        value={selectedDestination.lng || ""}
                        readOnly
                      />
                    </label>
                    <label>
                      Images:
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                          marginTop: "10px",
                        }}
                      >
                        {selectedDestination.img_url &&
                        selectedDestination.img_url.length > 0 ? (
                          selectedDestination.img_url.map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              alt={`Destination ${index + 1}`}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                              }}
                            />
                          ))
                        ) : (
                          <p>No images available</p>
                        )}
                      </div>
                    </label>
                  </form>
                </div>
              ) : (
                <form onSubmit={handleUpdate}>
                  <label>
                    Price:{" "}
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Description:{" "}
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Open Hours:{" "}
                    <input
                      type="text"
                      name="open_hours"
                      value={formData.open_hours}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Close Hours:{" "}
                    <input
                      type="text"
                      name="close_hours"
                      value={formData.close_hours}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Place:{" "}
                    <input
                      type="text"
                      name="place"
                      value={formData.place}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Image URL:{" "}
                    <input
                      type="text"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                    />
                  </label>
                  <button type="submit" className="action-btn save">
                    Update
                  </button>
                </form>
              )}
            </div>
          </div>
        </>
      )}

      {showDeleteModal && (
        <div id="confirmation-overlay">
          <div id="confirmation-modal">
            <h3>Bạn có muốn xóa địa điểm này?</h3>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={confirmDelete}>
                Delete
              </button>
              <button className="cancel-btn" onClick={closeDeleteModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="toast">
          <i className="fas fa-check-circle"></i> Xóa địa điểm thành công
        </div>
      )}
    </div>
  );
};

export default DashboardDestination;
