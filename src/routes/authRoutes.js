const express = require("express");
const router = express.Router();
const { registerUser, logoutUser, loginUser } = require("../controllers/authController");
const { getAllShops } = require("../controllers/shopController");
const authenticate = require("../middlewares/authMiddleware");

// Protected routes that need authentication
router.use(authenticate); // Apply authentication middleware to all routes below

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/laundry-shops", getAllShops);


module.exports = router;
