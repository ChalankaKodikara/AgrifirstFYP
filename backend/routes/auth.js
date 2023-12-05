// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const config = require('../config');

// User registration validation
const registrationValidation = [
  check('firstName').notEmpty().withMessage('First Name is required'),
  check('lastName').notEmpty().withMessage('Last Name is required'),
  check('username').notEmpty().withMessage('Username is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('phone').matches(/^\d{10}$/).withMessage('Invalid phone number'),
  check('type').notEmpty().withMessage('User type is required'),
];

// User registration route
router.post("/register", registrationValidation, async (req, res) => {
  try {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, username, phone, password, type } = req.body;

    // For simplicity, let's assume there's a users array to store registered users
    // In a real application, you'd use a database for this

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the users array (this is a simplistic example)
    const newUser = {
      firstName,
      lastName,
      username,
      phone,
      password: hashedPassword,
      type,
    };

    // Respond with the user (this is a simplistic example)
    res.status(201).json({ user: newUser, message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
