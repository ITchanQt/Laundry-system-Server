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
            data: itemsReport
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}

module.exports = { getAllItemsReport };