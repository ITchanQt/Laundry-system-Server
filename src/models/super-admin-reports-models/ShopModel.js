const pool = require("../../config/db");

class ShopModel {
  static async getAllShops() {
    const query = `
      SELECT 
        shop_id,
        shop_name,
        shop_address,
        shop_status,
        shop_type,
        admin_fName,
        admin_lName,
        date_registered
      FROM laundry_shops
      WHERE shop_status = 'Active'
      ORDER BY shop_name
    `;

    const [rows] = await pool.execute(query);
    return rows;
  }

  static async getShopById(shopId) {
    const query = `
      SELECT 
        shop_id,
        admin_id,
        admin_fName,
        admin_mName,
        admin_lName,
        admin_emailAdd,
        admin_contactNum,
        shop_address,
        shop_name,
        slug,
        shop_status,
        shop_type,
        date_registered
      FROM laundry_shops
      WHERE shop_id = ?
    `;

    const [rows] = await pool.execute(query, [shopId]);
    return rows[0];
  }

  static async getShopStats(shopId) {
    const query = `
      SELECT 
        COUNT(DISTINCT laundryId) as totalOrders,
        SUM(total_amount) as totalRevenue,
        COUNT(DISTINCT cus_id) as totalCustomers,
        AVG(total_amount) as avgOrderValue
      FROM customer_transactions
      WHERE shop_id = ?
    `;

    const [rows] = await pool.execute(query, [shopId]);
    return rows[0];
  }
}

module.exports = ShopModel;
