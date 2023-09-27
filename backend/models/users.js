const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  phone: String,
  password: String,
  type: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
