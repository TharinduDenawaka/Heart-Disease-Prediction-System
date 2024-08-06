import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import ToastNotificationContainer from './Components/ToastContainer/ToastContainer';
import NavBar from "./Components/NavBar/NavBar";
import PaitientForm from "./Pages/PatientForm/PatientForm";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import ChangePassword from './Components/ChangePassword/ChangePassword';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import { AuthProvider } from './Components/AuthContext/AuthContext'

const App = () => {
  
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <ToastNotificationContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/patient-form" element={<PaitientForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
