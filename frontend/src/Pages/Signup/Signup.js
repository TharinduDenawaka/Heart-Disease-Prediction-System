import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Request body:', { email, password });
    await signup(email, password);
    navigate("/patient-form");
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
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
        <Link to="/login">Already have an account? Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
