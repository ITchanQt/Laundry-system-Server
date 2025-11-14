const express = require("express");
const router = express.Router();
const { registerUser, loginUser, loginAdmin } = require("../controllers/authController");
    const { registerAdmin } = require("../controllers/adminController");
const { registerLaundryShop, editShop } = require("../controllers/shopController");
const { getShopAbout, getShopServices, getShopPricing } = require("../controllers/shop-landing-page-features-contoller/shopLandingPageFeature");

// Public routes that don't need authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/login", loginAdmin);
router.post("/register-admin", registerAdmin);
router.post("/register-laundry-shop", registerLaundryShop);
router.put("/edit-shop/:shop_id", editShop);

//________ROUTES FOR LANDING PAGE DATA______________
router.get('/shop-about/:slug', getShopAbout);
router.get('/shop-services/:slug', getShopServices);
router.get('/shop-pricing/:slug', getShopPricing);

module.exports = router;