const BaseModel = require("../BaseModel");

class ShopNameAndSlugModel extends BaseModel {
  static async searchAllShopNameAndSlug() {
    try {
      const sql = `SELECT shop_id, shop_name, slug
                    FROM laundry_shops`;
      const results = await this.query(sql);
      return results;
    } catch (error) {
      console.error("Error finding shop name and slug:", error);
      throw new Error(`Failed to fetch shop name and slug: ${error.message}`);
    }
  }
}

module.exports = ShopNameAndSlugModel;
