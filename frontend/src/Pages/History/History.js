import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./History.css";

const History = () => {
  const { userId, username } = useParams();
  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/data/history/${userId}/${username}`);
        const { patientHistory } = response.data; 
        setPatientData(patientHistory);
        console.log(patientHistory);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch patient history");
      } finally {
        setLoading(false);
      }
    };
  
    fetchPatientData();
  }, [userId, username]);
  


  if (loading) return <p>Loading patient data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="history">
      <h1 className="history-title">Patient Medical History</h1>
      {patientData.length > 0 ? (
        <div className="table-container">
          <table className="patient-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Chest Pain Type</th>
                <th>Resting Blood Pressure</th>
                <th>Serum Cholestoral In mg/dl</th>
                <th>Fasting Blood Sugar</th>
                <th>Resting ECG Results</th>
                <th>Maximum Heart Rate Achieved</th>
                <th>Exercise Induced Angina</th>
                <th>ST Depression</th>
                <th>Slope of Peak Exercise ST Segment</th>
                <th>Number of Major Vessels</th>
                <th>Thalassemia</th>
                <th>Prediction(Heart helth)</th>
              </tr>
            </thead>
            <tbody>
              {patientData.map((patient, index) => (
                <tr key={index}>
                  <td>{username}</td>
                  <td>{patient.age}</td>
                  <td>{patient.sex}</td>
                  <td>{patient.cp}</td>
                  <td>{patient.trestbps}</td>
                  <td>{patient.chol}</td>
                  <td>{patient.fbs}</td>
                  <td>{patient.restecg}</td>
                  <td>{patient.thalach}</td>
                  <td>{patient.exang}</td>
                  <td>{patient.oldpeak}</td>
                  <td>{patient.slope}</td>
                  <td>{patient.ca}</td>
                  <td>{patient.thal}</td>
                  <td>{patient.prediction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No patient data found</p>
      )}
    </div>
  );
};

export default History;
