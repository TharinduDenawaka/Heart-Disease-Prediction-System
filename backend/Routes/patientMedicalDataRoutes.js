const express = require("express");
const {
  sendData,
  showHistory,
} = require("../Controllers/PatientMedicalDataController");
const router = express.Router();

router.post("/sendData", sendData);
router.get("/history/:userId/:username", showHistory);

module.exports = router;
