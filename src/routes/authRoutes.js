const express = require("express");
const router = express.Router();
const { logoutUser } = require("../controllers/authController");
const { getAllShops } = require("../controllers/shopController");
const authenticate = require("../middlewares/authMiddleware");

// Protected routes that need authentication
router.use(authenticate); // Apply authentication middleware to all routes below

router.post("/logout", logoutUser);
router.get("/laundry-shops", getAllShops);

module.exports = router;
