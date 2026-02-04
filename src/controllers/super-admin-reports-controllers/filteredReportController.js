const FilteredSalesModel = require("../../models/super-admin-reports-models/filteredSalesModel");
const FilteredInventoryModel = require("../../models/super-admin-reports-models/filteredInventoryModel");
const FilteredTransactionModel = require("../../models/super-admin-reports-models/filteredTransactionModel");

// Simple in-memory cache with TTL
class QueryCache {
  constructor(ttlMs = 30000) { // 30 second default TTL
    this.cache = new Map();
    this.ttl = ttlMs;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + this.ttl
    });
  }

  clear() {
    this.cache.clear();
  }
}

const cache = new QueryCache(30000); // 30 second cache

class FilteredReportsController {
  // Sales endpoints
  static async getSalesByShop(req, res) {
    try {
      const { shopId, startDate, endDate } = req.query;

      if (!shopId || !startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: "shopId, startDate and endDate are required",
        });
      }

      // Check cache first
      const cacheKey = `sales_${shopId}_${startDate}_${endDate}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      const data = await FilteredSalesModel.getSalesByShop(
        shopId,
        startDate,
        endDate
      );

      const result = data.map((row) => ({
        date: row.date,
        service: row.service,
        amount: parseFloat(row.amount),
        orders: row.orders,
      }));

      // Cache the result
      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Filtered Sales Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getSalesSummaryByShop(req, res) {
    try {
      const { shopId, startDate, endDate } = req.query;

      if (!shopId || !startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: "shopId, startDate and endDate are required",
        });
      }

      const cacheKey = `sales_summary_${shopId}_${startDate}_${endDate}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      const summary = await FilteredSalesModel.getSalesSummaryByShop(
        shopId,
        startDate,
        endDate
      );

      const result = {
        totalSales: parseFloat(summary.totalSales || 0),
        totalOrders: summary.totalOrders || 0,
        avgOrderValue: parseFloat(summary.avgOrderValue || 0),
        uniqueCustomers: summary.uniqueCustomers || 0,
      };

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Filtered Sales Summary Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getRevenueByDayByShop(req, res) {
    try {
      const { shopId, startDate, endDate } = req.query;

      if (!shopId || !startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: "shopId, startDate and endDate are required",
        });
      }

      const cacheKey = `revenue_day_${shopId}_${startDate}_${endDate}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      const data = await FilteredSalesModel.getRevenueByDayByShop(
        shopId,
        startDate,
        endDate
      );

      const result = data.map((row) => ({
        date: row.date,
        orders: row.orders,
        revenue: parseFloat(row.revenue),
      }));

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Revenue By Day Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getTopCustomersByShop(req, res) {
    try {
      const { shopId, startDate, endDate, limit = 10 } = req.query;

      if (!shopId || !startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: "shopId, startDate and endDate are required",
        });
      }

      const cacheKey = `top_customers_${shopId}_${startDate}_${endDate}_${limit}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      const data = await FilteredSalesModel.getTopCustomersByShop(
        shopId,
        startDate,
        endDate,
        limit
      );

      const result = data.map((row) => ({
        customerId: row.cus_id,
        customer: row.customer,
        totalOrders: row.totalOrders,
        totalSpent: parseFloat(row.totalSpent),
      }));

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Top Customers Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Inventory endpoints
  static async getInventoryByShop(req, res) {
    try {
      const { shopId } = req.query;

      if (!shopId) {
        return res.status(400).json({
          success: false,
          error: "shopId is required",
        });
      }

      const cacheKey = `inventory_${shopId}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      const data = await FilteredInventoryModel.getInventoryByShop(shopId);

      const result = data.map((row) => ({
        id: row.item_id,
        item: row.item_name,
        category: row.item_category,
        description: row.item_description,
        current: row.current,
        threshold: row.threshold,
        unitPrice: parseFloat(row.unitPrice),
        lastOrdered: row.lastOrdered,
      }));

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Filtered Inventory Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getLowStockByShop(req, res) {
    try {
      const { shopId } = req.query;

      if (!shopId) {
        return res.status(400).json({
          success: false,
          error: "shopId is required",
        });
      }

      const data = await FilteredInventoryModel.getLowStockByShop(shopId);

      res.json({
        success: true,
        data: data.map((row) => ({
          id: row.item_id,
          item: row.item_name,
          current: row.current,
          threshold: row.threshold,
          deficit: row.threshold - row.current,
        })),
      });
    } catch (error) {
      console.error("Low Stock Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Transactions endpoints
  static async getTransactionsByShop(req, res) {
    try {
      const { shopId, startDate, endDate, limit = 50 } = req.query;

      if (!shopId || !startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: "shopId, startDate and endDate are required",
        });
      }

      const cacheKey = `transactions_${shopId}_${startDate}_${endDate}_${limit}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      const data = await FilteredTransactionModel.getTransactionsByShop(
        shopId,
        startDate,
        endDate,
        limit
      );

      const result = data.map((row) => ({
        id: row.id,
        date: new Date(row.date).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        customer: row.customer,
        service: row.service,
        amount: `$${parseFloat(row.amount).toFixed(2)}`,
        status: row.status,
        payment: row.payment,
      }));

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Filtered Transactions Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // OPTIMIZED: Dashboard summary with sequential execution to reduce connection pressure
  static async getDashboardSummaryByShop(req, res) {
    try {
      const { shopId, startDate, endDate } = req.query;

      if (!shopId || !startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: "shopId, startDate and endDate are required",
        });
      }

      const cacheKey = `dashboard_summary_${shopId}_${startDate}_${endDate}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      // Execute in batches instead of all at once to reduce connection pool pressure
      // Batch 1: Critical sales data
      const [salesSummary, inventorySummary] = await Promise.all([
        FilteredSalesModel.getSalesSummaryByShop(shopId, startDate, endDate),
        FilteredInventoryModel.getInventorySummaryByShop(shopId),
      ]);

      // Small delay to allow connection pool to recover
      await new Promise(resolve => setTimeout(resolve, 50));

      // Batch 2: Secondary metrics
      const [transactionStats, lowStockCount, pendingPaymentsCount] = await Promise.all([
        FilteredTransactionModel.getTransactionStatsByShop(shopId, startDate, endDate),
        FilteredInventoryModel.getLowStockCountByShop(shopId),
        FilteredTransactionModel.getPendingPaymentsCountByShop(shopId),
      ]);

      const result = {
        totalSales: parseFloat(salesSummary.totalSales || 0),
        totalOrders: salesSummary.totalOrders || 0,
        lowStockItems: lowStockCount.count || 0,
        pendingPayments: pendingPaymentsCount.count || 0,
        uniqueCustomers: salesSummary.uniqueCustomers || 0,
        avgOrderValue: parseFloat(salesSummary.avgOrderValue || 0),
        inventoryValue: parseFloat(inventorySummary.totalValue || 0),
        ongoingOrders: transactionStats.ongoingOrders || 0,
      };

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Dashboard Summary Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Clear cache endpoint (optional - for admin use)
  static async clearCache(req, res) {
    try {
      cache.clear();
      res.json({ success: true, message: "Cache cleared" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = FilteredReportsController;