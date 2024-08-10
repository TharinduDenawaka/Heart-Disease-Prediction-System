import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ResetPassword.css"; // Add a CSS file for styling

const ResetPassword = () => {
  const { userId } = useParams();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/verify-forgot-password-otp",
        {
          userId,
          otp: otpCode,
          newPassword,
        }
      );
      setMessage(res.data.message);
      if (res.data.message === "Password reset successfully.") {
        toast.success("Password reset successfully");
        navigate("/login"); // Navigate to login page after successful password reset
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="resetPassword">
      <div className="reset-password-container">
        <h2>Verification Code</h2>
        <p>We have sent the verification code to your email address</p>
        <form onSubmit={handleSubmit}>
          <div className="otp-container">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-input"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                required
              />
            ))}
          </div>
          <br />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="password-input"
          />
          <button type="submit" className="confirm-button">
            Confirm
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
