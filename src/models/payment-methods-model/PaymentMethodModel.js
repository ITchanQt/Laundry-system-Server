const BaseModel = require("../BaseModel");

class PaymentMethods extends BaseModel {
  static async findPaymentMethodById(id) {
    const sql = `SELECT * FROM payment_method WHERE pm_id = ?`;
    const result = await this.query(sql, [id]);
    return result[0];
  }

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

  static async findByPMName(pm_name, shop_id) {
    try {
      const sql =
        "SELECT * FROM payment_method WHERE pm_name = ? AND shop_id = ?";
      const results = await this.query(sql, [pm_name, shop_id]);
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
      console.log(paymentMethodData);
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

  static async updatePaymentMethod(pm_id, data) {
    try {
      const sql = `UPDATE payment_method SET 
                    pm_name = ?,
                    account_name = ?,
                    account_number = ?,
                    description = ?,
                    is_displayed = ?,
                    qrCode_image_url = ?
                  WHERE pm_id = ?
                  `;

      const params = [
        data.pm_name,
        data.account_name,
        data.account_number,
        data.description,
        data.is_displayed,
        data.qrCode_image_url,
        pm_id,
      ];

      await this.query(sql, params);

      return { pm_id, ...data };
    } catch (error) {
      console.log("Error updating payment method:", error);
      throw error;
    }
  }

  static async updateDisplaySettings(shop_id, displayPaymentMethodIds) {
    try {
      const hideAllSql =
        "UPDATE payment_method SET is_displayed = 'false' WHERE shop_id = ?";
      await this.query(hideAllSql, [shop_id]);

      if (
        Array.isArray(displayPaymentMethodIds) &&
        displayPaymentMethodIds.length > 0
      ) {
        const placeholders = displayPaymentMethodIds.map(() => "?").join(",");
        const showSql = `
        UPDATE payment_method
        SET is_displayed = 'true'
        WHERE shop_id = ?
        AND pm_id IN (${placeholders})
        `;

        const params = [shop_id, ...displayPaymentMethodIds];
        await this.query(showSql, params);
      }

      return true;
    } catch (error) {
      console.error("PaymentMethods.updateDisplaySettings error:", error);
      throw error;
    }
  }
}

module.exports = PaymentMethods;
