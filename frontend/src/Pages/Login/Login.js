import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Request body:", { email, password });
    await login(email, password);
    navigate("/patient-form");
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email address"
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
          <button type="submit">Log in</button>
        </form>
        <Link to="/forgot-password">Forgotten password?</Link>
        <hr/>
        <div className="signupLink">
          <Link to="/signup">Create new account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
