const express = require("express");
const router = express.Router();
const {
  registerUser,
  logoutUser,
  loginUser,
} = require("../controllers/authController");
const {
  registerAdmin,
  getAllAdmins,
  findAdminByEmail,
  searchAdminsByEmail,
  getInventorySummary,
  getWeeklyChartData,
  getSAdminInventorySummary,
  getSAdminWeeklyChartData,
  getSAReportDashborardCardsData,
} = require("../controllers/adminController");
const authenticate = require("../middlewares/authMiddleware");
const {
  getAllUsers,
  editUser,
  getUsersByIdOrNameWithCustomerRole,
  getUserByIdAndShopId,
  getUserByUserIdShopIdRole,
  updateStaffByUserIdShopId,
  getUsersByShopScope,
} = require("../controllers/userController");
const {
  getAllShops,
  registerLaundryShop,
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
  getReadyToPickUpTrans,
  updateReadyToPickUpIfPaidTrans,
  getCompletedTransaction,
  getYearlyFinancialReportStaffModule,
  getActivityLogs,
  updateTransPaymentStatusCash,
  getItemHistoryByItemId,
  getShopAnalytics,
  getBusinessDocsByShop,
  updateShopStatus,
  registerLaundryShopBranch,
  getScopeShops,
  getShopInventoryHistory,
} = require("../controllers/shopController");
const {
  insertShopAbout,
  updateShopAbout,
  getAllAboutByShopId,
  updateDisplaySettings,
  addShopService,
  getAllServicesByShopId,
  updateShopService,
  updateServicesDisplaySettings,
  addShopPrices,
  getAllPricesByShopId,
  updateShopPrice,
  updatePricesDisplaySettings,
  getDisplayedPriceByShopId,
} = require("../controllers/shop-landing-page-features-contoller/shopLandingPageFeature");
const { upload } = require("../middlewares/upload");
const validateApiKey = require("../middlewares/apiKeyMiddleware");
const multer = require("multer");
const {
  getAllPaymentMethodsByShopId,
  addPaymentMethod,
  updateShopPaymentMethod,
  updatePaymentMethodDisplaySettings,
  getPaymentMethodByShopId,
} = require("../controllers/payment-methods-controller/paymentMethodsContoller");
const {
  getAllItemsReport,
  getDisplayedServicesByShopId,
  getAllCustomerRecordsByShopId,
} = require("../controllers/report-controllers/reportController");
const send = require("../controllers/smsController");
const { sendOtp, verifyOtp } = require("../controllers/otpController");
const { updateLaundryStatus } = require("../controllers/customerController");

// Apply API key validation to all routes
router.use(validateApiKey);

// Protected routes that need authentication
router.use(authenticate); // Apply authentication middleware to all routes below

router.post("/register-user", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/register-admin", registerAdmin);
router.get("/laundry-shops", getAllShops);
router.get("/users", getAllUsers);
router.get("/users-by-shop-scope/:shop_id", getUsersByShopScope);
router.post("/register-laundry-shop-branch", registerLaundryShopBranch);
router.put("/edit-shop/:shop_id", editShop);
router.get("/admins", getAllAdmins);
router.put("/edit-user/:userId", editUser);
// router.get('/admin/:email', findAdminByEmail);
router.get("/admin/search", searchAdminsByEmail);
router.get("/users/search/:shop_id", getUsersByIdOrNameWithCustomerRole);
router.get("/users/search/:shop_id/:user_id", getUserByIdAndShopId);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

//-----SHOP DOCS VIEWING AND UPDATE STATUS API's-------//
router.get("/business-docs/:shop_id", getBusinessDocsByShop);
router.put("/update-shop-stat/:shop_id", updateShopStatus);

//-----SHOP INVENTORY API's-------//
router.post("/add-shop-inventory", addShopInventory);
router.get("/shop-inventory-items/:shop_id", getAllShopInventoryItems);
router.put("/edit-inventory-item/:item_id", editItemById);

//-----SHOP ABOUT MANAGEMENT API's-------//
router.post("/insert-shop-about", insertShopAbout);
router.put("/edit-shop-about/:about_id", updateShopAbout);
router.get("/get-shop-about/:shop_id", getAllAboutByShopId);
router.put("/update-display-settings/:shop_id", updateDisplaySettings);

//-----SHOP SERVICES MANAGEMENT API's-------//
router.post(
  "/add-service",
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File too large. Maximum allowed size is 2MB.",
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`,
        });
      } else if (err) {
        // Handle invalid file type, etc.
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      next(); // Continue to controller if no upload errors
    });
  },
  addShopService,
);
router.get("/get-all-services/:shop_id", getAllServicesByShopId);
router.put(
  "/update-service/:service_id",
  upload.single("image"),
  updateShopService,
);
router.put(
  "/update-services-display-settings/:shop_id",
  updateServicesDisplaySettings,
);

//-----SHOP PRICES MANAGEMENT API's-------//
router.post(
  "/add-price",
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File too large. Maximum allowed size is 2MB.",
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`,
        });
      } else if (err) {
        // Handle invalid file type, etc.
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      next(); // Continue to controller if no upload errors
    });
  },
  addShopPrices,
);
router.get("/get-all-prices/:shop_id", getAllPricesByShopId);
router.put(
  "/update-price/:pricing_id",
  upload.single("image"),
  updateShopPrice,
);
router.put(
  "/update-prices-display-settings/:shop_id",
  updatePricesDisplaySettings,
);

