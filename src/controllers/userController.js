const User = require('../models/User');

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
            error: error.message
        });
    }
};

const editUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                error: "User ID is required"
            });
        }

        const updatedUser = await User.editUserByID(userId, req.body);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

const getUsersByIdOrNameWithCustomerRole = async (req, res) => {
    try {
        const customers = await User.searchUserByIdOrNameWithCustomerRole();
        res.status(200).json({
            success: true,
            data: customers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = { getAllUsers, editUser, getUsersByIdOrNameWithCustomerRole };