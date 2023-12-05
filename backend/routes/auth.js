// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const mysql = require('mysql2/promise'); // Import MySQL library
const config = require('../config');

const dbConfig = config.mysql; // Use 'mysql' directly since your configuration is under 'mysql'

// User registration validation
const registrationValidation = [
  // Validation rules...
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a MySQL connection
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
    });

    try {
        const [result] = await connection.execute(
            'INSERT INTO users (firstName, lastName, username, phone, password, type) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, lastName, username, phone, hashedPassword.substring(0, 60), type]
          );
      // Respond with the user and a success message
      res.status(201).json({ user: { id: result.insertId, firstName, lastName, username, phone, type }, message: "Registration successful" });
    } finally {
      // Close the connection
      await connection.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
