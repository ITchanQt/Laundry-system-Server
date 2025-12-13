const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    const updatedUser = await User.editUserByID(userId, req.body);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getUsersByIdOrNameWithCustomerRole = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Missing shop_id parameter",
      });
    }
    const customers = await User.searchUserByIdOrNameWithCustomerRole(shop_id);
    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getUserByIdAndShopId = async (req, res) => {
  try {
    const { shop_id, user_id } = req.params;

    if (!shop_id || !user_id) {
      return res.status(400).json({
        success: false,
        message: "Missing shop_id or user_id parameters",
      });
    }

    const customer = await User.findUserByIdAndShopId(shop_id, user_id);
    if (customer.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Customer not found",
      });
    }
    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Customer fetching on customer module
const getUserByUserIdShopIdRole = async (req, res) => {
  try {
    const { user_id, shop_id } = req.params;

    if (!user_id || !shop_id) {
      return res.status(400).json({
        success: false,
        message: "User ID, Shop ID, and Staff role are required.",
      });
    }

    const staff = await User.selectUserByIdShopIdRole(user_id, shop_id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found or invalid shop/user combination.",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Staff get successfully!",
      data: staff,
    });
  } catch (error) {
    console.error("userController.getUserByUserIdShopIdRole error: ", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateStaffByUserIdShopId = async (req, res) => {
  try {
    const { user_id, shop_id } = req.params;

    if (!user_id || !shop_id) {
      return res.status(400).json({
        success: false,
        message: "User ID, Shop ID, and staff role are required.",
      });
    }

    const updatedStaffData = await User.editCustomerByUserIdShopId(
      user_id,
      shop_id,
      req.body
    );

    if (!updatedStaffData) {
      return res.status(404).json({
        success: false,
        message: "Staff not found or invalid shop/user combination.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Staff updated successfully!",
      data: updatedStaffData,
    });
  } catch (error) {
    console.error("userController.updateStaffByUserIdShopId error: ", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  editUser,
  getUsersByIdOrNameWithCustomerRole,
  getUserByIdAndShopId,
  getUserByUserIdShopIdRole,
  updateStaffByUserIdShopId,
};
