const { supabase } = require("../../config/supabase");
const PaymentMethodsModel = require("../../models/payment-methods-model/PaymentMethodModel");

const getAllPaymentMethodsByShopId = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is require!",
      });
    }

    const paymentMethods = await PaymentMethodsModel.findAllPaymentMethods(
      shop_id
    );
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

const addPaymentMethod = async (req, res) => {
  try {
    const {
      shop_id,
      pm_name,
      account_name,
      account_number,
      description,
      is_displayed,
      is_static,
    } = req.body;

    const file = req.file;
    console.log("FILE:", req.file);
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "QR image is required" });
    }

    const existingPMname = await PaymentMethodsModel.findByPMName(
      pm_name,
      shop_id
    );
    if (existingPMname && existingPMname.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Payment Name already exists!",
      });
    }

    // Upload to Supabase Storage
    const fileName = `${shop_id}-${Date.now()}-${file.originalname}`;
    const { data, error } = await supabase.storage
      .from("shop-images")
      .upload(`payment-methods/${fileName}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    // Get public URL
    const { data: publicData } = supabase.storage
      .from("shop-images")
      .getPublicUrl(`payment-methods/${fileName}`);

    // save record in MySQL
    const newPaymentMethod = await PaymentMethodsModel.createPaymentMethod({
      shop_id,
      pm_name,
      account_name,
      account_number,
      description,
      is_displayed: is_displayed === "true" ? "true" : "false",
      is_static,
      qrCode_image_url: publicData.publicUrl,
    });

    res.status(201).json({
      success: true,
      message: "Payment method added successfully!",
      data: {
        shop_id,
        pm_name,
        account_name,
        account_number,
        description,
        is_displayed,
        is_static,
        qrCode_image_url: publicData.publicUrl,
      },
    });
  } catch (error) {
    console.error("addPaymentMethod error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { getAllPaymentMethodsByShopId, addPaymentMethod };
