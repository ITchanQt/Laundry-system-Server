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

  static async generateAdminId() {
    try {
      // Get the highest admin ID
      const sql = ` SELECT user_id 
                    FROM users 
                    ORDER BY CAST(SUBSTRING(user_id, 6) AS UNSIGNED) DESC 
                    LIMIT 1`;

      const results = await this.query(sql);

      let nextNumber = 1;
      if (results && results.length > 0) {
        const lastId = results[0].user_id;
        const lastNumber = parseInt(lastId.split("-")[1]);
        nextNumber = lastNumber + 1;
      }

      // Format: LMSU-00001
      return `LMSA-${String(nextNumber).padStart(5, "0")}`;
    } catch (error) {
      throw new Error(`Failed to generate admin ID: ${error.message}`);
    }
  }

  static async create(shopData) {
    try {
      let { admin_id } = shopData;
      const new_shop_id = await this.generateShopId();

      // 1. CHECK IF ADMIN ALREADY HAS A SHOP ASSIGNED
      const checkAdminSql = `SELECT * FROM users WHERE user_id = ?`;
      const adminRows = await this.query(checkAdminSql, [admin_id]);

      if (adminRows.length > 0 && adminRows[0].shop_id !== null) {
        // ADMIN ALREADY HAS A SHOP -> CLONE THE USER
        const existingAdmin = adminRows[0];
        const new_admin_user_id = await this.generateAdminId(); // Assuming this helper exists in your User model

        const cloneAdminSql = `
        INSERT INTO users 
        (user_id, shop_id, username, email, password, user_fName, user_mName, user_lName, user_address, contactNum, role, status, registered_by) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await this.query(cloneAdminSql, [
          new_admin_user_id,
          new_shop_id, // Assign the NEW shop_id here
          existingAdmin.username,
          existingAdmin.email,
          existingAdmin.password, // Copying the hashed password directly
          existingAdmin.user_fName,
          existingAdmin.user_mName,
          existingAdmin.user_lName,
          existingAdmin.user_address,
          existingAdmin.contactNum,
          existingAdmin.role,
          existingAdmin.status,
          existingAdmin.registered_by,
        ]);

        // Update the admin_id reference so the laundry_shop table uses the NEW cloned user
        admin_id = new_admin_user_id;
      } else {
        // ADMIN IS FRESH (NULL shop_id) -> JUST UPDATE EXISTING ROW
        const updateAdminSql = `UPDATE users SET shop_id = ? WHERE user_id = ?`;
        await this.query(updateAdminSql, [new_shop_id, admin_id]);
      }

      // 2. INSERT LAUNDRY SHOP
      const {
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

      const insertShopSql = `
      INSERT INTO laundry_shops 
      (shop_id, admin_id, admin_fName, admin_mName, admin_lName, admin_emailAdd, admin_contactNum, shop_address, shop_name, slug, shop_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      await this.query(insertShopSql, [
        new_shop_id,
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

      // 3. INSERT SERVICES
      const serviceList = shop_type
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      // ADD THIS: Clear any accidental duplicates for this specific shop_id
      await this.query(`DELETE FROM shop_services WHERE shop_id = ?`, [
        new_shop_id,
      ]);

      const insertServiceSQL = `INSERT INTO shop_services (shop_id, service_name, is_displayed) VALUES (?, ?, ?)`;

      // Use a Set here too, just in case the string sent from frontend is still messy
      const uniqueServices = [...new Set(serviceList)];

      for (const service of uniqueServices) {
        await this.query(insertServiceSQL, [new_shop_id, service, "true"]);
      }

      return { success: true, shop_id: new_shop_id, admin_id };
    } catch (error) {
      console.error("Error creating laundry shop:", error);
      throw error;
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
        user_id,
        item_name,
        item_description = "",
        item_category,
        item_quantity,
        item_uPrice,
        item_reorderLevel,
      } = inventoryData;

      const sql = `INSERT INTO shop_inventory
                 (item_id, shop_id, item_name, item_description, item_category, item_quantity, item_uPrice, item_reorderLevel)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      await this.query(sql, [
        item_id,
        shop_id,
        item_name,
        item_description,
        item_category,
        item_quantity,
        item_uPrice,
        item_reorderLevel,
      ]);

      const historySql = `INSERT INTO inventory_history 
                        (item_id, user_id, action_type, quantity_change, new_stock) 
                        VALUES (?, ?, ?, ?, ?)`;

      await this.query(historySql, [
        item_id,
        user_id,
        "ADD",
        item_quantity,
        item_quantity,
      ]);

      const action = "Add Item";
      const logQuery = `INSERT INTO activity_log (shop_id, activity_id, action) VALUES (?, ?, ?)`;
      await this.query(logQuery, [shop_id, item_id, action]);
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
      if (!item_id) throw new Error("Item id is required");

      const itemExist = await this.findItemById(item_id);
      if (!itemExist) throw new Error("Item not found");

      const oldQuantity = itemExist.item_quantity;
      const newQuantity = inventoryData.item_quantity;
      const quantityChange = newQuantity - oldQuantity;

      const updateSql = `
      UPDATE shop_inventory
      SET item_name = ?, item_description = ?, item_category = ?, 
          item_quantity = ?, item_uPrice = ?, item_reorderLevel = ?, 
          date_updated = NOW()
      WHERE item_id = ?
    `;

      const params = [
        inventoryData.item_name,
        inventoryData.item_description || "",
        inventoryData.item_category || "",
        newQuantity,
        inventoryData.item_uPrice,
        inventoryData.item_reorderLevel,
        item_id,
      ];

      const result = await this.query(updateSql, params);
      if (result.affectedRows === 0) throw new Error("Failed to update item");

      const historySql = `
      INSERT INTO inventory_history 
      (item_id, user_id, action_type, quantity_change, new_stock) 
      VALUES (?, ?, ?, ?, ?)
    `;
      let actionType = "EDIT";
      if (quantityChange > 0) actionType = "RESTOCK";
      if (quantityChange < 0) actionType = "SUBTRACT";

      await this.query(historySql, [
        item_id,
        inventoryData.user_id,
        actionType,
        quantityChange,
        newQuantity,
      ]);

      const logSql = `
      INSERT INTO activity_log (shop_id, activity_id, action)
      SELECT shop_id, item_id, ?
      FROM shop_inventory WHERE item_id = ?
    `;
      await this.query(logSql, ["Update Item", item_id]);

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

  static async updateStockAndLogHistory(
    item_id,
    user_id,
    newQuantity,
    newReorder,
    quantityChange
  ) {
    try {
      const updateSql = `
      UPDATE shop_inventory 
      SET item_quantity = ?, item_reorderLevel = ?, date_updated = NOW()
      WHERE item_id = ?
    `;
      await this.query(updateSql, [newQuantity, newReorder, item_id]);

      const historySql = `
      INSERT INTO inventory_history 
      (item_id, user_id, action_type, quantity_change, new_stock) 
      VALUES (?, ?, ?, ?, ?)
    `;

      const actionType = quantityChange < 0 ? "SUBTRACT" : "RESTOCK";

      await this.query(historySql, [
        item_id,
        user_id,
        actionType,
        quantityChange,
        newQuantity,
      ]);
    } catch (error) {
      throw new Error(`History log failed: ${error.message}`);
    }
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
                                                AND status = 'Laundry Done'      -- Condition 1
                                                AND payment_status = 'PAID'      -- Condition 2
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
      await this.query(sql, [payment_status, laundryId]);

      const logSql = `
      INSERT INTO activity_log (shop_id, user_id, activity_id, action)
      SELECT shop_id, cus_id, laundryId, ?
      FROM customer_transactions
      WHERE laundryId = ?
    `;
      const action = "Online payment received";
      return await this.query(logSql, [action, laundryId]);
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw new Error(`Failed to update payment status: ${error.message}`);
    }
  }

  static async updatePaymentStatusCash(laundryId, payment_status) {
    try {
      const sql = `
                  UPDATE customer_transactions
                  SET payment_status = ?, updated_at = NOW()
                  WHERE laundryId = ?
                  `;
      await this.query(sql, [payment_status, laundryId]);

      const logSql = `
      INSERT INTO activity_log (shop_id, user_id, activity_id, action)
      SELECT shop_id, cus_id, laundryId, ?
      FROM customer_transactions
      WHERE laundryId = ?
    `;
      const action = "Cash payment received";
      return await this.query(logSql, [action, laundryId]);
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw new Error(`Failed to update payment status: ${error.message}`);
    }
  }

  static async selectReadyToPickUpTrans(shop_id) {
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
                    total_amount,
                    status,
                    payment_status
                  FROM customer_transactions
                  WHERE status = "Ready to pick up"
                  AND shop_id = ?
                  ORDER BY created_at ASC 
                  `;
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error(
        "Error fetching ready to pick up service status transactions:",
        error
      );
      throw error;
    }
  }

  static async updateReadyToPickUpIfPaid(service_status, laundryId) {
    try {
      const sql = `
                  UPDATE customer_transactions 
                  SET status = ? 
                  WHERE laundryId = ? AND payment_status = 'PAID'`;
      return await this.query(sql, [service_status, laundryId]);
    } catch (error) {
      console.error("Error updating service status:", error);
      throw new Error(`Failed to update service status: ${error.message}`);
    }
  }

  static async selectCompletedTransaction(shop_id) {
    try {
      const sql = `
                  SELECT
                  laundryId,
                  shop_id,
                  cus_id,
                  service,
                  total_amount,
                  status,
                  updated_at
                  FROM customer_transactions
                  WHERE status = 'Laundry Done'
                  AND payment_status = 'PAID'  
                  AND shop_id = ?`;
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error(
        "Error fetching laundry done or completed service status transactions:",
        error
      );
      throw error;
    }
  }

  static async getMonthlyStats(shop_id) {
    const sql = `
                SELECT
                  MONTH(updated_at) AS month_number,
                  MONTHNAME(updated_at) AS month_name,
                  COUNT(*) AS transaction_count,
                  SUM(total_amount) AS total_amount
                FROM customer_transactions
                WHERE shop_id = ?
                  AND status = 'Laundry Done'
                  AND payment_status = 'PAID' 
                  AND YEAR(updated_at) = YEAR(CURDATE())
                GROUP BY MONTH(updated_at), MONTHNAME(updated_at)
                ORDER BY month_number;
              `;
    return this.query(sql, [shop_id]);
  }

  /* =========================
     Yearly total amount
     ========================= */
  static async getYearlyTotal(shop_id) {
    const sql = `
                SELECT
                  IFNULL(SUM(total_amount), 0) AS yearly_total_amount
                FROM customer_transactions
                WHERE shop_id = ?
                  AND status = 'Laundry Done'
                  AND payment_status = 'PAID' 
                  AND YEAR(updated_at) = YEAR(CURDATE());
              `;
    return this.query(sql, [shop_id]);
  }

  /* =========================
     Average monthly amount
     ========================= */
  static async getAverageMonthly(shop_id) {
    const sql = `
                SELECT
                  IFNULL(AVG(monthly_total), 0) AS average_monthly_amount
                FROM (
                  SELECT SUM(total_amount) AS monthly_total
                  FROM customer_transactions
                  WHERE shop_id = ?
                    AND status = 'Laundry Done'
                    AND payment_status = 'PAID' 
                    AND YEAR(updated_at) = YEAR(CURDATE())
                  GROUP BY MONTH(updated_at)
                ) t;
              `;
    return this.query(sql, [shop_id]);
  }

  /* =========================
     Total transaction count
     ========================= */
  static async getTotalTransactions(shop_id) {
    const sql = `
                SELECT
                  COUNT(*) AS total_transactions
                FROM customer_transactions
                WHERE shop_id = ?
                  AND status = 'Laundry Done'
                  AND payment_status = 'PAID' 
                  AND YEAR(updated_at) = YEAR(CURDATE());
              `;
    return this.query(sql, [shop_id]);
  }

  /* =========================
     Highest month
     ========================= */
  static async getHighestMonth(shop_id) {
    const sql = `
                SELECT
                  MONTHNAME(updated_at) AS month,
                  SUM(total_amount) AS total_amount
                FROM customer_transactions
                WHERE shop_id = ?
                  AND status = 'Laundry Done'
                  AND payment_status = 'PAID' 
                  AND YEAR(updated_at) = YEAR(CURDATE())
                GROUP BY MONTH(updated_at), MONTHNAME(updated_at)
                ORDER BY total_amount DESC
                LIMIT 1;
              `;
    return this.query(sql, [shop_id]);
  }

  static async selectActivityLogs(shop_id) {
    try {
      const sql = `SELECT *
                   FROM activity_log
                   WHERE shop_id = ?
                   ORDER BY created_at DESC
                   `;
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      throw error;
    }
  }

  static async selectItemHistoryByItemId(item_id) {
    const sql = `SELECT 
                  ih.*, 
                  u.role AS user_role
                  FROM inventory_history ih
                  JOIN users u ON ih.user_id = u.user_id
                  WHERE ih.item_id = ?
                  ORDER BY ih.created_at DESC`;
    const results = await this.query(sql, [item_id]);
    return results;
  }
}

module.exports = LaundryShops;
