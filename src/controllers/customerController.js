const { supabase } = require("../config/supabase");
const Customer = require("../models/Customer");
const User = require("../models/User");

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

const registerWalkInCustomer = async (req, res) => {
  try {
    const { shop_id } = req.body;

    if (!shop_id) {
      return res
        .status(400)
        .json({ success: false, message: "Shop ID is required" });
    }

    const walk_in_cus = await User.createWalkInCustomer(req.body);
    res.status(201).json({
      success: true,
      message: "walk in customer registered successfully",
      data: walk_in_cus,
    });

  } catch (error) {
    console.error("Register walk in customer error:", error);
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
      req.body,
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
      role,
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
      error,
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
      req.body,
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
      error,
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
      error,
    );
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateLaundryStatus = async (req, res) => {
  try {
    const { laundryId } = req.params;
    const { service_status } = req.body;

    if (!laundryId || !service_status) {
      return res.status(400).json({
        success: false,
        message: "Laundry ID and status are required.",
      });
    }

    const result = await Customer.updateStatus(laundryId, service_status);

    return res.status(200).json({
      success: true,
      message: "Service status successfully updated.",
      data: result,
    });
  } catch (error) {
    console.error("updateLaundryStatus Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getCustomerStats = async (req, res) => {
  try {
    const { shop_id, cus_id } = req.params;

    if (!shop_id || !cus_id) {
      return res.status(400).json({
        success: false,
        message: "Both Shop ID and Customer ID are required.",
      });
    }

    const stats = await Customer.getCustomerDashboardStats(shop_id, cus_id);

    return res.status(200).json({
      success: true,
      message: "Customer transaction stats retrieved.",
      data: stats,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics.",
    });
  }
};

const getPendingServiceTrans = async (req, res) => {
  try {
    const { shop_id, cus_id } = req.params;
    if (!shop_id || !cus_id) {
      return res.status(400).json({
        success: false,
        message: "Shop and Customer ID parameters is required!",
      });
    }

    const transactions = await Customer.selectPendingServiceTrans(
      shop_id,
      cus_id,
    );

    res.status(200).json({
      success: true,
      message: "On Service transactions fetch successfully!",
      data: transactions,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const getWeeklyTransactions = async (req, res) => {
  try {
    const { shop_id, cus_id } = req.params;
    if (!shop_id || !cus_id) {
      return res.status(400).json({
        success: false,
        message: "Shop and Customer ID parameters is required!",
      });
    }

    const transactions = await Customer.selectWeeklyTransactions(
      shop_id,
      cus_id,
    );
    res.status(200).json({
      success: true,
      message: "On Service weekly transactions fetch successfully!",
      data: transactions,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const getPendingPaymentsTransactions = async (req, res) => {
  try {
    const { shop_id, cus_id } = req.params;
    if (!shop_id || !cus_id) {
      return res.status(400).json({
        success: false,
        message: "Shop and Customer ID parameters is required!",
      });
    }

    const transactions = await Customer.selectPendingPaymentsTransactions(
      shop_id,
      cus_id,
    );

    res.status(200).json({
      success: true,
      message: "Pending payments transactions fetch successfully!",
      data: transactions,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const addPaymentProof = async (req, res) => {
  try {
    const laundryId = req.params.laundryId;
    if (!laundryId) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required",
      });
    }

    const existingRec = await Customer.findCustomerTransById(laundryId);
    if (!existingRec) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    let onlinePayment_proof = existingRec.onlinePayment_proof;

    if (req.file) {
      const fileName = `${existingRec.laundryId}-${Date.now()}-${
        req.file.originalname
      }`;

      const { data, error } = await supabase.storage
        .from("shop-images")
        .upload(`proof-of-payment/${fileName}`, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from("shop-images")
        .getPublicUrl(`proof-of-payment/${fileName}`);

      onlinePayment_proof = publicData.publicUrl;
    }

    const sendPayment = await Customer.sendPaymentProof(laundryId, {
      onlinePayment_proof: onlinePayment_proof ?? null,
    });

    res.json({
      success: true,
      message: "Proof of payment sent",
      data: sendPayment,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const getReadyForPickTransactions = async (req, res) => {
  try {
    const { shop_id, cus_id } = req.params;
    if (!shop_id || !cus_id) {
      return res.status(400).json({
        success: false,
        message: "Shop and Customer ID parameters is required!",
      });
    }

    const transactions = await Customer.selectReadyForPickTransactions(
      shop_id,
      cus_id,
    );
    res.status(200).json({
      success: true,
      message: "Read to pick up transactions fetch successfully!",
      data: transactions,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const createRating = async (req, res) => {
  try {
    const rating = await Customer.insertRatings(req.body);

    res.status(201).json({
      success: true,
      message: "Rating successfully created!",
      data: rating,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const getActivityLogs = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required.",
      });
    }

    const logs = await Customer.selectActivityLogs(user_id);

    res.status(200).json({
      success: true,
      message: "Activity logs fetched successfully!",
      data: logs,
    });
  } catch (error) {
    console.error("Controller Error (getActivityLogs):", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch activity log.",
    });
  }
};

const getCompletedOrdersOfForCustomerReport = async (req, res) => {
  try {
    const { shop_id, cus_id } = req.params;
    if (!shop_id || !cus_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID and User ID is required!",
      });
    }

    const customerRecords =
      await Customer.findCompletedOrdersOfForCustomerReport(shop_id, cus_id);
    res.status(200).json({
      success: true,
      message: "Customer records successfully get!",
      data: customerRecords,
    });
  } catch (error) {
    console.error(
      "customerController.findCompletedOrdersOfForCustomerReport error: ",
      error,
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
  registerWalkInCustomer,
  getCustomerById,
  getAllCustomers,
  createLaundryRecord,
  editCustomer,

  // Customer fetching on customer module
  getUserByUserIdShopIdRole,
  updateCustomerByUserIdShopIdRole,
  getCompletedOrdersOfTheMonthByShopId,
  updateLaundryStatus,

  getCustomerStats,
  getPendingServiceTrans,
  getWeeklyTransactions,
  getPendingPaymentsTransactions,
  addPaymentProof,
  getReadyForPickTransactions,
  createRating,
  getActivityLogs,
  getCompletedOrdersOfForCustomerReport,
};
