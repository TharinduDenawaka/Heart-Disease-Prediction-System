import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { Logout } from "../../Pages/Logout/Logout";
import { HomeTwoTone } from "@ant-design/icons";
import "./NavBar.css";

const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = Logout();
  const location = useLocation();

  

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          {/* Heart  */}
          <HomeTwoTone className="heart_icon" twoToneColor="#000000" />{" "}
        </Link>
        
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {!user ? (
            <>
              <li>
                <Link to="/about" className={getNavLinkClass("/about")}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/signup" className={getNavLinkClass("/signup")}>
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <>

              <li>
                <Link
                  to="/patient-form"
                  className={getNavLinkClass("/patient-form")}
                >
                  Patient Form
                </Link>
              </li>
              <li>
                <Link
                  to="/change-password"
                  className={getNavLinkClass("/change-password")}
                >
                  Change Password
                </Link>
              </li>
              <li>
                <Link to="/about" className={getNavLinkClass("/about")}>
                  About
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-link">
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
