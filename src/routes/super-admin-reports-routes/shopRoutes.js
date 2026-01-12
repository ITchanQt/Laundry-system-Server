const express = require("express");
const router = express.Router();
const ShopController = require("../../controllers/super-admin-reports-controllers/ShopController");
const validateApiKey = require("../../middlewares/apiKeyMiddleware");
const authenticate = require("../../middlewares/authMiddleware");

// Apply API key validation to all routes
router.use(validateApiKey);

// Protected routes that need authentication
router.use(authenticate); // Apply authentication middleware to all routes below

// GET /api/shops - Get all shops
router.get("/", ShopController.getAllShops);

// GET /api/shops/:id - Get shop by ID
router.get("/:id", ShopController.getShopById);

// GET /api/shops/:id/stats - Get shop statistics
router.get("/:id/stats", ShopController.getShopStats);

module.exports = router;
