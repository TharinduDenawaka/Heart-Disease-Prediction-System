const express = require('express');
const { check, validationResult } = require('express-validator');
const { signUpUser, authUser, changePassword, forgotPassword } = require('../Controllers/userController');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();

// Validation middleware for signup
const validateSignup = [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password must be at least 3 characters').isLength({ min: 3 })
];

// Validation middleware for login
const validateLogin = [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').exists()
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/signup', validateSignup, handleValidationErrors, signUpUser);
router.post('/login', validateLogin, handleValidationErrors, authUser);
router.put('/change-password', protect, changePassword);
router.post('/forgot-password', forgotPassword);

module.exports = router;

