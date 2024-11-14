const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/emailService");
const { welcomeEmailTemplate } = require("../utils/emailTemplates");
const CryptoJS = require("crypto-js");
require("dotenv").config();
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json({ message: "Name is required and should be a valid string." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Please enter a valid email address." });
  }

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long." });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      const emailContent = welcomeEmailTemplate(user);

      await sendEmail(user.email, "Welcome to ClinicSpy", emailContent);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isSubscribed: user.isSubscribed,
        subscriptionId: user.subscriptionId,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionEndDate: user.subscriptionEndDate,
        subscriptionStartDate: user.subscriptionStartDate,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Please enter a valid email address." });
  }

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long." });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isSubscribed: user.isSubscribed,
        subscriptionId: user.subscriptionId,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionEndDate: user.subscriptionEndDate,
        subscriptionStartDate: user.subscriptionStartDate,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  res.json(req.user);
};

// @desc    Send password reset email
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const resetToken = CryptoJS.lib.WordArray.random(16).toString(); // Generates a random 16-byte string
    user.resetPasswordToken = CryptoJS.SHA256(resetToken).toString();
    user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour

    await user.save();

    // Send email with the reset URL
    const resetUrl = `https://clinicspy.com/reset-password/${resetToken}`;
    const message = `Reset your password here: ${resetUrl}`;

    await sendEmail(user.email, "Password Reset Request", message);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
exports.resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  // Hash the token to match it with saved token
  const hashedToken = CryptoJS.SHA256(resetToken).toString();

  try {
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
