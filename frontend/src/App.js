import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import PaitientForm from "./Pages/PatientForm/PatientForm";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import { AuthProvider } from './Pages/AuthContext/AuthContext'

const App = () => {
  
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/patientForm" element={<PaitientForm />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
