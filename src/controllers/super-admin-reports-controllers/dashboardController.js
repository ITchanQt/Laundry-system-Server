const DashboardModel = require('../../models/super-admin-reports-models/DashboardModel');

class DashboardController {
  static async getSummary(req, res) {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'startDate and endDate are required'
        });
      }

      const summary = await DashboardModel.getSummary(startDate, endDate);
      
      res.json({
        success: true,
        data: summary
      });
    } catch (error) {
      console.error('Dashboard Summary Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getShopPerformance(req, res) {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'startDate and endDate are required'
        });
      }

      const data = await DashboardModel.getShopPerformance(startDate, endDate);
      
      res.json({
        success: true,
        data: data.map(row => ({
          shopId: row.shop_id,
          totalOrders: row.totalOrders,
          totalRevenue: parseFloat(row.totalRevenue),
          avgOrderValue: parseFloat(row.avgOrderValue),
          uniqueCustomers: row.uniqueCustomers
        }))
      });
    } catch (error) {
      console.error('Shop Performance Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getRevenueByDay(req, res) {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'startDate and endDate are required'
        });
      }

      const data = await DashboardModel.getRevenueByDay(startDate, endDate);
      
      res.json({
        success: true,
        data: data.map(row => ({
          date: row.date,
          orders: row.orders,
          revenue: parseFloat(row.revenue)
        }))
      });
    } catch (error) {
      console.error('Revenue By Day Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getTopCustomers(req, res) {
    try {
      const { startDate, endDate, limit = 10 } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'startDate and endDate are required'
        });
      }

      const data = await DashboardModel.getTopCustomers(startDate, endDate, limit);
      
      res.json({
        success: true,
        data: data.map(row => ({
          customerId: row.cus_id,
          customer: row.customer,
          totalOrders: row.totalOrders,
          totalSpent: parseFloat(row.totalSpent)
        }))
      });
    } catch (error) {
      console.error('Top Customers Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  static async getServiceDistribution(req, res) {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'startDate and endDate are required'
        });
      }

      const data = await DashboardModel.getServiceDistribution(startDate, endDate);
      
      res.json({
        success: true,
        data: data.map(row => ({
          service: row.service,
          count: row.count,
          revenue: parseFloat(row.revenue)
        }))
      });
    } catch (error) {
      console.error('Service Distribution Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = DashboardController;