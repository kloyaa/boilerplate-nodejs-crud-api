const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roles = ["user", "admin"];

const UserSchema = new Schema({
  role: {
    type: String,
    default: "user",
    enum: roles,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordHash: {
    type: String,
    required: [true, "passwordHash is required"],
  },
});

module.exports = User = mongoose.model("users", UserSchema);
