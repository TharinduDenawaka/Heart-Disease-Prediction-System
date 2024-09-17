


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

  const [prediction, setPrediction] = useState(null);
  const [predictionRisk, setPredictionRisk] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setFormData({
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
  };

  const handlePredictionRisk = (value) => {
    const riskMapping = {
      0: "Low Risk",
      1: "Moderate Risk",
      2: "High Risk",
      3: "Very High Risk",
      4: "Critical Risk",
    };
    return riskMapping[value] || "Unknown Risk";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert all numeric fields to numbers
    const numericFormData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] === "") {
        acc[key] = null;
      } else if (!isNaN(formData[key])) {
        acc[key] = Number(formData[key]);
      } else {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    axios
      .post("http://127.0.0.1:8080/predict", numericFormData)
      .then((response) => {
        const predictionValue = response.data.prediction;
        setPrediction(predictionValue);
        setPredictionRisk(handlePredictionRisk(predictionValue));

       
        clearForm();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="patientF">
      <div className="p-container">
        <h2 className="form-title">Heart Disease Prediction System</h2>
        <form className="patient-form" onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sex">Sex</label>
            <select
              name="sex"
              id="sex"
              value={formData.sex}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cp">Chest Pain Type</label>
            <select
              name="cp"
              id="cp"
              value={formData.cp}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="0">Typical Angina</option>
              <option value="1">Atypical Angina</option>
              <option value="2">Non-Anginal Pain</option>
              <option value="3">Asymptomatic</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="trestbps">Resting Blood Pressure</label>
            <input
              type="number"
              name="trestbps"
              id="trestbps"
              value={formData.trestbps}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="chol">Serum Cholesterol</label>
            <input
              type="number"
              name="chol"
              id="chol"
              value={formData.chol}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fbs">Fasting Blood Sugar</label>
            <input
              type="number"
              name="fbs"
              id="fbs"
              value={formData.fbs}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="restecg">Resting ECG Results</label>
            <select
              name="restecg"
              id="restecg"
              value={formData.restecg}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="0">Normal</option>
              <option value="1">ST-T Wave Abnormality</option>
              <option value="2">Left Ventricular Hypertrophy</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="thalach">Maximum Heart Rate Achieved</label>
            <input
              type="number"
              name="thalach"
              id="thalach"
              value={formData.thalach}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="exang">Exercise Induced Angina</label>
            <select
              name="exang"
              id="exang"
              value={formData.exang}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="oldpeak">ST Depression</label>
            <input
              type="number"
              name="oldpeak"
              id="oldpeak"
              value={formData.oldpeak}
              onChange={handleChange}
              required
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="slope">Slope of Peak Exercise ST Segment</label>
            <select
              name="slope"
              id="slope"
              value={formData.slope}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="0">Upsloping</option>
              <option value="1">Flat</option>
              <option value="2">Downsloping</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ca">Number of Major Vessels</label>
            <input
              type="number"
              name="ca"
              id="ca"
              value={formData.ca}
              onChange={handleChange}
              required
              min="0"
              max="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="thal">Thalassemia</label>
            <select
              name="thal"
              id="thal"
              value={formData.thal}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="0">Normal</option>
              <option value="1">Fixed Defect</option>
              <option value="2">Reversible Defect</option>
            </select>
          </div>

          <div className="form-group submit-group">
            <button type="submit" className="submit-button">
              Predict
            </button>
          </div>
        </form>

        {prediction !== null && (
          <div className="prediction-result">
            <h3>Prediction Result: {predictionRisk}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputForm;
