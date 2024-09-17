const Patient  = require("../Models/PatientMedicalData");

const sendData = async (req, res) => {
    try {
        // Extracting data from the request body
        const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = req.body;

        // Creating a new Patient record
        const newPatient = new Patient({
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
            thal
        });

        // Saving the new patient data to the database
        const savedPatient = await newPatient.save();

        // Responding with the saved patient data
        res.status(201).json({
            message: "Patient data saved successfully",
            data: savedPatient
        });

    } catch (error) {
        // Handling errors
        res.status(500).json({
            message: "Error saving patient data",
            error: error.message
        });
    }
};

module.exports = {
    sendData
};