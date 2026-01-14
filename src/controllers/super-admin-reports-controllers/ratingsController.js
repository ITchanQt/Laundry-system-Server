const RatingsModel = require("../../models/super-admin-reports-models/ratingsModel");

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

      const ratings = await RatingsModel.getShopRatings(
        shopId,
        startDate,
        endDate
      );

      res.json({
        success: true,
        data: ratings.map((r) => ({
          ratingId: r.rating_id,
          customerId: r.cus_id,
          customerName: r.cus_name,
          rating: r.shop_rating,
          comment: r.comment,
          createdAt: r.created_at,
        })),
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

      const ratings = await RatingsModel.getPersonnelRatings(
        shopId,
        startDate,
        endDate
      );

      res.json({
        success: true,
        data: ratings.map((r) => ({
          ratingId: r.rating_id,
          transactionId: r.transaction_id,
          customerId: r.cus_id,
          customerName: r.cus_name,
          rating: r.personnel_rating,
          personnel: r.personnel,
          comment: r.comment,
          createdAt: r.created_at,
        })),
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

      const stats = await RatingsModel.getShopRatingStats(
        shopId,
        startDate,
        endDate
      );

      res.json({
        success: true,
        data: {
          totalRatings: stats.totalRatings || 0,
          avgRating: parseFloat(stats.avgRating || 0).toFixed(2),
          distribution: {
            5: stats.fiveStars || 0,
            4: stats.fourStars || 0,
            3: stats.threeStars || 0,
            2: stats.twoStars || 0,
            1: stats.oneStar || 0,
          },
        },
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

      const stats = await RatingsModel.getPersonnelRatingStats(
        shopId,
        startDate,
        endDate
      );

      res.json({
        success: true,
        data: {
          totalRatings: stats.totalRatings || 0,
          avgRating: parseFloat(stats.avgRating || 0).toFixed(2),
          distribution: {
            5: stats.fiveStars || 0,
            4: stats.fourStars || 0,
            3: stats.threeStars || 0,
            2: stats.twoStars || 0,
            1: stats.oneStar || 0,
          },
        },
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

      const ratings = await RatingsModel.getRatingsByPersonnel(
        shopId,
        startDate,
        endDate
      );

      res.json({
        success: true,
        data: ratings.map((r) => ({
          personnel: r.personnel,
          totalRatings: r.totalRatings,
          avgRating: parseFloat(r.avgRating).toFixed(2),
          fiveStars: r.fiveStars,
          positiveRatings: r.positiveRatings,
        })),
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

      const ratings = await RatingsModel.getRecentRatings(shopId, limit);

      res.json({
        success: true,
        data: ratings.map((r) => ({
          ratingId: r.rating_id,
          transactionId: r.transaction_id,
          customerName: r.cus_name,
          rating: r.rating_type === "shop" ? r.shop_rating : r.personnel_rating,
          personnel: r.personnel,
          comment: r.comment,
          createdAt: r.created_at,
          type: r.rating_type,
        })),
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

      const trend = await RatingsModel.getRatingTrend(
        shopId,
        startDate,
        endDate,
        type
      );

      res.json({
        success: true,
        data: trend.map((t) => ({
          date: t.date,
          avgRating: parseFloat(t.avgRating).toFixed(2),
          count: t.count,
        })),
      });
    } catch (error) {
      console.error("Get Rating Trend Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getAllRatingsStats(req, res) {
    try {
      const { shopId, startDate, endDate } = req.query;

      if (!shopId) {
        return res.status(400).json({
          success: false,
          error: "shopId is required",
        });
      }

      const [shopStats, personnelStats, personnelBreakdown] = await Promise.all(
        [
          RatingsModel.getShopRatingStats(shopId, startDate, endDate),
          RatingsModel.getPersonnelRatingStats(shopId, startDate, endDate),
          RatingsModel.getRatingsByPersonnel(shopId, startDate, endDate),
        ]
      );

      res.json({
        success: true,
        data: {
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
        },
      });
    } catch (error) {
      console.error("Get All Ratings Stats Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = RatingsController;
