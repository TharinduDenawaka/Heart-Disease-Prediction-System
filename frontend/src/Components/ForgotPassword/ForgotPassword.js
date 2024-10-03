import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/forgot-password",
        { email }
      );
      setMessage(res.data.message);
      // Assuming the response contains userId
      const { userId } = res.data;
      navigate(`/reset-password/${userId}`);
      toast.success("OTP is sent to your Email");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="emai_verification-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <button type="submit">Send OTP</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
