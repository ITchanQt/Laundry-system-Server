const BaseModel = require("../BaseModel");

class PricingModel extends BaseModel {
    static async findPricingById(shop_id) {
        try {
            const sql = 'SELECT * FROM shoplandingpage_pricing WHERE shop_id = ?';
            const results = await this.query(sql, [shop_id]);
            return results;
        } catch (error) {
            console.error('Error finding shop pricing:', error);
            throw new Error(`Failed to fetch shop pricing: ${error.message}`);
        }
    }
}

module.exports = PricingModel;