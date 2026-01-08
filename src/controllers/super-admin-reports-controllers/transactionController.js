const TransactionModel = require('../../models/super-admin-reports-models/TransactionModel');

class TransactionController {
  static async getAllTransactions(req, res) {
    try {
      const { startDate, endDate, limit = 50 } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'startDate and endDate are required'
        });
      }

      const data = await TransactionModel.getAllTransactions(startDate, endDate, limit);
      
      res.json({
        success: true,
        data: data.map(row => ({
          id: row.id,
          shopId: row.shop_id,
          date: new Date(row.date).toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          customer: row.customer,
          service: row.service,
          amount: `$${parseFloat(row.amount).toFixed(2)}`,
          status: row.status,
          payment: row.payment
        }))
      });
    } catch (error) {
      console.error('Transactions Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getTransactionById(req, res) {
    try {
      const { id } = req.params;
      
      const transaction = await TransactionModel.getTransactionById(id);
      
      if (!transaction) {
        return res.status(404).json({
          success: false,
          error: 'Transaction not found'
        });
      }
      
      res.json({
        success: true,
        data: transaction
      });
    } catch (error) {
      console.error('Transaction By ID Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getPendingPayments(req, res) {
    try {
      const data = await TransactionModel.getPendingPayments();
      
      res.json({
        success: true,
        data: data.map(row => ({
          id: row.id,
          shopId: row.shop_id,
          customer: row.customer,
          amount: parseFloat(row.amount),
          date: row.date
        }))
      });
    } catch (error) {
      console.error('Pending Payments Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getPendingPaymentsCount(req, res) {
    try {
      const result = await TransactionModel.getPendingPaymentsCount();
      
      res.json({
        success: true,
        data: { pendingPayments: result.count }
      });
    } catch (error) {
      console.error('Pending Payments Count Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getTransactionsByStatus(req, res) {
    try {
      const { status } = req.params;
      
      const data = await TransactionModel.getTransactionsByStatus(status);
      
      res.json({
        success: true,
        data: data.map(row => ({
          id: row.id,
          shopId: row.shop_id,
          customer: row.customer,
          amount: parseFloat(row.amount),
          status: row.status,
          date: row.date
        }))
      });
    } catch (error) {
      console.error('Transactions By Status Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getTransactionStats(req, res) {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'startDate and endDate are required'
        });
      }

      const stats = await TransactionModel.getTransactionStats(startDate, endDate);
      
      res.json({
        success: true,
        data: {
          totalTransactions: stats.totalTransactions,
          totalRevenue: parseFloat(stats.totalRevenue || 0),
          avgTransactionValue: parseFloat(stats.avgTransactionValue || 0),
          shopsWithTransactions: stats.shopsWithTransactions,
          uniqueCustomers: stats.uniqueCustomers
        }
      });
    } catch (error) {
      console.error('Transaction Stats Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = TransactionController;