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
}

module.exports = PaymentMethods;
