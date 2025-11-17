const ShopModel = require("../../models/shop-landing-page-features-model/ShopModel");
const ShopAboutModel = require("../../models/shop-landing-page-features-model/ShopAboutModel");
const ShopServicesModel = require("../../models/shop-landing-page-features-model/ShopServicesModel");
const ShopPricingModel = require("../../models/shop-landing-page-features-model/ShopPricingModel");
const { supabase } = require("../../config/supabase");

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
        message: "Missing shop ID parameters!",
      });
    }

    const shopAbout = await ShopAboutModel.searchAllAboutByShopId(shop_id);
    res.status(200).json({
      success: true,
      data: shopAbout,
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

    if (
      !Array.isArray(displayedFeatureIds) ||
      displayedFeatureIds.length === 0
    ) {
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
};

//__________________SHOP SERVICES______________________//
const addShopService = async (req, res) => {
  try {
    const { shop_id, service_name, description, is_displayed } = req.body;
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const existingTitle = await ShopServicesModel.findByTitle(
      service_name,
      shop_id
    );
    if (existingTitle && existingTitle.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Title already exists!",
      });
    }

    // Upload to Supabase Storage
    const fileName = `${shop_id}-${Date.now()}-${file.originalname}`;
    const { data, error } = await supabase.storage
      .from("shop-images")
      .upload(`services/${fileName}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    // Get public URL
    const { data: publicData } = supabase.storage
      .from("shop-images")
      .getPublicUrl(`services/${fileName}`);

    // Save record in MySQL
    const newService = await ShopServicesModel.createService({
      shop_id,
      service_name,
      description,
      image_url: publicData.publicUrl,
      is_displayed: is_displayed === "true" ? "true" : "false",
    });

    res.status(201).json({
      success: true,
      message: "Service added successfully!",
      data: {
        shop_id,
        service_name,
        description,
        image_url: publicData.publicUrl,
        is_displayed,
      },
    });
  } catch (error) {
    console.error("addShopService error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getAllServicesByShopId = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message,
      });
    }

    const shopServices = await ShopServicesModel.findAllServices(shop_id);
    res.status(200).json({
      success: true,
      message: "Services fetch successfully!",
      data: shopServices,
    });
  } catch (error) {
    console.error("Get Shop Services error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateShopService = async (req, res) => {
  try {
    const service_id = req.params.service_id; // Fixed: was req.params.id
    const { service_name, service_description, is_displayed } = req.body;

    // Validate required fields
    if (!service_id) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required",
      });
    }

    if (!service_name || !service_description) {
      return res.status(400).json({
        success: false,
        message: "Service name and description are required",
      });
    }

    // Fetch existing service
    const existingService = await ShopServicesModel.findServiceById(service_id);
    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Prevent duplicate service name (ignore current)
    const duplicate = await ShopServicesModel.findByTitle(
      service_name,
      existingService.shop_id
    );
    if (
      duplicate &&
      duplicate.length > 0 &&
      duplicate[0].service_id !== Number(service_id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Service name already exists",
      });
    }

    // Default image = old image
    let image_url = existingService.image_url;

    // If new image uploaded -> upload to Supabase
    if (req.file) {
      const fileName = `${existingService.shop_id}-${Date.now()}-${
        req.file.originalname
      }`;

      const { data, error } = await supabase.storage
        .from("shop-images")
        .upload(`services/${fileName}`, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (error) throw error;

      // Get public URL
      const { data: publicData } = supabase.storage
        .from("shop-images")
        .getPublicUrl(`services/${fileName}`);

      image_url = publicData.publicUrl;
    }

    // Update DB with correct field names
    const updated = await ShopServicesModel.updateService(service_id, {
      service_name,
      service_description, // Fixed: was description
      image_url: image_url ?? null,
      is_displayed: is_displayed === "true" ? "true" : "false",
    });

    res.json({
      success: true,
      message: "Service updated successfully!",
      data: updated,
    });
  } catch (error) {
    console.error("updateShopService error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateServicesDisplaySettings = async (req, res) => {
  try {
    const { shop_id } = req.params;
    const { displayedServicesIds } = req.body;

    if (
      !Array.isArray(displayedServicesIds) ||
      displayedServicesIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "No features selected for display",
      });
    }

    // Update in DB
    await ShopServicesModel.updateDisplaySettings(
      shop_id,
      displayedServicesIds
    );

    res.json({
      success: true,
      message: "Display settings updated successfully",
    });
  } catch (error) {
    console.error("updateServicesDisplaySettings error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating display settings",
    });
  }
};

//__________________SHOP PRICES______________________//
const addShopPrices = async (req, res) => {
  try {
    const {
      shop_id,
      categories,
      price,
      pricing_label,
      description,
      is_displayed,
    } = req.body;
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const existingTitle = await ShopPricingModel.findByTitle(
      categories,
      shop_id
    );
    if (existingTitle && existingTitle.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Categories already exists!",
      });
    }

    // Upload to Supabase Storage
    const fileName = `${shop_id}-${Date.now()}-${file.originalname}`;
    const { data, error } = await supabase.storage
      .from("shop-images")
      .upload(`prices/${fileName}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    // Get public URL
    const { data: publicData } = supabase.storage
      .from("shop-images")
      .getPublicUrl(`prices/${fileName}`);

    // Save record in MySQL
    const newService = await ShopPricingModel.createPrices({
      shop_id,
      categories,
      description,
      price,
      pricing_label,
      image_url: publicData.publicUrl,
      is_displayed: is_displayed === "true" ? "true" : "false",
    });

    res.status(201).json({
      success: true,
      message: "Prices added successfully!",
      data: {
        shop_id,
        categories,
        description,
        price,
        pricing_label,
        image_url: publicData.publicUrl,
        is_displayed,
      },
    });
  } catch (error) {
    console.error("addShopService error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getShopAbout,
  getShopServices,
  getShopPricing,

  //__________________SHOP ABOUT______________________//
  insertShopAbout,
  updateShopAbout,
  getAllAboutByShopId,
  updateDisplaySettings,

  //__________________SHOP SERVICES______________________//
  addShopService,
  getAllServicesByShopId,
  updateShopService,
  updateServicesDisplaySettings,

  //__________________SHOP PRICES______________________//
  addShopPrices,
};
