import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import "./PatientForm.css";

const InputForm = () => {

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/predict", formData)
      .then((response) => {
        alert(`Prediction: ${response.data.prediction}`);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="p_container">
      <video src="/videos/heart_loading.mp4" autoPlay loop muted />
      <div className="container">
        <h2 className="username">Hello { user.username }</h2>
        <h4>Heart Disease Prediction</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Age</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Sex</label>
            <input
              type="text"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Chest Pain Type</label>
            <input
              type="text"
              name="cp"
              value={formData.cp}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Resting Blood Pressure</label>
            <input
              type="text"
              name="trestbps"
              value={formData.trestbps}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Serum Cholesterol</label>
            <input
              type="text"
              name="chol"
              value={formData.chol}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Fasting Blood Sugar</label>
            <input
              type="text"
              name="fbs"
              value={formData.fbs}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Resting ECG Results</label>
            <input
              type="text"
              name="restecg"
              value={formData.restecg}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Maximum Heart Rate Achieved</label>
            <input
              type="text"
              name="thalach"
              value={formData.thalach}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Exercise Induced Angina</label>
            <input
              type="text"
              name="exang"
              value={formData.exang}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>ST Depression</label>
            <input
              type="text"
              name="oldpeak"
              value={formData.oldpeak}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Slope of Peak Exercise ST Segment</label>
            <input
              type="text"
              name="slope"
              value={formData.slope}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Number of Major Vessels</label>
            <input
              type="text"
              name="ca"
              value={formData.ca}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Thalassemia</label>
            <input
              type="text"
              name="thal"
              value={formData.thal}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Predict</button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
