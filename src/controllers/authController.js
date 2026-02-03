const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const User = require("../models/User");
const Admin = require("../models/Admin");
require("dotenv").config();
const registerUser = async (req, res) => {
  try {
    const { shop_id, email, username, contactNum } = req.body;

    const existingUserEmail = await User.findByEmail(shop_id, email);
    const existingUserUsername = await User.findByUsername(shop_id, username);
    const existingContact = await User.findByContactNum(shop_id, contactNum);
    if (existingUserEmail || existingUserUsername || existingContact) {
      return res
        .status(400)
        .json({ success: false, message: "Email, username or phone number already exists on this shop" });
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
    const { emailOrUsername, password } = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({ message: "Invalid or missing API key" });
    }

    const result = await User.loginCustomer(emailOrUsername, password);

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
    res.status(500).json({ error: "Server error during login." });
  }
};

const loginStaff = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({ message: "Invalid or missing API key" });
    }

    const result = await User.loginStaff(emailOrUsername, password);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    return res.json({
      message: "Staff login successful",
      staff: result.staff,
      token: `Bearer ${result.token}`,
      apiKey: process.env.API_KEY,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { emailOrUsername, password, selectedShopId } = req.body;

    const result = await Admin.login(emailOrUsername, password);
    if (result.error) return res.status(400).json({ message: result.error });

    if (selectedShopId) {
      const token = jwt.sign(
        { id: result.admin.id, shop_id: selectedShopId, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "12h" },
      );

      return res.json({
        message: "Login successful",
        admin: { ...result.admin, shop_id: selectedShopId },
        token: `Bearer ${token}`,
        apiKey: process.env.API_KEY,
      });
    }

    if (result.shops.length > 1) {
      return res.json({
        requiresSelection: true,
        shops: result.shops,
        admin: result.admin,
      });
    }

    const autoShopId = result.shops[0].shop_id;
    const token = jwt.sign(
      { id: result.admin.id, shop_id: autoShopId, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
    );

    return res.json({
      admin: { ...result.admin, shop_id: autoShopId },
      token: `Bearer ${token}`,
      apiKey: process.env.API_KEY,
    });
  } catch (error) {
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

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  loginAdmin,
  loginStaff,
};
