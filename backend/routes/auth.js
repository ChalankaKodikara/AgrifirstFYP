const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const mysql = require("mysql2/promise");
const config = require("../config");
const jwt = require("jsonwebtoken");

const dbConfig = config.mysql;
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Registration validation
const registrationValidation = [
  // Validation rules...
];

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decodedToken.userId;
    next();
  });
};

// Registration route
router.post("/register", registrationValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, username, phone, password, type } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await mysql.createConnection(dbConfig);

    try {
      const [result] = await connection.execute(
        "INSERT INTO users (firstName, lastName, username, phone, password, type) VALUES (?, ?, ?, ?, ?, ?)",
        [
          firstName,
          lastName,
          username,
          phone,
          hashedPassword.substring(0, 60),
          type,
        ]
      );

      const user = {
        id: result.insertId,
        firstName,
        lastName,
        username,
        phone,
        type,
      };

      // Set the cookie with user ID and username upon registration
      res.cookie('user', JSON.stringify({ id: user.id, username: user.username }), { httpOnly: true });

      res.status(201).json({ user, message: "Registration successful" });

      console.log(
        `User registered successfully: ${user.username}, ID: ${user.id}`
      );
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);
    await connection.end();

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Set the cookie with user ID and username upon login
    res.cookie('user', JSON.stringify({ id: user.id, username: user.username }), { httpOnly: true });

    res.json({
      token,
      user: { id: user.id, username: user.username },
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
