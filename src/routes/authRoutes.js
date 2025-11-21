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
} = require("../controllers/adminController");
const authenticate = require("../middlewares/authMiddleware");
const {
  getAllUsers,
  editUser,
  getUsersByIdOrNameWithCustomerRole,
  getUserByIdAndShopId,
} = require("../controllers/userController");
const {
  getAllShops,
  registerLaundryShop,
  editShop,
  addShopInventory,
  getAllShopInventoryItems,
  editItemById,
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
} = require("../controllers/shop-landing-page-features-contoller/shopLandingPageFeature");
const { upload } = require("../middlewares/upload");
const validateApiKey = require("../middlewares/apiKeyMiddleware");
const multer = require("multer");
const {
  getAllPaymentMethodsByShopId,
  addPaymentMethod,
  updateShopPaymentMethod,
  updatePaymentMethodDisplaySettings,
} = require("../controllers/payment-methods-controller/paymentMethodsContoller");

// Apply API key validation to all routes
// router.use(validateApiKey);

// Protected routes that need authentication
// router.use(authenticate); // Apply authentication middleware to all routes below

router.post("/register-user", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/register-admin", registerAdmin);
router.get("/laundry-shops", getAllShops);
router.get("/users", getAllUsers);
router.post("/register-laundry-shop", registerLaundryShop);
router.put("/edit-shop/:shop_id", editShop);
router.get("/admins", getAllAdmins);
router.put("/edit-user/:userId", editUser);
// router.get('/admin/:email', findAdminByEmail);
router.get("/admin/search", searchAdminsByEmail);
router.get("/users/search/:shop_id", getUsersByIdOrNameWithCustomerRole);
router.get("/users/search/:shop_id/:user_id", getUserByIdAndShopId);

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
  addShopService
);
router.get("/get-all-services/:shop_id", getAllServicesByShopId);
router.put(
  "/update-service/:service_id",
  upload.single("image"),
  updateShopService
);
router.put(
  "/update-services-display-settings/:shop_id",
  updateServicesDisplaySettings
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
  addShopPrices
);
router.get("/get-all-prices/:shop_id", getAllPricesByShopId);
router.put(
  "/update-price/:pricing_id",
  upload.single("image"),
  updateShopPrice
);
router.put(
  "/update-prices-display-settings/:shop_id",
  updatePricesDisplaySettings
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
  addPaymentMethod
);
router.put(
  "/update-payment-method/:pm_id",
  upload.single("image"),
  updateShopPaymentMethod
);
router.put(
  "/update-mp-display-settings/:shop_id",
  updatePaymentMethodDisplaySettings
);

// Protected admin routes
// router.get('/admins', authenticate, getAllAdmins);

module.exports = router;