//-----SHOP PAYMENT METHODS MANAGEMENT API's-------//
router.get("/get-all-payment-methods/:shop_id", getAllPaymentMethodsByShopId);
router.post(
  "/add-payment-method",
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File too large. Maximum allowed size is 2MB.",
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`,
        });
      } else if (err) {
        // Handle invalid file type, etc.
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      next(); // Continue to controller if no upload errors
    });
  },
  addPaymentMethod,
);
router.put(
  "/update-payment-method/:pm_id",
  upload.single("image"),
  updateShopPaymentMethod,
);
router.put(
  "/update-mp-display-settings/:shop_id",
  updatePaymentMethodDisplaySettings,
);

//-----SMS NOTIFICATION-------//
router.post("/send-sms", send);

//-----SHOP REPORTS API's-------//
router.get("/get-items-report/:shop_id", getAllItemsReport); //Get all items
router.get("/get-customer-records/:shop_id", getAllCustomerRecordsByShopId); //Get all customer receipt(API FOR REPORTS AND CUSTOMER RECORD)

//-----CUSTOMER RECIEPT DYNAMIC PRICES AND SERVICES FOR SHOP API's-------//
router.get("/displayed-prices/:shop_id", getDisplayedPriceByShopId);
router.get("/displayed-services/:shop_id", getDisplayedServicesByShopId);

router.get("/displayed-payment-method/:shop_id", getPaymentMethodByShopId);

// Customer fetching on customer module
router.get("/get-staff/:user_id/:shop_id", getUserByUserIdShopIdRole);
router.put("/update-staff/:user_id/:shop_id", updateStaffByUserIdShopId);

// ---------UPDATE ITEMS QUANTITY AND REORDER LEVEL-----------//
router.put("/update-inventory-items", updateMultipleInventoryItems);

// -----------UPDATE CUSTOMER RECIEPT
router.put("/update-laundry-status/:laundryId", updateLaundryStatus);

// -----------STAFF DASHBOARD COUNTS
router.get("/get-dashboard-counts/:shop_id", getDashboardCounts);

// -----------STAFF ON PROCESS ORDERS
router.get("/get-weekly-on-process-trans/:shop_id", getWeeklyTrasactions);

// -----------STAFF PENDING SERVICE TRANSACTION
router.get("/get-all-on-service-trans/:shop_id", getPendingServiceTrans);

// -----------STAFF PENDING PAYMENT STATUS TRANSACTION
router.get(
  "/get-pending-payment-status-trans/:shop_id",
  getPendingPaymentStatusTrans,
);
router.put("/update-payment-status/:laundryId", updateTransPaymentStatus);
router.put(
  "/update-payment-status-cash/:laundryId",
  updateTransPaymentStatusCash,
);

//-----------STAFF READY TO PICK UP SERVICE STATUS TRANSACTION
router.get("/get-ready-to-pick-up-trans/:shop_id", getReadyToPickUpTrans);
router.put(
  "/update-ready-to-pick-up-trans/:laundryId",
  updateReadyToPickUpIfPaidTrans,
);

//-----------STAFF LAUNDRY DONE OR COMPLETED SERVICE STATUS TRANSACTION
router.get("/get-completed-transactions/:shop_id", getCompletedTransaction);

//-----------STAFF YEARLY REPORT(WITH DATA FOR BAR GRAPH)
router.get("/get-yearly-report/:shop_id", getYearlyFinancialReportStaffModule);

//-----------STAFF ACTIVITY LOGS
router.get("/get-shop-activity-log/:shop_id", getActivityLogs);

router.get("/dashboard/summary/:shop_id", getInventorySummary);
router.get("/dashboard/chart/:shop_id", getWeeklyChartData);

router.get("/sadmin/dashboard/summary", getSAdminInventorySummary);
router.get("/sadmin/dashboard/chart", getSAdminWeeklyChartData);

//-----------ADMIN ITEMS HISTORY DATA
router.get("/items-history/:item_id", getItemHistoryByItemId);

router.get("/shop/:shop_id/overview", getShopAnalytics);

router.get("/scope/:shop_id", getScopeShops);
router.get("/item-history-log/:shop_id", getShopInventoryHistory);

// Protected admin routes
// router.get('/admins', authenticate, getAllAdmins);

module.exports = router;
