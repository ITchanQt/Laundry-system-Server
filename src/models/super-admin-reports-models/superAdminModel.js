const BaseModel = require('../BaseModel');

class SuperAdminModel extends BaseModel {
  // Get total count of unique laundry owners
  static async getTotalOwners() {
  const query = `
    SELECT COUNT(DISTINCT admin_id) as totalOwners
    FROM laundry_shops
  `;
  const rows = await this.query(query);
  return rows[0];
}


  // Get total count of shops/branches
static async getTotalShops() {
  const query = `
    SELECT COUNT(shop_id) as totalShops
    FROM laundry_shops
  `;
  const rows = await this.query(query);
  return rows[0];
}


  // Get laundry owners with their shops (FIXED - No duplicates)
  static async getOwnersWithShops() {
    const query = `
      SELECT 
        admin_id,
        MAX(admin_fName) as admin_fName,
        MAX(admin_lName) as admin_lName,
        MAX(admin_emailAdd) as admin_emailAdd,
        MAX(admin_contactNum) as admin_contactNum,
        COUNT(shop_id) as totalBranches,
        MIN(date_registered) as firstRegistered
      FROM laundry_shops
      GROUP BY admin_id
      ORDER BY firstRegistered DESC
    `;
    
    const owners = await this.query(query);
    
    // Get shops for each owner
    for (let owner of owners) {
      const shopsQuery = `
        SELECT 
          shop_id,
          parent_shop_id,
          shop_name,
          shop_status,
          date_registered
        FROM laundry_shops
        WHERE admin_id = ?
        ORDER BY 
          CASE WHEN parent_shop_id IS NULL THEN 0 ELSE 1 END,
          date_registered ASC
      `;
      
      const shops = await this.query(shopsQuery, [owner.admin_id]);
      owner.shops = shops;
    }
    
    return owners;
  }

  // Get all shops with owner info and parent-child relationship
  static async getAllShopsWithOwners() {
    const query = `
      SELECT 
        s.shop_id,
        s.parent_shop_id,
        s.admin_id,
        CONCAT(s.admin_fName, ' ', s.admin_lName) as ownerName,
        s.admin_fName,
        s.admin_lName,
        s.admin_emailAdd,
        s.admin_contactNum,
        s.shop_name,
        s.shop_address,
        s.shop_status,
        s.shop_type,
        s.date_registered,
        parent.shop_name as parentShopName,
        CASE 
          WHEN s.parent_shop_id IS NULL THEN 'Main Branch'
          ELSE 'Sub Branch'
        END as branchType
      FROM laundry_shops s
      LEFT JOIN laundry_shops parent ON s.parent_shop_id = parent.shop_id
      ORDER BY s.admin_id, 
               CASE WHEN s.parent_shop_id IS NULL THEN 0 ELSE 1 END,
               s.date_registered DESC
    `;
    
    const rows = await this.query(query);
    return rows;
  }

  // Get dashboard summary statistics
  static async getDashboardStats() {
    const query = `
      SELECT 
        COUNT(DISTINCT admin_id) as totalOwners,
        COUNT(shop_id) as totalShops,
        SUM(CASE WHEN shop_status = 'Active' THEN 1 ELSE 0 END) as activeShops,
        SUM(CASE WHEN shop_status = 'Pending' THEN 1 ELSE 0 END) as pendingShops,
        SUM(CASE WHEN shop_status = 'Inactive' THEN 1 ELSE 0 END) as inactiveShops,
        SUM(CASE WHEN parent_shop_id IS NULL THEN 1 ELSE 0 END) as mainBranches,
        SUM(CASE WHEN parent_shop_id IS NOT NULL THEN 1 ELSE 0 END) as subBranches
      FROM laundry_shops
    `;
    
    const rows = await this.query(query);
    return rows[0];
  }

  // Get owner details by admin_id with hierarchy
  static async getOwnerById(adminId) {
    const ownerQuery = `
      SELECT 
        admin_id,
        MAX(admin_fName) as admin_fName,
        MAX(admin_lName) as admin_lName,
        MAX(admin_emailAdd) as admin_emailAdd,
        MAX(admin_contactNum) as admin_contactNum,
        COUNT(shop_id) as totalBranches
      FROM laundry_shops
      WHERE admin_id = ?
      GROUP BY admin_id
    `;
    
    const ownerRows = await this.query(ownerQuery, [adminId]);
    
    if (ownerRows.length === 0) {
      return null;
    }
    
    return ownerRows[0];
  }

  // Get shops by owner with parent-child relationship
  static async getShopsByOwner(adminId) {
    const query = `
      SELECT 
        s.shop_id,
        s.parent_shop_id,
        s.shop_name,
        s.shop_address,
        s.shop_status,
        s.shop_type,
        s.date_registered,
        parent.shop_name as parentShopName,
        CASE 
          WHEN s.parent_shop_id IS NULL THEN 'Main Branch'
          ELSE 'Sub Branch'
        END as branchType
      FROM laundry_shops s
      LEFT JOIN laundry_shops parent ON s.parent_shop_id = parent.shop_id
      WHERE s.admin_id = ?
      ORDER BY 
        CASE WHEN s.parent_shop_id IS NULL THEN 0 ELSE 1 END,
        s.date_registered ASC
    `;
    
    const rows = await this.query(query, [adminId]);
    return rows;
  }
}

module.exports = SuperAdminModel;