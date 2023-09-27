const express = require("express");
const router = express.Router();

// Import route handlers/controllers
const authRoutes = require("./auth");

// Define your API routes here
router.use("/auth", authRoutes);

// Additional routes can be defined here

module.exports = router;
