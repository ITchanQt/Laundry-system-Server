const express = require("express");
const router = express.Router();
const { registerUser, logoutUser, loginUser } = require("../controllers/authController");
const { registerAdmin, getAllAdmins } = require("../controllers/adminController");
const { getAllShops } = require("../controllers/shopController");
const authenticate = require("../middlewares/authMiddleware");
const { getAllUsers} = require("../controllers/userController")
const { registerLaundryShop, editShop } = require("../controllers/shopController");

// Protected routes that need authentication
// router.use(authenticate); // Apply authentication middleware to all routes below

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/register-admin", registerAdmin);
router.get("/laundry-shops", getAllShops);
router.get("/users", getAllUsers);
router.post("/register-laundry-shop", registerLaundryShop);
router.put("/edit-shop/:owner_id", editShop);
router.get('/admins', getAllAdmins);

// Protected admin routes
// router.get('/admins', authenticate, getAllAdmins);


module.exports = router;
