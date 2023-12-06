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

// Login endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate request body
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Create a MySQL connection
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  });

  try {
    // Query the database to get the user by username
    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

    // Check if the username exists
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = rows[0];

    // Check if the password is correct (replace this with bcrypt comparison)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // If username and password are valid, create a token or session (not shown here)

    // Respond with user data or token
    res.json({ user: { id: user.id, username: user.username }, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the connection
    await connection.end();
  }
});

module.exports = router;
