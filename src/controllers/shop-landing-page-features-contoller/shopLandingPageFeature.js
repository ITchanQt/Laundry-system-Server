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

const insertShopAbout = async (req, res) => {
  try {
    const { shop_id, title, description, is_displayed } = req.body;

    if (!shop_id || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "shop_id, title and description are required",
      });
    }

    const existingTitle = await ShopAboutModel.findByTitle(title, shop_id);

    if (existingTitle && existingTitle.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Title already exists!",
      });
    }

    const results = await ShopAboutModel.createAbout({
      shop_id,
      title,
      description,
      is_displayed,
    });

    res.status(200).json({
      success: true,
      message: "Shop about inserted successfully!",
      data: results,
    });
  } catch (error) {
    console.error("insertShopAbout error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateShopAbout = async (req, res) => {
  try {
    const { about_id } = req.params;
    if (!about_id) {
      res.status(400).json({
        success: false,
        message: "About ID is required",
      });
    }

    const updatedAbout = await ShopAboutModel.editShopAbouById(
      about_id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "About updated successfully!",
      data: updatedAbout,
    });
  } catch (error) {
    console.error("insertShopAbout error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getAllAboutByShopId = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Missing shop ID parameters!"
      });
    }

    const shopAbout = await ShopAboutModel.searchAllAboutByShopId(shop_id);
    res.status(200).json({
      success: true,
      data: shopAbout
    });
  } catch (error) {
     console.error("get Shop About error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateDisplaySettings = async (req, res) => {
  try {
    const { shop_id } = req.params;
    const { displayedFeatureIds } = req.body; // array of 3 IDs that should be displayed

    if (!Array.isArray(displayedFeatureIds) || displayedFeatureIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No features selected for display",
      });
    }

    // Update in DB
    await ShopAboutModel.updateDisplaySettings(shop_id, displayedFeatureIds);

    res.json({
      success: true,
      message: "Display settings updated successfully",
    });
  } catch (error) {
    console.error("updateDisplaySettings error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating display settings",
    });
  }
}

module.exports = {
  getShopAbout,
  getShopServices,
  getShopPricing,
  insertShopAbout,
  updateShopAbout,
  getAllAboutByShopId,
  updateDisplaySettings
};
