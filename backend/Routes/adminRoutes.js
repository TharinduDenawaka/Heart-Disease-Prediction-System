const express = require('express');
const { registerAdmin, authAdmin } = require('../Controllers/adminController');

const router = express.Router();

router.post('/signupAdmin', registerAdmin);
router.post('/loginAdmin', authAdmin);

module.exports = router;
