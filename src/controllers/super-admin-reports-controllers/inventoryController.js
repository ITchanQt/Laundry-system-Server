const InventoryModel = require("../../models/super-admin-reports-models/InventoryModel");

class InventoryController {
  static async getAllInventory(req, res) {
    try {
      const data = await InventoryModel.getAllInventory();

      res.json({
        success: true,
        data: data.map((row) => ({
          id: row.item_id,
          shopId: row.shop_id,
          item: row.item_name,
          category: row.item_category,
          description: row.item_description,
          current: row.current,
          threshold: row.threshold,
          unitPrice: parseFloat(row.unitPrice),
          lastOrdered: row.lastOrdered,
        })),
      });
    } catch (error) {
      console.error("Inventory Error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getLowStockItems(req, res) {
    try {
      const data = await InventoryModel.getLowStockItems();

      res.json({
        success: true,
        data: data.map((row) => ({
          id: row.item_id,
          shopId: row.shop_id,
          item: row.item_name,
          current: row.current,
          threshold: row.threshold,
          deficit: row.threshold - row.current,
        })),
      });
    } catch (error) {
      console.error("Low Stock Error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getLowStockCount(req, res) {
    try {
      const result = await InventoryModel.getLowStockCount();

      res.json({
        success: true,
        data: { lowStockCount: result.count },
      });
    } catch (error) {
      console.error("Low Stock Count Error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getInventoryByShop(req, res) {
    try {
      const data = await InventoryModel.getInventoryByShop();

      res.json({
        success: true,
        data: data.map((row) => ({
          shopId: row.shop_id,
          totalItems: row.totalItems,
          totalValue: parseFloat(row.totalValue),
          lowStockItems: row.lowStockItems,
        })),
      });
    } catch (error) {
      console.error("Inventory By Shop Error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getInventoryByCategory(req, res) {
    try {
      const data = await InventoryModel.getInventoryByCategory();

      res.json({
        success: true,
        data: data.map((row) => ({
          category: row.category,
          itemCount: row.itemCount,
          totalQuantity: row.totalQuantity,
          totalValue: parseFloat(row.totalValue),
        })),
      });
    } catch (error) {
      console.error("Inventory By Category Error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = InventoryController;
