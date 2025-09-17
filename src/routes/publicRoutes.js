const express = require("express");
const router = express.Router();
const { registerUser, loginUser, loginAdmin } = require("../controllers/authController");
    const { registerAdmin } = require("../controllers/adminController");
const { registerLaundryShop, editShop } = require("../controllers/shopController");

// Public routes that don't need authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/login", loginAdmin);
router.post("/register-admin", registerAdmin);
router.post("/register-laundry-shop", registerLaundryShop);
router.put("/edit-shop/:owner_id", editShop);

module.exports = router;