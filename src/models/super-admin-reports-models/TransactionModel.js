const pool = require('../../config/db');

class TransactionModel {
  static async getAllTransactions(startDate, endDate, limit = 50) {
    const query = `
      SELECT 
        laundryId as id,
        shop_id,
        created_at as date,
        cus_name as customer,
        service,
        total_amount as amount,
        status,
        payment_status as payment
      FROM customer_transactions
      WHERE DATE(created_at) BETWEEN ? AND ?
      ORDER BY created_at DESC
      LIMIT ?
    `;
    
    const [rows] = await pool.execute(query, [startDate, endDate, parseInt(limit)]);
    return rows;
  }

  static async getTransactionById(transactionId) {
    const query = `
      SELECT 
        laundryId as id,
        shop_id,
        cus_id,
        cus_name as customer,
        cus_address,
        cus_phoneNum,
        batch,
        shirts,
        pants,
        jeans,
        shorts,
        towels,
        pillow_case,
        bed_sheets,
        kg,
        service,
        num_items,
        cleaning_products,
        total_amount as amount,
        status,
        payment_status as payment,
        onlinePayment_proof,
        created_at,
        updated_at,
        process_by
      FROM customer_transactions
      WHERE laundryId = ?
    `;
    
    const [rows] = await pool.execute(query, [transactionId]);
    return rows[0];
  }

  static async getPendingPayments() {
    const query = `
      SELECT 
        laundryId as id,
        shop_id,
        cus_name as customer,
        total_amount as amount,
        created_at as date
      FROM customer_transactions
      WHERE payment_status = 'PENDING'
      ORDER BY created_at DESC
    `;
    
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async getPendingPaymentsCount() {
    const query = `
      SELECT COUNT(*) as count
      FROM customer_transactions
      WHERE payment_status = 'PENDING'
    `;
    
    const [rows] = await pool.execute(query);
    return rows[0];
  }

  static async getTransactionsByStatus(status) {
    const query = `
      SELECT 
        laundryId as id,
        shop_id,
        cus_name as customer,
        total_amount as amount,
        status,
        created_at as date
      FROM customer_transactions
      WHERE status = ?
      ORDER BY created_at DESC
    `;
    
    const [rows] = await pool.execute(query, [status]);
    return rows;
  }

  static async getTransactionStats(startDate, endDate) {
    const query = `
      SELECT 
        COUNT(*) as totalTransactions,
        SUM(total_amount) as totalRevenue,
        AVG(total_amount) as avgTransactionValue,
        COUNT(DISTINCT shop_id) as shopsWithTransactions,
        COUNT(DISTINCT cus_id) as uniqueCustomers
      FROM customer_transactions
      WHERE DATE(created_at) BETWEEN ? AND ?
    `;
    
    const [rows] = await pool.execute(query, [startDate, endDate]);
    return rows[0];
  }
}

module.exports = TransactionModel;