const express = require('express');
const router = express.Router();
const SuperAdminController = require('../../controllers/super-admin-reports-controllers/superAdminController');
const validateApiKey = require("../../middlewares/apiKeyMiddleware");
const authenticate = require("../../middlewares/authMiddleware");

// Apply API key validation to all routes
router.use(validateApiKey);

// Protected routes that need authentication
router.use(authenticate); // Apply authentication middleware to all routes below

// GET /api/super-admin/dashboard/summary - Get dashboard summary (cards)
router.get('/dashboard/summary', SuperAdminController.getDashboardSummary);

// GET /api/super-admin/owners - Get all owners with their shops (table)
router.get('/owners', SuperAdminController.getOwnersWithShops);

// GET /api/super-admin/shops - Get all shops with owner info
router.get('/shops', SuperAdminController.getAllShopsWithOwners);

// GET /api/super-admin/owners/:id - Get owner details by admin_id
router.get('/owners/:id', SuperAdminController.getOwnerById);

module.exports = router;