const OtpModel = require("../models/otpModel");
const generateOtp = require("../utils/generateOtp");
const { sendOtpEmail } = require("../utils/mailer");

// Send OTP to email
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
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
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

// Validate OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const isValid = await OtpModel.verifyOtp(email, otp);

    if (!isValid) {
      return res.json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    return res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error verifying OTP",
    });
  }
};

module.exports = { sendOtp, verifyOtp };
