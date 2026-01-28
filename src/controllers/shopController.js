const LaundryShops = require("../models/LaundryShops");
const { supabase } = require("../config/supabase");

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
      owner_contactNum,
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

const uploadBusinessDocs = async (req, res) => {
  try {
    const { shop_id, docs_types } = req.body;
    const files = req.files;

    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required",
      });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one document",
      });
    }

    let docTypes = [];
    try {
      docTypes = Array.isArray(docs_types)
        ? docs_types
        : JSON.parse(docs_types || "[]");
    } catch (e) {
      docTypes = Array.isArray(docs_types) ? docs_types : [];
    }

    if (files.length !== docTypes.length) {
      return res.status(400).json({
        success: false,
        message: "Number of files and document types must match",
      });
    }

    const uploadedDocs = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const docsName = docTypes[i];

      if (!docsName || typeof docsName !== "string") {
        return res.status(400).json({
          success: false,
          message: `Invalid document type for file ${i + 1}`,
        });
      }

      const fileExt = file.originalname.split(".").pop();
      const cleanFileName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
      const timestamp = Date.now();
      const filePath = `${shop_id}/${timestamp}-${i}-${cleanFileName}`;

      const { data, error } = await supabase.storage
        .from("shop-images")
        .upload(`business_proofs/${filePath}`, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        console.error("Supabase upload error:", error);
        throw new Error(`Failed to upload file: ${file.originalname}`);
      }

      const { data: publicData } = supabase.storage
        .from("shop-images")
        .getPublicUrl(`business_proofs/${filePath}`);

      const publicUrl = publicData.publicUrl;

      uploadedDocs.push({
        shop_id,
        docs_name: docsName,
        docs_img: publicUrl,
      });
    }

    const result = await LaundryShops.createBusDocs(uploadedDocs);

    res.status(201).json({
      success: true,
      message: "Documents uploaded successfully!",
      data: uploadedDocs,
      insertedCount: uploadedDocs.length,
    });
  } catch (error) {
    console.error("Document Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during upload",
      error: error.message,
    });
  }
};

const registerLaundryShopBranch = async (req, res) => {
  try {
    const {
      parent_shopId,
      admin_id,
      owner_emailAdd,
      owner_contactNum,
      shop_name,
    } = req.body;

    const adminExist = await LaundryShops.findByEmail(owner_emailAdd);
    if (!adminExist) {
      return res.status(400).json({
        success: false,
        message: "Email doesn't exist!",
      });
    }

    if (!parent_shopId) {
      return res.status(400).json({
        success: false,
        message: "Main branch shop ID is required!",
      });
    }

    // Check if the shop already exists
    const existingShop = await LaundryShops.findByName(
      shop_name,
      owner_emailAdd,
      owner_contactNum,
    );

    if (existingShop) {
      return res.status(400).json({
        success: false,
        message: "Shop already exists",
      });
    }

    const result = await LaundryShops.createBranch(req.body);

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

const getBusinessDocsByShop = async (req, res) => {
  try {
    const { shop_id } = req.params;

    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required",
      });
    }

    const docs = await LaundryShops.findBusDocsByShopId(shop_id);

    res.status(200).json({
      success: true,
      message: "Business documents fetched successfully",
      data: docs,
      count: docs.length,
    });
  } catch (error) {
    console.error("Error fetching business documents:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch business documents",
      error: error.message,
    });
  }
};

const updateShopStatus = async (req, res) => {
  try {
    const { shop_id } = req.params;
    const { shop_status } = req.body;

    if (!shop_id || !shop_status) {
      return res.status(400).json({
        success: false,
        message: "Shop ID and shop status are required.",
      });
    }

    const result = await LaundryShops.setShopStatus(shop_id, shop_status);
    return res.status(200).json({
      success: true,
      message: "Shop status successfully updated.",
      data: result,
    });
  } catch (error) {
    console.error("Error updating shop status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update shop status",
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
      shop_id,
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
      item_id,
    );

    if (duplicates && duplicates.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Item name already exists for another item in this shop!",
      });
    }
    const updatedItem = await LaundryShops.editShopInventoryById(
      item_id,
      req.body,
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
    const { items, user_id } = req.body;

    if (!items || !Array.isArray(items)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid items." });
    }

    for (const item of items) {
      const existingItem = await LaundryShops.getInventoryItemById(
        item.item_id,
      );

      if (!existingItem) {
        console.warn(`Item ${item.item_id} not found.`);
        continue;
      }

      const oldQty = Number(existingItem.item_quantity);
      const newQty = Number(item.item_quantity || item.qty);
      const qtyChange = newQty - oldQty;

      const existingReorder = parseInt(existingItem.item_reorderLevel) || 0;
      const incomingReorder = parseInt(item.item_reorderLevel) || 0;
      const newReorderLevel = existingReorder + incomingReorder;

      await LaundryShops.updateStockAndLogHistory(
        item.item_id,
        user_id,
        newQty,
        newReorderLevel,
        qtyChange,
      );
    }

    return res
      .status(200)
      .json({ success: true, message: "Inventory updated." });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ success: false, message: error.message });
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

