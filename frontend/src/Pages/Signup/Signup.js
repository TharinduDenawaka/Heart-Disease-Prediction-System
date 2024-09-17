import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { toast } from "react-toastify";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateInput = () => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!username) {
      toast.error("User name is required");
      return false;
    }
    if (!password || password.length < 5) {
      toast.error("Password must be at least 5 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateInput()) return;
      const result = await signup(email, password, username);
      console.log(result._id);

      const userId = result._id;
      if (result) {
        navigate(`/verify-password/${userId}`);
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h2>Sign up</h2>
        <form className="signup_form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="User name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <hr/>
        <Link to="/login">Already have an account? Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
