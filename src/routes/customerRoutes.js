const express = require("express");
const router = express.Router();
const {
  registerCustomer,
  getCustomerById,
  getAllCustomers,
  createLaundryRecord,
  editCustomer,
  getUserByUserIdShopIdRole,
} = require("../controllers/customerController");
const authenticate = require("../middlewares/authMiddleware");
const validateApiKey = require("../middlewares/apiKeyMiddleware");

// Apply API key validation to all routes
// router.use(validateApiKey);

// Protected routes
// router.use(authenticate);

// Customer management routes
router.post("/register", registerCustomer);
router.get("/:customerId", getCustomerById);
router.get("/", getAllCustomers);
router.put("/:customerId", editCustomer);

// Laundry record routes
router.post("/laundry-record", createLaundryRecord);

// Customer fetching on customer module
router.get("/get-customer/:user_id/:shop_id/:role", getUserByUserIdShopIdRole);

module.exports = router;
