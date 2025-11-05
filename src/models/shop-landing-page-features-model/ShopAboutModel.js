const BaseModel = require("../BaseModel");

class AboutModel extends BaseModel {
    static async findAboutByShopId(shop_id) {
        try {
            const sql = 'SELECT * FROM shopLandingPage_about WHERE shop_id = ?';
            const results = await this.query(sql, [shop_id]);
            return results;  // Return the results
        } catch (error) {
            console.error('Error finding shop about:', error);
            throw new Error(`Failed to fetch shop about: ${error.message}`);
        }
    } 
}

module.exports = AboutModel;