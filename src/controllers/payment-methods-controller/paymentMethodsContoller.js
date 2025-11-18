const PaymentMethods = require("../../models/payment-methods-model/PaymentMethodModel");

const getAllPaymentMethodsByShopId = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is require!",
      });
    }

    const paymentMethods = await PaymentMethods.findAllPaymentMethods(shop_id);
    res.status(200).json({
      success: true,
      message: "Payment methods fetch successfully!",
      data: paymentMethods,
    });
  } catch (error) {
    console.error("Get Shop Payment Methods error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { getAllPaymentMethodsByShopId };
