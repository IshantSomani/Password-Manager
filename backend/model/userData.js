const mongoose = require("mongoose");

// Schema for user login details
const userLoginSchema = mongoose.Schema({
  name: { type: String, required: true },
  loginEmail: { type: String, required: true, unique: true },
  loginPassword: { type: String, required: true },
});

// Schema for user data
const userDataSchema = mongoose.Schema({
  appName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  // Reference to user login schema
  userLogin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserLogin",
    required: true,
  },
});

// Model for user login
const UserLogin = mongoose.model("UserLogin", userLoginSchema);
// Model for user data
const UserData = mongoose.model("UserData", userDataSchema);

module.exports = {
  UserLogin: UserLogin,
  UserData: UserData,
};