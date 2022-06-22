const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Making User Schema
var userSchema = new Schema({
  email: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const users = mongoose.model("users", userSchema);

// exporting user schema
module.exports = users;
