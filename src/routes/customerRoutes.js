const express = require("express");
const router = express.Router();
const {
  registerCustomer,
  getCustomerById,
  getAllCustomers,
  createLaundryRecord,
  editCustomer,
  getUserByUserIdShopIdRole,
  updateCustomerByUserIdShopIdRole,
  getCompletedOrdersOfTheMonthByShopId,
  getMonthTotal,
  getTotalCountReadyToPickUpOrders,
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
router.put(
  "/update-customer/:user_id/:shop_id/:role",
  updateCustomerByUserIdShopIdRole
);
router.get(
  "/get-customer-record/:shop_id/:cus_id",
  getCompletedOrdersOfTheMonthByShopId
);
router.get("/total-amount/:cus_id/:shop_id", getMonthTotal);
router.get('/total-RTPU-count/:cus_id/:shop_id', getTotalCountReadyToPickUpOrders);

module.exports = router;
