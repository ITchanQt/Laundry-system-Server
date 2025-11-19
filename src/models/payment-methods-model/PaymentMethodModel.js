const BaseModel = require("../BaseModel");

class PaymentMethods extends BaseModel {
  static async findAllPaymentMethods(shop_id) {
    try {
      const sql = "SELECT * FROM payment_method WHERE shop_id = ?";
      const result = await this.query(sql, [shop_id]);
      return result;
    } catch (error) {
      console.error("Error getting shop peyment methods:", error);
      throw new Error(`Failed to get peyment methods: ${error.message}`);
    }
  }

  static async findByPMName(service_name, shop_id) {
    try {
      const sql =
        "SELECT * FROM payment_method WHERE pm_name = ? AND shop_id = ?";
      const results = await this.query(sql, [service_name, shop_id]);
      return results;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async createPaymentMethod(paymentMethodData) {
    try {
      const {
        shop_id,
        pm_name,
        account_name,
        account_number,
        description,
        is_displayed,
        is_static = "false",
        qrCode_image_url,
      } = paymentMethodData;
      console.log(paymentMethodData)
      const sql = `INSERT INTO payment_method (
                    shop_id,
                    pm_name, 
                    account_name, 
                    account_number, 
                    description, 
                    is_displayed, 
                    is_static, 
                    qrCode_image_url)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      return this.query(sql, [
        shop_id,
        pm_name,
        account_name,
        account_number,
        description,
        is_displayed,
        is_static,
        qrCode_image_url,
      ]);
    } catch (error) {
      console.error("Error creating shop payment method:", error);
      throw new Error(`Failed to create shop payment method: ${error.message}`);
    }
  }
}

module.exports = PaymentMethods;
