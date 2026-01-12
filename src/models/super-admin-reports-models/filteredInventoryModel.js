const pool = require("../../config/db");

class FilteredInventoryModel {
  static async getInventoryByShop(shopId) {
    const query = `
      SELECT 
        item_id,
        item_name,
        item_category,
        item_description,
        item_quantity as current,
        item_reorderLevel as threshold,
        item_uPrice as unitPrice,
        date_added as lastOrdered
      FROM shop_inventory
      WHERE shop_id = ?
      ORDER BY item_name
    `;

    const [rows] = await pool.execute(query, [shopId]);
    return rows;
  }

  static async getLowStockByShop(shopId) {
    const query = `
      SELECT 
        item_id,
        item_name,
        item_quantity as current,
        item_reorderLevel as threshold
      FROM shop_inventory
      WHERE shop_id = ?
        AND item_quantity <= item_reorderLevel
      ORDER BY (item_quantity - item_reorderLevel) ASC
    `;

    const [rows] = await pool.execute(query, [shopId]);
    return rows;
  }

  static async getLowStockCountByShop(shopId) {
    const query = `
      SELECT COUNT(*) as count
      FROM shop_inventory
      WHERE shop_id = ?
        AND item_quantity <= item_reorderLevel
    `;

    const [rows] = await pool.execute(query, [shopId]);
    return rows[0];
  }

  static async getInventorySummaryByShop(shopId) {
    const query = `
      SELECT 
        COUNT(*) as totalItems,
        SUM(item_quantity) as totalQuantity,
        SUM(item_quantity * item_uPrice) as totalValue,
        COUNT(CASE WHEN item_quantity <= item_reorderLevel THEN 1 END) as lowStockItems
      FROM shop_inventory
      WHERE shop_id = ?
    `;

    const [rows] = await pool.execute(query, [shopId]);
    return rows[0];
  }
}

module.exports = FilteredInventoryModel;
