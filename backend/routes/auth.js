// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const mysql = require('mysql2/promise'); // Import MySQL library
const config = require('../config');
const jwt = require('jsonwebtoken');

const dbConfig = config.mysql; // Use 'mysql' directly since your configuration is under 'mysql'
// Generate a strong secret key
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
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
      const user = { id: result.insertId, firstName, lastName, username, phone, type };
      res.status(201).json({ user, message: "Registration successful" });

      // Log a console message for successful registration
      console.log(`User registered successfully: ${user.username}, ID: ${user.id}`);
    } finally {
      // Close the connection
      await connection.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate request body
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Query the database to get the user by username
    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
    await connection.end();

    // Check if the username exists
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = rows[0];

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Respond with token and user data
    res.json({ token, user: { id: user.id, username: user.username }, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
