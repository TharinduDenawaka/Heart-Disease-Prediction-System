import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./VerifySignUp.css";

const VerifySignUp = () => {
  const { userId } = useParams();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("OTP", otpCode);
    console.log("ID", userId);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/verifyOTP",
        {
          userId,
          otp: otpCode,
        }
      );
      setMessage(res.data.message);
      if (res.data.message === "User email verified successfully.") {
        toast.success("User email verified successfully");
        navigate("/patient-form");
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="verifySigup">
      <div className="verify-signup-container">
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
          <button type="submit" className="confirm-button">
            Confirm
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default VerifySignUp;
