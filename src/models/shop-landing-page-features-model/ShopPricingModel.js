const BaseModel = require("../BaseModel");

class PricingModel extends BaseModel {
  static async findServiceById(id) {
    const sql = `SELECT * FROM shoplandingpage_pricing WHERE pricing_id = ?`;
    const result = await this.query(sql, [id]);
    return result[0];
  }

  static async findPricingById(shop_id) {
    try {
      const sql = "SELECT * FROM shoplandingpage_pricing WHERE is_displayed = 'true' AND shop_id = ?";
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

  static async findAllPrices(shop_id) {
    try {
      const sql = "SELECT * FROM shoplandingpage_pricing WHERE shop_id = ?";
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error("Error getting shop prices:", error);
      throw new Error(`Failed to get shop prices: ${error.message}`);
    }
  }
  static async updatePrices(pricing_id, data) {
    try {
      const sql = `
      UPDATE shoplandingpage_pricing
      SET categories = ?, description = ?, price = ?, pricing_label = ?,  image_url = ?, is_displayed = ?
      WHERE pricing_id = ?
    `;

      const params = [
        data.categories,
        data.description,
        data.price,
        data.pricing_label,
        data.image_url,
        data.is_displayed,
        pricing_id,
      ];

      await this.query(sql, params);

      return { pricing_id, ...data };
    } catch (error) {
      console.error("Error updating prices:", error);
      throw error;
    }
  }

  static async updateDisplaySettings(shop_id, displayedPricesIds) {
    try {
      const hideAllSql =
        "UPDATE shoplandingpage_pricing SET is_displayed = 'false' WHERE shop_id = ?";
      await this.query(hideAllSql, [shop_id]);

      if (
        Array.isArray(displayedPricesIds) &&
        displayedPricesIds.length > 0
      ) {
        const placeholders = displayedPricesIds.map(() => "?").join(", ");
        const showSql = `
        UPDATE shoplandingpage_pricing
        SET is_displayed = 'true'
        WHERE shop_id = ?
        AND pricing_id IN (${placeholders})
      `;

        const params = [shop_id, ...displayedPricesIds];
        await this.query(showSql, params);
      }

      return true;
    } catch (error) {
      console.error("ShopPricesModel.updateDisplaySettings error:", error);
      throw error;
    }
  }

  static async searchDisplyedPriceByShopId(shop_id) {
    try {
      const sql = "SELECT * FROM shoplandingpage_pricing WHERE is_displayed = 'true' AND shop_id = ?";
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
       console.error("ShopPricesModel.searcDisplyedPriceByShopId error:", error);
      throw error;
    }
  }
}

module.exports = PricingModel;
