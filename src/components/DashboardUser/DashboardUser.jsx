import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DashboardUser.css";

const DashboardUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Lấy danh sách người dùng từ API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage hoặc context
        const response = await axios.get("http://localhost:4000/api/v1/admin/all-users", {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);

  

  const toggleModal = (user = null) => {
    setEditingUser(user);
    setShowModal(!showModal);
  };

  const toggleConfirmation = (user = null) => {
    setUserToDelete(user);
    setShowConfirmation(!showConfirmation);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admin/users/${editingUser._id}`, editingUser); // Cập nhật user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUser._id ? editingUser : user
        )
      );
      toggleModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Xử lý khi nhấn nút Delete
  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:4000/api/v1/admin/delete-user/${userToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Cập nhật danh sách người dùng sau khi xóa
      setUsers(users.filter((user) => user._id !== userToDelete._id));
      setShowConfirmation(false); // Đóng bảng thông báo
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="c11">
      <h1>Dashboard: Users</h1>

      <a href="#" className="new-user-btn">
        <i className="fas fa-user-plus"></i> New User
      </a>

      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                <img src={user.avatar || "https://via.placeholder.com/40"} alt="User" />
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.user_type}</td>
              <td>{new Date(user.startDate).toLocaleDateString()}</td>
              <td>
                <button
                  className="action-btn edit"
                  onClick={() => toggleModal(user)}
                >
                  Edit
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => {
                    setUserToDelete(user); // Lưu user cần xóa
                    setShowConfirmation(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-header">
            <h2>Edit User Details</h2>
            <button className="close-btn" onClick={() => toggleModal(null)}>
              ✖
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleUpdateUser}>
              <label>
                Name:
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  value={editingUser.phone}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, phone: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Position:
                <input
                  type="text"
                  value={editingUser.position}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, position: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Start Date:
                <input
                  type="date"
                  value={new Date(editingUser.startDate)
                    .toISOString()
                    .split("T")[0]}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, startDate: e.target.value })
                  }
                  required
                />
              </label>
              <button type="submit" className="action-btn save">
                Update
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <>
        <div id="confirmation-overlay">
          <div id="confirmation-modal">
            <h3>Bạn có muốn xóa người dùng này?</h3>
            <div className="modal-actions">

            <button className="confirm-btn" onClick={handleDeleteUser}>
              Delete
            </button>
            <button
              className="cancel-btn"
              onClick={() => toggleConfirmation(null)}
              >
              Cancel
            </button>
              </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default DashboardUser;
