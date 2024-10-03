const Patient = require("../Models/PatientMedicalData");

const sendData = async (req, res) => {
  try {
    const {
      userId,
      age,
      sex,
      cp,
      trestbps,
      chol,
      fbs,
      restecg,
      thalach,
      exang,
      oldpeak,
      slope,
      ca,
      thal,
      prediction,
    } = req.body;

    const newPatient = new Patient({
      userId,
      age,
      sex,
      cp,
      trestbps,
      chol,
      fbs,
      restecg,
      thalach,
      exang,
      oldpeak,
      slope,
      ca,
      thal,
      prediction,
    });

    const savedPatient = await newPatient.save();

    res.status(201).json({
      message: "Patient data saved successfully",
      data: savedPatient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving patient data",
      error: error.message,
    });
  }
};

const showHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const username = req.params.username;
    console.log(username);
    const patientHistory = await Patient.find({ userId });
    if (!patientHistory) {
      return res.status(404).json({ message: "Patient History not found" });
    }
    res.json({ patientHistory, username });
    console.log(patientHistory);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch patient history" });
  }
};

module.exports = {
  sendData,
  showHistory,
};
