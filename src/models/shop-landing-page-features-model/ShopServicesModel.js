const BaseModel = require("../BaseModel");

class ServicesModel extends BaseModel {
    static async findServicesByShopId(shop_id) {
        try {
            const sql = 'SELECT * FROM shopLandingPage_services WHERE shop_id = ?';
            const results = await this.query(sql, [shop_id]);
            return results;
        } catch (error) {
            console.error('Error finding shop services:', error);
            throw new Error(`Failed to fetch shop services: ${error.message}`);
        }
    }
}

module.exports = ServicesModel;