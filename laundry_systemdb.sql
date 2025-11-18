-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2025 at 11:20 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laundry_systemdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` varchar(10) NOT NULL,
  `shop_id` varchar(100) DEFAULT NULL,
  `admin_fName` varchar(100) NOT NULL,
  `admin_mName` varchar(100) NOT NULL,
  `admin_lName` varchar(100) NOT NULL,
  `admin_address` varchar(100) NOT NULL,
  `admin_username` varchar(100) NOT NULL,
  `admin_contactNum` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `date_registered` date DEFAULT curdate(),
  `role` varchar(50) DEFAULT 'Admin',
  `status` varchar(50) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `shop_id`, `admin_fName`, `admin_mName`, `admin_lName`, `admin_address`, `admin_username`, `admin_contactNum`, `email`, `password`, `date_registered`, `role`, `status`) VALUES
('LMSA-00025', NULL, 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'Helloworld123', '09999999999', 'example@john45.com', '$2b$10$CaeHkukwNixLAlVnQmxsAOggfVGULNJtu/dL38L.guAi8XGVFyqzi', '2025-10-28', 'Admin', 'Active'),
('LMSA-00026', 'LMSS-00005', 'Tina', 'Kalo', 'Moran', 'Brgy. Panabatan Sta. Margarita, Samar', 'tina.moran', '09999999998', 'tina.moran@sample.com', '$2b$10$lPz5gzRkndDACrp0XmE95.094Z6JhjANGMJmtu79o3KUMoT8Jzjoi', '2025-10-28', 'Admin', 'Active'),
('LMSA-00027', 'LMSS-00006', 'Pining', 'Gar', 'Siya', 'Brgy. Calanyugan Pagsanghan, Samar', 'PiningGarSiya', '09876544444', 'pining.garsiya@sample.com', '$2b$10$LJ306YVjtuXLSd8TDbHRveHO7L7wjaIr38OfMVTkAeWADDjiC1zxm', '2025-10-31', 'Admin', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `cus_id` varchar(50) NOT NULL,
  `cus_fName` varchar(100) NOT NULL,
  `cus_mName` varchar(100) DEFAULT NULL,
  `cus_lName` varchar(100) NOT NULL,
  `cus_eMail` varchar(100) NOT NULL,
  `cus_role` varchar(100) NOT NULL,
  `cus_status` varchar(50) NOT NULL DEFAULT 'PENDING',
  `cus_phoneNum` varchar(100) NOT NULL,
  `cus_address` varchar(100) NOT NULL,
  `cus_username` varchar(100) NOT NULL,
  `registeredBy` varchar(50) NOT NULL,
  `date_registered` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`cus_id`, `cus_fName`, `cus_mName`, `cus_lName`, `cus_eMail`, `cus_role`, `cus_status`, `cus_phoneNum`, `cus_address`, `cus_username`, `registeredBy`, `date_registered`) VALUES
('10112025-00017', 'HAHA,', NULL, 'HAHA', 'example@john45.com', 'CUSTOMER', 'ACTIVE', '9876543210', 'Caparangasan', 'itchan12', 'Customer', '2025-10-11'),
('10112025-00018', 'HEHE', NULL, 'HEHE', 'example@john46.com', 'CUSTOMER', 'INACTIVE', '9876543210', 'Caparangasan', 'itchan2', 'Customer', '2025-10-11'),
('10122025-00001', 'Juan23', NULL, 'Dela cruz', 'juan.dc1234.com', 'CUSTOMER', 'ACTIVE', '0987666666', '456 Updated Street', 'JuanDC69', 'Customer', '2025-10-12'),
('10122025-00008', 'Christian', NULL, 'Lamoste', 'christian101@example.com', 'CUSTOMER', 'PENDING', '09631199529', 'Biringan City', 'Kanor', 'Customer', '2025-10-12'),
('10122025-00009', 'Christian', NULL, 'Lamoste', 'example@john46.com', 'CUSTOMER', 'PENDING', '09631199862', 'Purok 2', 'jojo543', 'Customer', '2025-10-12'),
('10122025-00010', 'Itchan', NULL, 'Qt', 'example@john21.com', 'CUSTOMER', 'PENDING', '9876543210', 'Caparangasan', 'itchan.Qt', 'Customer', '2025-10-12'),
('10122025-00011', 'Christian', NULL, 'Lamoste', 'christian109@example.com', 'CUSTOMER', 'ACTIVE', '0987654324', 'Purok 2', 'Itchan619', 'Customer', '2025-10-12'),
('10252025-00001', 'Christian', NULL, 'Lamoste', 'christian1@example.com', 'STAFF', 'PENDING', '09631199862', 'Purok 2', 'jojo123', 'Customer', '2025-10-25'),
('10252025-00002', 'Christian', NULL, 'Lamoste', 'example@john47.com', 'CUSTOMER', 'PENDING', '9876543211', 'Purok 2', 'admin', 'Admin', '2025-10-25'),
('10252025-00003', 'Itchan', NULL, 'Lamoste', 'itchan123@sample.com', 'CUSTOMER', 'PENDING', '1234567899', 'Biringan City', 'itchan1968', 'Admin', '2025-10-25'),
('10252025-00004', 'Hello', NULL, 'World', 'helloworld@sample.com', 'CUSTOMER', 'PENDING', '1234567898', 'Brgy. Panabatan Sta. Margarita, Samar', 'helloWorld', 'Admin', '2025-10-25');

-- --------------------------------------------------------

--
-- Table structure for table `customer_receipt`
--

CREATE TABLE `customer_receipt` (
  `laundryId` varchar(100) NOT NULL,
  `shop_id` varchar(10) NOT NULL,
  `cus_id` varchar(50) NOT NULL,
  `cus_name` varchar(100) NOT NULL,
  `cus_address` varchar(100) NOT NULL,
  `cus_phoneNum` varchar(100) NOT NULL,
  `batch` int(100) NOT NULL,
  `shirts` int(100) NOT NULL,
  `pants` int(100) NOT NULL,
  `jeans` int(100) NOT NULL,
  `shorts` int(100) NOT NULL,
  `towels` int(100) NOT NULL,
  `pillow_case` int(100) NOT NULL,
  `bed_sheets` int(100) NOT NULL,
  `kg` int(100) NOT NULL,
  `washing` varchar(10) NOT NULL,
  `num_items` int(100) NOT NULL,
  `total_amount` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_receipt`
