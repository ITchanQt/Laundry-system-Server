const BaseModel = require('../BaseModel');

class SalesModel extends BaseModel {
  static async getSalesData(startDate, endDate) {
    const query = `
      SELECT 
        DATE(created_at) as date,
        service,
        SUM(total_amount) as amount,
        COUNT(*) as orders,
        shop_id
      FROM customer_transactions
      WHERE DATE(created_at) BETWEEN ? AND ?
      GROUP BY DATE(created_at), service, shop_id
      ORDER BY date DESC, service
    `;
    
    const rows = await this.query(query, [startDate, endDate]);
    return rows;
  }

  static async getSalesSummary(startDate, endDate) {
    const query = `
      SELECT 
        SUM(total_amount) as totalSales,
        COUNT(*) as totalOrders,
        AVG(total_amount) as avgOrderValue,
        COUNT(DISTINCT shop_id) as totalShops
      FROM customer_transactions
      WHERE DATE(created_at) BETWEEN ? AND ?
    `;
    
    const rows = await this.query(query, [startDate, endDate]);
    return rows[0];
  }

  static async getSalesByShop(startDate, endDate) {
    const query = `
      SELECT 
        shop_id,
        SUM(total_amount) as totalSales,
        COUNT(*) as totalOrders
      FROM customer_transactions
      WHERE DATE(created_at) BETWEEN ? AND ?
      GROUP BY shop_id
      ORDER BY totalSales DESC
    `;
    
    const rows = await this.query(query, [startDate, endDate]);
    return rows;
  }

  static async getSalesByService(startDate, endDate) {
    const query = `
      SELECT 
        service,
        SUM(total_amount) as totalSales,
        COUNT(*) as totalOrders
      FROM customer_transactions
      WHERE DATE(created_at) BETWEEN ? AND ?
      GROUP BY service
      ORDER BY totalSales DESC
    `;
    
    const rows = await this.query(query, [startDate, endDate]);
    return rows;
  }
}

module.exports = SalesModel;