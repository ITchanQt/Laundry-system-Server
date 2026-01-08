const express = require("express");
const router = express.Router();
const SalesController = require("../../controllers/super-admin-reports-controllers/salesController");
const validateApiKey = require("../../middlewares/apiKeyMiddleware");
const authenticate = require("../../middlewares/authMiddleware");

// Apply API key validation to all routes
router.use(validateApiKey);

// Protected routes that need authentication
router.use(authenticate); // Apply authentication middleware to all routes below

// GET /api/sales - Get all sales data
router.get("/", SalesController.getSalesData);

// GET /api/sales/summary - Get sales summary
router.get("/summary", SalesController.getSalesSummary);

// GET /api/sales/by-shop - Get sales grouped by shop
router.get("/by-shop", SalesController.getSalesByShop);

// GET /api/sales/by-service - Get sales grouped by service
router.get("/by-service", SalesController.getSalesByService);

module.exports = router;
