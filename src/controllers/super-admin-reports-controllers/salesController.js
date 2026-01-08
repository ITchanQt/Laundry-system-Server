const SalesModel = require("../../models/super-admin-reports-models/SalesModel");

class SalesController {
  static async getSalesData(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: "startDate and endDate are required",
        });
      }

      const data = await SalesModel.getSalesData(startDate, endDate);

      res.json({
        success: true,
        data: data.map((row) => ({
          date: row.date,
          service: row.service,
          amount: parseFloat(row.amount),
          orders: row.orders,
          shopId: row.shop_id,
        })),
      });
    } catch (error) {
      console.error("Sales Data Error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getSalesSummary(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: "startDate and endDate are required",
        });
      }

      const summary = await SalesModel.getSalesSummary(startDate, endDate);

      res.json({
        success: true,
        data: {
          totalSales: parseFloat(summary.totalSales || 0),
          totalOrders: summary.totalOrders || 0,
          avgOrderValue: parseFloat(summary.avgOrderValue || 0),
          totalShops: summary.totalShops || 0,
        },
      });
    } catch (error) {
      console.error("Sales Summary Error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getSalesByShop(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: "startDate and endDate are required",
        });
      }

      const data = await SalesModel.getSalesByShop(startDate, endDate);

      res.json({
        success: true,
        data: data.map((row) => ({
          shopId: row.shop_id,
          totalSales: parseFloat(row.totalSales),
          totalOrders: row.totalOrders,
        })),
      });
    } catch (error) {
      console.error("Sales By Shop Error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getSalesByService(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: "startDate and endDate are required",
        });
      }

      const data = await SalesModel.getSalesByService(startDate, endDate);

      res.json({
        success: true,
        data: data.map((row) => ({
          service: row.service,
          totalSales: parseFloat(row.totalSales),
          totalOrders: row.totalOrders,
        })),
      });
    } catch (error) {
      console.error("Sales By Service Error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = SalesController;
