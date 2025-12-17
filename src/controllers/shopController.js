const LaundryShops = require("../models/LaundryShops");

const registerLaundryShop = async (req, res) => {
  try {
    const { admin_id, owner_emailAdd, owner_contactNum, shop_name } = req.body;

    const adminExist = await LaundryShops.findByEmail(owner_emailAdd);
    if (!adminExist) {
      return res.status(400).json({
        success: false,
        message: "Email doesn't exist!",
      });
    }

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

const updateMultipleInventoryItems = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items array is required.",
      });
    }

    for (const item of items) {
      if (
        !item.item_id ||
        item.item_quantity === undefined ||
        item.item_reorderLevel === undefined
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Each item must include item_id, item_quantity, and item_reorderLevel.",
        });
      }
    }

    for (const item of items) {
      const existingItem = await LaundryShops.getInventoryItemById(
        item.item_id
      );

      if (!existingItem) {
        console.warn(`Item ${item.item_id} not found. Skipping.`);
        continue;
      }

      const existingReorder = parseInt(existingItem.item_reorderLevel) || 0;
      const incomingReorder = parseInt(item.item_reorderLevel) || 0;

      const newReorderLevel = existingReorder + incomingReorder;

      await LaundryShops.updateStockAndReorderLevel(
        item.item_id,
        item.item_quantity,
        newReorderLevel
      );
    }

    return res.status(200).json({
      success: true,
      message: "Inventory successfully updated.",
    });
  } catch (error) {
    console.error("Error updating items:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getDashboardCounts = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: true,
        message: "Shop ID parameters is required!",
      });
    }

    const result = await LaundryShops.selectAllDashboardDetails(shop_id);
    const dashboardCounts = result;
    return res.status(200).json({
      success: true,
      message: "Dashboard counts fetched successfully!",
      data: dashboardCounts,
    });
  } catch (error) {
    console.error("Error geting dashboard counts:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const getWeeklyTrasactions = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID parameter is required!",
      });
    }

    const transactions = await LaundryShops.selectWeeklyTransactions(shop_id);
    return res.status(200).json({
      success: true,
      message: "Customers weekly transactions fetch successfully!",
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching weekly transactions:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const getPendingServiceTrans = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID parameters is required!",
      });
    }

    const transactions = await LaundryShops.selectPendingServiceTrans(shop_id);
    res.status(200).json({
      success: true,
      message: "On Service transactions fetch successfully!",
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching On service transactions:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
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
  updateMultipleInventoryItems,
  getDashboardCounts,
  getWeeklyTrasactions,
  getPendingServiceTrans,
};
