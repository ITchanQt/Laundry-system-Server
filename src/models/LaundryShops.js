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
      const sql =
        "SELECT shop_id FROM laundry_shops ORDER BY shop_id DESC LIMIT 1";
      const results = await this.query(sql);

      let nextNumber = 1;
      if (results && results.length > 0) {
        const lastId = results[0].shop_id;
        const lastNumber = parseInt(lastId.split("-")[1]);
        nextNumber = lastNumber + 1;
      }

      // Format: LMSA-00001
      return `LMSS-${String(nextNumber).padStart(5, "0")}`;
    } catch (error) {
      throw new Error(`Failed to generate admin ID: ${error.message}`);
    }
  }

  static async create(shopData) {
    try {
      // Generate a new shop ID
      const shop_id = await this.generateShopId();

      const {
        admin_id,
        owner_fName,
        owner_mName,
        owner_lName,
        owner_emailAdd,
        owner_contactNum,
        shop_address,
        shop_name,
        shop_type,
      } = shopData;

      // Insert new shop
      const insertShopSql = `
      INSERT INTO laundry_shops 
      (shop_id, admin_id, owner_fName, owner_mName, owner_lName, owner_emailAdd, owner_contactNum, shop_address, shop_name, shop_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      await this.query(insertShopSql, [
        shop_id,
        admin_id,
        owner_fName,
        owner_mName,
        owner_lName,
        owner_emailAdd,
        owner_contactNum,
        shop_address,
        shop_name,
        shop_type,
      ]);

      // Automatically update the admin's shop_id
      const updateAdminSql = `UPDATE admins SET shop_id = ? WHERE admin_id = ?`;
      await this.query(updateAdminSql, [shop_id, admin_id]);

      // Return both for confirmation
      return { success: true, shop_id, admin_id };
    } catch (error) {
      console.error("Error creating laundry shop:", error);
      throw new Error(`Failed to create laundry shop: ${error.message}`);
    }
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
        throw new Error("Shop ID is required");
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

      const params = [
        shopData.owner_fName,
        shopData.owner_mName || "",
        shopData.owner_lName,
        shopData.owner_contactNum,
        shopData.shop_address,
        shopData.shop_name,
        shopData.shop_status || "active",
        shopData.shop_type,
        shop_id,
      ];

      console.log("Update params:", params);

      const result = await this.query(query, params);

      if (result.affectedRows === 0) {
        throw new Error("Failed to update shop");
      }

      return await this.findById(shop_id);
    } catch (error) {
      console.error("Shop update error:", error);
      throw error;
    }
  }

  //-----SHOP INVENTORY API's-------//

  static async getShopInventoryByName(item_name) {
    try {
      const sql = "SELECT * FROM shop_inventory WHERE item_name = ?";
      const results = await this.query(sql, [item_name]);
      return results[0];
    } catch (error) {
      throw new Error(`Failed to get shop inventory by name: ${error.message}`);
    }
  }

  static async generateItemId() {
    try {
      // Get the highest admin ID
      const sql =
        "SELECT item_id FROM shop_inventory ORDER BY item_id DESC LIMIT 1";
      const results = await this.query(sql);

      let nextNumber = 1;
      if (results && results.length > 0) {
        const lastId = results[0].item_id;
        const lastNumber = parseInt(lastId.split("-")[1]);
        nextNumber = lastNumber + 1;
      }

      // Format: LMSI-00001
      return `LMSI-${String(nextNumber).padStart(5, "0")}`;
    } catch (error) {
      throw new Error(`Failed to generate item ID: ${error.message}`);
    }
  }

  static async findItemById(item_id) {
    const sql = "SELECT * FROM shop_inventory WHERE item_id = ?";
    const results = await this.query(sql, [item_id]);
    return results[0];
  }

  static async findByItemNameAndShopId(item_name, shop_id) {
    try {
      const sql =
        "SELECT * FROM shop_inventory WHERE item_name = ? AND shop_id = ?";
      const results = await this.query(sql, [item_name, shop_id]);
      return results;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async addShopInventory(inventoryData) {
    try {
      const item_id = await this.generateItemId();
      const {
        shop_id,
        item_name,
        item_description = "",
        item_quantity,
        item_uPrice,
        item_reoderLevel,
      } = inventoryData;

      const sql = `INSERT INTO shop_inventory
                   (item_id,
                    shop_id,
                    item_name,
                    item_description,
                    item_quantity,
                    item_uPrice,
                    item_reoderLevel)
                  VALUES (?, ?, ?, ?, ?, ?, ?)`;

      return this.query(sql, [
        item_id,
        shop_id,
        item_name,
        item_description,
        item_quantity,
        item_uPrice,
        item_reoderLevel,
      ]);
    } catch (error) {
      throw new Error(`Failed to create shop inventory: ${error.message}`);
    }
  }

  static async findAllShopInventory(shop_id) {
    try {
      const sql = "SELECT * FROM shop_inventory WHERE shop_id = ?";
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      throw new Error(`Failed to get all shop inventory: ${error.message}`);
    }
  }

  static async findDuplicateByNameAndShopId(
    item_name,
    shop_id,
    item_id_to_exclude
  ) {
    const sql = `SELECT item_id FROM shop_inventory 
                 WHERE item_name = ? 
                   AND shop_id = ? 
                   AND item_id != ?`;

    const params = [item_name, shop_id, item_id_to_exclude];

    return await this.query(sql, params);
  }

  static async editShopInventoryById(item_id, inventoryData) {
    try {
      if (!item_id) {
        throw new Error("Item id is required");
      }

      const itemExist = await this.findItemById(item_id);
      if (!itemExist) {
        throw new Error("Item not found");
      }

      const sql = `UPDATE shop_inventory
                   SET item_name = ?,
                       item_description = ?,
                       item_quantity = ?,
                       item_uPrice = ?,
                       item_reoderLevel = ?,
                       date_updated = NOW()
                   WHERE item_id = ?`;

      const params = [
        inventoryData.item_name,
        inventoryData.item_description || "",
        inventoryData.item_quantity,
        inventoryData.item_uPrice,
        inventoryData.item_reoderLevel,
        item_id,
      ];

      console.log("Update params:", params);

      const result = await this.query(sql, params);

      if (result.affectedRows === 0) {
        throw new Error("Failed to update item");
      }

      return await this.findItemById(item_id);
    } catch (error) {
      console.error("Item update error:", error);
      throw error;
    }
  }
}

module.exports = LaundryShops;
