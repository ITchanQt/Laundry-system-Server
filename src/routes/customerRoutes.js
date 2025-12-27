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
  getCustomerStats,
  getPendingServiceTrans,
  getWeeklyTransactions,
  getPendingPaymentsTransactions,
  addPaymentProof,
  getReadyForPickTransactions,
} = require("../controllers/customerController");
const authenticate = require("../middlewares/authMiddleware");
const validateApiKey = require("../middlewares/apiKeyMiddleware");
const { upload } = require("../middlewares/upload");

// Apply API key validation to all routes
router.use(validateApiKey);

// Protected routes
router.use(authenticate);

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

/* CUSTOMER MODULE DASHBOARD DETAILS COUNT */
router.get("/get-dashboard-count/:shop_id/:cus_id", getCustomerStats);

/* CUSTOMER MODULE PENDING LAUNDRY TABLE */
router.get(
  "/get-on-service-status-trans/:shop_id/:cus_id",
  getPendingServiceTrans
);

/* CUSTOMER MODULE ON PROCESS LAUNDRY TABLE */
router.get("/get-weekly-trans/:shop_id/:cus_id", getWeeklyTransactions);

/* CUSTOMER MODULE PENDING PAYMENTS LAUNDRY TABLE */
router.get(
  "/get-pending-payments-trans/:shop_id/:cus_id",
  getPendingPaymentsTransactions
);

/* CUSTOMER MODULE PROOF OF PAYMENTS UPLOAD */
router.put(
  "/add-proof-of-payment/:laundryId",
  upload.single("proof"),
  addPaymentProof
);

router.get(
  "/get-ready-to-pick-up-trans/:shop_id/:cus_id",
  getReadyForPickTransactions
);

module.exports = router;
