const crypto = require("crypto");
const bcrypt = require("bcrypt");
const ForgotAndResetPasswordModel = require("../../models/forgot-reset-password/ForgotPasswordResetModel");
const { sendResetEmail } = require("../../utils/mailer");

const TOKEN_BYTES = 32; // length of token
const TOKEN_EXPIRY_MINUTES = 5; // minutes

function generateResetToken() {
  return crypto.randomBytes(TOKEN_BYTES).toString("hex"); // raw token
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

const forgotPasswordAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required!" });

    const adminUser = await ForgotAndResetPasswordModel.findByEmailAndAdminRole(
      email
    );
    if (!adminUser) {
      // Do not reveal whether email exists — still send 200 to avoid enumeration.
      return res.status(200).json({
        success: true,
        message: "If the email exists, a reset link will be sent",
      });
    }
    // generate & hash token
    const resetToken = generateResetToken();
    const hashedToken = hashToken(resetToken);
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_MINUTES * 60 * 1000);

    await ForgotAndResetPasswordModel.saveResetToken(
      hashedToken,
      expiresAt,
      adminUser.user_id
    );
    console.log(adminUser.user_id, hashedToken, expiresAt);
    const resetUrl = `${
      process.env.ADMIN_FRONTEND_URL
    }/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    // send email
    await sendResetEmail(email, resetUrl);

    return res.status(200).json({
      success: true,
      message: "If the email exists, a reset link will be sent",
    });
  } catch (error) {
    console.error("forgotPassword error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const forgotPasswordStaff = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required!" });

    const adminUser = await ForgotAndResetPasswordModel.findByEmailAndStaffRole(
      email
    );
    if (!adminUser) {
      // Do not reveal whether email exists — still send 200 to avoid enumeration.
      return res.status(200).json({
        success: true,
        message: "If the email exists, a reset link will be sent",
      });
    }
    // generate & hash token
    const resetToken = generateResetToken();
    const hashedToken = hashToken(resetToken);
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_MINUTES * 60 * 1000);

    await ForgotAndResetPasswordModel.saveResetToken(
      hashedToken,
      expiresAt,
      adminUser.user_id
    );
    console.log(adminUser.user_id, hashedToken, expiresAt);
    const resetUrl = `${
      process.env.STAFF_FRONTEND_URL
    }/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    // send email
    await sendResetEmail(email, resetUrl);

    return res.status(200).json({
      success: true,
      message: "If the email exists, a reset link will be sent",
    });
  } catch (error) {
    console.error("forgotPassword error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const forgotPasswordCustomer = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required!" });

    const adminUser =
      await ForgotAndResetPasswordModel.findByEmailAndCustomerRole(email);
    if (!adminUser) {
      // Do not reveal whether email exists — still send 200 to avoid enumeration.
      return res.status(200).json({
        success: true,
        message: "If the email exists, a reset link will be sent",
      });
    }
    // generate & hash token
    const resetToken = generateResetToken();
    const hashedToken = hashToken(resetToken);
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_MINUTES * 60 * 1000);

    await ForgotAndResetPasswordModel.saveResetToken(
      hashedToken,
      expiresAt,
      adminUser.user_id
    );
    console.log(adminUser.user_id, hashedToken, expiresAt);
    const resetUrl = `${
      process.env.CUSTOMER_FRONTEND_URL
    }/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    // send email
    await sendResetEmail(email, resetUrl);

    return res.status(200).json({
      success: true,
      message: "If the email exists, a reset link will be sent",
    });
  } catch (error) {
    console.error("forgotPassword error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, email, newPassword } = req.body;
    if (!token || !newPassword || !email) {
      return res.status(400).json({
        success: false,
        message: "Token, email and new password are required",
      });
    }

    // hash token and lookup
    const hashed = hashToken(token);
    const adminUser = await ForgotAndResetPasswordModel.findByResetToken(
      hashed
    );

    if (!adminUser || adminUser.email !== email) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // hash new password and update
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    await ForgotAndResetPasswordModel.updatePassword(
      adminUser.user_id,
      password
    );

    return res
      .status(200)
      .json({ success: true, message: "Password has been reset" });
  } catch (err) {
    console.error("resetPassword error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { forgotPasswordAdmin, forgotPasswordStaff, forgotPasswordCustomer, resetPassword };
