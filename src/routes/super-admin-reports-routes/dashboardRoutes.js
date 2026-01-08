const express = require("express");
const router = express.Router();
const DashboardController = require("../../controllers/super-admin-reports-controllers/dashboardController");
const validateApiKey = require("../../middlewares/apiKeyMiddleware");
const authenticate = require("../../middlewares/authMiddleware");

// Apply API key validation to all routes
router.use(validateApiKey);

// Protected routes that need authentication
router.use(authenticate); // Apply authentication middleware to all routes below

// GET /api/dashboard/summary - Get dashboard summary
router.get("/summary", DashboardController.getSummary);

// GET /api/dashboard/shop-performance - Get shop performance
router.get("/shop-performance", DashboardController.getShopPerformance);

// GET /api/dashboard/revenue-by-day - Get revenue by day
router.get("/revenue-by-day", DashboardController.getRevenueByDay);

// GET /api/dashboard/top-customers - Get top customers
router.get("/top-customers", DashboardController.getTopCustomers);

// GET /api/dashboard/service-distribution - Get service distribution
router.get("/service-distribution", DashboardController.getServiceDistribution);

module.exports = router;
