const AuthModel = require("../models/authModel");

const verifySuperAdmin = async (req, res, next) => {
  try {
    const superAdmins = process.env.SUPER_ADMIN_EMAILS.split(",");

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const user = await AuthModel.verifySupabaseToken(token);

    if (!superAdmins.includes(user.email)) {
      return res.status(403).json({ sucess: false, error: "Unauthorized user" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

const dashboard = (req, res) => {
  res.json({ message: `Welcome ${req.user.email}, you are the Super Admin!` });
};

module.exports = { verifySuperAdmin, dashboard };
