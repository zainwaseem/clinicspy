const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.controllers");
const protect = require("../middleware/auth");

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get user profile (Protected)
router.get("/profile", protect, getUserProfile);

// Forgot password
router.post("/auth/forgot-password", forgotPassword);

// Reset password
router.put("/auth/reset-password/:resetToken", resetPassword);

module.exports = router;
