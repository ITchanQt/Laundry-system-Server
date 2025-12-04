const Customer = require("../models/Customer");

const registerCustomer = async (req, res) => {
  try {
    // Generate customer ID
    const customerId = await Customer.generateCustomerId();
    console.log("Generated Customer ID:", customerId);

    // Combine the generated ID with the request body
    const customerData = {
      ...req.body,
      cus_id: customerId,
    };

    // Register the customer
    await Customer.registerCustomer(customerData);

    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      customer_id: customerId,
    });
  } catch (error) {
    console.error("Customer registration error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
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
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error("Get customer error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error("Get all customers error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const createLaundryRecord = async (req, res) => {
  try {
    const result = await Customer.insertCustomerReceipt(req.body);

    res.status(201).json({
      success: true,
      message: "Laundry record created successfully",
      laundryId: result.newLaundryId,
    });
  } catch (error) {
    console.error("Create laundry record error:", error);
    res.status(400).json({
      success: false,
      message: "Invalid customer ID", // This error message is for passing to frontend
      error: error.message,
    });
  }
};

const editCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    if (!customerId) {
      return res.status(400).json({
        success: false,
        error: "Customer ID is required",
      });
    }

    const updatedCustomer = await Customer.editCustomerbyId(
      customerId,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Customer fetching on customer module
const getUserByUserIdShopIdRole = async (req, res) => {
  try {
    const { user_id, shop_id, role } = req.params;

    if (!user_id || !shop_id || !role) {
      return res.status(400).json({
        success: false,
        message: "User ID, Shop ID, and Role are required.",
      });
    }

    if (role.toUpperCase() !== "CUSTOMER") {
      return res.status(403).json({
        success: false,
        message:
          "Access forbidden: This endpoint is only for CUSTOMER role queries.",
      });
    }

    const customer = await Customer.selectUserByIdShopIdRole(
      user_id,
      shop_id,
      role
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found or invalid shop/user combination.",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer get successfully!",
      data: customer,
    });
  } catch (error) {
    console.error(
      "customerController.getUserByUserIdShopIdRole error: ",
      error
    );
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateCustomerByUserIdShopIdRole = async (req, res) => {
  try {
    const { user_id, shop_id, role } = req.params;

    if (!user_id || !shop_id || !role) {
      return res.status(400).json({
        success: false,
        message: "User ID, Shop ID, and Role are required.",
      });
    }

    if (role.toUpperCase() !== "CUSTOMER") {
      return res.status(403).json({
        success: false,
        message:
          "Access forbidden: This endpoint is only for CUSTOMER role queries.",
      });
    }

    const updatedCustomerData = await Customer.editCustomerByUserIdShopIdRole(
      user_id,
      shop_id,
      role,
      req.body
    );

    if (!updatedCustomerData) {
      return res.status(404).json({
        success: false,
        message: "Customer not found or invalid shop/user combination.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer updated successfully!",
      data: updatedCustomerData,
    });
  } catch (error) {
    console.error(
      "customerController.updateCustomerByUserIdShopIdRole error: ",
      error
    );
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getCompletedOrdersOfTheMonthByShopId = async (req, res) => {
  try {
    const { shop_id, cus_id } = req.params;
    if (!shop_id || !cus_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID and User ID is required!",
      });
    }

    const customerRecords =
      await Customer.findCompletedOrdersOfTheMonthByShopId(shop_id, cus_id);
    res.status(200).json({
      success: true,
      message: "Customer records successfully get!",
      data: customerRecords,
    });
  } catch (error) {
    console.error(
      "customerController.getCompletedOrdersOfTheMonthByShopId error: ",
      error
    );
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerCustomer,
  getCustomerById,
  getAllCustomers,
  createLaundryRecord,
  editCustomer,

  // Customer fetching on customer module
  getUserByUserIdShopIdRole,
  updateCustomerByUserIdShopIdRole,
  getCompletedOrdersOfTheMonthByShopId
};
