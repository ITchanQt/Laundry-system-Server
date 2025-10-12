const express = require('express');
const router = express.Router();
const { registerCustomer, getCustomerById, getAllCustomers, createLaundryRecord, editCustomer } = require('../controllers/customerController');
const authenticate = require('../middlewares/authMiddleware');

// Protected routes
// router.use(authenticate);

// Customer management routes
router.post('/register', registerCustomer);
router.get('/:customerId', getCustomerById);
router.get('/', getAllCustomers);
router.put('/:customerId', editCustomer);

// Laundry record routes
router.post('/laundry-record', createLaundryRecord);

module.exports = router;