const BaseModel = require('./BaseModel');

class LaundryShops extends BaseModel {
    static async findByName(shopName, ownerEmail, ownerContactNum) {
        const sql = "SELECT * FROM laundry_shops WHERE owner_emailAdd = ? AND owner_contactNum = ? AND shop_name = ?";
        const results = await this.query(sql, [ownerEmail, ownerContactNum, shopName]);
        return results[0];
    }

    static async create(shopData) {
        const { 
            owner_fName, 
            owner_mName, 
            owner_lName, 
            owner_emailAdd, 
            owner_contactNum, 
            shop_address, 
            shop_name, 
            shop_type
        } = shopData;

        const sql = `INSERT INTO laundry_shops 
            (owner_fName, owner_mName, owner_lName, owner_emailAdd, owner_contactNum, shop_address, shop_name, shop_type) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        return this.query(sql, [
            owner_fName,
            owner_mName,
            owner_lName,
            owner_emailAdd,
            owner_contactNum,
            shop_address,
            shop_name,
            shop_type
        ]);
    }

    static async getAllShops() {
        const sql = "SELECT * FROM laundry_shops";
        const results = await this.query(sql);
        return results;
    }
}

module.exports = LaundryShops;
