const pool = require('../../config/db');

class InventoryModel {
  static async getAllInventory() {
    const query = `
      SELECT 
        item_id,
        shop_id,
        item_name,
        item_category,
        item_description,
        item_quantity as current,
        item_reorderLevel as threshold,
        item_uPrice as unitPrice,
        date_added as lastOrdered
      FROM shop_inventory
      ORDER BY shop_id, item_name
    `;
    
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async getLowStockItems() {
    const query = `
      SELECT 
        item_id,
        shop_id,
        item_name,
        item_quantity as current,
        item_reorderLevel as threshold
      FROM shop_inventory
      WHERE item_quantity <= item_reorderLevel
      ORDER BY (item_quantity - item_reorderLevel) ASC
    `;
    
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async getLowStockCount() {
    const query = `
      SELECT COUNT(*) as count
      FROM shop_inventory
      WHERE item_quantity <= item_reorderLevel
    `;
    
    const [rows] = await pool.execute(query);
    return rows[0];
  }

  static async getInventoryByShop() {
    const query = `
      SELECT 
        shop_id,
        COUNT(*) as totalItems,
        SUM(item_quantity * item_uPrice) as totalValue,
        SUM(CASE WHEN item_quantity <= item_reorderLevel THEN 1 ELSE 0 END) as lowStockItems
      FROM shop_inventory
      GROUP BY shop_id
      ORDER BY shop_id
    `;
    
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async getInventoryByCategory() {
    const query = `
      SELECT 
        COALESCE(item_category, 'Uncategorized') as category,
        COUNT(*) as itemCount,
        SUM(item_quantity) as totalQuantity,
        SUM(item_quantity * item_uPrice) as totalValue
      FROM shop_inventory
      GROUP BY item_category
      ORDER BY totalValue DESC
    `;
    
    const [rows] = await pool.execute(query);
    return rows;
  }
}

module.exports = InventoryModel;