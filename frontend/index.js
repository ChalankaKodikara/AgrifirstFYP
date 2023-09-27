const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.use(express.static(path.join(__dirname, "/build")));

app.listen(port, () => {
  console.log(`frontend server started on port ${port}`);
});
