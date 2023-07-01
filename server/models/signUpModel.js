const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your name"],
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide your password"],
  },
});

module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);
