const express = require("express");
const router = express.Router();
const { registerAdmin } = require("../controllers/adminController");
const { registerLaundryShop, getAllShops } = require("../controllers/shopController");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser)
router.post("/register-admin", registerAdmin);
router.post("/register-laundry-shop", registerLaundryShop);
router.get("/laundry-shops", getAllShops);

module.exports = router;
