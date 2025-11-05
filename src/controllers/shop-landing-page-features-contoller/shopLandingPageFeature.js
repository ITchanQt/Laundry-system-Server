const ShopModel = require("../../models/shop-landing-page-features-model/ShopModel");
const ShopAboutModel = require("../../models/shop-landing-page-features-model/ShopAboutModel");
const ShopServicesModel = require("../../models/shop-landing-page-features-model/ShopServicesModel");
const ShopPricingModel = require("../../models/shop-landing-page-features-model/ShopPricingModel");

const getShopAbout = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Shop slug is required",
      });
    }
    const shop = await ShopModel.findBySlug(slug);
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    const abouts = await ShopAboutModel.findAboutByShopId(shop.shop_id);

    res.status(200).json({
      success: true,
      data: {
        shop_name: shop.shop_name,
        slug: shop.slug,
        about: abouts,
      },
    });
  } catch (error) {
    console.error("Error fetching shop data " + error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getShopServices = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Shop slug is require",
      });
    }

    const shop = await ShopModel.findBySlug(slug);
    if (!shop) {
      return res.status(400).json({
        success: false,
        message: "Shop not found",
      });
    }

    const services = await ShopServicesModel.findServicesByShopId(shop.shop_id);

    res.status(200).json({
      success: true,
      data: {
        shop_name: shop.shop_name,
        slug: shop.slug,
        services,
      },
    });
  } catch (error) {
    console.error("Error fetching shop data " + error);
    res.status(500).json({
      success: false,
      messgage: "Server error",
    });
  }
};

const getShopPricing = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Shop slug is require",
      });
    }

    const shop = await ShopModel.findBySlug(slug);
    if (!shop) {
      return res.status(400).json({
        success: false,
        message: "Shop not found",
      });
    }

    const pricing = await ShopPricingModel.findPricingById(shop.shop_id);

    res.status(200).json({
      success: true,
      data: {
        shop_name: shop.shop_name,
        slug: shop.slug,
        pricing,
      },
    });
  } catch (error) {
    console.error("Error fetching shop data " + error);
    res.status(500).json({
      success: false,
      messgage: "Server error",
    });
  }
};
module.exports = { getShopAbout, getShopServices, getShopPricing };
