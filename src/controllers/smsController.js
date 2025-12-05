const SMSModel = require("../models/smsModel");

const send = async (req, res) => {
  try {
    const { number, message } = req.body;

    if (!number || !message) {
      return res.status(400).json({
        success: false,
        message: "number and message are required",
      });
    }
    
    const result = await SMSModel.sendSMS(number, message);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};

module.exports = send;
