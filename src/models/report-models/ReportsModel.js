const BaseModel = require("../BaseModel");

class ReportModels extends BaseModel {
  static async searchAllItemsReport(shop_id) {
    try {
      const sql = "SELECT * FROM shop_inventory WHERE shop_id = ?";
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async searchDisplayedServicesById(shop_id) {
    try {
      const sql =
        "SELECT * FROM shop_services WHERE is_displayed = 'true' AND shop_id = ?";
      const result = await this.query(sql, [shop_id]);
      return result;
    } catch (error) {
      console.error(
        "ShopServicesModel.searchDisplayedServicesById error:",
        error
      );
      throw error;
    }
  }

  static async searchAllCustomerReceiptByShopId(shop_id) {
    try {
      const sql = "SELECT * FROM customer_transactions WHERE shop_id = ? ORDER BY created_at DESC";
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error(
        "ReportModels.searchAllCustomerReceiptByShopId error:",
        error
      );
      throw error;
    }
  }
}

module.exports = ReportModels;
