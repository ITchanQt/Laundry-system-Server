const BaseModel = require("../BaseModel");

class ShopModel extends BaseModel {
  static async findBySlug(slug) {
    try {
      const sql = "SELECT * FROM laundry_shops WHERE slug = ?";
      const results = await this.query(sql, [slug]);
      return results[0];
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
  }
}
module.exports = ShopModel;
