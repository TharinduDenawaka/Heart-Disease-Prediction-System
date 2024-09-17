import React from 'react';
import './About.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About Our Heart Disease Prediction System</h1>
      
      <p>Welcome to the Heart Disease Prediction System, an advanced web application designed to predict the risk of heart disease using cutting-edge machine learning algorithms and medical research.</p>
      
      <h2>Our Mission</h2>
      <p>Our mission is to empower individuals and healthcare professionals with accurate, accessible, and timely information about heart disease risk. By leveraging technology, we aim to contribute to early detection and prevention of heart disease, ultimately improving global cardiovascular health.</p>
      
      <h2>How It Works</h2>
      <p>Heart Disease Prediction System utilizes a sophisticated algorithm that analyzes various factors known to influence heart health. These may include:</p>
      <ul>
        <li>Age and gender</li>
        <li>Blood pressure</li>
        <li>Cholesterol levels</li>
        <li>Diabetes</li>
        <li>Family history of heart disease</li>
        <li>Physical activity levels</li>
        <li>BMI (Body Mass Index)</li>
      </ul>
      
      <h2>The Technology Behind It</h2>
      <p>Our prediction model is built on the Random Forest algorithm. It has been trained on extensive datasets from the Kaggel website and is regularly updated to ensure accuracy and relevance.</p>
      
      <h2>Intended Use</h2>
      <p>This tool is designed for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
      
      <h2>Privacy and Security</h2>
      <p>We understand the sensitive nature of health information. Our system adheres to strict privacy and security protocols, ensuring that your data is protected and used solely for the purpose of generating your heart disease risk prediction.</p>
      
      <h2>Contact Us</h2>
      <p>If you have any questions, suggestions, or concerns about the Heart Disease Prediction System, please don't hesitate to contact us at <a href="mailto:tharindudasun1997@gmail.com">tharindudasun1997@gmail.com</a>.</p>
      
      <p>Thank you for choosing Heart Disease Prediction System as your partner in heart health awareness!</p>
    </div>
  );
};

export default AboutPage;