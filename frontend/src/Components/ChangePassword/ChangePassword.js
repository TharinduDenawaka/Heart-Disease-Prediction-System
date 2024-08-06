import React, { useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { changePassword, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await changePassword(currentPassword, newPassword);
      if (result) {
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="changepassword">
      <div className="change-password-container">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
