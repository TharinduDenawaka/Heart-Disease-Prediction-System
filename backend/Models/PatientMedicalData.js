const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: Number,
    required: true,
  },
  cp: {
    type: Number,
    required: true,
  },
  trestbps: {
    type: Number,
    required: true,
  },
  chol: {
    type: Number,
    required: true,
  },
  fbs: {
    type: Number,
    required: true,
  },
  restecg: {
    type: Number,
    required: true,
  },
  thalach: {
    type: Number,
    required: true,
  },
  exang: {
    type: Number,
    required: true,
  },
  oldpeak: {
    type: Number,
    required: true,
  },
  slope: {
    type: Number,
    required: true,
  },
  ca: {
    type: Number,
    required: true,
  },
  thal: {
    type: Number,
    required: true,
  },
  prediction: {
    type: String,
    required: true,
  },
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
