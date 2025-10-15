const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const User = require("../models/User");
const Admin = require("../models/Admin");
require("dotenv").config();
const registerUser = async (req, res) => {
  try {
    const existingUser = await User.findByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await User.create(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        console.log("Login attempt:", { emailOrUsername });

        const result = await User.login(emailOrUsername, password);

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 3600000,
        });

        res.json({
            message: "Login successful",
            user: result.user,
            token: `Bearer ${result.token}`
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: error.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        const apiKey = req.headers['x-api-key'];

        // Validate API key
        if (!apiKey || apiKey !== process.env.API_KEY) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or missing API key'
            });
        }

        const result = await Admin.login(emailOrUsername, password);

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        res.json({
            message: "Admin login successful",
            admin: result.admin,
            token: `Bearer ${result.token}`,
            apiKey: process.env.API_KEY // Include API key in response
        });
    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ error: error.message });
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
