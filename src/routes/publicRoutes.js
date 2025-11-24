const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  loginAdmin,
} = require("../controllers/authController");
const { registerAdmin } = require("../controllers/adminController");
const {
  registerLaundryShop,
  editShop,
} = require("../controllers/shopController");
const {
  getShopAbout,
  getShopServices,
  getShopPricing,
} = require("../controllers/shop-landing-page-features-contoller/shopLandingPageFeature");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/auth/authController");

// Public routes that don't need authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/login", loginAdmin);
router.post("/register-admin", registerAdmin);
router.post("/register-laundry-shop", registerLaundryShop);
router.put("/edit-shop/:shop_id", editShop);

//________ROUTES FOR LANDING PAGE DATA______________
router.get("/shop-about/:slug", getShopAbout);
router.get("/shop-services/:slug", getShopServices);
router.get("/shop-pricing/:slug", getShopPricing);

//________ROUTES FOR ADMIN FORGOT AND RESET PASSWORD______________
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
