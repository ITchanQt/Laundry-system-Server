const express = require('express');
const router = express.Router();
const RatingsController = require('../../controllers/super-admin-reports-controllers/ratingsController');
const validateApiKey = require('../../middlewares/apiKeyMiddleware');
const authenticate = require('../../middlewares/authMiddleware');

// Apply API key validation to all routes
router.use(validateApiKey);

// Protected routes that need authentication
router.use(authenticate); // Apply authentication middleware to all routes below

// Get shop ratings
router.get('/shop', RatingsController.getShopRatings);

// Get personnel/service ratings
router.get('/personnel', RatingsController.getPersonnelRatings);

// Get shop rating statistics
router.get('/shop/stats', RatingsController.getShopRatingStats);

// Get personnel rating statistics
router.get('/personnel/stats', RatingsController.getPersonnelRatingStats);

// Get ratings by personnel
router.get('/personnel/breakdown', RatingsController.getRatingsByPersonnel);

// Get recent ratings (all types)
router.get('/recent', RatingsController.getRecentRatings);

// Get rating trend over time
router.get('/trend', RatingsController.getRatingTrend);

// Get all ratings stats (comprehensive)
router.get('/stats/all', RatingsController.getAllRatingsStats);

module.exports = router;