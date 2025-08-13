const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { registerAdmin } = require("../controllers/adminController");
const { registerLaundryShop } = require("../controllers/shopController");

// Public routes that don't need authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/register-admin", registerAdmin);
router.post("/register-laundry-shop", registerLaundryShop);

module.exports = router;