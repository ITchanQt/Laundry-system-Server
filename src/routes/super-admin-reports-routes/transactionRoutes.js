const express = require("express");
const router = express.Router();
const TransactionController = require("../../controllers/super-admin-reports-controllers/transactionController");
const validateApiKey = require("../../middlewares/apiKeyMiddleware");
const authenticate = require("../../middlewares/authMiddleware");

// Apply API key validation to all routes
router.use(validateApiKey);

// Protected routes that need authentication
router.use(authenticate); // Apply authentication middleware to all routes below

// GET /api/transactions - Get all transactions
router.get("/", TransactionController.getAllTransactions);

// GET /api/transactions/stats - Get transaction statistics
router.get("/stats", TransactionController.getTransactionStats);

// GET /api/transactions/pending-payments - Get pending payments
router.get("/pending-payments", TransactionController.getPendingPayments);

// GET /api/transactions/pending-payments-count - Get pending payments count
router.get(
  "/pending-payments-count",
  TransactionController.getPendingPaymentsCount
);

// GET /api/transactions/status/:status - Get transactions by status
router.get("/status/:status", TransactionController.getTransactionsByStatus);

// GET /api/transactions/:id - Get single transaction by ID
router.get("/:id", TransactionController.getTransactionById);

module.exports = router;
