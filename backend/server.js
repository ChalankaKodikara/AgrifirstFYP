const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/auth");
const config = require("./config");

const app = express();
// Enable CORS with specific options
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


// Parse incoming requests with JSON payloads
app.use(express.json());

// Use the auth route
app.use("/api/auth", apiRoutes);


const PORT = process.env.PORT || config.server.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Connected to the server`);

});