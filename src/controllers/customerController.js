const Customer = require('../models/Customer');

const registerCustomer = async (req, res) => {
    try {
        // Generate customer ID
        const customerId = await Customer.generateCustomerId();
        console.log('Generated Customer ID:', customerId);

        // Combine the generated ID with the request body
        const customerData = {
            ...req.body,
            cus_id: customerId
        };

        // Register the customer
        await Customer.registerCustomer(customerData);

        res.status(201).json({
            success: true,
            message: 'Customer registered successfully',
            customer_id: customerId
        });
    } catch (error) {
        console.error('Customer registration error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const { customerId } = req.params;
        const customer = await Customer.findByCustomerId(customerId);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        res.json({
            success: true,
            data: customer
        });
    } catch (error) {
        console.error('Get customer error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json({
            success: true,
            data: customers
        });
    } catch (error) {
        console.error('Get all customers error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const createLaundryRecord = async (req, res) => {
    try {
        const result = await Customer.insertCustomerReceipt(req.body);
        
        res.status(201).json({
            success: true,
            message: "Laundry record created successfully",
            laundryId: result.newLaundryId  // This will be the generated ID
        });
    } catch (error) {
        console.error('Create laundry record error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

const editCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;
        if (!customerId) {
            return res.status(400).json({
                success: false,
                error: 'Customer ID is required'
            });
        }

        const updatedCustomer = await Customer.editCustomerbyId(customerId, req.body);
        res.status(200).json({
            success: true,
            message: 'Customer updated successfully',
            data: updatedCustomer
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    registerCustomer,
    getCustomerById,
    getAllCustomers,
    createLaundryRecord,
    editCustomer
};