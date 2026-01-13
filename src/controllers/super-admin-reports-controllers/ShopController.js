const ShopModel = require("../../models/super-admin-reports-models/ShopModel");

class ShopController {
  static async getAllShops(req, res) {
    try {
      const shops = await ShopModel.getAllShops();

      res.json({
        success: true,
        data: shops.map((shop) => ({
          shopId: shop.shop_id,
          shopName: shop.shop_name,
          address: shop.shop_address,
          status: shop.shop_status,
          type: shop.shop_type,
          adminName: `${shop.admin_fName} ${shop.admin_lName}`,
          dateRegistered: shop.date_registered,
        })),
      });
    } catch (error) {
      console.error("Get All Shops Error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getShopById(req, res) {
    try {
      const { id } = req.params;
      const shop = await ShopModel.getShopById(id);

      if (!shop) {
        return res.status(404).json({
          success: false,
          error: "Shop not found",
        });
      }

      res.json({
        success: true,
        data: {
          shopId: shop.shop_id,
          adminId: shop.admin_id,
          adminName: {
            first: shop.admin_fName,
            middle: shop.admin_mName,
            last: shop.admin_lName,
          },
          email: shop.admin_emailAdd,
          contact: shop.admin_contactNum,
          address: shop.shop_address,
          shopName: shop.shop_name,
          slug: shop.slug,
          status: shop.shop_status,
          type: shop.shop_type,
          dateRegistered: shop.date_registered,
        },
      });
    } catch (error) {
      console.error("Get Shop By ID Error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getShopStats(req, res) {
    try {
      const { id } = req.params;
      const stats = await ShopModel.getShopStats(id);

      res.json({
        success: true,
        data: {
          totalOrders: stats.totalOrders || 0,
          totalRevenue: parseFloat(stats.totalRevenue || 0),
          totalCustomers: stats.totalCustomers || 0,
          avgOrderValue: parseFloat(stats.avgOrderValue || 0),
        },
      });
    } catch (error) {
      console.error("Get Shop Stats Error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = ShopController;
