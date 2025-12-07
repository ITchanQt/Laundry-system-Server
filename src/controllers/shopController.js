const LaundryShops = require("../models/LaundryShops");

const registerLaundryShop = async (req, res) => {
  try {
    const { admin_id, owner_emailAdd, owner_contactNum, shop_name } = req.body;

    // Check if the shop already exists
    const existingShop = await LaundryShops.findByName(
      shop_name,
      owner_emailAdd,
      owner_contactNum
    );

    if (existingShop) {
      return res.status(400).json({
        success: false,
        message: "Shop already exists",
      });
    }

    // Create the shop and auto-update admin table
    const result = await LaundryShops.create(req.body);

    res.status(201).json({
      success: true,
      message: "Laundry shop registered successfully",
      shop_id: result.shop_id,
      admin_id: result.admin_id,
    });
  } catch (error) {
    console.error("Register laundry shop error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllShops = async (req, res) => {
  try {
    const shops = await LaundryShops.getAllShops();
    res.status(200).json({
      success: true,
      data: shops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const editShop = async (req, res) => {
  try {
    const { shop_id } = req.params;
    const { services, data } = req.body;

    if (!shop_id) {
      return res
        .status(400)
        .json({ success: false, error: "Shop ID is required" });
    }

    console.log("Received update data:", req.body);
    console.log("Shop ID:", shop_id);

    // Wrap main shop fields in `data`
    const updatedShop = await LaundryShops.editShopById(shop_id, req.body);

    res.status(200).json({
      success: true,
      message: "Shop updated successfully",
      data: updatedShop,
    });
  } catch (error) {
    console.error("Shop update error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//-----SHOP INVENTORY API's-------//

const addShopInventory = async (req, res) => {
  try {
    const { shop_id, item_name } = req.body;

    const existingItem = await LaundryShops.findByItemNameAndShopId(
      item_name,
      shop_id
    );
    if (existingItem && existingItem.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Item already exists!",
      });
    }

    await LaundryShops.addShopInventory(req.body);
    res.status(200).json({
      status: true,
      message: "Item added successfully",
    });
    console.log("Item added: ", req.body);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllShopInventoryItems = async (req, res) => {
  try {
    const { shop_id } = req.params;

    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop id parameters required!",
      });
    }

    const items = await LaundryShops.findAllShopInventory(shop_id);
    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const editItemById = async (req, res) => {
  try {
    const { shop_id, item_name } = req.body;
    const { item_id } = req.params;
    if (!item_id) {
      return res.status(400).json({
        success: false,
        error: "Item ID is required",
      });
    }

    const duplicates = await LaundryShops.findDuplicateByNameAndShopId(
      item_name,
      shop_id,
      item_id
    );

    if (duplicates && duplicates.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Item name already exists for another item in this shop!",
      });
    }
    const updatedItem = await LaundryShops.editShopInventoryById(
      item_id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add getAllShops to exports
module.exports = {
  registerLaundryShop,
  getAllShops,
  editShop,
  addShopInventory,
  getAllShopInventoryItems,
  editItemById,
};
