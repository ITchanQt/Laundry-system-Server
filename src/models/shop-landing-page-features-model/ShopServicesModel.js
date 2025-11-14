const BaseModel = require("../BaseModel");

class ServicesModel extends BaseModel {
  static async findServiceById(id) {
    const sql = `SELECT * FROM shopLandingPage_services WHERE service_id = ?`;
    const result = await this.query(sql, [id]);
    return result[0];
  }

  static async findByTitle(service_name, shop_id) {
    try {
      const sql =
        "SELECT * FROM shopLandingPage_services WHERE service_name = ? AND shop_id = ?";
      const results = await this.query(sql, [service_name, shop_id]);
      return results;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async findServicesByShopId(shop_id) {
    try {
      const sql = "SELECT * FROM shopLandingPage_services WHERE shop_id = ?";
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error("Error finding shop services:", error);
      throw new Error(`Failed to fetch shop services: ${error.message}`);
    }
  }

  static async findAllByShopId(shop_id) {
    const sql = "SELECT * FROM shop_services WHERE shop_id = ?";
    return this.query(sql, [shop_id]);
  }

  static async createService(serviceData) {
    const { shop_id, service_name, description, image_url, is_displayed } =
      serviceData;

    const sql = `
      INSERT INTO shopLandingPage_services (shop_id, service_name, service_description, image_url, is_displayed)
      VALUES (?, ?, ?, ?, ?)
    `;

    return this.query(sql, [
      shop_id,
      service_name,
      description,
      image_url,
      is_displayed,
    ]);
  }

  static async findAllServices(shop_id) {
    try {
      const sql = "SELECT * FROM shopLandingPage_services WHERE shop_id = ?";
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error("Error getting shop services:", error);
      throw new Error(`Failed to get shop services: ${error.message}`);
    }
  }
  static async updateService(service_id, data) {
    try {
      const sql = `
      UPDATE shopLandingPage_services
      SET service_name = ?, service_description = ?, image_url = ?, is_displayed = ?
      WHERE service_id = ?
    `;

      const params = [
        data.service_name,
        data.service_description,
        data.image_url,
        data.is_displayed,
        service_id,
      ];

      await this.query(sql, params);

      return { service_id, ...data };
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  }
}

module.exports = ServicesModel;
