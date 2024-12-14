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
  const [toastMessage, setToastMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(7); // Số mục mỗi trang
  const [totalPages, setTotalPages] = useState(0);

  const showSuccessToast = (message) => {
    setShowToast(true);
    setToastMessage(message);
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
      setTotalPages(Math.ceil((response.data || []).length / itemsPerPage));
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };
  
  useEffect(() => {
    fetchDestinations(); // Gọi hàm fetch khi component mount
  }, [itemsPerPage]);
  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentItems = destinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (mode, destination = null) => {
    setModalMode(mode);

    if (mode === "add") {
      // Reset formData khi thêm mới
      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        place: "",
        rating: "",
        location: "",
        open_hours: "",
        close_hours: "",
        distance: "",
        service: "",
        type: "",
        image_url: "", // Nếu có upload hình ảnh, bạn có thể xử lý sau
      });
      setSelectedDestination(null); // Không có destination trong chế độ add
    } else if (mode === "edit" && destination) {
      // Gán dữ liệu destination vào formData khi chỉnh sửa
      setFormData({
        name: destination.name || "",
        category: destination.category || "",
        price: destination.price || "",
        description: destination.description || "",
        place: destination.place || "",
        rating: destination.rating || "",
        location: destination.location || "",
        open_hours: destination.open_hours || "",
        close_hours: destination.close_hours || "",
        distance: destination.distance || "",
        service: destination.service || "",
        type: destination.type || "",
        image_url: destination.image_url || "",
      });
      setSelectedDestination(destination); // Gán destination được chọn
    } else if (mode === "view" && destination) {
      // Gán destination vào selectedDestination để hiển thị
      setSelectedDestination(destination);
    }

    setShowModal(true); // Mở modal
    document.body.classList.add("no-scroll"); // Ngăn cuộn
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
  
      if (!selectedDestination?._id) {
        alert("Destination ID is missing!");
        return;
      }
  
      await axios.put(
        `http://localhost:4000/api/v1/admin/update-destination/${selectedDestination._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      showSuccessToast("Cập nhật địa điểm thành công!");
      fetchDestinations(); // Gọi lại danh sách sau khi cập nhật
      closeModal();
    } catch (err) {
      console.error("Error updating destination:", err.response?.data || err.message);
      alert("Failed to update destination: " + (err.response?.data?.message || "Unknown error"));
    }
  };
  
  

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
  
      if (!deleteId) {
        alert("Delete ID is missing!");
        return;
      }
  
      await axios.delete(
        `http://localhost:4000/api/v1/admin/delete-destination/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      showSuccessToast("Xóa địa điểm thành công!");
      fetchDestinations(); // Gọi lại danh sách sau khi xóa
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting destination:", err.response?.data || err.message);
      alert("Failed to delete destination: " + (err.response?.data?.message || "Unknown error"));
    }
  };
  
  

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const formDataWithFiles = new FormData();

      Object.keys(formData).forEach((key) => {
        formDataWithFiles.append(key, formData[key]);
      });

      await axios.post(
        "http://localhost:4000/api/v1/admin/add-destination",
        formDataWithFiles,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showSuccessToast("Thêm địa điểm thành công!");
      fetchDestinations();
      closeModal();
    } catch (err) {
      console.error("Error adding destination:", err);
      alert("Failed to add destination!");
    }
  };

  return (
    <div className="c11">
      <h1>Dashboard: Destinations</h1>

      <a href="#" className="new-user-btn" onClick={() => openModal("add")}>
        <i className="fas fa-user-plus"></i> New Destination
      </a>

      {/* Bảng danh sách địa điểm */}
      <div className="table-container">
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
              currentItems.map((destination, index) => (
                <tr key={destination._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
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
      </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>

      {/* Modal */}
      {showModal && (
        <>
          <div id="overlay3"></div>
          <div id="modal">
            <div className="modal-header">
              <h2 className="modal-header-h2">
                {modalMode === "view"
                  ? "View Destination Details"
                  : modalMode === "edit"
                  ? "Edit Destination Details"
                  : "Add New Destination"}
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
              ) : modalMode === "add" ? (
                <form onSubmit={handleAdd}>
                  <label>
                    Name:{" "}
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Category:{" "}
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    />
                  </label>
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
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
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
                    Service:{" "}
                    <input
                      type="text"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Distance:{" "}
                    <input
                      type="text"
                      name="distance"
                      value={formData.distance}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Location:{" "}
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Type:{" "}
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        padding: "10px",
                        fontSize: "14px",
                      }}
                    >
                      <option value="">Select Type</option>
                      <option value="Activity">Hotel</option>
                      <option value="Food">Food</option>
                      <option value="Activity">Activity</option>
                      <option value="Sightseeing">Sightseeing</option>
                    </select>
                  </label>
                  <label>
                    Images:{" "}
                    <input
                      type="file"
                      name="image_url"
                      multiple
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          image_url: e.target.files,
                        }))
                      }
                    />
                  </label>
                  <button type="submit" className="action-btn save">
                    Add
                  </button>
                </form>
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
          <i className="fas fa-check-circle"></i> {toastMessage}
        </div>
      )}
    </div>
  );
};

export default DashboardDestination;
