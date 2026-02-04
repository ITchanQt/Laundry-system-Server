const RatingsModel = require("../../models/super-admin-reports-models/ratingsModel");

// Reuse the same cache instance
class QueryCache {
  constructor(ttlMs = 30000) {
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
}

const cache = new QueryCache(30000);

class RatingsController {
  static async getShopRatings(req, res) {
    try {
      const { shopId, startDate, endDate } = req.query;

      if (!shopId) {
        return res.status(400).json({
          success: false,
          error: "shopId is required",
        });
      }

      const cacheKey = `shop_ratings_${shopId}_${startDate}_${endDate}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      const ratings = await RatingsModel.getShopRatings(
        shopId,
        startDate,
        endDate
      );

      const result = ratings.map((r) => ({
        ratingId: r.rating_id,
        customerId: r.cus_id,
        customerName: r.cus_name,
        rating: r.shop_rating,
        comment: r.comment,
        createdAt: r.created_at,
      }));

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Get Shop Ratings Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getPersonnelRatings(req, res) {
    try {
      const { shopId, startDate, endDate } = req.query;

      if (!shopId) {
        return res.status(400).json({
          success: false,
          error: "shopId is required",
        });
      }

      const cacheKey = `personnel_ratings_${shopId}_${startDate}_${endDate}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      const ratings = await RatingsModel.getPersonnelRatings(
        shopId,
        startDate,
        endDate
      );

      const result = ratings.map((r) => ({
        ratingId: r.rating_id,
        transactionId: r.transaction_id,
        customerId: r.cus_id,
        customerName: r.cus_name,
        rating: r.personnel_rating,
        personnel: r.personnel,
        comment: r.comment,
        createdAt: r.created_at,
      }));

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Get Personnel Ratings Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getShopRatingStats(req, res) {
    try {
      const { shopId, startDate, endDate } = req.query;

      if (!shopId) {
        return res.status(400).json({
          success: false,
          error: "shopId is required",
        });
      }

      const cacheKey = `shop_rating_stats_${shopId}_${startDate}_${endDate}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      const stats = await RatingsModel.getShopRatingStats(
        shopId,
        startDate,
        endDate
      );

      const result = {
        totalRatings: stats.totalRatings || 0,
        avgRating: parseFloat(stats.avgRating || 0).toFixed(2),
        distribution: {
          5: stats.fiveStars || 0,
          4: stats.fourStars || 0,
          3: stats.threeStars || 0,
          2: stats.twoStars || 0,
          1: stats.oneStar || 0,
        },
      };

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Get Shop Rating Stats Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getPersonnelRatingStats(req, res) {
    try {
      const { shopId, startDate, endDate } = req.query;

      if (!shopId) {
        return res.status(400).json({
          success: false,
          error: "shopId is required",
        });
      }

      const cacheKey = `personnel_rating_stats_${shopId}_${startDate}_${endDate}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      const stats = await RatingsModel.getPersonnelRatingStats(
        shopId,
        startDate,
        endDate
      );

      const result = {
        totalRatings: stats.totalRatings || 0,
        avgRating: parseFloat(stats.avgRating || 0).toFixed(2),
        distribution: {
          5: stats.fiveStars || 0,
          4: stats.fourStars || 0,
          3: stats.threeStars || 0,
          2: stats.twoStars || 0,
          1: stats.oneStar || 0,
        },
      };

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Get Personnel Rating Stats Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getRatingsByPersonnel(req, res) {
    try {
      const { shopId, startDate, endDate } = req.query;

      if (!shopId) {
        return res.status(400).json({
          success: false,
          error: "shopId is required",
        });
      }

      const cacheKey = `ratings_by_personnel_${shopId}_${startDate}_${endDate}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      const ratings = await RatingsModel.getRatingsByPersonnel(
        shopId,
        startDate,
        endDate
      );

      const result = ratings.map((r) => ({
        personnel: r.personnel,
        totalRatings: r.totalRatings,
        avgRating: parseFloat(r.avgRating).toFixed(2),
        fiveStars: r.fiveStars,
        positiveRatings: r.positiveRatings,
      }));

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Get Ratings By Personnel Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getRecentRatings(req, res) {
    try {
      const { shopId, limit = 10 } = req.query;

      if (!shopId) {
        return res.status(400).json({
          success: false,
          error: "shopId is required",
        });
      }

      const cacheKey = `recent_ratings_${shopId}_${limit}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      const ratings = await RatingsModel.getRecentRatings(shopId, limit);

      const result = ratings.map((r) => ({
        ratingId: r.rating_id,
        transactionId: r.transaction_id,
        customerName: r.cus_name,
        rating: r.rating_type === "shop" ? r.shop_rating : r.personnel_rating,
        personnel: r.personnel,
        comment: r.comment,
        createdAt: r.created_at,
        type: r.rating_type,
      }));

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Get Recent Ratings Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getRatingTrend(req, res) {
    try {
      const { shopId, startDate, endDate, type = "shop" } = req.query;

      if (!shopId) {
        return res.status(400).json({
          success: false,
          error: "shopId is required",
        });
      }

      const cacheKey = `rating_trend_${shopId}_${startDate}_${endDate}_${type}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      const trend = await RatingsModel.getRatingTrend(
        shopId,
        startDate,
        endDate,
        type
      );

      const result = trend.map((t) => ({
        date: t.date,
        avgRating: parseFloat(t.avgRating).toFixed(2),
        count: t.count,
      }));

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Get Rating Trend Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // OPTIMIZED: Sequential execution instead of parallel
  static async getAllRatingsStats(req, res) {
    try {
      const { shopId, startDate, endDate } = req.query;

      if (!shopId) {
        return res.status(400).json({
          success: false,
          error: "shopId is required",
        });
      }

      const cacheKey = `all_ratings_stats_${shopId}_${startDate}_${endDate}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }

      // Execute in batches to reduce connection pressure
      const [shopStats, personnelStats] = await Promise.all([
        RatingsModel.getShopRatingStats(shopId, startDate, endDate),
        RatingsModel.getPersonnelRatingStats(shopId, startDate, endDate),
      ]);

      // Small delay
      await new Promise(resolve => setTimeout(resolve, 50));

      const personnelBreakdown = await RatingsModel.getRatingsByPersonnel(
        shopId,
        startDate,
        endDate
      );

      const result = {
        shop: {
          totalRatings: shopStats.totalRatings || 0,
          avgRating: parseFloat(shopStats.avgRating || 0).toFixed(2),
          distribution: {
            5: shopStats.fiveStars || 0,
            4: shopStats.fourStars || 0,
            3: shopStats.threeStars || 0,
            2: shopStats.twoStars || 0,
            1: shopStats.oneStar || 0,
          },
        },
        personnel: {
          totalRatings: personnelStats.totalRatings || 0,
          avgRating: parseFloat(personnelStats.avgRating || 0).toFixed(2),
          distribution: {
            5: personnelStats.fiveStars || 0,
            4: personnelStats.fourStars || 0,
            3: personnelStats.threeStars || 0,
            2: personnelStats.twoStars || 0,
            1: personnelStats.oneStar || 0,
          },
          byPersonnel: personnelBreakdown.map((r) => ({
            personnel: r.personnel,
            totalRatings: r.totalRatings,
            avgRating: parseFloat(r.avgRating).toFixed(2),
            positiveRatings: r.positiveRatings,
          })),
        },
      };

      cache.set(cacheKey, result);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Get All Ratings Stats Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = RatingsController;