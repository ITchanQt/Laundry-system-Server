const BaseModel = require('../BaseModel');

class DashboardModel extends BaseModel {
  static async getSummary(startDate, endDate) {
    const salesQuery = `
      SELECT 
        SUM(total_amount) as total, 
        COUNT(*) as count 
      FROM customer_transactions 
      WHERE DATE(created_at) BETWEEN ? AND ?
    `;
    
    const inventoryQuery = `
      SELECT COUNT(*) as count 
      FROM shop_inventory 
      WHERE item_quantity <= item_reorderLevel
    `;
    
    const totalBranch = `
      SELECT COUNT(*) as count 
      FROM laundry_shops
    `;
    
    const salesRows = await this.query(salesQuery, [startDate, endDate]);
    const inventoryRows = await this.query(inventoryQuery);
    const branchRows = await this.query(totalBranch);
    
    return {
      totalSales: parseFloat(salesRows[0].total || 0),
      totalOrders: salesRows[0].count || 0,
      lowStockItems: inventoryRows[0].count || 0,
      totalBranches: branchRows[0].count || 0
    };
  }

  static async getShopPerformance(startDate, endDate) {
    const query = `
      SELECT 
        shop_id,
        COUNT(*) as totalOrders,
        SUM(total_amount) as totalRevenue,
        AVG(total_amount) as avgOrderValue,
        COUNT(DISTINCT cus_id) as uniqueCustomers
      FROM customer_transactions
      WHERE DATE(created_at) BETWEEN ? AND ?
      GROUP BY shop_id
      ORDER BY totalRevenue DESC
    `;
    
    const rows = await this.query(query, [startDate, endDate]);
    return rows;
  }

  static async getRevenueByDay(startDate, endDate) {
    const query = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as orders,
        SUM(total_amount) as revenue
      FROM customer_transactions
      WHERE DATE(created_at) BETWEEN ? AND ?
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;
    
    const rows = await this.query(query, [startDate, endDate]);
    return rows;
  }

  static async getTopCustomers(startDate, endDate, limit = 10) {
    const query = `
      SELECT 
        cus_id,
        cus_name as customer,
        COUNT(*) as totalOrders,
        SUM(total_amount) as totalSpent
      FROM customer_transactions
      WHERE DATE(created_at) BETWEEN ? AND ?
      GROUP BY cus_id, cus_name
      ORDER BY totalSpent DESC
      LIMIT ?
    `;
    
    const rows = await this.query(query, [startDate, endDate, parseInt(limit)]);
    return rows;
  }

  static async getServiceDistribution(startDate, endDate) {
    const query = `
      SELECT 
        service,
        COUNT(*) as count,
        SUM(total_amount) as revenue
      FROM customer_transactions
      WHERE DATE(created_at) BETWEEN ? AND ?
      GROUP BY service
      ORDER BY revenue DESC
    `;
    
    const rows = await this.query(query, [startDate, endDate]);
    return rows;
  }
}

module.exports = DashboardModel;