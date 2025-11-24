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
}

module.exports = ReportModels;
