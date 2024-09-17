const express = require('express');
const { sendData } = require('../Controllers/dataController');
const router = express.Router();

router.post('/sendData',sendData);

module.exports = router;