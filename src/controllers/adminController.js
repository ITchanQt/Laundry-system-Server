const Admin = require("../models/Admin");
const OtpModel = require("../models/otpModel");

const registerAdmin = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = [
      "admin_fName",
      "admin_lName",
      "admin_username",
      "admin_contactNum",
      "email",
      "password",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          error: `${field} is required`,
        });
      }
    }

    const existingEmail = await Admin.findByEmail(req.body.email);
    const existingUsername = await Admin.findByUsername(
      req.body.admin_username
    );
    const existingContactNum = await Admin.findByPhoneNum(
      req.body.admin_contactNum
    );
    if (existingEmail || existingUsername || existingContactNum) {
      return res.status(400).json({
        success: false,
        message: "Email, username or phone number is unavailable!",
      });
    }

    const verified = await OtpModel.isEmailVerified(req.body.email);
    if (!verified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your OTP before registering",
      });
    }

    // Set default values for optional fields
    const adminData = {
      ...req.body,
      admin_mName: req.body.admin_mName || "",
      admin_address: req.body.admin_address || "",
      role: req.body.role || "Admin",
      status: req.body.status || "Active",
    };

    const result = await Admin.createAdmin(adminData);

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: result,
    });
  } catch (error) {
    console.error("Admin registration error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
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

const findAdminByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const admin = await Admin.findByEmail(email);
    if (!admin) {
      res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const {
      admin_id,
      admin_fName,
      admin_mName,
      admin_lName,
      admin_address,
      admin_contactNum,
    } = admin;

    res.status(200).json({
      success: true,
      data: {
        admin_id,
        admin_fName,
        admin_mName,
        admin_lName,
        admin_address,
        admin_contactNum,
      },
    });
  } catch (error) {
    console.log("Find admin by email error:", error);
    res.status(500).json({ error: error.message });
  }
};

const searchAdminsByEmail = async (req, res) => {
  try {
    const { email } = req.query; // e.g. /admin/search?email=adm
    const admins = await Admin.searchByEmail(email);

    res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    console.error("Search admin by email error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getInventorySummary = async (req, res) => {
  try {
    const { shop_id } = req.params;
    const targetDate = req.query.date || new Date().toISOString().split("T")[0];

    if (!shop_id) {
      return res
        .status(400)
        .json({ success: false, message: "Shop ID is required" });
    }

    const stats = await Admin.selectDashboardStats(shop_id, targetDate);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getWeeklyChartData = async (req, res) => {
  try {
    const { shop_id } = req.params;
    const rawData = await Admin.selectWeeklyTransactionCount(shop_id);

    const daysOfWeek = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      daysOfWeek.push(d.toLocaleDateString("en-US", { weekday: "short" }));
    }

    const chartData = daysOfWeek.map((dayName) => {
      const dbMatch = rawData.find((item) => item.day === dayName);

      return {
        day: dayName,
        value: dbMatch ? dbMatch.value : 0,
      };
    });

    res.status(200).json({
      success: true,
      data: chartData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSAdminInventorySummary = async (req, res) => {
  try {
    const targetDate = req.query.date || new Date().toISOString().split("T")[0];

    const stats = await Admin.selectSAdminDashboardStats(targetDate);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("SAdmin Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSAdminWeeklyChartData = async (req, res) => {
  try {
    const rawData = await Admin.selectSAdminWeeklyTransactionCount();

    const daysOfWeek = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      daysOfWeek.push(d.toLocaleDateString("en-US", { weekday: "short" }));
    }

    const chartData = daysOfWeek.map((dayName) => {
      const dbMatch = rawData.find((item) => item.day === dayName);

      return {
        day: dayName,
        value: dbMatch ? dbMatch.value : 0,
      };
    });

    res.status(200).json({
      success: true,
      data: chartData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerAdmin,
  getAllAdmins,
  findAdminByEmail,
  searchAdminsByEmail,
  getInventorySummary,
  getWeeklyChartData,
  getSAdminInventorySummary,
  getSAdminWeeklyChartData,
};
