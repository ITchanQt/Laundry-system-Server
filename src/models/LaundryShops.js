const BaseModel = require("./BaseModel");

class LaundryShops extends BaseModel {
  static async findByName(shopName, ownerEmail, ownerContactNum) {
    const sql =
      "SELECT * FROM laundry_shops WHERE owner_emailAdd = ? AND owner_contactNum = ? AND shop_name = ?";
    const results = await this.query(sql, [
      ownerEmail,
      ownerContactNum,
      shopName,
    ]);
    return results[0];
  }

   static async generateShopId() {
    try {
      // Get the highest admin ID
      const sql = "SELECT shop_id FROM laundry_shops ORDER BY shop_id DESC LIMIT 1";
      const results = await this.query(sql);

      let nextNumber = 1;
      if (results && results.length > 0) {
        const lastId = results[0].shop_id;
        const lastNumber = parseInt(lastId.split('-')[1]);
        nextNumber = lastNumber + 1;
      }

      // Format: LMSA-00001
      return `LMSS-${String(nextNumber).padStart(5, '0')}`;
    } catch (error) {
      throw new Error(`Failed to generate admin ID: ${error.message}`);
    }
  }

  static async create(shopData) {
    const shop_id = await this.generateShopId();
    const {
      owner_fName,
      owner_mName,
      owner_lName,
      owner_emailAdd,
      owner_contactNum,
      shop_address,
      shop_name,
      shop_type,
    } = shopData;

    const sql = `INSERT INTO laundry_shops 
            (shop_id, owner_fName, owner_mName, owner_lName, owner_emailAdd, owner_contactNum, shop_address, shop_name, shop_type) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    return this.query(sql, [
      shop_id,
      owner_fName,
      owner_mName,
      owner_lName,
      owner_emailAdd,
      owner_contactNum,
      shop_address,
      shop_name,
      shop_type,
    ]);
  }

  static async getAllShops() {
    const sql = "SELECT * FROM laundry_shops";
    const results = await this.query(sql);
    return results;
  }

  static async findById(shop_id) {
    const sql = "SELECT * FROM laundry_shops WHERE shop_id = ?";
    const results = await this.query(sql, [shop_id]);
    return results[0];
  }

  static async editShopById(shop_id, shopData) {
    try {
      if (!shop_id) {
        throw new Error("Owner ID is required");
      }

      // Validate required fields
      const requiredFields = [
        "owner_fName",
        // "owner_emailAdd",
        "owner_contactNum",
        "shop_name",
      ];

      for (const field of requiredFields) {
        if (!shopData[field]) {
          throw new Error(`${field} is required`);
        }
      }

      // First check if shop exists
      const shopExists = await this.findById(shop_id);
      if (!shopExists) {
        throw new Error("Shop not found");
      }

      const query = `UPDATE laundry_shops 
            SET owner_fName = ?,
                owner_mName = ?,
                owner_lName = ?,

                owner_contactNum = ?,
                shop_address = ?,
                shop_name = ?,
                shop_status = ?,
                shop_type = ?
            WHERE shop_id = ?`;

      const result = await this.query(query, [
        shopData.owner_fName,
        shopData.owner_mName,
        shopData.owner_lName,
        // shopData.owner_emailAdd,
        shopData.owner_contactNum,
        shopData.shop_address,
        shopData.shop_name,
        shopData.shop_status,
        shopData.shop_type,
        shop_id,
      ]);

      if (result.affectedRows === 0) {
        throw new Error("Failed to update shop");
      }

      // Return updated shop data
      return this.findById(shop_id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LaundryShops;
