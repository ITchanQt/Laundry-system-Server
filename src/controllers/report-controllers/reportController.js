const ReportModels = require("../../models/report-models/ReportsModel");

const getAllItemsReport = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID paramaters is required!",
      });
    }

    const itemsReport = await ReportModels.searchAllItemsReport(shop_id);
    res.status(200).json({
      success: true,
      message: "Items for report successfully get!",
      data: itemsReport,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getDisplayedServicesByShopId = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID parameters is required!",
      });
    }

    const displayedServices = await ReportModels.searchDisplayedServicesById(
      shop_id
    );
    res.status(200).json({
      success: true,
      message: "Displayed services successfully get!",
      data: displayedServices,
    });
  } catch (error) {
    console.error("getDisplayedServicesByShopId error: ", error);
    res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

const getAllCustomerRecordsByShopId = async (req, res) => {
  try {
    const { shop_id } = req.params;
    if (!shop_id) {
      return res.status(400).json({
        success: false,
        message: "Shop ID parameters is required!",
      });
    }

    const customerRecords = await ReportModels.searchAllCustomerReceiptByShopId(
      shop_id
    );
    res.status(200).json({
      success: true,
      message: "Customer records successfully get!",
      data: customerRecords,
    });
  } catch (error) {
    console.error("getAllCustomerRecordsByShopId error: ", error);
    res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

module.exports = {
  getAllItemsReport,
  getDisplayedServicesByShopId,
  getAllCustomerRecordsByShopId,
};
