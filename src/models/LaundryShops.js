const BaseModel = require("./BaseModel");

class LaundryShops extends BaseModel {
  static async findByName(shopName, ownerEmail, ownerContactNum) {
    const sql =
      "SELECT * FROM laundry_shops WHERE admin_emailAdd = ? AND admin_contactNum = ? AND shop_name = ?";
    const results = await this.query(sql, [
      ownerEmail,
      ownerContactNum,
      shopName,
    ]);
    return results[0];
  }

  static async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE role = 'ADMIN' AND email = ?";
    const result = await this.query(sql, [email]);
    return result[0];
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
        slug,
        shop_type,
      } = shopData;

      // Insert laundry shop
      const insertShopSql = `
      INSERT INTO laundry_shops 
      (shop_id, admin_id, admin_fName, admin_mName, admin_lName, admin_emailAdd, admin_contactNum, shop_address, shop_name, slug, shop_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        slug,
        shop_type,
      ]);

      const updateAdminSql = `UPDATE users SET shop_id = ? WHERE user_id = ?`;
      await this.query(updateAdminSql, [shop_id, admin_id]);

      const serviceList = shop_type
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const insertServiceSQL = `
      INSERT INTO shop_services
      (shop_id, service_name, is_displayed)
      VALUES (?, ?, ?)
    `;

      for (const service of serviceList) {
        await this.query(insertServiceSQL, [shop_id, service, "true"]);
      }

      return { success: true, shop_id, admin_id };
    } catch (error) {
      console.error("Error creating laundry shop:", error);
      throw new Error(`Failed to create laundry shop: ${error.message}`);
    }
  }

  static async getAllShops() {
    try {
      const shopSql = "SELECT * FROM laundry_shops";
      const shops = await this.query(shopSql);

      const servicesSql =
        "SELECT service_id, shop_id, service_name, is_displayed FROM shop_services";
      const allServices = await this.query(servicesSql);

      const servicesByShopId = allServices.reduce((acc, service) => {
        const shopId = service.shop_id;
        if (!acc[shopId]) {
          acc[shopId] = [];
        }
        acc[shopId].push(service);
        return acc;
      }, {});

      const shopsWithServices = shops.map((shop) => {
        const shopId = shop.shop_id;
        const shopServices = servicesByShopId[shopId] || [];

        return {
          ...shop,
          services: shopServices,
        };
      });

      return {
        shops: shopsWithServices,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch shop data or services: ${error.message}`
      );
    }
  }

  static async findById(shop_id) {
    const sql = "SELECT * FROM laundry_shops WHERE shop_id = ?";
    const results = await this.query(sql, [shop_id]);
    return results[0];
  }

  static async editShopById(shop_id, shopData) {
    try {
      if (!shop_id) throw new Error("Shop ID is required");

      const { services, ...data } = shopData;

      if (!data || Object.keys(data).length === 0) {
        throw new Error("Shop main data is missing");
      }

      const shopExists = await this.findById(shop_id);
      if (!shopExists) throw new Error("Shop not found");

      const updateQuery = `
      UPDATE laundry_shops 
      SET admin_fName = ?,
          admin_mName = ?,
          admin_lName = ?,
          admin_contactNum = ?,
          shop_address = ?,
          shop_name = ?,
          shop_status = ?,
          shop_type = ?
      WHERE shop_id = ?`;

      const params = [
        data.owner_fName,
        data.owner_mName || "",
        data.owner_lName,
        data.owner_contactNum,
        data.shop_address,
        data.shop_name,
        data.shop_status || "active",
        data.shop_type,
        shop_id,
      ];

      await this.query(updateQuery, params);

      if (Array.isArray(services) && services.length > 0) {
        const hideAllSql =
          "UPDATE shop_services SET is_displayed = 'false' WHERE shop_id = ?";
        await this.query(hideAllSql, [shop_id]);

        const servicesToShow = services
          .filter((s) => s.is_displayed === "true")
          .map((s) => s.service_id);

        if (servicesToShow.length > 0) {
          const placeholders = servicesToShow.map(() => "?").join(", ");
          const showSql = `
          UPDATE shop_services
          SET is_displayed = 'true'
          WHERE shop_id = ?
          AND service_id IN (${placeholders})
        `;
          const showParams = [shop_id, ...servicesToShow];
          await this.query(showSql, showParams);
        }
      }

      // Return updated shop
      const updatedShop = await this.findById(shop_id);
      return updatedShop;
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
        item_category,
        item_quantity,
        item_uPrice,
        item_reorderLevel,
      } = inventoryData;

      const sql = `INSERT INTO shop_inventory
                   (item_id,
                    shop_id,
                    item_name,
                    item_description,
                    item_category,
                    item_quantity,
                    item_uPrice,
                    item_reorderLevel)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      return this.query(sql, [
        item_id,
        shop_id,
        item_name,
        item_description,
        item_category,
        item_quantity,
        item_uPrice,
        item_reorderLevel,
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
                       item_category = ?,
                       item_quantity = ?,
                       item_uPrice = ?,
                       item_reorderLevel = ?,
                       date_updated = NOW()
                   WHERE item_id = ?`;

      const params = [
        inventoryData.item_name,
        inventoryData.item_description || "",
        inventoryData.item_category || "",
        inventoryData.item_quantity,
        inventoryData.item_uPrice,
        inventoryData.item_reorderLevel,
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

  static async getInventoryItemById(item_id) {
    const sql = `SELECT item_quantity, item_reorderLevel FROM shop_inventory WHERE item_id = ? LIMIT 1`;
    const rows = await this.query(sql, [item_id]);
    return rows[0] || null;
  }

  static async updateStockAndReorderLevel(item_id, newQuantity, newReorder) {
    const sql = `
      UPDATE shop_inventory 
      SET item_quantity = ?, item_reorderLevel = ?, date_updated = NOW()
      WHERE item_id = ?
  `;
    return await this.query(sql, [newQuantity, newReorder, item_id]);
  }

  static async selectAllDashboardDetails(shop_id) {
    try {
      const getDashboardDataQuery = `
                                    SELECT
                                    SUM(CASE WHEN status = 'Ready to pick up' THEN 1 ELSE 0 END) AS readyToPickUpCount,
                                    SUM(CASE WHEN payment_status = 'PENDING' THEN 1 ELSE 0 END) AS pendingPaymentCount,
                                    SUM(CASE WHEN status = 'On Service' THEN 1 ELSE 0 END) AS onServiceCount,
                                    SUM(CASE WHEN status = 'On Service' AND YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1) THEN 1 ELSE 0 END) AS onServiceThisWeekCount,
                                  
                                    SUM(
                                        CASE 
                                            WHEN 
                                                YEAR(created_at) = YEAR(CURDATE()) 
                                                AND MONTH(created_at) = MONTH(CURDATE()) 
                                            THEN 
                                                total_amount
                                            ELSE 
                                                0
                                        END
                                    ) AS monthlyEarnings,
                                    (
                                        SELECT 
                                            COUNT(*) 
                                        FROM 
                                            shop_inventory 
                                        WHERE 
                                            shop_inventory.shop_id = t1.shop_id 
                                    ) AS totalInventoryItems
                                FROM 
                                    customer_transactions AS t1
                                WHERE 
                                    t1.shop_id = ?`;

      const results = await this.query(getDashboardDataQuery, [shop_id]);

      return results[0];
    } catch (error) {
      console.error("LaundryShops.selectAllDashboardDetails error: ", error);
      throw error;
    }
  }

  static async selectWeeklyTransactions(shop_id) {
    try {
      const sql = `
            SELECT 
            laundryId, 
            shop_id, 
            cus_id, 
            cus_name, 
            cus_address, 
            cus_phoneNum, 
            batch, 
            kg, 
            service, 
            status,
            total_amount
            FROM customer_transactions 
            WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)
            AND status = 'On Service'
            AND shop_id = ?
            ORDER BY created_at DESC`;

      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error("Error fetching weekly transactions:", error);
      throw error;
    }
  }

  static async selectPendingServiceTrans(shop_id) {
    try {
      const sql = `SELECT * FROM customer_transactions
                   WHERE status = 'On Service'
                   AND shop_id = ?
                   ORDER BY created_at ASC`;
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error("Error fetching On Service transactions:", error);
      throw error;
    }
  }

  static async selectPendingPaymentsTrans(shop_id) {
    try {
      const sql = `SELECT * FROM customer_transactions
                  WHERE payment_status = "PENDING"
                  AND shop_id = ?
                  ORDER BY created_at ASC`;
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error(
        "Error fetching pending payment status transactions:",
        error
      );
      throw error;
    }
  }

  static async updatePaymentStatus(laundryId, payment_status) {
    try {
      const sql = `
                  UPDATE customer_transactions
                  SET payment_status = ?, updated_at = NOW()
                  WHERE laundryId = ?
                  `;
      return await this.query(sql, [payment_status, laundryId]); 
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw new Error(`Failed to update payment status: ${error.message}`);
    }
  }
}

module.exports = LaundryShops;
