const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  loginAdmin,
  loginStaff,
} = require("../controllers/authController");
const {
  registerAdmin,
  searchAdminsByEmail,
} = require("../controllers/adminController");
const {
  registerLaundryShop,
  editShop,
  uploadBusinessDocs,
  getAllActiveShopForUserRegistration,
} = require("../controllers/shopController");
const {
  getShopAbout,
  getShopServices,
  getShopPricing,
  getShopNameAndSlug,
  getShopBySlug,
} = require("../controllers/shop-landing-page-features-contoller/shopLandingPageFeature");
const {
  forgotPassword,
  resetPassword,
  forgotPasswordAdmin,
  forgotPasswordCustomer,
  forgotPasswordStaff,
} = require("../controllers/auth/authController");
const {
  verifyOtp,
  sendOtp,
  sendOtpAdmin,
} = require("../controllers/otpController");
const {
  verifySuperAdmin,
  dashboard,
  superAdminLogin,
} = require("../controllers/superAdminController");
const { upload } = require("../middlewares/upload");
const multer = require("multer");

// Public routes that don't need authentication
router.post("/register", registerUser);
router.post("/user/login", loginUser);
router.post("/staff/login", loginStaff);
router.post("/admin/login", loginAdmin);
router.post("/register-admin", registerAdmin);
router.post("/register-laundry-shop", registerLaundryShop);
router.put("/edit-shop/:shop_id", editShop);
router.post("/send-otp-admin", sendOtpAdmin);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/admin/search", searchAdminsByEmail);

//________ROUTES FOR UPLOADING BUSINESS DOCS______________
router.post(
  "/upload-business-docs",
  upload.array("business_documents", 10),
  uploadBusinessDocs,
);

router.get("/shop-name-slug", getShopNameAndSlug);
router.get("/shop-slug/:slug", getShopBySlug);

//________ROUTES FOR LANDING PAGE DATA______________
router.get("/shop-about/:slug", getShopAbout);
router.get("/shop-services/:slug", getShopServices);
router.get("/shop-pricing/:slug", getShopPricing);

//________ROUTES FOR ADMIN FORGOT AND RESET PASSWORD______________
router.post("/forgot-password", forgotPasswordAdmin);
router.post("/staff-forgot-password", forgotPasswordStaff);
router.post("/customer-forgot-password", forgotPasswordCustomer);
router.post("/reset-password", resetPassword);

//-----SUPER ADMIN LOGIN(Google OAuth) API's-------//
router.get("/dashboard", verifySuperAdmin, dashboard);
router.post("/super-admin/login", superAdminLogin);

router.get("/active-shops", getAllActiveShopForUserRegistration);

module.exports = router;
