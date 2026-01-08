const express = require("express");
const router = express.Router();
const InventoryController = require("../../controllers/super-admin-reports-controllers/inventoryController");
const validateApiKey = require("../../middlewares/apiKeyMiddleware");
const authenticate = require("../../middlewares/authMiddleware");

// Apply API key validation to all routes
router.use(validateApiKey);

// Protected routes that need authentication
router.use(authenticate); // Apply authentication middleware to all routes below

// GET /api/inventory - Get all inventory items
router.get("/", InventoryController.getAllInventory);

// GET /api/inventory/low-stock - Get low stock items
router.get("/low-stock", InventoryController.getLowStockItems);

// GET /api/inventory/low-stock-count - Get count of low stock items
router.get("/low-stock-count", InventoryController.getLowStockCount);

// GET /api/inventory/by-shop - Get inventory grouped by shop
router.get("/by-shop", InventoryController.getInventoryByShop);

// GET /api/inventory/by-category - Get inventory grouped by category
router.get("/by-category", InventoryController.getInventoryByCategory);

module.exports = router;