const getPendingPaymentStatusTrans = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID parameters is required!",
      });
    }

    const transactions = await LaundryShops.selectPendingPaymentsTrans(shop_id);
    res.status(200).json({
      success: true,
      message: "Pending payment status fetch successfully!",
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching pending payment status transactions:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const updateTransPaymentStatus = async (req, res) => {
  try {
    const { laundryId } = req.params;
    const { payment_status } = req.body;

    if (!laundryId || !payment_status) {
      return res.status(400).json({
        success: false,
        message: "Laundry ID and status are required.",
      });
    }

    const result = await LaundryShops.updatePaymentStatus(
      laundryId,
      payment_status,
    );
    return res.status(200).json({
      success: true,
      message: "Payment status successfully updated.",
      data: result,
    });
  } catch (error) {
    console.error("Error updating service status transactions:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const updateTransPaymentStatusCash = async (req, res) => {
  try {
    const { laundryId } = req.params;
    const { payment_status } = req.body;

    if (!laundryId || !payment_status) {
      return res.status(400).json({
        success: false,
        message: "Laundry ID and status are required.",
      });
    }

    const result = await LaundryShops.updatePaymentStatusCash(
      laundryId,
      payment_status,
    );
    return res.status(200).json({
      success: true,
      message: "Payment status successfully updated.",
      data: result,
    });
  } catch (error) {
    console.error("Error updating service status transactions:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const getReadyToPickUpTrans = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID parameters is required!",
      });
    }

    const transactions = await LaundryShops.selectReadyToPickUpTrans(shop_id);
    res.status(200).json({
      success: true,
      message: "Ready to pick up transactions fetch successfully!",
      data: transactions,
    });
  } catch (error) {
    console.error(
      "Error fetching ready to pick up service status transactions:",
      error,
    );
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const updateReadyToPickUpIfPaidTrans = async (req, res) => {
  try {
    const { laundryId } = req.params;
    const { service_status } = req.body;

    if (!laundryId || !service_status) {
      return res.status(400).json({
        success: false,
        message: "Laundry ID and status are required.",
      });
    }

    const result = await LaundryShops.updateReadyToPickUpIfPaid(
      service_status,
      laundryId,
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "Update failed. transaction hasn't been PAID yet.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service status successfully updated.",
      data: result,
    });
  } catch (error) {
    console.error("Error updating service status transactions:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const getCompletedTransaction = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID paramaters is required!",
      });
    }

    const transactions = await LaundryShops.selectCompletedTransaction(shop_id);

    res.status(200).json({
      success: true,
      message: "Completed transactions fetch successfully!",
      data: transactions,
    });
  } catch (error) {
    console.error(
      "Error fetching Laundry Done or completed service status transactions:",
      error,
    );
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

const getYearlyFinancialReportStaffModule = async (req, res) => {
  try {
    const { shop_id } = req.params;

    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required.",
      });
    }

    const [
      monthlyStats,
      yearlyTotal,
      averageMonthly,
      totalTransactions,
      highestMonth,
    ] = await Promise.all([
      LaundryShops.getMonthlyStats(shop_id),
      LaundryShops.getYearlyTotal(shop_id),
      LaundryShops.getAverageMonthly(shop_id),
      LaundryShops.getTotalTransactions(shop_id),
      LaundryShops.getHighestMonth(shop_id),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        monthly: monthlyStats,
        yearly_total_amount: yearlyTotal[0].yearly_total_amount,
        average_monthly_amount: averageMonthly[0].average_monthly_amount,
        total_transactions: totalTransactions[0].total_transactions,
        highest_month: highestMonth[0] || null,
      },
    });
  } catch (error) {
    console.error("Controller Error (getYearlyFinancialReport):", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate financial report.",
    });
  }
};

const getActivityLogs = async (req, res) => {
  try {
    const { shop_id } = req.params;

    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required.",
      });
    }

    const logs = await LaundryShops.selectActivityLogs(shop_id);

    res.status(200).json({
      success: true,
      message: "Activity logs fetched successfully!",
      data: logs,
    });
  } catch (error) {
    console.error("Controller Error (getActivityLogs):", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch activity log.",
    });
  }
};

const getItemHistoryByItemId = async (req, res) => {
  try {
    const { item_id } = req.params;
    if (!item_id) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required.",
      });
    }

    const items = await LaundryShops.selectItemHistoryByItemId(item_id);

    res.status(200).json({
      success: true,
      message: "Items history fetched successfully",
      data: items,
    });
  } catch (error) {
    console.error("Controller Error (getItemHistoryByItemId):", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch items history.",
    });
  }
};

const getShopAnalytics = async (req, res) => {
  try {
    const { shop_id } = req.params;

    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "shop_id parameter is required",
      });
    }

    const avgProcessPerStaff =
      await LaundryShops.selectAverageTransactionsPerStaff(shop_id);
    const mostActiveStaff = await LaundryShops.selectMostActiveStaff(shop_id);
    const peakHourUsage = await LaundryShops.selectPeakSystemHour(shop_id);

    return res.status(200).json({
      success: true,
      data: {
        average_transactions_per_staff: avgProcessPerStaff,
        most_active_staff: mostActiveStaff,
        peak_system_hour: peakHourUsage,
      },
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Add getAllShops to exports
module.exports = {
  registerLaundryShop,
  uploadBusinessDocs,
  registerLaundryShopBranch,
  getBusinessDocsByShop,
  updateShopStatus,
  getAllShops,
  editShop,
  addShopInventory,
  getAllShopInventoryItems,
  editItemById,
  updateMultipleInventoryItems,
  getDashboardCounts,
  getWeeklyTrasactions,
  getPendingServiceTrans,
  getPendingPaymentStatusTrans,
  updateTransPaymentStatus,
  updateTransPaymentStatusCash,
  getReadyToPickUpTrans,
  updateReadyToPickUpIfPaidTrans,
  getCompletedTransaction,
  getYearlyFinancialReportStaffModule,
  getActivityLogs,
  getItemHistoryByItemId,
  getShopAnalytics,
};
