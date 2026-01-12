const express = require("express");
const router = express.Router();
const FilteredReportsController = require("../../controllers/super-admin-reports-controllers/filteredReportController");
const validateApiKey = require("../../middlewares/apiKeyMiddleware");
const authenticate = require("../../middlewares/authMiddleware");

// Apply API key validation to all routes
router.use(validateApiKey);

// Protected routes that need authentication
router.use(authenticate); // Apply authentication middleware to all routes below

// Sales endpoints
router.get("/sales", FilteredReportsController.getSalesByShop);
router.get("/sales/summary", FilteredReportsController.getSalesSummaryByShop);
router.get(
  "/sales/revenue-by-day",
  FilteredReportsController.getRevenueByDayByShop
);
router.get(
  "/sales/top-customers",
  FilteredReportsController.getTopCustomersByShop
);

// Inventory endpoints
router.get("/inventory", FilteredReportsController.getInventoryByShop);
router.get("/inventory/low-stock", FilteredReportsController.getLowStockByShop);

// Transaction endpoints
router.get("/transactions", FilteredReportsController.getTransactionsByShop);

// Dashboard summary
router.get("/summary", FilteredReportsController.getDashboardSummaryByShop);

module.exports = router;
