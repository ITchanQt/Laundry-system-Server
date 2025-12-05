const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const User = require("../models/User");
const Admin = require("../models/Admin");
require("dotenv").config();
const registerUser = async (req, res) => {
  try {
    const { shop_id, email } = req.body;

    const existingUser = await User.findByEmail(shop_id, email);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists on this shop" });
    }

    await User.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { shop_id, emailOrUsername, password } = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({
        success: false,
        message: "Invalid or missing API key",
      });
    }

    const result = await User.login(shop_id, emailOrUsername, password);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    return res.json({
      message: "User login successful",
      user: result.user,
      token: `Bearer ${result.token}`,
      apiKey: process.env.API_KEY,
    });
  } catch (error) {
    console.error("User Login error:", error);
    res.status(500).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { shop_id, emailOrUsername, password } = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({
        success: false,
        message: "Invalid or missing API key",
      });
    }

    const result = await Admin.login(shop_id, emailOrUsername, password);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    return res.json({
      message: "Admin login successful",
      admin: result.admin,
      token: `Bearer ${result.token}`,
      apiKey: process.env.API_KEY,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token"); // Fixed typo from clearCookies to clearCookie
  res.json({
    // Fixed typo from jsom to json
    message: "Logged out successfully",
  });
};

module.exports = { registerUser, loginUser, logoutUser, loginAdmin };
