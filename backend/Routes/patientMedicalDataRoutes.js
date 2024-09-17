const express = require('express');
const { sendData } = require('../Controllers/PatientMedicalDataController');
const router = express.Router();

router.post('/sendData',sendData);

module.exports = router;