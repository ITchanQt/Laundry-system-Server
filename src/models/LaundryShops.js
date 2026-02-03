const { formatHourRange, getDayPeriod } = require("../utils/formatHourRange");
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
        shop_status = "Pending",
        shop_type,
      } = shopData;

      // Insert laundry shop
      const insertShopSql = `
      INSERT INTO laundry_shops 
      (shop_id, admin_id, admin_fName, admin_mName, admin_lName, admin_emailAdd, admin_contactNum, shop_address, shop_name, slug, shop_status, shop_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        shop_status,
        shop_type,
      ]);

      const updateAdminSql = `UPDATE users SET shop_id = ? WHERE user_id = ?`;
      await this.query(updateAdminSql, [shop_id, admin_id]);

      const serviceList = shop_type
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      await this.query(`DELETE FROM shop_services WHERE shop_id = ?`, [
        shop_id,
      ]);

      const insertServiceSQL = `INSERT INTO shop_services (shop_id, service_name, is_displayed) VALUES (?, ?, ?)`;

      const uniqueServices = [...new Set(serviceList)];

      for (const service of uniqueServices) {
        await this.query(insertServiceSQL, [shop_id, service, "true"]);
      }

      const insertPricingSQL = `
        INSERT INTO shop_pricing 
        (shop_id, categories, price, pricing_label, description, is_displayed) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      await this.query(insertPricingSQL, [
        shop_id,
        "Clothes",
        140.0,
        "per load(7kg)",
        "Shirts, shorts, pants, jeans, etc.",
        "true",
      ]);

      return { success: true, shop_id, admin_id };
    } catch (error) {
      console.error("Error creating laundry shop:", error);
      throw new Error(`Failed to create laundry shop: ${error.message}`);
    }
  }

  static async createBusDocs(docsArray) {
    try {
      if (!Array.isArray(docsArray) || docsArray.length === 0) {
        throw new Error("Documents array cannot be empty");
      }

      const values = docsArray.map(() => "(?, ?, ?, NOW())").join(",");
      const params = [];

      docsArray.forEach((doc) => {
        params.push(doc.shop_id, doc.docs_name, doc.docs_img);
      });

      const sql = `
        INSERT INTO business_docs (shop_id, docs_type, docs_img, created_at)
        VALUES ${values}
      `;

      const result = await this.query(sql, params);
      return result;
    } catch (error) {
      console.error("Model Error in createBusDocs:", error);
      throw error;
    }
  }

  static async findBusDocsByShopId(shop_id) {
    try {
      const sql = `
        SELECT * FROM business_docs 
        WHERE shop_id = ? 
        ORDER BY created_at DESC
      `;

      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error("Model Error in findBusDocsByShopId:", error);
      throw error;
    }
  }

  static async createBranch(shopData) {
    try {
      const shop_id = await this.generateShopId();

      const {
        parent_shopId,
        admin_id,
        owner_fName,
        owner_mName,
        owner_lName,
        owner_emailAdd,
        owner_contactNum,
        shop_address,
        shop_name,
        slug,
        shop_status = "Pending",
        shop_type,
      } = shopData;

      const insertShopSql = `
      INSERT INTO laundry_shops 
      (shop_id, parent_shop_id, admin_id, admin_fName, admin_mName, admin_lName, admin_emailAdd, admin_contactNum, shop_address, shop_name, slug, shop_status, shop_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      await this.query(insertShopSql, [
        shop_id,
        parent_shopId,
        admin_id,
        owner_fName,
        owner_mName,
        owner_lName,
        owner_emailAdd,
        owner_contactNum,
        shop_address,
        shop_name,
        slug,
        shop_status,
        shop_type,
      ]);

      const serviceList = shop_type
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      await this.query(`DELETE FROM shop_services WHERE shop_id = ?`, [
        shop_id,
      ]);

      const insertServiceSQL = `INSERT INTO shop_services (shop_id, service_name, is_displayed) VALUES (?, ?, ?)`;
      const uniqueServices = [...new Set(serviceList)];

      for (const service of uniqueServices) {
        await this.query(insertServiceSQL, [shop_id, service, "true"]);
      }

      const insertPricingSQL = `
        INSERT INTO shop_pricing 
        (shop_id, categories, price, pricing_label, description, is_displayed) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      await this.query(insertPricingSQL, [
        shop_id,
        "Clothes",
        140.0,
        "per load(7kg)",
        "Shirts, shorts, pants, jeans, etc.",
        "true",
      ]);

      return { success: true, shop_id, admin_id };
    } catch (error) {
      console.error("Error creating shop branch:", error);
      throw new Error(`Failed to create shop branch: ${error.message}`);
    }
  }

  static async setShopStatus(shop_id, shop_status) {
    try {
      const sql = `
                  UPDATE laundry_shops
                  SET shop_status = ?
                  WHERE shop_id = ?`;
      const result = await this.query(sql, [shop_status, shop_id]);
      return result;
    } catch (error) {
      console.error("Model Error in setShopStatus:", error);
      throw error;
    }
  }

  static async getShopLinksAndEmailAndSend(shop_id) {
    try {
      const sql = `
      SELECT admin_emailAdd, slug, shop_name
      FROM laundry_shops 
      WHERE shop_id = ?
    `;

      const result = await this.query(sql, [shop_id]);

      if (!result || result.length === 0) {
        throw new Error(`Shop with ID ${shop_id} not found`);
      }

      const { admin_emailAdd, slug, shop_name } = result[0];

      const links = {
        admin: `https://laundry-system-admin-module.vercel.app/${slug}`,
        staff: `https://laundry-system-staff-module.vercel.app/${slug}`,
        customer: `https://laundry-system-customer-module.vercel.app/${slug}`,
      };

      return {
        success: true,
        shop_id,
        shop_name,
        admin_emailAdd,
        slug,
        links,
      };
    } catch (error) {
      console.error("Model Error in getShopLinksAndEmailAndSend:", error);
      throw error;
    }
  }

  static async getAllShops() {
    try {
      const shopSql =
        "SELECT * FROM laundry_shops ORDER BY date_registered DESC";
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
        `Failed to fetch shop data or services: ${error.message}`,
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
        data.shop_status || "Active",
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
    item_id_to_exclude,
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
    quantityChange,
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
                   ORDER BY created_at DESC`;
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
                  ORDER BY created_at DESC`;
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error(
        "Error fetching pending payment status transactions:",
        error,
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
                  ORDER BY created_at DESC 
                  `;
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      console.error(
        "Error fetching ready to pick up service status transactions:",
        error,
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
        error,
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

  // 1) Average Transactions Per Staff
  static async selectAverageTransactionsPerStaff(shop_id, startDate, endDate) {
    const query = `
    SELECT 
      ct.process_by AS staff_id,
      COUNT(*) AS total_transactions
    FROM customer_transactions ct
    INNER JOIN users u ON ct.process_by = u.user_id
    WHERE ct.shop_id = ? 
      AND DATE(ct.created_at) BETWEEN ? AND ?
      AND ct.process_by IS NOT NULL 
      AND ct.process_by != ''
      AND u.role = 'STAFF'
    GROUP BY ct.process_by
  `;

    const rows = await this.query(query, [shop_id, startDate, endDate]);

    if (!rows.length) {
      return {
        staff_count: 0,
        total_transactions: 0,
        average_transactions_per_staff: 0,
        breakdown: [],
      };
    }

    const totalTransactions = rows.reduce(
      (sum, r) => sum + Number(r.total_transactions),
      0,
    );
    const staffCount = rows.length;
    const average = totalTransactions / staffCount;

    return {
      staff_count: staffCount,
      total_transactions: totalTransactions,
      average_transactions_per_staff: Number(average.toFixed(2)),
      breakdown: rows,
    };
  }

  // 2) Most Active Staff
  static async selectMostActiveStaff(shop_id, startDate, endDate) {
    const query = `
    SELECT ct.process_by AS staff_id,
           COUNT(*) AS transaction_count
    FROM customer_transactions ct
    INNER JOIN users u ON ct.process_by = u.user_id
    WHERE ct.shop_id = ?
      AND DATE(ct.created_at) BETWEEN ? AND ?
      AND ct.process_by IS NOT NULL 
      AND ct.process_by != ''
      AND u.role = 'STAFF'
    GROUP BY ct.process_by
    ORDER BY transaction_count DESC
    LIMIT 1
  `;

    const rows = await this.query(query, [shop_id, startDate, endDate]);

    if (!rows.length) return null;

    const staffId = rows[0].staff_id;
    const userQuery = `SELECT user_id, user_fName, user_lName, role FROM users WHERE user_id = ? LIMIT 1`;
    const userRows = await this.query(userQuery, [staffId]);

    return {
      staff_id: staffId,
      transaction_count: rows[0].transaction_count,
      user: userRows.length ? userRows[0] : null,
    };
  }

  // 3) Peak System Hour usage
  static async selectPeakSystemHour(shop_id, startDate, endDate) {
    const query = `
    SELECT 
      HOUR(created_at) AS hour_slot,
      COUNT(*) AS transaction_count
    FROM customer_transactions
    WHERE shop_id = ?
      AND DATE(created_at) BETWEEN ? AND ?
      AND created_at IS NOT NULL
    GROUP BY hour_slot
    ORDER BY transaction_count DESC
    LIMIT 1
  `;

    const rows = await this.query(query, [shop_id, startDate, endDate]);

    if (!rows.length) return null;

    const hour = rows[0].hour_slot;
    const formatted = formatHourRange(hour);

    return {
      peak_hour: hour,
      peak_hour_label: formatted.label,
      peak_hour_range: formatted.range,
      day_period: getDayPeriod(hour),
      transaction_count: rows[0].transaction_count,
    };
  }

  static async findScopeShops(shopId) {
    try {
      const rootSql = `
      SELECT 
        CASE
          WHEN parent_shop_id IS NULL THEN shop_id
          ELSE parent_shop_id
        END AS root_shop_id
      FROM laundry_shops
      WHERE shop_id = ? 
        AND shop_status = 'Active'
    `;

      const [root] = await this.query(rootSql, [shopId]);

      if (!root?.root_shop_id) {
        throw new Error("Invalid shop scope or shop is not Active");
      }

      const rootShopId = root.root_shop_id;

      const scopeSql = `
      SELECT shop_id, shop_name
      FROM laundry_shops
      WHERE shop_status = 'Active' 
        AND (shop_id = ? OR parent_shop_id = ?)
      ORDER BY shop_name ASC
    `;

      return await this.query(scopeSql, [rootShopId, rootShopId]);
    } catch (error) {
      console.error("LaundryShop.findScopeShops error:", error);
      throw error;
    }
  }

  static async findItemHistoryByShopId(shop_id) {
    try {
      const sql = `
      SELECT
        ih.id,
        ih.item_id,
        ih.user_id,
        u.role AS user_role,
        ih.action_type,
        ih.quantity_change,
        ih.new_stock,
        ih.created_at
      FROM inventory_history ih
      INNER JOIN shop_inventory si
        ON ih.item_id = si.item_id
      INNER JOIN users u
        ON ih.user_id = u.user_id
      WHERE si.shop_id = ?
      ORDER BY ih.created_at DESC
    `;

      const result = await this.query(sql, [shop_id]);
      return result;
    } catch (error) {
      console.error("LaundryShop.findItemHistoryByShopId error:", error);
      throw error;
    }
  }
}

module.exports = LaundryShops;
