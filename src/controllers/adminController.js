const Admin = require("../models/Admin");

const registerAdmin = async (req, res) => {
    try {
        // Validate required fields
        const requiredFields = ['admin_fName', 'admin_lName', 'admin_username', 
                              'admin_contactNum', 'email', 'password'];
        
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    success: false,
                    error: `${field} is required`
                });
            }
        }

        // Set default values for optional fields
        const adminData = {
            ...req.body,
            admin_mName: req.body.admin_mName || null,
            admin_address: req.body.admin_address || null,
            role: req.body.role || 'Admin',
            status: req.body.status || 'Active'
        };

        const result = await Admin.createAdmin(adminData);
        
        res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            admin_id: result.insertId
        });
    } catch (error) {
        console.error('Admin registration error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.getAllAdmins();
    res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    console.error("Get all admins error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  getAllAdmins,
};