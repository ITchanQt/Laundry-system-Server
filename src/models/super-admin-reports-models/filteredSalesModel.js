const BaseModel = require("../BaseModel");

class FilteredSalesModel extends BaseModel {
  static async getSalesByShop(shopId, startDate, endDate) {
    const query = `
      SELECT 
        DATE(created_at) as date,
        service,
        SUM(total_amount) as amount,
        COUNT(*) as orders
      FROM customer_transactions
      WHERE shop_id = ?
        AND payment_status = 'PAID'
        AND DATE(created_at) BETWEEN ? AND ?
      GROUP BY DATE(created_at), service
      ORDER BY date DESC, service
    `;

    const rows = await this.query(query, [shopId, startDate, endDate]);
    return rows;
  }

  static async getSalesSummaryByShop(shopId, startDate, endDate) {
    const query = `
    SELECT 
      SUM(total_amount) as totalSales,
      COUNT(*) as totalOrders,
      AVG(total_amount) as avgOrderValue,
      (
        SELECT COUNT(*) 
        FROM users 
        WHERE shop_id = ? 
          AND role = 'CUSTOMER'
          AND DATE(date_registered) BETWEEN ? AND ?
      ) as uniqueCustomers
    FROM customer_transactions
    WHERE shop_id = ?
      AND payment_status = 'PAID'
      AND DATE(created_at) BETWEEN ? AND ?
  `;

    const rows = await this.query(query, [
      shopId,
      startDate,
      endDate,
      shopId,
      startDate,
      endDate,
    ]);

    return rows[0];
  }

  static async getRevenueByDayByShop(shopId, startDate, endDate) {
    const query = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as orders,
        SUM(total_amount) as revenue
      FROM customer_transactions
      WHERE shop_id = ?
        AND DATE(created_at) BETWEEN ? AND ?
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    const rows = await this.query(query, [shopId, startDate, endDate]);
    return rows;
  }

  static async getServiceDistributionByShop(shopId, startDate, endDate) {
    const query = `
      SELECT 
        service,
        COUNT(*) as count,
        SUM(total_amount) as revenue,
        AVG(total_amount) as avgRevenue
      FROM customer_transactions
      WHERE shop_id = ?
        AND DATE(created_at) BETWEEN ? AND ?
      GROUP BY service
      ORDER BY revenue DESC
    `;

    const rows = await this.query(query, [shopId, startDate, endDate]);
    return rows;
  }

  static async getTopCustomersByShop(shopId, startDate, endDate, limit = 10) {
    const query = `
      SELECT 
        cus_id,
        cus_name as customer,
        COUNT(*) as totalOrders,
        SUM(total_amount) as totalSpent
      FROM customer_transactions
      WHERE shop_id = ?
        AND DATE(created_at) BETWEEN ? AND ?
      GROUP BY cus_id, cus_name
      ORDER BY totalSpent DESC
      LIMIT ?
    `;

    const rows = await this.query(query, [
      shopId,
      startDate,
      endDate,
      parseInt(limit),
    ]);
    return rows;
  }
}

module.exports = FilteredSalesModel;
