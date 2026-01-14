const pool = require('../../config/db');

class RatingsModel {
  // Get all ratings for a shop (shop ratings only)
  static async getShopRatings(shopId, startDate, endDate) {
    const query = `
      SELECT 
        rating_id,
        cus_id,
        cus_name,
        shop_rating,
        comment,
        created_at
      FROM ratings
      WHERE shop_id = ?
        AND shop_rating IS NOT NULL
        AND transaction_id IS NULL
        AND personnel IS NULL
        ${startDate && endDate ? 'AND DATE(created_at) BETWEEN ? AND ?' : ''}
      ORDER BY created_at DESC
    `;
    
    const params = startDate && endDate ? [shopId, startDate, endDate] : [shopId];
    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Get personnel/service ratings for a shop
  static async getPersonnelRatings(shopId, startDate, endDate) {
    const query = `
      SELECT 
        rating_id,
        transaction_id,
        cus_id,
        cus_name,
        personnel_rating,
        personnel,
        comment,
        created_at
      FROM ratings
      WHERE shop_id = ?
        AND personnel_rating IS NOT NULL
        AND transaction_id IS NOT NULL
        AND personnel IS NOT NULL
        ${startDate && endDate ? 'AND DATE(created_at) BETWEEN ? AND ?' : ''}
      ORDER BY created_at DESC
    `;
    
    const params = startDate && endDate ? [shopId, startDate, endDate] : [shopId];
    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Get shop rating statistics
  static async getShopRatingStats(shopId, startDate, endDate) {
    const query = `
      SELECT 
        COUNT(*) as totalRatings,
        AVG(shop_rating) as avgRating,
        SUM(CASE WHEN shop_rating = 5 THEN 1 ELSE 0 END) as fiveStars,
        SUM(CASE WHEN shop_rating = 4 THEN 1 ELSE 0 END) as fourStars,
        SUM(CASE WHEN shop_rating = 3 THEN 1 ELSE 0 END) as threeStars,
        SUM(CASE WHEN shop_rating = 2 THEN 1 ELSE 0 END) as twoStars,
        SUM(CASE WHEN shop_rating = 1 THEN 1 ELSE 0 END) as oneStar
      FROM ratings
      WHERE shop_id = ?
        AND shop_rating IS NOT NULL
        AND transaction_id IS NULL
        AND personnel IS NULL
        ${startDate && endDate ? 'AND DATE(created_at) BETWEEN ? AND ?' : ''}
    `;
    
    const params = startDate && endDate ? [shopId, startDate, endDate] : [shopId];
    const [rows] = await pool.execute(query, params);
    return rows[0];
  }

  // Get personnel rating statistics
  static async getPersonnelRatingStats(shopId, startDate, endDate) {
    const query = `
      SELECT 
        COUNT(*) as totalRatings,
        AVG(personnel_rating) as avgRating,
        SUM(CASE WHEN personnel_rating = 5 THEN 1 ELSE 0 END) as fiveStars,
        SUM(CASE WHEN personnel_rating = 4 THEN 1 ELSE 0 END) as fourStars,
        SUM(CASE WHEN personnel_rating = 3 THEN 1 ELSE 0 END) as threeStars,
        SUM(CASE WHEN personnel_rating = 2 THEN 1 ELSE 0 END) as twoStars,
        SUM(CASE WHEN personnel_rating = 1 THEN 1 ELSE 0 END) as oneStar
      FROM ratings
      WHERE shop_id = ?
        AND personnel_rating IS NOT NULL
        AND transaction_id IS NOT NULL
        AND personnel IS NOT NULL
        ${startDate && endDate ? 'AND DATE(created_at) BETWEEN ? AND ?' : ''}
    `;
    
    const params = startDate && endDate ? [shopId, startDate, endDate] : [shopId];
    const [rows] = await pool.execute(query, params);
    return rows[0];
  }

  // Get ratings by personnel
  static async getRatingsByPersonnel(shopId, startDate, endDate) {
    const query = `
      SELECT 
        personnel,
        COUNT(*) as totalRatings,
        AVG(personnel_rating) as avgRating,
        SUM(CASE WHEN personnel_rating = 5 THEN 1 ELSE 0 END) as fiveStars,
        SUM(CASE WHEN personnel_rating >= 4 THEN 1 ELSE 0 END) as positiveRatings
      FROM ratings
      WHERE shop_id = ?
        AND personnel_rating IS NOT NULL
        AND personnel IS NOT NULL
        ${startDate && endDate ? 'AND DATE(created_at) BETWEEN ? AND ?' : ''}
      GROUP BY personnel
      ORDER BY avgRating DESC, totalRatings DESC
    `;
    
    const params = startDate && endDate ? [shopId, startDate, endDate] : [shopId];
    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Get recent ratings (both shop and personnel)
  static async getRecentRatings(shopId, limit = 10) {
    const query = `
      SELECT 
        rating_id,
        transaction_id,
        cus_name,
        personnel_rating,
        personnel,
        shop_rating,
        comment,
        created_at,
        CASE 
          WHEN shop_rating IS NOT NULL THEN 'shop'
          WHEN personnel_rating IS NOT NULL THEN 'personnel'
        END as rating_type
      FROM ratings
      WHERE shop_id = ?
      ORDER BY created_at DESC
      LIMIT ?
    `;
    
    const [rows] = await pool.execute(query, [shopId, parseInt(limit)]);
    return rows;
  }

  // Get rating distribution over time
  static async getRatingTrend(shopId, startDate, endDate, type = 'shop') {
    const ratingColumn = type === 'shop' ? 'shop_rating' : 'personnel_rating';
    const condition = type === 'shop' 
      ? 'shop_rating IS NOT NULL AND transaction_id IS NULL AND personnel IS NULL'
      : 'personnel_rating IS NOT NULL AND transaction_id IS NOT NULL AND personnel IS NOT NULL';
    
    const query = `
      SELECT 
        DATE(created_at) as date,
        AVG(${ratingColumn}) as avgRating,
        COUNT(*) as count
      FROM ratings
      WHERE shop_id = ?
        AND ${condition}
        ${startDate && endDate ? 'AND DATE(created_at) BETWEEN ? AND ?' : ''}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;
    
    const params = startDate && endDate ? [shopId, startDate, endDate] : [shopId];
    const [rows] = await pool.execute(query, params);
    return rows;
  }
}

module.exports = RatingsModel;