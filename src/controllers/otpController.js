const Admin = require("../models/Admin");
const OtpModel = require("../models/otpModel");
const User = require("../models/User");
const generateOtp = require("../utils/generateOtp");
const { sendOtpEmail } = require("../utils/mailer");

const sendOtpAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    const existingEmail = await Admin.findByEmail(req.body.email);
    const existingUsername = await Admin.findByUsername(
      req.body.admin_username,
    );
    const existingContactNum = await Admin.findByPhoneNum(
      req.body.admin_contactNum,
    );
    if (existingEmail || existingUsername || existingContactNum) {
      return res.status(400).json({
        success: false,
        message: "Email, username or phone number is unavailable!",
      });
    }

    const otp = generateOtp();
    await OtpModel.saveOtp(email, otp);
    await sendOtpEmail(email, otp);

    return res.json({
      success: true,
      message: "OTP sent successfully",
      email,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send OTP" });
  }
};

// SEND OTP USERS
const sendOtp = async (req, res) => {
  try {
    const { shop_id, email, username, contactNum } = req.body;

    const existingUserEmail = await User.findByEmail(shop_id, email);
    const existingUserUsername = await User.findByUsername(shop_id, username);
    const existingContact = await User.findByContactNum(shop_id, contactNum);
    if (existingUserEmail || existingUserUsername || existingContact) {
      return res.status(400).json({
        success: false,
        message: "Email, username or phone number already exists on this shop",
      });
    }

    const otp = generateOtp();
    await OtpModel.saveOtp(email, otp);
    await sendOtpEmail(email, otp);

    return res.json({
      success: true,
      message: "OTP sent successfully",
      email,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send OTP" });
  }
};

// VERIFY OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const validOtp = await OtpModel.verifyOtp(email, otp);

    if (!validOtp) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    // Mark OTP as used
    await OtpModel.markOtpUsed(validOtp.id);

    return res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error verifying OTP" });
  }
};

module.exports = { sendOtpAdmin, sendOtp, verifyOtp };
