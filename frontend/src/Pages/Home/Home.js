import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const HomePage = () => {

    const navigate = useNavigate();
    
    const btnSubmit = () => {
        navigate('/login')
    }


  return (
    <div className="home-container">
      <video src="/videos/heart_2.mp4" autoPlay loop muted  />

      {/* <div className="overlay"></div> */}

      <div className="content">
         <h1 className="HomeContent">Welcome to Heart Disease Prediction</h1>
         <p className="HomeContent">Your health is important. Use our tool to assess your heart disease risk based on various health metrics.</p>
         <div className="home-btns">
           <button onClick={btnSubmit} className="start-button">Get Started</button>
         </div>
       </div>
    </div>
  );
};

export default HomePage;
