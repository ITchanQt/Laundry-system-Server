const pool = require("../../config/db");

class FilteredTransactionModel {
  static async getTransactionsByShop(shopId, startDate, endDate, limit = 50) {
    const query = `
      SELECT 
        laundryId as id,
        created_at as date,
        cus_name as customer,
        service,
        total_amount as amount,
        status,
        payment_status as payment
      FROM customer_transactions
      WHERE shop_id = ?
        AND DATE(created_at) BETWEEN ? AND ?
      ORDER BY created_at DESC
      LIMIT ?
    `;

    const [rows] = await pool.execute(query, [
      shopId,
      startDate,
      endDate,
      parseInt(limit),
    ]);
    return rows;
  }

  static async getPendingPaymentsByShop(shopId) {
    const query = `
      SELECT 
        laundryId as id,
        cus_name as customer,
        total_amount as amount,
        created_at as date
      FROM customer_transactions
      WHERE shop_id = ?
        AND payment_status = 'PENDING'
      ORDER BY created_at DESC
    `;

    const [rows] = await pool.execute(query, [shopId]);
    return rows;
  }

  static async getPendingPaymentsCountByShop(shopId) {
    const query = `
      SELECT COUNT(*) as count
      FROM customer_transactions
      WHERE shop_id = ?
        AND payment_status = 'PENDING'
    `;

    const [rows] = await pool.execute(query, [shopId]);
    return rows[0];
  }

  static async getTransactionStatsByShop(shopId, startDate, endDate) {
    const query = `
      SELECT 
        COUNT(*) as totalTransactions,
        SUM(total_amount) as totalRevenue,
        AVG(total_amount) as avgTransactionValue,
        COUNT(DISTINCT cus_id) as uniqueCustomers,
        COUNT(CASE WHEN status = 'Laundry Done' THEN 1 END) as completedOrders,
        COUNT(CASE WHEN status = 'On Service' THEN 1 END) as ongoingOrders,
        COUNT(CASE WHEN payment_status = 'PAID' THEN 1 END) as paidOrders,
        COUNT(CASE WHEN payment_status = 'PENDING' THEN 1 END) as pendingPayments
      FROM customer_transactions
      WHERE shop_id = ?
        AND DATE(created_at) BETWEEN ? AND ?
    `;

    const [rows] = await pool.execute(query, [shopId, startDate, endDate]);
    return rows[0];
  }
}

module.exports = FilteredTransactionModel;
