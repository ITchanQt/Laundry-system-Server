const express = require('express');
const router = express.Router();
const { registerCustomer, getCustomerById, getAllCustomers } = require('../controllers/customerController');
const authenticate = require('../middlewares/authMiddleware');

// Protected routes
// router.use(authenticate);

router.post('/register', registerCustomer);
router.get('/:customerId', getCustomerById);
router.get('/', getAllCustomers);

module.exports = router;