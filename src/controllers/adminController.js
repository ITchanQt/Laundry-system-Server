const Admin = require("../models/Admin");

const registerAdmin = async (req, res) => {
  try {
    const existingAdmin = await Admin.findByUsername(req.body.username);
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists" });
    }

    await Admin.crateAdmin(req.body);
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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