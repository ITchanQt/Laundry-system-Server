const AuthModel = require("../models/authModel");

const verifySuperAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, error: "No token provided" });
    }

    const supabaseToken = authHeader.split(" ")[1];
    const supabaseUser = await AuthModel.verifySupabaseToken(supabaseToken);

    // 2. Verify user exists in DB
    const superAdmin = await AuthModel.findSuperAdminByEmail(
      supabaseUser.email
    );
    if (!superAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized user" });
    }

    const jwtToken = AuthModel.generateJWT({
      id: superAdmin.id,
      email: superAdmin.email,
    });

    req.user = superAdmin;
    req.jwt = jwtToken;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

const dashboard = (req, res) => {
  res.json({
    message: `Welcome ${req.user.email}, you are the Super Admin!`,
    token: req.jwt,
  });
};

const superAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({
        success: false,
        message: "Invalid or missing API key",
      });
    }

    const result = await AuthModel.login(email, password);

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Super Admin login successful",
      token: `Bearer ${result.token}`
    });
  } catch (error) {
    console.error("Super admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { verifySuperAdmin, dashboard, superAdminLogin };
