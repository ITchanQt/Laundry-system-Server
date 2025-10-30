const LaundryShops = require("../models/LaundryShops");

const registerLaundryShop = async (req, res) => {
  try {
    const { owner_emailAdd, owner_contactNum, shop_name } = req.body;
    // Fix: Change findByShop to findByName and fix parameter order
    const existingShop = await LaundryShops.findByName(
      shop_name,
      owner_emailAdd,
      owner_contactNum
    );
    if (existingShop) {
      return res.status(500).json({ message: "Shop already exists" });
    }
    await LaundryShops.create(req.body);
    res.status(200).json({ message: "Laundry shop registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
        
        if (!shop_id) {
            return res.status(400).json({ 
                success: false, 
                error: 'Shop ID is required' 
            });
        }

        // Log incoming data
        console.log('Received update data:', req.body);
        console.log('Shop ID:', shop_id);

        const updatedShop = await LaundryShops.editShopById(shop_id, req.body);
        
        res.status(200).json({
            success: true,
            message: "Shop updated successfully",
            data: updatedShop
        });
    } catch (error) {
        console.error('Shop update error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

//-----SHOP INVENTORY API's-------//

const addShopInventory = async (req, res) => {
  try {
    const { item_name } = req.body;
    const existingItem = await LaundryShops.getShopInventoryByName(item_name);
    if (existingItem) {
      return res.status(400).json({ 
        success: false,
        message: "Item already exists"
      });
    }
    await LaundryShops.addShopInventory(req.body);
    res.status(200).json({
      status: true,
      message: "Item added successfully"
    });
  console.log('Item added: ', req.body);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getAllShopInventoryItems = async (req, res) => {
  try {
    const items = await LaundryShops.findAllShopInventory();
    res.status(200).json({
      success: true,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const editItemById = async (req, res) => {
  try {
    const { item_id } = req.params;
    if (!item_id) {
      return res.status(400).json({
        success: false,
        error: "Item ID is required"
      });
    }
    const updatedItem = await LaundryShops.editShopInventoryById(item_id, req.body);
      res.status(200).json({
        success: true,
        message: "Item updated successfully",
        data: updatedItem
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
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
                  editItemById
                };