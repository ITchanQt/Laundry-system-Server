const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, registerAdmin } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser)
router.post("/register-admin", registerAdmin);

module.exports = router;
