import React, { useState } from "react";
import axios from "axios";
import "./PatientForm.css";
import { useAuth } from "../../Components/AuthContext/AuthContext";

const PatientForm = () => {
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
  const [showModal, setShowModal] = useState(false);

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
    return value === 0 ? "Low Risk" : "High Risk";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

        const risk = handlePredictionRisk(predictionValue);
        setPredictionRisk(risk);
        setShowModal(true);

        setTimeout(() => {
          console.log({
            ...numericFormData,
            userId: user._id,
            prediction: risk,
          });

          axios
            .post("http://localhost:5000/api/data/sendData", {
              ...numericFormData,
              userId: user._id,
              prediction: risk,
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
        }, 0);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    clearForm();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="patientF">
      <div className="p-container">
        <h2 className="form-title">Is Your Heart Safe Or Not? </h2>
        <h2 className="form-title">Check It From Hear </h2>
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
            <label htmlFor="trestbps">Resting Blood Pressure </label>
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
            <label htmlFor="chol">Serum Cholestoral In mg/dl</label>
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
            <select
              name="fbs"
              id="fbs"
              value={formData.fbs}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
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
              How Is My Heart?
            </button>
          </div>
        </form>

        {showModal && (
          <div
            className={`modal ${
              predictionRisk === "Low Risk" ? "green-theme" : "red-theme"
            }`}
            onClick={closeModal}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Your Heart is: {predictionRisk}</h3>
              <button className="close-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientForm;
