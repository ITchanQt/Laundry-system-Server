const BaseModel = require("../BaseModel");

class AboutModel extends BaseModel {
  static async findByTitle(title, shop_id) {
    try {
      const sql =
        "SELECT * FROM shopLandingPage_about WHERE title = ? AND shop_id = ?";
      const results = await this.query(sql, [title, shop_id]);
      return results;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async findByTitleUsingAboutId(title, about_id) {
    try {
      const sql = `
      SELECT * FROM shopLandingPage_about
      WHERE title = ?
      AND about_id != ?
    `;
      const results = await this.query(sql, [title, about_id]);
      return results;
    } catch (error) {
      console.error("Error checking existing title:", error);
      throw new Error(`Failed to check title: ${error.message}`);
    }
  }

  static async findAboutById(about_id) {
    try {
      const sql = "SELECT * FROM shopLandingPage_about WHERE about_id = ?";
      const results = await this.query(sql, [about_id]);
      return results;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async findAboutByShopId(shop_id) {
    try {
      const sql = "SELECT * FROM shopLandingPage_about WHERE shop_id = ?";
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error("Error finding shop about:", error);
      throw new Error(`Failed to fetch shop about: ${error.message}`);
    }
  }

  static async createAbout(aboutData) {
    try {
      const { shop_id, title, description, is_displayed } = aboutData;

      const displayValue = String(is_displayed);

      const sql = `
      INSERT INTO shopLandingPage_about (shop_id, title, description, is_displayed)
      VALUES (?, ?, ?, ?)
    `;

      return await this.query(sql, [shop_id, title, description, is_displayed]);
    } catch (error) {
      console.error("Error inserting shop about:", error);
      throw new Error(`Failed to insert shop about: ${error.message}`);
    }
  }

  static async editShopAbouById(about_id, aboutUpdateData) {
    try {
      if (!about_id) {
        throw new Error("About id is required for update");
      }

      const aboutId = await this.findAboutById(about_id);
      if (!aboutId) {
        throw new Error("About not found!");
      }

      const sql = `UPDATE shopLandingPage_about
                    SET title = ?,
                    description = ?,
                    is_displayed = ?
                    WHERE about_id = ?`;

      const params = [
        aboutUpdateData.title,
        aboutUpdateData.description,
        aboutUpdateData.is_displayed,
        about_id,
      ];

      console.log("Update params:", params);

      const result = await this.query(sql, params);

      if (result.affectedRows === 0) {
        throw new Error("Failed to update about");
      }

      return await this.findAboutById(about_id);
    } catch (error) {
      console.error("Error update shop about:", error);
      throw new Error(`Failed to update shop about: ${error.message}`);
    }
  }

  static async searchAllAboutByShopId(shop_id) {
    try {
      const sql = "SELECT * FROM shopLandingPage_about WHERE shop_id = ?";
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error("Error getting shop about:", error);
      throw new Error(`Failed to get shop about: ${error.message}`);
    }
  }

  static async updateDisplaySettings(shop_id, displayedFeatureIds) {
    try {
      const hideAllSql =
        "UPDATE shopLandingPage_about SET is_displayed = 'false' WHERE shop_id = ?";
      await this.query(hideAllSql, [shop_id]);

      if (
        Array.isArray(displayedFeatureIds) &&
        displayedFeatureIds.length > 0
      ) {
        const placeholders = displayedFeatureIds.map(() => "?").join(", ");
        const showSql = `
        UPDATE shopLandingPage_about
        SET is_displayed = 'true'
        WHERE shop_id = ?
        AND about_id IN (${placeholders})
      `;

        const params = [shop_id, ...displayedFeatureIds];
        await this.query(showSql, params);
      }

      return true;
    } catch (error) {
      console.error("ShopAboutModel.updateDisplaySettings error:", error);
      throw error;
    }
  }
}

module.exports = AboutModel;