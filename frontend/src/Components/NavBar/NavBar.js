// // src/components/NavBar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../Pages/AuthContext/AuthContext';
// import './NavBar.css';

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Heart Disease Prediction System</Link>
          
//         </li>
//         {!user && (
//           <>
//             {/* <li>
//               <Link to="/signup">Sign Up</Link>
//             </li> */}
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             {/* <li>
//               <Link to="/login">Log In</Link>
//             </li> */}
//           </>
//         )}
//         {user && (
//           <>
//             <li>
//               <Link to="/patientForm">Patient Form</Link>
//             </li>
//             {/* <li>
//               <Link to="/about">About</Link>
//             </li> */}
//             <li>
//               <button onClick={logout}>Log Out</button>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

// src/components/NavBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Pages/AuthContext/AuthContext';
import './NavBar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="nav-brand">Heart Disease Prediction System</Link>
        <button className="nav-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {/* <li>
            <Link to="/">Home</Link>
          </li> */}
          {!user && (
            <>
              <li>
                <Link to="/about">About</Link>
              </li>
            </>
          )}
          {user && (
            <>
              {/* <li>
                <Link to="/patientForm">Patient Form</Link>
              </li> */}
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
