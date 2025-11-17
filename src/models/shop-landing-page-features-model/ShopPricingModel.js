const BaseModel = require("../BaseModel");

class PricingModel extends BaseModel {
  static async findPricingById(shop_id) {
    try {
      const sql = "SELECT * FROM shoplandingpage_pricing WHERE shop_id = ?";
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error("Error finding shop pricing:", error);
      throw new Error(`Failed to fetch shop pricing: ${error.message}`);
    }
  }

  static async findByTitle(categories, shop_id) {
    try {
      const sql =
        "SELECT * FROM shoplandingpage_pricing WHERE categories = ? AND shop_id = ?";
      const results = await this.query(sql, [categories, shop_id]);
      return results;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async createPrices(pricesData) {
    try {
      const {
        shop_id,
        categories,
        description,
        price,
        pricing_label,
        image_url,
        is_displayed,
      } = pricesData;

      const sql = `
      INSERT INTO shoplandingpage_pricing (shop_id, categories, description, price, pricing_label, image_url, is_displayed)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

      return this.query(sql, [
        shop_id,
        categories,
        description,
        price,
        pricing_label,
        image_url,
        is_displayed,
      ]);
    } catch (error) {
      console.error("Error inserting shop prices:", error);
      throw new Error(`Failed to insert shop prices: ${error.message}`);
    }
  }
}

module.exports = PricingModel;