--

INSERT INTO `customer_receipt` (`laundryId`, `shop_id`, `cus_id`, `cus_name`, `cus_address`, `cus_phoneNum`, `batch`, `shirts`, `pants`, `jeans`, `shorts`, `towels`, `pillow_case`, `bed_sheets`, `kg`, `washing`, `num_items`, `total_amount`, `created_at`) VALUES
('11042025-00001', 'LMSS-00005', 'LMSU-00079', 'Christian Lamoste', 'Biringan City', '09860986098', 10, 7, 7, 7, 7, 7, 7, 7, 7, '1', 49, '910', '2025-11-04 15:59:52'),
('11042025-00002', 'LMSS-00005', 'LMSU-00079', 'Christian Lamoste', 'Biringan City', '09860986098', 3, 5, 5, 5, 5, 5, 5, 5, 5, '1', 35, '650', '2025-11-04 15:59:52'),
('11042025-00003', 'LMSS-00005', 'LMSU-00073', 'Christian Lamoste', 'Brgy. Dapdap Tarangnan, Samar', '09876546372', 2, 5, 5, 5, 5, 5, 5, 5, 5, '1', 35, '650', '2025-11-04 16:01:47');

-- --------------------------------------------------------

--
-- Table structure for table `laundry_shops`
--

CREATE TABLE `laundry_shops` (
  `shop_id` varchar(10) NOT NULL,
  `admin_id` varchar(100) NOT NULL,
  `owner_fName` varchar(100) NOT NULL,
  `owner_mName` varchar(100) DEFAULT NULL,
  `owner_lName` varchar(100) NOT NULL,
  `owner_emailAdd` varchar(100) NOT NULL,
  `owner_contactNum` varchar(100) NOT NULL,
  `shop_address` varchar(100) NOT NULL,
  `shop_name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `shop_status` varchar(100) NOT NULL DEFAULT 'Active',
  `shop_type` varchar(100) NOT NULL,
  `date_registered` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laundry_shops`
--

INSERT INTO `laundry_shops` (`shop_id`, `admin_id`, `owner_fName`, `owner_mName`, `owner_lName`, `owner_emailAdd`, `owner_contactNum`, `shop_address`, `shop_name`, `slug`, `shop_status`, `shop_type`, `date_registered`) VALUES
('LMSS-00001', 'LMSA-00020', 'Christian', 'Huhu', 'Lamoste', 'christian109@example.com', '09631199862', 'Purok 2', 'itchan123', '', 'Active', 'Washing, DryClean', '2025-10-27'),
('LMSS-00002', 'LMSA-00021', 'HAHA', 'HAHA', 'HAHA', 'itchan02@gmail.com', '09876543231', 'Biringan City', 'itchan1234', '', 'Active', 'Washing, DryClean', '2025-10-27'),
('LMSS-00003', 'LMSA-00012', 'Christian', 'Macorol', 'Lamoste', 'emily.chen@nursing.edu', '09631199863', 'Purok 2', 'itchan69', '', 'Active', 'Washing', '2025-10-28'),
('LMSS-00004', 'LMSA-00025', 'Christian', 'Macorol', 'Lamoste', 'example@john45.com', '09999999999', 'Purok 2', 'itchnQt4ever', '', 'Active', 'Washing, DryClean', '2025-10-31'),
('LMSS-00005', 'LMSA-00026', 'Tina', 'Kalo', 'Moran', 'tina.moran@sample.com', '09999999998', 'Brgy. Panabatan Sta. Margarita, Samar', 'Tina Moran Shop', 'tina-moran-shop', 'Active', 'Washing, DryClean', '2025-10-31'),
('LMSS-00006', 'LMSA-00027', 'Pining', 'Gar', 'Siya', 'pining.garsiya@sample.com', '09876544444', 'Brgy. Calanyugan Pagsanghan, Samar', 'Pining Gar Siya Laundry Shop', 'pining-gar-siya-laundry-shop', 'Active', 'Washing, DryClean', '2025-10-31');

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `pm_id` int(10) NOT NULL,
  `shop_id` varchar(10) NOT NULL,
  `pm_name` varchar(50) NOT NULL,
  `account_name` varchar(100) NOT NULL,
  `account_number` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `is_displayed` varchar(10) NOT NULL,
  `is_static` varchar(10) NOT NULL,
  `qrCode_image_url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_method`
--

INSERT INTO `payment_method` (`pm_id`, `shop_id`, `pm_name`, `account_name`, `account_number`, `description`, `is_displayed`, `is_static`, `qrCode_image_url`) VALUES
(1, 'LMSS-00005', 'GCash', 'Laundry Shop', '09123456789', 'Scan QR code or send to mobile number', 'true', 'false', ''),
(2, 'LMSS-00005', 'PayMaya', 'Laundry Shop', '09987654321', 'Scan QR code or send to mobile number', 'true', 'false', '');

-- --------------------------------------------------------

--
-- Table structure for table `shoplandingpage_about`
--

CREATE TABLE `shoplandingpage_about` (
  `about_id` int(10) NOT NULL,
  `shop_id` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_displayed` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shoplandingpage_about`
--

INSERT INTO `shoplandingpage_about` (`about_id`, `shop_id`, `title`, `description`, `is_displayed`) VALUES
(1, 'LMSS-00005', 'Who W', 'We’re WashPro, your trusted laundry partner.', 'true'),
(2, 'LMSS-00005', 'Mission1', 'Deliver fast, clean laundry', 'true'),
(3, 'LMSS-00006', 'HAHA', 'HAHAHHAHHAHHAHHAHAHAHAH', 'true'),
(4, 'LMSS-00006', 'HUHU', 'HUHUUHUHUHUUHUHUHUHUHUHUUH', 'false'),
(5, 'LMSS-00005', 'Personalized Experience.', 'You can always reach us for your laundry concerns. Call or message us — we are happy to help.', 'true'),
(6, 'LMSS-00005', 'Mission', 'Hello World', 'false'),
(7, 'LMSS-00005', 'Personalized Experience101', 'You can always reach us for your laundry concerns. Call or message us — we are happy to help.', 'false'),
(8, 'LMSS-00006', 'Chuu.', 'Achu chuu lala lala chuu.', 'true'),
(9, 'LMSS-00005', 'Quality', 'We take care of your clothes. We segregate the whites and coloreds, use gentle detergents, and avoid damage to your garments.', 'false'),
(10, 'LMSS-00005', 'Convenience', 'None of your laundry will go missing. Every item is counted, and you\'ll receive automated message notifications for your convenience.', 'false'),
(11, 'LMSS-00006', 'Chuu Chuu.', 'Achu chuu chuu.', 'false'),
(12, 'LMSS-00006', 'Chuupa Chuupa.', 'Achu chuu chuu.', 'false'),
(13, 'LMSS-00006', 'Chuupapi Chuupapi.', 'Achu chuu chuu.', 'false'),
(14, 'LMSS-00006', 'Chuupapapi.', 'Achu chuu chuu.', 'false'),
(15, 'LMSS-00006', 'Chuupa kabra.', 'Achu chuu chuu.', 'false'),
(16, 'LMSS-00006', 'Kabra.', 'Achu chuu chuu.', 'false'),
(17, 'LMSS-00006', 'Kaloko.', 'Achu chuu chuu.', 'false'),
(18, 'LMSS-00006', 'Kaloko mo.', 'Achu chuu chuu.', 'false'),
(19, 'LMSS-00006', 'Pesti.', 'Achu chuu chuu.', 'false'),
(20, 'LMSS-00006', 'Pesti kaman.', 'Achu chuu chuu.', 'false'),
(21, 'LMSS-00006', 'Pesti kaman permi.', 'Achu chuu chuu.', 'undefined'),
(22, 'LMSS-00006', 'Pesti liwat.', 'Achu chuu chuu.', 'undefined'),
(23, 'LMSS-00006', 'Pesti man liwat.', 'Achu chuu chuu.', 'undefined'),
(24, 'LMSS-00006', 'Pesti man liwat ini.', 'Achu chuu chuu.', 'undefined'),
(25, 'LMSS-00006', 'Ano na.', 'Achu chuu chuu.', 'undefined'),
(26, 'LMSS-00006', 'Ano na Kita?.', 'Achu chuu chuu.', 'true'),
(30, 'LMSS-00005', 'Quality', 'Ikaw pa', 'false'),
(31, 'LMSS-00005', 'Ano na kita hini?', 'Achu chuu chuu.', 'false'),
(32, 'LMSS-00007', 'Ano na Kita?.', 'Achu chuu chuu.', 'false'),
(33, 'LMSS-00005', 'Chuu Lala.', 'Achu chuu lala lala chuu', 'false'),
(34, 'LMSS-00005', 'Christian', 'Christian M. Lamoste', 'false'),
(35, 'LMSS-00005', 'Baa', 'Kapapaso pa man', 'false'),
(36, 'LMSS-00005', 'fds', 'sfs', 'false'),
(37, 'LMSS-00005', 'Kuan gad, Bisan ano', 'Kuan gad, Bisan ano basta ikaw', 'false'),
(38, 'LMSS-00005', 'Kahit ano basta ikaw', 'Kahit ano basta ikaw, walang problema', 'false'),
(39, 'LMSS-00005', 'Hello World', 'World', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `shoplandingpage_pricing`
--

CREATE TABLE `shoplandingpage_pricing` (
  `pricing_id` int(10) NOT NULL,
  `shop_id` varchar(10) NOT NULL,
  `categories` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `pricing_label` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image_url` text NOT NULL,
  `is_displayed` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shoplandingpage_pricing`
--

INSERT INTO `shoplandingpage_pricing` (`pricing_id`, `shop_id`, `categories`, `price`, `pricing_label`, `description`, `image_url`, `is_displayed`) VALUES
(15, 'LMSS-00005', 'Clothes', 140.00, 'per load', 'Shirts, shorts, pants etc.', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/prices/LMSS-00005-1763373103131-Screenshot%202025-09-19%20182402.png', 'true'),
(16, 'LMSS-00005', 'Beddings', 150.00, 'per load', 'Bed sheets, pillow cases, towels, etc.', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/prices/LMSS-00005-1763373234817-Screenshot%202025-09-19%20182402.png', 'true'),
(17, 'LMSS-00005', 'Curtains', 200.00, 'per load', 'Window curtains and drapes', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/prices/LMSS-00005-1763373213292-Screenshot%20(2).png', 'true'),
(18, 'LMSS-00005', 'Kahit ano', 140.00, 'per load', 'Ambot kun nano', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/prices/LMSS-00005-1763450346361-Screenshot%20(4).png', 'false'),
(19, 'LMSS-00005', 'Folding', 160.00, 'per load', 'Kuan HAHAHA', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/prices/LMSS-00005-1763450384554-Screenshot%20(4).png', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `shoplandingpage_services`
--

CREATE TABLE `shoplandingpage_services` (
  `service_id` int(10) NOT NULL,
  `shop_id` varchar(10) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_description` text NOT NULL,
  `image_url` text NOT NULL,
  `is_displayed` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shoplandingpage_services`
--

INSERT INTO `shoplandingpage_services` (`service_id`, `shop_id`, `service_name`, `service_description`, `image_url`, `is_displayed`) VALUES
(16, 'LMSS-00005', '\"Machine Wash\"', 'Our state of the art machine washing service guarantees your clothes are thoroughly cleaned and gently cared for. Enjoy fresh, spotless laundry with every visit.', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00005-1763113577012-download.jpg', 'true'),
(17, 'LMSS-00005', '\"Dry Cleaning\"', 'Professional dry cleaning service for delicate fabrics and special garments. We use eco-friendly solvents to ensure your clothes look their best.', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00005-1763176622581-download.jpg', 'true'),
(18, 'LMSS-00005', '\"Ironing Service\"', 'Expert ironing and pressing service to make your clothes crisp and wrinkle-free. Perfect for business attire and special occasions.', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00005-1763355685567-download.jpg', 'true'),
(19, 'LMSS-00005', 'Laundry Wash and More...', 'Washing service details…', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00005-1763109073989-Wallpaper.jpg', 'false'),
(20, 'LMSS-00005', '\"Kahit ano\"', 'HAHAHAHAHA mao ka', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00005-1763372899704-Screenshot%202025-09-19%20182448.png', 'false'),
(21, 'LMSS-00005', 'Kaloko mo man', 'HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAHAHAHAH', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00005-1763355618810-download.jpg', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `shop_inventory`
--

CREATE TABLE `shop_inventory` (
  `item_id` varchar(100) NOT NULL,
  `shop_id` varchar(100) DEFAULT NULL,
  `item_name` varchar(100) NOT NULL,
  `item_description` varchar(255) DEFAULT NULL,
  `item_quantity` int(10) NOT NULL,
  `item_uPrice` decimal(10,2) NOT NULL DEFAULT 0.00,
  `item_reoderLevel` int(10) NOT NULL,
  `date_added` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop_inventory`
--

INSERT INTO `shop_inventory` (`item_id`, `shop_id`, `item_name`, `item_description`, `item_quantity`, `item_uPrice`, `item_reoderLevel`, `date_added`) VALUES
('LMSI-00001', '00001', 'Laundry Detergent', 'Fabric conditioner', 1500, 30.00, 500, '2025-10-30'),
('LMSI-00002', '00001', 'Fabric Softener', 'Kuan HAHAHA', 80, 18.75, 30, '2025-10-30'),
('LMSI-00003', '00001', 'Soap1234', 'HUHUHU', 100, 10.00, 10, '2025-10-30'),
('LMSI-00004', '00001', 'Soap', '', 45, 15.00, 20, '2025-10-30'),
('LMSI-00005', '00001', 'Chlorine', 'Kuan HAHAHA', 12, 4.99, 5, '2025-10-30'),
('LMSI-00006', '00001', 'Downey', 'Fabric conditioner', 10, 8.00, 4, '2025-10-30'),
('LMSI-00007', '00001', 'haha', 'HAHAHA', 12, 13.00, 12, '2025-10-30'),
('LMSI-00008', '00001', 'Bleach123', 'HAHAH', 12, 12.00, 12, '2025-10-30'),
('LMSI-00009', '00001', 'Hajdn', 'Kuan HAHAHA', 12, 11.98, 12, '2025-10-30'),
('LMSI-00010', '00001', 'Bleach1234', 'HAHAHA', 12, 11.99, 1, '2025-10-30'),
('LMSI-00011', '00001', 'Chlorine1', 'Hahaha', 10, 18.98, 1, '2025-10-30'),
('LMSI-00012', '00001', 'Hajd', 'hahaha', 12, 12.00, 8, '2025-10-30'),
('LMSI-00013', '00001', 'Ambot', 'hahaha', 12, 12.00, 8, '2025-10-30'),
('LMSI-00014', '00001', 'Ambot1', 'hahaha', 12, 12.00, 8, '2025-10-30'),
('LMSI-00015', '00001', 'Ambot4', 'hahaha', 12, 12.00, 8, '2025-10-30'),
('LMSI-00016', '00001', 'Bleach15', 'bisan ano', 32, 10.00, 12, '2025-10-30'),
('LMSI-00017', 'LMSS-00006', 'Surf ', 'Panbabad', 23, 16.00, 8, '2025-11-03'),
('LMSI-00018', 'LMSS-00006', 'Sabon', 'Panlaba', 27, 7.00, 18, '2025-11-03'),
('LMSI-00019', 'LMSS-00005', 'Carbon Dioxide', 'Pan kuan', 34, 9.00, 20, '2025-11-03'),
('LMSI-00020', 'LMSS-00005', 'Lala', 'Ambot kun nano', 29, 45.00, 25, '2025-11-03'),
('LMSI-00021', 'LMSS-00006', 'Bisan ano', 'bisan nano', 26, 8.00, 21, '2025-11-04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(11) NOT NULL,
  `shop_id` varchar(10) NOT NULL,
  `user_fName` varchar(255) NOT NULL,
  `user_mName` varchar(100) DEFAULT NULL,
  `user_lName` varchar(255) NOT NULL,
  `user_address` varchar(255) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `contactNum` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `date_registered` date NOT NULL DEFAULT curdate(),
  `registered_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `shop_id`, `user_fName`, `user_mName`, `user_lName`, `user_address`, `username`, `contactNum`, `email`, `role`, `status`, `password`, `date_registered`, `registered_by`) VALUES
('LMSU-00059', 'LMSS-00006', 'Christian', 'Dela', 'Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', 'Itchan695', '09874637287', 'Itchan695@test.com', 'customer', 'Active', '$2b$10$vifiagi4fB6B6zuUjqsjI.wr2z2iQRHPWbR8HIZ7k5KhczD9eKUlm', '2025-10-31', 'ADMIN'),
('LMSU-00060', 'LMSS-00006', 'Harith', 'Joy', 'Harley', 'Jungle Area, Land of Dawn', 'HarithHarley', '09833476254', 'HarithHarley@ex.com', 'staff', 'Active', '$2b$10$VyVk9k82VTH1xXGqyAsFK.Peg8hWVqePimaS9IYMSztcbXfDlTmcO', '2025-10-31', 'ADMIN'),
('LMSU-00067', 'LMSS-00006', 'Boang', 'Ka', 'Man', 'brgy. Curry Sta. Margarita, Samar', 'BuangKaMan', '0937268465', 'buang.ka.man@sample.com', 'CUSTOMER', 'Active', '$2b$10$aXYbaIJ09XmNOEsh7xKnfO6q5FaL3c7JaG9xf4ywu3vYpCDurG7HW', '2025-11-03', 'Customer'),
('LMSU-00068', 'LMSS-00006', 'Hello', 'Haha', 'World', 'Brgy. Panabatan Sta. Margarita, Samar', 'helloWorld', '09874563214', 'hello.world@test.com', 'CUSTOMER', 'Active', '$2b$10$QZdpouLfHENU33gZeB9cde2FmK195ymNyxqO/EO.6FBsREzSae306', '2025-11-03', 'Customer'),
('LMSU-00069', 'LMSS-00006', 'Harry', 'Bulawan', 'Potter', 'Brgy. Calanyugan Pagsanghan, Samar', 'HarryPotter', '09874532718', 'harry.potter@sample.com', 'customer', 'Active', '$2b$10$TPCOxs894oIAM8nx9k78bexx.ueMhDZQd26YHsiqpyFAu6lGRRLMS', '2025-11-03', 'ADMIN'),
('LMSU-00070', 'LMSS-00006', 'Kantotero', 'Kaluko', 'Manatad', 'Brgy. Erenas San Jorge, Samar', 'KantoteroManatad', '09876234523', 'Kantotero.Manatad@sample.com', 'customer', 'Active', '$2b$10$GD429Sg6oYZmfYDV1bGcHubTjaljv9sGKhQ2wVqxJ80hiKriZDqry', '2025-11-03', 'ADMIN'),
('LMSU-00071', 'LMSS-00006', 'Christian', 'So', 'Lamoste', 'Biringan City', 'ChistianLamoste', '09857643521', 'christian2002@example.com', 'CUSTOMER', 'Active', '$2b$10$hCMg8IwrF0NawtEx7SZjvu5Hbpbbc9KqLtvodcL.fChsQJ5xr.FBq', '2025-11-03', 'Customer'),
('LMSU-00072', 'LMSS-00006', 'Kai', 'Dacuba', 'Sotto', 'Brgy. Dapdap Tarangnan, Samar', 'KaiSotto', '09874634256', 'KaiSotto@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$LrTzBf8YmKhFsMo.pLWbIOqCcPKKjWcUSCXXvI6JLx.6EdCHbrMBa', '2025-11-03', 'CUSTOMER'),
('LMSU-00073', 'LMSS-00005', 'Christian', 'Macorol', 'Lamoste', 'Brgy. Dapdap Tarangnan, Samar', 'christian.lamoste', '09876546372', 'christian123@example.com', 'CUSTOMER', 'Inactive', '$2b$10$qw.xoDwDy8XtKw6xmjZc6ud8wVjDTspvWvF/SfJtjtIDpbFfapO/e', '2025-11-03', 'CUSTOMER'),
('LMSU-00074', 'LMSS-00005', 'Pining', 'Gar', 'Siyasa', 'Brgy. Calanyugan Pagsanghan, Samar', 'PiningGarSiya', '09875647398', 'pining.gar.siya@yahoo.com', 'STAFF', 'Pending', '$2b$10$6xyuyuhwjq8eAqM/.oFscOVkj4gAu2NZAXqMEFJqgwMnnOF8h2uh2', '2025-11-03', 'ADMIN'),
('LMSU-00075', 'LMSS-00005', 'Albert', 'Torre', 'Nicolas', 'Brgy. Panabatan Sta. Margarita, Samar', 'AlbertNicolas', '09874653782', 'alibert.nicolas@sample.com', 'customer', 'Active', '$2b$10$l14AZpHPNZOQz2bljuvyoujShD87jY.sioWiUk93RSClla3B0SgK2', '2025-11-03', 'ADMIN'),
('LMSU-00076', 'LMSS-00005', 'Lloyd', 'Manogalpok', 'Ampatuan', 'Brgy. Ilo Sta. Margarita, Samar', 'Llyodie', '09874653987', 'lloyd.ampatuan@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$7MQQOnW45Xxx95s5LHy9re8wHWBNYlNmWfJA0dZT/OGSp7Z1R6OT6', '2025-11-03', 'CUSTOMER'),
('LMSU-00077', 'LMSS-00005', 'Christian', 'Batumbakal', 'Lamoste', 'Brgy. San Agustin Gandara, Samar', 'Batumbakal69', '09874908756', 'lamoste123@test.co', 'CUSTOMER', 'ACTIVE', '$2b$10$OcY0FLXgRR/OLS/srNQnGu6u3N0jvK6pVPFJMVe5if/FDExqjx5vG', '2025-11-03', 'CUSTOMER'),
('LMSU-00078', 'LMSS-00005', 'He', 'Ho', 'Ha', 'Brgy. Panabatan Sta. Margarita, Samar', 'hehaho', '0980989786', 'hehaho@test.com', 'CUSTOMER', 'ACTIVE', '$2b$10$KOG7t1G6KcCFY4by9y9OueMBL3/HAdlPQ6sbyqKYVFFdnuvKmpvx2', '2025-11-03', 'CUSTOMER'),
('LMSU-00079', 'LMSS-00005', 'Christian', 'So', 'Lamoste', 'Biringan City', 'Itchan601', '09860986098', 'itchan123@test.cp', 'CUSTOMER', 'ACTIVE', '$2b$10$1yS8apY6diP1r36KiN9f7OMRgcEmdEagLDMDtmkHyYSVTqyKUSueu', '2025-11-03', 'CUSTOMER'),
('LMSU-00080', 'LMSS-00005', 'qwerty', 'qwerty', 'qwerty', 'Brgy. Diaz Gandara, Samar', 'qwerty', '09090909090', 'qwerty@qwerty.com', 'STAFF', 'Active', '$2b$10$d/WEJd0/EF2YMDZG2BWudOoop3Uf2ro1BVcELsQLeohljnoQiNbb.', '2025-11-03', 'CUSTOMER'),
('LMSU-00081', 'LMSS-00005', 'John', 'John', 'John', 'Brgy. San Agustin Gandara, Samar', 'jjj', '0987465348', 'john@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$o3KrX6qpaKN.HjjVTa6GYe/FNrsMeEgr4zva8fIz216rEcJ0ouc7S', '2025-11-03', 'CUSTOMER'),
('LMSU-00082', 'LMSS-00005', 'Ambot', 'ambot', 'ambot', 'Biringan City', 'ambot', '09876098754', 'ambot.@test.com', 'CUSTOMER', 'ACTIVE', '$2b$10$OwrxKt.2exRoG5nGBlWWDuWlkoJOI3LKu2l.ddC.PD98b.tn3vJWW', '2025-11-03', 'CUSTOMER'),
('LMSU-00083', 'LMSS-00006', 'Christian', 'Macorol', 'Lamoste', 'Brgy. San Jaun San Jorge, Samar', 'ChristianLamoste', '09875098467', 'lamoste.christian@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$6tcHHmMzpRQHZMiO24USS.aeQYOchPeWur6k/6urqs308FWGU8Tfa', '2025-11-04', 'CUSTOMER'),
('LMSU-00084', 'LMSS-00005', 'Agapito', 'Sagirit', 'Hampaslupa', 'Brgy. Panabatan Sta. Margarita, Samar', 'agapitoHampaslupa', '09870947381', 'agapitoHampaslupa@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$DW/BVFhLJBZsQ1JHW7trYukkTRrkdP3X/f6jbXOnhLpzvJxJbZ8f.', '2025-11-04', 'CUSTOMER'),
('LMSU-00085', 'LMSS-00005', 'Christian', 'Macorol', 'Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', 'testuser1', '09898746352', 'testuser1@example.com', 'staff', 'Active', '$2b$10$MgNXjdqaN0FCnMPW1hvtgetcMfNKbsaCSAXHX68RZGUCCZv0InQk.', '2025-11-15', 'ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `admin_username` (`admin_username`,`admin_contactNum`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`cus_id`),
  ADD UNIQUE KEY `cus_id` (`cus_id`),
  ADD UNIQUE KEY `cus_eMail` (`cus_eMail`,`cus_phoneNum`),
  ADD UNIQUE KEY `cus_username` (`cus_username`),
  ADD UNIQUE KEY `cus_eMail_2` (`cus_eMail`,`cus_phoneNum`,`cus_username`);

--
-- Indexes for table `customer_receipt`
--
ALTER TABLE `customer_receipt`
  ADD PRIMARY KEY (`laundryId`),
  ADD KEY `fk_customer_receipt_user` (`cus_id`);

--
-- Indexes for table `laundry_shops`
--
ALTER TABLE `laundry_shops`
  ADD PRIMARY KEY (`shop_id`),
  ADD UNIQUE KEY `owner_emailAdd` (`owner_emailAdd`),
  ADD UNIQUE KEY `owner_contactNum` (`owner_contactNum`),
  ADD UNIQUE KEY `shop_name` (`shop_name`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`pm_id`);

--
-- Indexes for table `shoplandingpage_about`
--
ALTER TABLE `shoplandingpage_about`
  ADD PRIMARY KEY (`about_id`);

--
-- Indexes for table `shoplandingpage_pricing`
--
ALTER TABLE `shoplandingpage_pricing`
  ADD PRIMARY KEY (`pricing_id`);

--
-- Indexes for table `shoplandingpage_services`
--
ALTER TABLE `shoplandingpage_services`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `shop_inventory`
--
ALTER TABLE `shop_inventory`
  ADD PRIMARY KEY (`item_id`),
  ADD UNIQUE KEY `item_name` (`item_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `pm_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shoplandingpage_about`
--
ALTER TABLE `shoplandingpage_about`
  MODIFY `about_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `shoplandingpage_pricing`
--
ALTER TABLE `shoplandingpage_pricing`
  MODIFY `pricing_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `shoplandingpage_services`
--
ALTER TABLE `shoplandingpage_services`
  MODIFY `service_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer_receipt`
--
ALTER TABLE `customer_receipt`
  ADD CONSTRAINT `fk_customer_receipt_user` FOREIGN KEY (`cus_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
