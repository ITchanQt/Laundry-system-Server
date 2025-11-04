const express = require("express");
const router = express.Router();
const { registerUser, logoutUser, loginUser, } = require("../controllers/authController");
const { registerAdmin, getAllAdmins, findAdminByEmail, searchAdminsByEmail } = require("../controllers/adminController");
const authenticate = require("../middlewares/authMiddleware");
const { getAllUsers, editUser, getUsersByIdOrNameWithCustomerRole, getUserByIdAndShopId } = require("../controllers/userController")
const { getAllShops, registerLaundryShop, editShop, addShopInventory, getAllShopInventoryItems, editItemById } = require("../controllers/shopController");
const validateApiKey = require('../middlewares/apiKeyMiddleware');

// Apply API key validation to all routes
// router.use(validateApiKey);

// Protected routes that need authentication
// router.use(authenticate); // Apply authentication middleware to all routes below

router.post("/register-user", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/register-admin", registerAdmin);
router.get("/laundry-shops", getAllShops);
router.get("/users", getAllUsers);
router.post("/register-laundry-shop", registerLaundryShop);
router.put("/edit-shop/:shop_id", editShop);
router.get('/admins', getAllAdmins);
router.put("/edit-user/:userId", editUser);
// router.get('/admin/:email', findAdminByEmail);
router.get('/admin/search', searchAdminsByEmail);
router.get('/users/search/:shop_id', getUsersByIdOrNameWithCustomerRole);
router.get('/users/search/:shop_id/:user_id', getUserByIdAndShopId);

//-----SHOP INVENTORY API's-------//
router.post('/add-shop-inventory', addShopInventory);
router.get('/shop-inventory-items', getAllShopInventoryItems);
router.put('/edit-inventory-item/:item_id', editItemById);

// Protected admin routes
// router.get('/admins', authenticate, getAllAdmins);


module.exports = router;
