const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { registerAdmin } = require("../controllers/adminController");
const { registerLaundryShop, editShop } = require("../controllers/shopController");
const { getAllUsers} = require("../controllers/userController")

// Public routes that don't need authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/register-admin", registerAdmin);
router.post("/register-laundry-shop", registerLaundryShop);
router.get("/users", getAllUsers);
router.put("/edit-shop/:owner_id", editShop);

module.exports = router;