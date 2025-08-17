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

  static async create(shopData) {
    const {
      owner_fName,
      owner_mName,
      owner_lName,
      owner_emailAdd,
      owner_contactNum,
      shop_address,
      shop_name,
      shop_status,
      shop_type,
    } = shopData;

    const sql = `INSERT INTO laundry_shops 
            (owner_fName, owner_mName, owner_lName, owner_emailAdd, owner_contactNum, shop_address, shop_name, shop_status, shop_type) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    return this.query(sql, [
      owner_fName,
      owner_mName,
      owner_lName,
      owner_emailAdd,
      owner_contactNum,
      shop_address,
      shop_name,
      shop_status,
      shop_type,
    ]);
  }

  static async getAllShops() {
    const sql = "SELECT * FROM laundry_shops";
    const results = await this.query(sql);
    return results;
  }

  static async findById(owner_id) {
    const sql = "SELECT * FROM laundry_shops WHERE owner_id = ?";
    const results = await this.query(sql, [owner_id]);
    return results[0];
  }

  static async editShopById(owner_id, shopData) {
    try {
      if (!owner_id) {
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
      const shopExists = await this.findById(owner_id);
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
            WHERE owner_id = ?`;

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
        owner_id,
      ]);

      if (result.affectedRows === 0) {
        throw new Error("Failed to update shop");
      }

      // Return updated shop data
      return this.findById(owner_id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LaundryShops;
