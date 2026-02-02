const SuperAdminModel = require("../../models/super-admin-reports-models/superAdminModel");

class SuperAdminController {
  // Get dashboard summary (cards data)
  static async getDashboardSummary(req, res) {
    try {
      const stats = await SuperAdminModel.getDashboardStats();
      
      res.json({
        success: true,
        data: {
          totalOwners: stats.totalOwners || 0,
          totalShops: stats.totalShops || 0,
          activeShops: stats.activeShops || 0,
          pendingShops: stats.pendingShops || 0,
          inactiveShops: stats.inactiveShops || 0,
          mainBranches: stats.mainBranches || 0,
          subBranches: stats.subBranches || 0
        }
      });
    } catch (error) {
      console.error('Dashboard Summary Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get owners with their shops (table data) - FIXED
  static async getOwnersWithShops(req, res) {
    try {
      const owners = await SuperAdminModel.getOwnersWithShops();
      
      res.json({
        success: true,
        data: owners.map(owner => ({
          adminId: owner.admin_id,
          ownerName: `${owner.admin_fName} ${owner.admin_lName}`,
          firstName: owner.admin_fName,
          lastName: owner.admin_lName,
          email: owner.admin_emailAdd,
          contactNumber: owner.admin_contactNum,
          totalBranches: owner.totalBranches,
          firstRegistered: owner.firstRegistered,
          shops: owner.shops.map(shop => ({
            shopId: shop.shop_id,
            parentShopId: shop.parent_shop_id,
            shopName: shop.shop_name,
            status: shop.shop_status,
            dateRegistered: shop.date_registered,
            isMainBranch: shop.parent_shop_id === null || shop.parent_shop_id === '',
            branchType: (shop.parent_shop_id === null || shop.parent_shop_id === '') ? 'Main Branch' : 'Sub Branch'
          }))
        }))
      });
    } catch (error) {
      console.error('Get Owners With Shops Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get all shops with owner information
  static async getAllShopsWithOwners(req, res) {
    try {
      const shops = await SuperAdminModel.getAllShopsWithOwners();
      
      res.json({
        success: true,
        data: shops.map(shop => ({
          shopId: shop.shop_id,
          parentShopId: shop.parent_shop_id,
          parentShopName: shop.parentShopName,
          branchType: shop.branchType,
          adminId: shop.admin_id,
          ownerName: shop.ownerName,
          ownerFirstName: shop.admin_fName,
          ownerLastName: shop.admin_lName,
          ownerEmail: shop.admin_emailAdd,
          ownerContact: shop.admin_contactNum,
          shopName: shop.shop_name,
          address: shop.shop_address,
          status: shop.shop_status,
          type: shop.shop_type,
          dateRegistered: shop.date_registered
        }))
      });
    } catch (error) {
      console.error('Get All Shops Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get owner details by ID
  static async getOwnerById(req, res) {
    try {
      const { id } = req.params;
      
      const owner = await SuperAdminModel.getOwnerById(id);
      
      if (!owner) {
        return res.status(404).json({
          success: false,
          error: 'Owner not found'
        });
      }
      
      const shops = await SuperAdminModel.getShopsByOwner(id);
      
      res.json({
        success: true,
        data: {
          adminId: owner.admin_id,
          ownerName: `${owner.admin_fName} ${owner.admin_lName}`,
          firstName: owner.admin_fName,
          lastName: owner.admin_lName,
          email: owner.admin_emailAdd,
          contactNumber: owner.admin_contactNum,
          totalBranches: owner.totalBranches,
          shops: shops.map(shop => ({
            shopId: shop.shop_id,
            parentShopId: shop.parent_shop_id,
            parentShopName: shop.parentShopName,
            shopName: shop.shop_name,
            address: shop.shop_address,
            status: shop.shop_status,
            type: shop.shop_type,
            branchType: shop.branchType,
            dateRegistered: shop.date_registered
          }))
        }
      });
    } catch (error) {
      console.error('Get Owner By ID Error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = SuperAdminController;