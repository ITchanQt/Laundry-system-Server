const OtpModel = require("../models/otpModel");
const generateOtp = require("../utils/generateOtp");
const { sendOtpEmail } = require("../utils/mailer");

// SEND OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

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

module.exports = { sendOtp, verifyOtp };
