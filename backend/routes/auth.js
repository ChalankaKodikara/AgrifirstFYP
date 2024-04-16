const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const mysql = require("mysql2/promise");
const config = require("../config");
const jwt = require("jsonwebtoken");

const dbConfig = config.mysql;
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Registration validation rules
const registrationValidation = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("username").notEmpty().withMessage("Username is required"),
  check("phone").notEmpty().withMessage("Phone number is required"),
  check("password").notEmpty().withMessage("Password is required"),
  check("type").notEmpty().withMessage("User type is required"),
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
    // Validate registration inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, username, phone, password, type } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);

    try {
      // Insert user data into the database
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

      // Create a user object
      const user = {
        id: result.insertId,
        firstName,
        lastName,
        username,
        phone,
        type,
      };

      // Set the cookie with user ID and username upon registration
      res.cookie(
        "user",
        JSON.stringify({ id: user.id, username: user.username }),
        { httpOnly: true }
      );

      // Send registration success response
      res.status(201).json({ user, message: "Registration successful" });

      console.log(
        `User registered successfully: ${user.username}, ID: ${user.id}`
      );
    } finally {
      // Close database connection
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
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);

    // Query user data from the database
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    await connection.end();

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = rows[0];

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Set the cookie with user ID and username upon login
    res.cookie(
      "user",
      JSON.stringify({ id: user.id, username: user.username }),
      { httpOnly: true }
    );

    // Send login success response
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

// Route to fetch user_predictions (protected route, requires authentication)
router.get("/user_predictions", authenticateToken, async (req, res) => {
  try {
    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);

    // Query user predictions based on user ID
    const [rows] = await connection.execute(
      "SELECT * FROM user_predictions WHERE user_id = ?",
      [req.userId]
    );
    await connection.end();

    // Send user predictions as JSON response
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch user IDs and first names
router.get("/users", async (req, res) => {
  try {
    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);

    // Query user IDs and first names from the users table
    const [rows] = await connection.execute("SELECT id, firstname FROM users");
    await connection.end();

    // Construct the JSON response array
    const usersArray = rows.map(({ id, firstname }) => ({
      _id: id,
      firstname:firstname,
    }));
    // Send the JSON response
    res.status(200).json(usersArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user_predictions", authenticateToken, async (req, res) => {
  try {
    // Get user ID from query parameters
    const userId = req.query.user_Id; // Use user_Id instead of userId

    // Check if user ID is provided
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);

    // Query user predictions based on user ID
    const [rows] = await connection.execute(
      "SELECT * FROM user_predictions WHERE user_id = ?",
      [userId]
    );
    await connection.end();

    // Create an array to store prediction data
    const predictionsArray = [];

    // Iterate through the rows and extract relevant data
    rows.forEach(row => {
      const predictionData = {
        id: row.id,
        prediction: row.prediction,
        treatment: row.treatment,
        file_path: row.file_path,
        created_at: row.created_at,
        location: row.location
      };
      predictionsArray.push(predictionData);
    });

    // Send prediction data as JSON response
    res.status(200).json(predictionsArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
