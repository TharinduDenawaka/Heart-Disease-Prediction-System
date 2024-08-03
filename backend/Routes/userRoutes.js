const express = require('express');
const { registerUser, authUser, changePassword, forgotPassword } = require('../Controllers/userController');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authUser);
router.put('/change-password', protect, changePassword);
router.post('/forgot-password', forgotPassword);

module.exports = router;
