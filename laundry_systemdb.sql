-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 30, 2025 at 09:15 AM
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
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
  `id` int(10) NOT NULL,
  `shop_id` varchar(10) NOT NULL,
  `user_id` varchar(10) DEFAULT NULL,
  `activity_id` text NOT NULL,
  `action` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_log`
--

INSERT INTO `activity_log` (`id`, `shop_id`, `user_id`, `activity_id`, `action`, `created_at`) VALUES
(1, 'LMSS-00006', 'LMSU-00059', '12302025-00003', 'On Process', '2025-12-30 00:00:00'),
(2, 'LMSS-00006', 'LMSU-00089', '11262025-00001', 'Ready to pick up', '2025-12-30 00:00:00'),
(4, 'LMSS-00006', 'LMSU-00059', '12302025-00003', 'Ready to pick up', '2025-12-30 12:14:12'),
(7, 'LMSS-00006', 'LMSU-00059', '12302025-00002', 'Laundry Done', '2025-12-30 12:43:46'),
(8, 'LMSS-00006', 'LMSU-00059', '12302025-00003', 'Laundry Done', '2025-12-30 12:46:08'),
(9, 'LMSS-00006', NULL, 'LMSI-00038', 'Add Item', '2025-12-30 13:49:06'),
(10, 'LMSS-00006', NULL, 'LMSI-00018', 'Update Item', '2025-12-30 14:07:09'),
(11, 'LMSS-00006', 'LMSU-00059', '12302025-00001', 'Online payment proof uploaded', '2025-12-30 14:35:45'),
(13, 'LMSS-00006', 'LMSU-00059', '12282025-00001', 'Online payment received', '2025-12-30 14:47:57'),
(14, 'LMSS-00006', 'LMSU-00059', '12302025-00004', 'On Process', '2025-12-30 15:35:04'),
(15, 'LMSS-00006', 'LMSU-00059', '12302025-00004', 'Online payment proof uploaded', '2025-12-30 15:36:10'),
(19, 'LMSS-00006', 'LMSU-00059', '12302025-00004', 'Ready to pick up', '2025-12-30 15:51:14'),
(20, 'LMSS-00006', 'LMSU-00059', '12302025-00004', 'Laundry Done', '2025-12-30 15:51:28'),
(21, 'LMSS-00006', 'LMSU-00059', '12302025-00004', 'Online payment received', '2025-12-30 15:52:53');

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
  `status` varchar(50) DEFAULT 'Pending',
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `shop_id`, `admin_fName`, `admin_mName`, `admin_lName`, `admin_address`, `admin_username`, `admin_contactNum`, `email`, `password`, `date_registered`, `role`, `status`, `reset_token`, `reset_token_expires`) VALUES
('LMSA-00026', 'LMSS-00005', 'Tina', 'Kalo', 'Moran', 'Brgy. Panabatan Sta. Margarita, Samar', 'tina.moran', '09999999998', 'tina.moran@sample.com', '$2b$10$lPz5gzRkndDACrp0XmE95.094Z6JhjANGMJmtu79o3KUMoT8Jzjoi', '2025-10-28', 'Admin', 'Active', '', '0000-00-00 00:00:00'),
('LMSA-00027', 'LMSS-00006', 'Pining', 'Gar', 'Siya', 'Brgy. Calanyugan Pagsanghan, Samar', 'PiningGarSiya', '09876544444', 'pining.garsiya@sample.com', '$2b$10$LJ306YVjtuXLSd8TDbHRveHO7L7wjaIr38OfMVTkAeWADDjiC1zxm', '2025-10-31', 'Admin', 'Active', '', '0000-00-00 00:00:00'),
('LMSA-00028', NULL, 'Christian', 'Macorol', 'Lamoste', 'Purok 2, Caparangsan Gandara, Samar', 'itchaQT', '+639631199862', 'christianlamostem@gmail.com', '$2b$10$lhMbc608W9a8JnwGslTVo.zETTZ.auKN.3OGYZ0j6X4lyACW7kbF6', '2025-12-06', 'Admin', 'Active', NULL, NULL);

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
-- Table structure for table `customer_transactions`
--

CREATE TABLE `customer_transactions` (
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
  `service` varchar(50) NOT NULL,
  `num_items` int(100) NOT NULL,
  `cleaning_products` text NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'On Service',
  `payment_status` varchar(50) NOT NULL,
  `onlinePayment_proof` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `process_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_transactions`
--

INSERT INTO `customer_transactions` (`laundryId`, `shop_id`, `cus_id`, `cus_name`, `cus_address`, `cus_phoneNum`, `batch`, `shirts`, `pants`, `jeans`, `shorts`, `towels`, `pillow_case`, `bed_sheets`, `kg`, `service`, `num_items`, `cleaning_products`, `total_amount`, `status`, `payment_status`, `onlinePayment_proof`, `created_at`, `updated_at`, `process_by`) VALUES
('11042025-00001', 'LMSS-00005', 'LMSU-00079', 'Christian Lamoste', 'Biringan City', '09860986098', 10, 7, 7, 7, 7, 7, 7, 7, 7, '1', 49, '', 910.00, '', '', NULL, '2025-11-04 15:59:52', '2025-12-05 02:24:19', ''),
('11042025-00002', 'LMSS-00005', 'LMSU-00079', 'Christian Lamoste', 'Biringan City', '09860986098', 3, 5, 5, 5, 5, 5, 5, 5, 5, '1', 35, '', 650.00, '', '', NULL, '2025-11-04 15:59:52', '2025-12-05 02:24:19', ''),
('11042025-00003', 'LMSS-00005', 'LMSU-00073', 'Christian Lamoste', 'Brgy. Dapdap Tarangnan, Samar', '09876546372', 2, 5, 5, 5, 5, 5, 5, 5, 5, '1', 35, '', 650.00, 'Ready to pick up', '', NULL, '2025-11-04 16:01:47', '2025-12-05 02:24:19', ''),
('11242025-00001', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 2, 2, 2, 2, 2, 2, 2, 2, 23, '1', 14, '', 260.00, 'Ready to pick up', '', NULL, '2025-11-24 18:01:20', '2025-12-05 02:24:19', ''),
('11242025-00002', 'LMSS-00006', 'LMSU-00070', 'Kantotero Manatad', 'Brgy. Erenas San Jorge, Samar', '09876234523', 4, 2, 2, 23, 1, 5, 4, 4, 24, '1', 41, '', 883.00, 'Ready to pick up', '', NULL, '2025-11-24 18:19:03', '2025-12-05 02:24:19', ''),
('11242025-00003', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 10, 2, 3, 4, 4, 4, 4, 4, 15, '1', 25, '', 470.00, 'Ready to pick up', '', NULL, '2025-11-24 18:22:31', '2025-12-05 02:24:19', ''),
('11242025-00004', 'LMSS-00006', 'LMSU-00067', 'Boang Man', 'brgy. Curry Sta. Margarita, Samar', '0937268465', 9, 7, 2, 2, 3, 3, 3, 3, 3, '1', 23, '', 405.00, 'Ready to pick up', '', NULL, '2025-11-24 18:24:09', '2025-12-05 02:24:19', ''),
('11242025-00005', 'LMSS-00006', 'LMSU-00068', 'Hello World', 'Brgy. Panabatan Sta. Margarita, Samar', '09874563214', 2, 2, 2, 2, 2, 2, 2, 2, 2, '1', 14, '', 260.00, 'Laundry done', '', NULL, '2025-11-24 18:25:05', '2025-12-05 02:24:19', ''),
('11242025-00006', 'LMSS-00006', 'LMSU-00071', 'Christian Lamoste', 'Biringan City', '09857643521', 2, 4, 1, 1, 2, 2, 2, 2, 2, '1', 14, '', 245.00, 'Laundry Done', '', NULL, '2025-11-24 18:28:52', '2025-12-05 02:24:19', ''),
('11242025-00007', 'LMSS-00006', 'LMSU-00088', 'Tina  Moko', 'Biringan City', '09809876543', 2, 2, 2, 2, 2, 2, 2, 2, 2, 'true', 14, '', 260.00, 'Ready to pick up', '', NULL, '2025-11-24 18:32:53', '2025-12-05 02:24:19', ''),
('11242025-00008', 'LMSS-00006', 'LMSU-00088', 'Tina  Moko', 'Biringan City', '09809876543', 2, 4, 3, 3, 2, 1, 3, 4, 5, 'true', 20, '', 393.00, 'Ready to pick up', '', NULL, '2025-11-24 18:36:37', '2025-12-17 08:17:20', ''),
('11242025-00009', 'LMSS-00006', 'LMSU-00068', 'Hello World', 'Brgy. Panabatan Sta. Margarita, Samar', '09874563214', 1, 1, 1, 2, 10, 0, 0, 0, 3, 'true', 14, '', 265.00, 'Laundry Done', '', NULL, '2025-11-24 21:36:48', '2025-12-05 02:24:19', ''),
('11252025-00001', 'LMSS-00006', 'LMSU-00088', 'Tina  Moko', 'Biringan City', '09809876543', 1, 2, 2, 2, 2, 0, 0, 0, 0, 'washing', 8, '', 156.00, 'Ready to pick up', '', NULL, '2025-11-25 08:09:44', '2025-12-05 02:24:19', ''),
('11252025-00002', 'LMSS-00006', 'LMSU-00088', 'Tina  Moko', 'Biringan City', '09809876543', 5, 1, 2, 4, 2, 0, 0, 0, 35, '1', 9, '', 800.00, 'Ready to pick up', '', NULL, '2025-11-25 11:13:37', '2025-12-05 02:24:19', ''),
('11252025-00003', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 2, 0, 0, 0, 0, 4, 2, 3, 14, '1', 9, '', 320.00, 'Ready to pick up', '', NULL, '2025-11-25 11:15:55', '2025-12-05 02:24:19', ''),
('11252025-00004', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 2, 0, 0, 0, 0, 4, 2, 3, 14, '1', 9, '', 320.00, 'Ready to pick up', '', NULL, '2025-11-25 11:19:57', '2025-12-17 08:17:34', ''),
('11252025-00005', 'LMSS-00006', 'LMSU-00088', 'Tina  Moko', 'Biringan City', '09809876543', 2, 0, 0, 0, 0, 4, 2, 3, 0, '1', 9, '', 280.00, 'Ready to pick up', '', NULL, '2025-11-25 11:22:17', '2025-12-05 02:24:19', ''),
('11252025-00006', 'LMSS-00006', 'LMSU-00070', 'Kantotero Manatad', 'Brgy. Erenas San Jorge, Samar', '09876234523', 1, 1, 3, 4, 6, 0, 0, 0, 7, '1', 14, '', 140.00, 'Ready to pick up', '', NULL, '2025-11-25 11:23:42', '2025-12-05 02:24:19', ''),
('11252025-00007', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 3, 0, 0, 0, 0, 5, 4, 2, 21, '1', 11, '', 750.00, 'Ready to pick up', '', NULL, '2025-11-25 11:27:54', '2025-12-05 02:24:19', ''),
('11252025-00008', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 1, 0, 0, 0, 0, 2, 2, 1, 7, '1', 5, '', 250.00, 'Ready to pick up', '', NULL, '2025-11-25 11:29:37', '2025-12-05 02:24:19', ''),
('11252025-00009', 'LMSS-00006', 'LMSU-00067', 'Boang Man', 'brgy. Curry Sta. Margarita, Samar', '0937268465', 2, 4, 5, 2, 4, 0, 0, 0, 14, '1', 15, '', 280.00, 'Ready to pick up', '', NULL, '2025-11-25 11:37:15', '2025-12-05 02:24:19', ''),
('11252025-00010', 'LMSS-00006', 'LMSU-00060', 'Harith Harley', 'Jungle Area, Land of Dawn', '09833476254', 2, 0, 0, 0, 0, 3, 4, 1, 14, '1', 8, '', 500.00, 'Ready to pick up', '', NULL, '2025-11-25 11:44:03', '2025-12-05 02:24:19', ''),
('11252025-00011', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 2, 3, 5, 3, 1, 0, 0, 0, 14, 'Ironing,Fo', 12, '', 280.00, 'Laundry Done', 'PAID', NULL, '2025-11-25 15:37:56', '2025-12-22 03:38:51', ''),
('11252025-00012', 'LMSS-00006', 'LMSU-00060', 'Harith Harley', 'Jungle Area, Land of Dawn', '09833476254', 2, 3, 3, 3, 3, 0, 0, 0, 14, 'Machine Wash,Folding,Ironing', 12, '', 280.00, 'Ready to pick up', '', NULL, '2025-11-25 15:42:50', '2025-12-05 02:24:19', ''),
('11252025-00013', 'LMSS-00006', 'LMSU-00088', 'Tina  Moko', 'Biringan City', '09809876543', 2, 0, 0, 0, 0, 2, 3, 3, 14, 'Machine Wash,Folding', 8, '', 500.00, 'Ready to pick up', '', NULL, '2025-11-25 15:58:05', '2025-12-30 03:40:00', ''),
('11252025-00014', 'LMSS-00006', 'LMSU-00088', 'Tina  Moko', 'Biringan City', '09809876543', 3, 12, 42, 23, 12, 0, 0, 0, 21, '', 89, '', 420.00, 'Ready to pick up', '', NULL, '2025-11-25 16:21:04', '2025-12-17 08:18:34', ''),
('11262025-00001', 'LMSS-00006', 'LMSU-00089', 'LeBron James', 'Brgy. Panabatan Sta. Margarita, Samar', '09631199862', 3, 5, 2, 5, 10, 0, 0, 0, 21, 'Machine Wash,Folding', 22, '', 480.00, 'Ready to pick up', '', NULL, '2025-11-26 16:26:00', '2025-12-30 04:06:39', ''),
('11262025-00002', 'LMSS-00006', 'LMSU-00089', 'LeBron James', 'Brgy. Panabatan Sta. Margarita, Samar', '09631199862', 2, 3, 2, 3, 6, 0, 0, 0, 12, 'Machine Wash, Folding, Ironing', 14, '', 280.00, 'on service', '', NULL, '2025-11-26 16:32:48', '2025-12-05 02:24:19', ''),
('11262025-00003', 'LMSS-00006', 'LMSU-00090', 'Victor Wembanyama', 'Brgy. Diaz Gandara, Samar', '09631199862', 1, 3, 4, 5, 7, 0, 0, 0, 10, 'Machine Wash, Folding, Ironing', 19, '', 224.00, 'On Service', '', NULL, '2025-11-26 16:38:10', '2025-12-05 02:24:19', ''),
('11262025-00004', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 4, 3, 4, 5, 2, 0, 0, 0, 28, 'Machine Wash, Folding, Ironing', 14, '', 640.00, 'On Service', 'PAID', NULL, '2025-11-26 16:44:53', '2025-12-22 03:26:57', ''),
('12042025-00001', 'LMSS-00006', 'LMSU-00095', 'Tarugo Maigit', 'Mundo ng mga Halimaw', '09809870968', 2, 3, 4, 8, 8, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 23, '', 280.00, 'Laundry Done', '', NULL, '2025-12-04 12:11:57', '2025-12-05 02:24:19', ''),
('12042025-00002', 'LMSS-00006', 'LMSU-00095', 'Tarugo Maigit', 'Mundo ng mga Halimaw', '09809870968', 1, 2, 3, 4, 5, 0, 0, 0, 7, 'Machine Wash, Folding, Ironing', 14, '', 160.00, 'Laundry Done', '', NULL, '2025-12-04 12:12:51', '2025-12-05 02:24:19', ''),
('12042025-00003', 'LMSS-00006', 'LMSU-00095', 'Tarugo Maigit', 'Mundo ng mga Halimaw', '09809870968', 3, 0, 0, 0, 0, 2, 6, 4, 21, 'Machine Wash, Folding', 12, '', 750.00, 'Laundry Done', '', NULL, '2025-12-04 12:13:51', '2025-12-05 02:24:19', ''),
('12042025-00004', 'LMSS-00006', 'LMSU-00095', 'Tarugo Maigit', 'Mundo ng mga Halimaw', '09809870968', 2, 12, 2, 2, 5, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 21, '', 320.00, 'Ready to pick-up', '', NULL, '2025-12-04 16:19:43', '2025-12-05 02:24:19', ''),
('12042025-00005', 'LMSS-00006', 'LMSU-00095', 'Tarugo Maigit', 'Mundo ng mga Halimaw', '09809870968', 2, 3, 4, 6, 4, 0, 0, 0, 14, 'Machine Wash, Folding', 17, '', 320.00, 'Ready to pick-up', '', NULL, '2025-12-04 17:28:13', '2025-12-05 02:24:19', ''),
('12052025-00001', 'LMSS-00006', 'LMSU-00097', 'Rob Manugalpok', 'Brgy. Panabatan Sta. Margarita, Samar', '09890481767', 2, 0, 0, 0, 0, 4, 3, 2, 14, 'Machine Wash, Folding', 9, '', 500.00, 'Ready to pick-up', '', NULL, '2025-12-05 10:27:37', '2025-12-05 02:36:29', ''),
('12052025-00002', 'LMSS-00006', 'LMSU-00096', 'Ichigo Urusoka', 'Soul Society', '+639553472448', 2, 0, 0, 0, 0, 5, 3, 2, 14, 'Machine Wash, Folding', 10, '', 500.00, 'Laundry Done', '', NULL, '2025-12-05 10:30:43', '2025-12-05 04:31:35', ''),
('12052025-00003', 'LMSS-00006', 'LMSU-00070', 'Kantotero Manatad', 'Brgy. Erenas San Jorge, Samar', '09876234523', 4, 0, 0, 0, 0, 3, 5, 4, 28, 'Machine Wash, Folding', 12, '', 1000.00, 'Ready to pick up', '', NULL, '2025-12-05 10:48:11', '2025-12-05 02:50:03', ''),
('12052025-00004', 'LMSS-00006', 'LMSU-00060', 'Harith Harley', 'Jungle Area, Land of Dawn', '09833476254', 4, 0, 0, 0, 0, 4, 5, 8, 28, 'Machine Wash, Folding, Ironing', 17, '', 1000.00, 'Ready to pick up', '', NULL, '2025-12-05 10:53:59', '2025-12-12 08:05:41', ''),
('12122025-00001', 'LMSS-00006', 'LMSU-00092', 'Justine Brownlee', 'Brgy. Malayog Gandara, Samar', '09809876485', 2, 0, 0, 0, 0, 3, 5, 0, 14, 'Machine Wash, Folding, Ironing', 16, '', 683.00, 'On Service', '', NULL, '2025-12-12 10:38:23', '2025-12-12 02:38:23', ''),
('12122025-00002', 'LMSS-00006', 'LMSU-00092', 'Justine Brownlee', 'Brgy. Malayog Gandara, Samar', '09809876485', 2, 3, 4, 5, 1, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 17, '', 598.00, 'On Service', '', NULL, '2025-12-12 11:34:37', '2025-12-12 03:34:37', ''),
('12122025-00003', 'LMSS-00006', 'LMSU-00092', 'Justine Brownlee', 'Brgy. Malayog Gandara, Samar', '09809876485', 2, 3, 4, 5, 1, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 17, '', 598.00, 'On Service', '', NULL, '2025-12-12 11:35:41', '2025-12-12 03:35:41', ''),
('12122025-00004', 'LMSS-00006', 'LMSU-00092', 'Justine Brownlee', 'Brgy. Malayog Gandara, Samar', '09809876485', 2, 3, 4, 5, 1, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 17, '', 598.00, 'On Service', '', NULL, '2025-12-12 11:37:59', '2025-12-12 03:37:59', ''),
('12122025-00005', 'LMSS-00006', 'LMSU-00092', 'Justine Brownlee', 'Brgy. Malayog Gandara, Samar', '09809876485', 2, 3, 4, 5, 1, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 17, '', 598.00, 'On Service', '', NULL, '2025-12-12 11:38:42', '2025-12-12 03:38:42', ''),
('12122025-00006', 'LMSS-00006', 'LMSU-00092', 'Justine Brownlee', 'Brgy. Malayog Gandara, Samar', '09809876485', 2, 3, 4, 5, 1, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 17, '', 598.00, 'On Service', '', NULL, '2025-12-12 11:39:49', '2025-12-12 03:39:49', ''),
('12122025-00007', 'LMSS-00006', 'LMSU-00070', 'Kantotero Manatad', 'Brgy. Erenas San Jorge, Samar', '09876234523', 4, 0, 0, 0, 0, 5, 3, 2, 28, 'Machine Wash, Folding, Ironing', 15, '', 1208.00, 'Ready to pick up', '', NULL, '2025-12-12 11:42:55', '2025-12-19 13:19:20', ''),
('12122025-00008', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 2, 4, 6, 3, 5, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 23, '', 723.00, 'On Service', '', NULL, '2025-12-12 12:01:39', '2025-12-12 04:01:39', ''),
('12122025-00009', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 2, 4, 6, 3, 5, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 23, '', 723.00, 'On Service', '', NULL, '2025-12-12 12:03:39', '2025-12-12 04:03:39', ''),
('12122025-00010', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 2, 4, 6, 3, 5, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 23, '', 723.00, 'On Service', '', NULL, '2025-12-12 12:04:12', '2025-12-12 04:04:12', ''),
('12122025-00011', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 2, 4, 6, 3, 5, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 23, '', 723.00, 'On Service', '', NULL, '2025-12-12 12:05:02', '2025-12-12 04:05:02', ''),
('12122025-00012', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 2, 4, 6, 3, 5, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 24, '', 738.00, 'On Service', '', NULL, '2025-12-12 12:09:53', '2025-12-12 04:09:53', ''),
('12122025-00013', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 2, 4, 6, 3, 5, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 24, '', 738.00, 'On Service', '', NULL, '2025-12-12 12:11:45', '2025-12-12 04:11:45', ''),
('12122025-00014', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 2, 4, 6, 3, 5, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 24, '', 738.00, 'On Service', '', NULL, '2025-12-12 12:27:39', '2025-12-12 04:27:39', ''),
('12122025-00015', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 2, 4, 6, 3, 5, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 24, '', 738.00, 'On Service', '', NULL, '2025-12-12 12:37:28', '2025-12-12 04:37:28', ''),
('12122025-00016', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 2, 4, 6, 3, 5, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 24, '', 738.00, 'On Service', '', NULL, '2025-12-12 12:38:23', '2025-12-12 04:38:23', ''),
('12122025-00017', 'LMSS-00006', 'LMSU-00060', 'Harith Harley', 'Jungle Area, Land of Dawn', '09833476254', 2, 1, 2, 1, 3, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 12, '', 472.00, 'On Service', '', NULL, '2025-12-12 12:39:53', '2025-12-12 04:39:53', ''),
('12122025-00018', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 0, 3, 4, 5, 3, 0, 0, 0, 0, 'Machine Wash, Folding, Ironing', 20, '', 362.00, 'On Service', 'PENDING', NULL, '2025-12-12 12:41:24', '2025-12-19 13:20:53', ''),
('12122025-00019', 'LMSS-00006', 'LMSU-00110', 'Christian Lamoste', 'Purok 2', '+639631199000', 3, 0, 0, 0, 0, 3, 4, 4, 21, 'Machine Wash, Folding, Ironing', 16, '', 1004.00, 'Ready to pick up', 'PENDING', NULL, '2025-12-12 12:43:15', '2025-12-19 13:31:42', ''),
('12122025-00020', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 2, 3, 4, 5, 6, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 28, '', 794.00, 'Laundry Done', 'PAID', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/proof-of-payment/12122025-00020-1766734887168-Messenger_creation_190D331A-E1E7-4CF1-99D7-E1514D2F195F.jpeg', '2025-12-12 12:44:13', '2025-12-27 07:49:49', ''),
('12122025-00021', 'LMSS-00006', 'LMSU-00100', 'Kahit Sino', 'Brgy. Diaz Gandara, Samar', '+639631199812', 2, 0, 0, 0, 0, 3, 3, 2, 14, 'Machine Wash, Folding, Ironing', 18, '', 742.00, 'Laundry Done', 'PENDING', NULL, '2025-12-12 12:55:07', '2025-12-19 13:20:38', ''),
('12122025-00022', 'LMSS-00006', 'LMSU-00072', 'Kai Sotto', 'Brgy. Dapdap Tarangnan, Samar', '09874634256', 2, 2, 2, 2, 2, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 12, 'Surf-1 | Bisan ano-1 | Sabon-1 | Laundry Detergent-1', 323.00, 'Laundry Done', 'PAID', NULL, '2025-12-12 15:44:39', '2025-12-12 08:06:00', 'ADMIN'),
('12132025-00001', 'LMSS-00006', 'LMSU-00096', 'Ichigo Urusoka', 'Soul Society', '09127645231', 2, 0, 0, 0, 0, 3, 4, 5, 14, 'Machine Wash, Folding, Ironing', 21, 'Surf-3 | Ariel-3 | Laundry Detergent-3', 629.00, 'On Service', 'PAID', NULL, '2025-12-13 12:30:01', '2025-12-13 04:30:01', 'ADMIN'),
('12132025-00002', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 3, 2, 3, 2, 2, 0, 0, 0, 21, 'Machine Wash, Folding, Ironing', 15, 'Laundry Detergent-4 | Sabon-1 | Ariel-1', 490.00, 'On Service', 'PAID', NULL, '2025-12-13 12:43:27', '2025-12-13 04:43:27', 'ADMIN'),
('12152025-00001', 'LMSS-00006', 'LMSU-00110', 'Christian Lamoste', 'Purok 2', '+639631199000', 2, 2, 3, 2, 2, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 18, 'Laundry Detergent-6 | Surf-1 | Bisan ano-1 | Ariel-1', 391.00, 'Laundry Done', 'PAID', NULL, '2025-12-15 15:03:47', '2025-12-19 02:44:05', 'STAFF'),
('12152025-00002', 'LMSS-00006', 'LMSU-00091', 'Kobe Brayant', 'Brgy. San Agustin Gandara, Samar', '09897865412', 2, 0, 0, 0, 0, 3, 4, 5, 14, 'Machine Wash, Folding, Ironing', 25, 'Ariel-1 | Surf-3 | Bisan ano-3 | Laundry Detergent-3 | Sabon-3', 644.00, 'Laundry Done', 'PAID', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v...', '2025-12-15 15:26:33', '2025-12-19 13:19:02', 'STAFF'),
('12162025-00001', 'LMSS-00006', 'LMSU-00091', 'Kobe Brayant', 'Brgy. San Agustin Gandara, Samar', '09897865412', 2, 1, 2, 2, 2, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 11, 'Surf-2 | Sabon-2', 326.00, 'Laundry Done', 'PAID', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v...', '2025-12-16 14:23:29', '2025-12-19 13:19:00', 'STAFF'),
('12172025-00001', 'LMSS-00006', 'LMSU-00115', 'Love Life', 'Brgy. Panabatan Sta. Margarita, Samar', '+639128764536', 3, 0, 0, 0, 0, 2, 2, 2, 21, 'Machine Wash, Folding, Ironing', 10, 'Surf-1xundefined, Bisan ano-2xundefined, Laundry Detergent-1xundefined', 794.00, 'Laundry Done', 'PAID', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v...', '2025-12-17 14:54:23', '2025-12-19 13:18:59', 'STAFF'),
('12172025-00002', 'LMSS-00006', 'LMSU-00100', 'Kahit Sino', 'Brgy. Diaz Gandara, Samar', '+639631199812', 0, 3, 3, 4, 5, 0, 0, 0, 0, 'Folding, Machine Wash, Ironing', 21, 'Surf - 16 x 3, Sabon - 7 x 1, Ariel - 15 x 2', 85.00, 'Laundry Done', 'PAID', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v...', '2025-12-17 14:59:43', '2025-12-19 13:18:57', 'STAFF'),
('12172025-00003', 'LMSS-00006', 'LMSU-00096', 'Ichigo Urusoka', 'Soul Society', '09127645231', 2, 0, 0, 0, 0, 3, 3, 1, 14, 'Machine Wash, Folding, Ironing', 11, 'Laundry Detergent - â‚±12 x 1, Sabon - â‚±7 x 1, Wings - â‚±10 x 1, Ariel - â‚±15 x 1', 544.00, 'Laundry Done', 'PAID', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/proof-of-payment/Gcash.jpg', '2025-12-17 15:29:40', '2025-12-19 13:18:54', 'STAFF'),
('12172025-00004', 'LMSS-00006', 'LMSU-00070', 'Kantotero Manatad', 'Brgy. Erenas San Jorge, Samar', '09876234523', 3, 0, 0, 0, 0, 4, 3, 2, 21, 'Machine Wash, Folding, Ironing', 12, 'Surf - â‚±16 x 1, Ariel - â‚±15 x 1, Laundry Detergent - â‚±12 x 1', 793.00, 'Laundry Done', 'PAID', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/proof-of-payment/Gcash.jpg', '2025-12-17 15:32:21', '2025-12-19 11:39:27', 'STAFF'),
('12222025-00001', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 2, 0, 0, 0, 0, 2, 2, 2, 14, 'Machine Wash, Folding, Ironing', 11, 'Surf - â‚±16 x 1, Bisan ano - â‚±8 x 1, Sabon - â‚±7 x 1, Laundry Detergent - â‚±12 x 1, Champion(Fab con) - â‚±10 x 1', 553.00, 'Laundry Done', 'PAID', NULL, '2025-12-22 12:11:45', '2025-12-22 04:40:46', 'STAFF'),
('12262025-00001', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 2, 0, 0, 0, 0, 2, 2, 3, 14, 'Machine Wash, Folding, Ironing', 13, 'Sabon - â‚±7 x 2, Laundry Detergent - â‚±12 x 2, Wings - â‚±10 x 2', 558.00, 'Laundry Done', 'PAID', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/proof-of-payment/12262025-00001-1766813935711-7fca92de-1e45-47fc-9150-6a3da2528fe8.jpg', '2025-12-26 09:54:26', '2025-12-27 05:58:14', 'STAFF'),
('12262025-00002', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 0, 2, 2, 2, 2, 0, 0, 0, 0, 'Machine Wash, Folding, Ironing', 13, 'Surf - â‚±16 x 1, Ariel - â‚±15 x 1, Zondrox(Color Safe) - â‚±35 x 1, Laundry Detergent - â‚±12 x 1, Sabon - â‚±7 x 1', 85.00, 'On Service', 'PENDING', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/proof-of-payment/12262025-00002-1766816075411-7fca92de-1e45-47fc-9150-6a3da2528fe8.jpg', '2025-12-26 10:43:58', '2025-12-27 06:14:38', 'STAFF'),
('12262025-00003', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 1, 1, 2, 3, 4, 0, 0, 0, 7, 'Machine Wash, Folding, Ironing', 13, 'Sabon - â‚±7 x 1, Laundry Detergent - â‚±12 x 1, Wings - â‚±10 x 1', 169.00, 'On Service', 'PAID', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/proof-of-payment/12262025-00003-1766737549402-Lamoste_Christian_2x2_ID_Photo.jpg', '2025-12-26 10:45:48', '2025-12-26 08:26:35', 'STAFF'),
('12272025-00001', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 2, 2, 2, 3, 2, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 15, 'Surf - â‚±16 x 2, Ariel - â‚±15 x 2, Zondrox(Color Safe) - â‚±35 x 2', 412.00, 'On Service', 'PENDING', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/proof-of-payment/12272025-00001-1766814951661-7fca92de-1e45-47fc-9150-6a3da2528fe8.jpg', '2025-12-27 13:55:11', '2025-12-27 05:55:53', 'STAFF'),
('12282025-00001', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 1, 1, 2, 3, 4, 0, 0, 0, 7, 'Machine Wash, Folding, Ironing', 14, 'Surf - â‚±16 x 1, Ariel - â‚±15 x 1, Zondrox(Color Safe) - â‚±35 x 1, Champion(Powder soap) - â‚±10 x 1', 236.00, 'On Service', 'PAID', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/proof-of-payment/12282025-00001-1767076479172-7fca92de-1e45-47fc-9150-6a3da2528fe8.jpg', '2025-12-28 13:12:16', '2025-12-30 06:47:57', 'STAFF - LMSU-00113'),
('12302025-00001', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 2, 1, 2, 3, 4, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 14, 'Surf - â‚±16 x 1, Ariel - â‚±15 x 1, Zondrox(Color Safe) - â‚±35 x 1, Pride - â‚±8 x 1', 354.00, 'On Service', 'PENDING', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/proof-of-payment/12302025-00001-1767076543890-7fca92de-1e45-47fc-9150-6a3da2528fe8.jpg', '2025-12-30 11:30:54', '2025-12-30 06:47:29', 'STAFF - LMSU-00113'),
('12302025-00002', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 2, 1, 2, 3, 4, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 14, 'Surf - â‚±16 x 1, Ariel - â‚±15 x 1, Zondrox(Color Safe) - â‚±35 x 1, Pride - â‚±8 x 1', 354.00, 'Laundry Done', 'PENDING', NULL, '2025-12-30 11:35:00', '2025-12-30 04:43:46', 'STAFF - LMSU-00113'),
('12302025-00003', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 2, 2, 2, 3, 2, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 14, 'Surf - â‚±16 x 1, Ariel - â‚±15 x 1, Zondrox(Color Safe) - â‚±35 x 1, Lala - â‚±10 x 1, Kahit ano - â‚±10 x 1', 366.00, 'Laundry Done', 'PAID', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/proof-of-payment/12302025-00003-1767069748860-7fca92de-1e45-47fc-9150-6a3da2528fe8.jpg', '2025-12-30 11:36:56', '2025-12-30 04:46:08', 'STAFF - LMSU-00113'),
('12302025-00004', 'LMSS-00006', 'LMSU-00059', 'Christian Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', '09874637287', 2, 3, 4, 3, 4, 0, 0, 0, 14, 'Machine Wash, Folding, Ironing', 18, 'Surf - â‚±16 x 1, Zondrox(Original) - â‚±35 x 1, Champion(Powder soap) - â‚±10 x 2', 391.00, 'Laundry Done', 'PAID', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/proof-of-payment/12302025-00004-1767080166606-7fca92de-1e45-47fc-9150-6a3da2528fe8.jpg', '2025-12-30 15:35:03', '2025-12-30 07:52:53', 'STAFF - LMSU-00113');

-- --------------------------------------------------------

--
-- Table structure for table `email_otps`
--

CREATE TABLE `email_otps` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp_code` varchar(10) NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `email_otps`
--

INSERT INTO `email_otps` (`id`, `email`, `otp_code`, `expires_at`, `is_verified`, `created_at`) VALUES
(1, 'sample011@test.com', '763881', '2025-12-06 11:14:06', 0, '2025-12-06 03:09:06'),
(3, 'sample0111@test.com', '780262', '2025-12-06 11:15:10', 0, '2025-12-06 03:10:10'),
(6, 'christian123@example.com', '901138', '2025-12-06 11:16:54', 0, '2025-12-06 03:11:54'),
(7, 'christian1234@example.com', '228315', '2025-12-06 11:17:36', 0, '2025-12-06 03:12:36'),
(14, 'sample01111@test.com', '681119', '2025-12-06 11:28:58', 0, '2025-12-06 03:23:58'),
(23, 'christian1485@example.com', '168754', '2025-12-06 11:46:37', 1, '2025-12-06 03:41:37'),
(53, 'christianlamostem@gmail.com', '600957', '2025-12-11 17:24:06', 1, '2025-12-11 09:19:06'),
(54, 'christianmacorol2002@gmail.com', '769869', '2025-12-13 15:23:26', 1, '2025-12-13 07:18:26');

-- --------------------------------------------------------

--
-- Table structure for table `laundry_shops`
--

CREATE TABLE `laundry_shops` (
  `shop_id` varchar(10) NOT NULL,
  `admin_id` varchar(100) NOT NULL,
  `admin_fName` varchar(100) NOT NULL,
  `admin_mName` varchar(100) DEFAULT NULL,
  `admin_lName` varchar(100) NOT NULL,
  `admin_emailAdd` varchar(100) NOT NULL,
  `admin_contactNum` varchar(100) NOT NULL,
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

INSERT INTO `laundry_shops` (`shop_id`, `admin_id`, `admin_fName`, `admin_mName`, `admin_lName`, `admin_emailAdd`, `admin_contactNum`, `shop_address`, `shop_name`, `slug`, `shop_status`, `shop_type`, `date_registered`) VALUES
('LMSS-00004', 'LMSA-00025', 'Christian', 'Macorol', 'Lamoste', 'example@john45.com', '09999999999', 'Purok 2', 'itchnQt4ever', 'itchnqt4ever', 'Active', 'Washing, DryClean', '2025-10-31'),
('LMSS-00005', 'LMSA-00026', 'Tina', 'Kalo', 'Moran', 'tina.moran@sample.com', '09999991111', 'Brgy. Panabatan Sta. Margarita, Samar', 'Tina Moran Shop', 'tina-moran-shop', 'Active', 'Laundry Wash and More..., Kahit ano, Kaloko mo man', '2025-10-31'),
('LMSS-00006', 'LMSA-00027', 'Pining', 'Gar', 'Siya', 'pining.garsiya@sample.com', '09876544444', 'Brgy. Calanyugan Pagsanghan, Samar', 'Pining Gar Siya Laundry Shop', 'pining-gar-siya-laundry-shop', 'Active', 'Machine Wash, Folding, Ironing', '2025-10-31'),
('LMSS-00007', 'LMSA-00111', 'Christian', 'Macorol', 'Lamoste', 'christianlamostem@gmail.com', '+639631199862', 'Purok 2', 'ITchan\'s Laundry Shop', 'itchan-s-laundry-shop', 'Active', 'Washing, DryClean', '2025-12-07');

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
(4, 'LMSS-00005', 'GCash', 'Laundry Shop', '09123456111', 'Scan QR code or send to mobile number', 'true', 'false', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/payment-methods/LMSS-00005-1763701054707-download.jpg'),
(5, 'LMSS-00006', 'GCash', 'Juan Dela Merced', '09123456111', 'Scan QR code or send to mobile number', 'true', 'false', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/payment-methods/LMSS-00006-1763543797187-Wallpaper.jpg'),
(7, 'LMSS-00006', 'PayMaya', 'Juan Dela Cruz', '09123456789', 'Scan QR code or send to mobile number', 'true', 'false', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/payment-methods/LMSS-00006-1763535624461-Screenshot%20(1).jpg'),
(9, 'LMSS-00005', 'PayMaya', 'Laundry Shop', '09123456789', 'Scan QR code or send to mobile number', 'true', 'false', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/payment-methods/LMSS-00005-1763701708449-Wallpaper.jpg'),
(10, 'LMSS-00004', 'GCash', 'Kahit ano', '0987648390', 'Scan QR code or send to mobile number', 'true', 'false', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/payment-methods/LMSS-00004-1763954135247-Wallpaper.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `rating_id` int(11) NOT NULL,
  `shop_id` varchar(10) NOT NULL,
  `transaction_id` varchar(20) DEFAULT NULL,
  `cus_id` varchar(10) NOT NULL,
  `cus_name` varchar(100) NOT NULL,
  `personnel_rating` tinyint(10) DEFAULT NULL,
  `personnel` varchar(100) DEFAULT NULL,
  `shop_rating` tinyint(10) DEFAULT NULL,
  `comment` text NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`rating_id`, `shop_id`, `transaction_id`, `cus_id`, `cus_name`, `personnel_rating`, `personnel`, `shop_rating`, `comment`, `created_at`) VALUES
(2, 'LMSS-00006', '11262025-00004', 'LMSU-00059', 'Christian Lamoste', 3, NULL, NULL, 'HAHAHA baga ka han umaw!', '2025-12-28'),
(4, 'LMSS-00006', NULL, 'LMSU-00059', 'Christian Lamoste', NULL, NULL, 3, 'HAHAHA baga ka han umaw!', '2025-12-28'),
(10, 'LMSS-00006', '12282025-00001', 'LMSU-00059', 'Christian Lamoste', 2, 'STAFF - LMSU-00113', NULL, 'Bisan ano', '2025-12-28'),
(11, 'LMSS-00006', NULL, 'LMSU-00059', 'Christian Lamoste', NULL, NULL, 5, 'HAHAHA', '2025-12-28'),
(12, 'LMSS-00006', NULL, 'LMSU-00059', 'Christian Lamoste', NULL, NULL, 5, '', '2025-12-28'),
(13, 'LMSS-00006', NULL, 'LMSU-00059', 'Christian Lamoste', NULL, NULL, 5, 'HAHAH ULOL GAGO', '2025-12-28'),
(14, 'LMSS-00006', '12282025-00001', 'LMSU-00059', 'Christian Lamoste', 5, 'STAFF - LMSU-00113', NULL, 'HAHAHAH ULOL GAGO TARANTADO ANIMAL!', '2025-12-28');

-- --------------------------------------------------------

--
-- Table structure for table `shop_about`
--

CREATE TABLE `shop_about` (
  `about_id` int(10) NOT NULL,
  `shop_id` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_displayed` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop_about`
--

INSERT INTO `shop_about` (`about_id`, `shop_id`, `title`, `description`, `is_displayed`) VALUES
(1, 'LMSS-00005', 'Who W', 'Weâ€™re WashPro, your trusted laundry partner.', 'true'),
(2, 'LMSS-00005', 'Mission1', 'Deliver fast, clean laundry', 'true'),
(3, 'LMSS-00006', 'HAHA', 'HAHAHHAHHAHHAHHAHAHAHAH', 'false'),
(4, 'LMSS-00006', 'HUHU', 'HUHUUHUHUHUUHUHUHUHUHUHUUH', 'false'),
(5, 'LMSS-00005', 'Personalized Experience.', 'You can always reach us for your laundry concerns. Call or message us â€” we are happy to help.', 'true'),
(6, 'LMSS-00005', 'Mission', 'Hello World', 'false'),
(7, 'LMSS-00005', 'Personalized Experience101', 'You can always reach us for your laundry concerns. Call or message us â€” we are happy to help.', 'false'),
(8, 'LMSS-00006', 'Chuupakabra', 'Achu chuu lala lala chuu.', 'true'),
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
(20, 'LMSS-00006', 'Pesti kaman.', 'Achu chuu chuu.', 'true'),
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
-- Table structure for table `shop_inventory`
--

CREATE TABLE `shop_inventory` (
  `item_id` varchar(100) NOT NULL,
  `shop_id` varchar(100) DEFAULT NULL,
  `item_name` varchar(100) NOT NULL,
  `item_category` varchar(100) DEFAULT NULL,
  `item_description` varchar(255) DEFAULT NULL,
  `item_quantity` int(10) NOT NULL,
  `item_uPrice` decimal(10,2) NOT NULL DEFAULT 0.00,
  `item_reorderLevel` int(10) NOT NULL,
  `date_added` date DEFAULT curdate(),
  `date_updated` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop_inventory`
--

INSERT INTO `shop_inventory` (`item_id`, `shop_id`, `item_name`, `item_category`, `item_description`, `item_quantity`, `item_uPrice`, `item_reorderLevel`, `date_added`, `date_updated`) VALUES
('LMSI-00001', '00001', 'Laundry Detergent', NULL, 'Fabric conditioner', 1500, 30.00, 500, '2025-10-30', NULL),
('LMSI-00002', '00001', 'Fabric Softener', NULL, 'Kuan HAHAHA', 80, 18.75, 30, '2025-10-30', NULL),
('LMSI-00003', '00001', 'Soap1234', NULL, 'HUHUHU', 100, 10.00, 10, '2025-10-30', NULL),
('LMSI-00004', '00001', 'Soap', NULL, '', 45, 15.00, 20, '2025-10-30', NULL),
('LMSI-00005', '00001', 'Chlorine', NULL, 'Kuan HAHAHA', 12, 4.99, 5, '2025-10-30', NULL),
('LMSI-00006', '00001', 'Downey', NULL, 'Fabric conditioner', 10, 8.00, 4, '2025-10-30', NULL),
('LMSI-00007', '00001', 'haha', NULL, 'HAHAHA', 12, 13.00, 12, '2025-10-30', NULL),
('LMSI-00008', '00001', 'Bleach123', NULL, 'HAHAH', 12, 12.00, 12, '2025-10-30', NULL),
('LMSI-00009', '00001', 'Hajdn', NULL, 'Kuan HAHAHA', 12, 11.98, 12, '2025-10-30', NULL),
('LMSI-00010', '00001', 'Bleach1234', NULL, 'HAHAHA', 12, 11.99, 1, '2025-10-30', NULL),
('LMSI-00011', '00001', 'Chlorine1', NULL, 'Hahaha', 10, 18.98, 1, '2025-10-30', NULL),
('LMSI-00012', '00001', 'Hajd', NULL, 'hahaha', 12, 12.00, 8, '2025-10-30', NULL),
('LMSI-00013', '00001', 'Ambot', NULL, 'hahaha', 12, 12.00, 8, '2025-10-30', NULL),
('LMSI-00014', '00001', 'Ambot1', NULL, 'hahaha', 12, 12.00, 8, '2025-10-30', NULL),
('LMSI-00015', '00001', 'Ambot4', NULL, 'hahaha', 12, 12.00, 8, '2025-10-30', NULL),
('LMSI-00016', '00001', 'Bleach15', NULL, 'bisan ano', 32, 10.00, 12, '2025-10-30', NULL),
('LMSI-00017', 'LMSS-00006', 'Surf ', 'Cleaning supplies', 'Panbabad ng mundo', 61, 16.00, 48, '2025-11-03', '2025-12-30'),
('LMSI-00018', 'LMSS-00006', 'Sabon', 'Cleaning supplies', 'Panlaba', 66, 7.00, 33, '2025-11-03', '2025-12-30'),
('LMSI-00019', 'LMSS-00005', 'Carbon Dioxide', NULL, 'Kahit ano basta ikaw', 50, 9.00, 30, '2025-11-03', '2025-11-21'),
('LMSI-00020', 'LMSS-00005', 'Lala', NULL, 'Ambot kun nano', 29, 45.00, 25, '2025-11-03', NULL),
('LMSI-00021', 'LMSS-00006', 'Bisan ano', NULL, 'bisan nano', 0, 8.00, 29, '2025-11-04', '2025-12-22'),
('LMSI-00022', 'LMS-00005', 'Soap', NULL, '', 45, 15.00, 20, '2025-11-21', NULL),
('LMSI-00023', 'LMSS-00005', 'Laundry Detergent', NULL, 'Kuan HAHAHA', 12, 12.00, 10, '2025-11-21', NULL),
('LMSI-00024', 'LMSS-00005', 'Surf ', NULL, 'Bisan ano', 18, 8.00, 10, '2025-11-21', '2025-11-21'),
('LMSI-00025', 'LMSS-00005', 'Sabon', NULL, 'Kuan HAHAHA', 30, 13.00, 20, '2025-11-21', '2025-11-21'),
('LMSI-00026', 'LMSS-00004', 'Bleach', NULL, 'Panbabad', 40, 8.00, 1, '2025-11-24', NULL),
('LMSI-00027', 'LMSS-00004', 'Sabon', NULL, 'Scan QR code or send to mobile number', 2, 12.00, 1, '2025-11-24', NULL),
('LMSI-00028', 'LMSS-00006', 'Laundry Detergent', '', 'Kuan HAHAHA', 52, 12.00, 46, '2025-11-24', '2025-12-28'),
('LMSI-00029', 'LMSS-00006', 'Ariel', NULL, 'Panbabad', 8, 15.00, 40, '2025-11-24', '2025-12-30'),
('LMSI-00030', 'LMSS-00006', 'Wings', 'Cleaning supplies', 'Premium laundry detergent for all fabric', 46, 10.00, 4, '2025-12-16', '2025-12-26'),
('LMSI-00031', 'LMSS-00006', 'Zondrox(Color Safe)', 'Cleaning supplies', '250ml', 0, 35.00, 5, '2025-12-17', '2025-12-30'),
('LMSI-00032', 'LMSS-00006', 'Downey', 'Cleaning supplies', 'Fabric conditioner', 50, 8.00, 0, '2025-12-17', NULL),
('LMSI-00033', 'LMSS-00006', 'Pride', 'Cleaning supplies', 'Powder soap', 40, 8.00, 1, '2025-12-17', NULL),
('LMSI-00034', 'LMSS-00006', 'Champion(Fab con)', 'Cleaning supplies', 'Fabric conditioner', 9, 10.00, 2, '2025-12-17', '2025-12-22'),
('LMSI-00035', 'LMSS-00006', 'Champion(Powder soap)', 'Cleaning supplies', 'Powder soap', 47, 10.00, 3, '2025-12-17', '2025-12-30'),
('LMSI-00036', 'LMSS-00006', 'Kahit ano', 'Cleaning supplies', 'Haha', 9, 10.00, 1, '2025-12-17', '2025-12-30'),
('LMSI-00037', 'LMSS-00006', 'Lala', 'Cleaning supplies', 'Scan QR code or send to mobile number', 8, 10.00, 1, '2025-12-17', '2025-12-30'),
('LMSI-00038', 'LMSS-00006', 'Zondrox(Original)', 'Cleaning supplies', 'Multi-purpose bleach for home and laundry', 38, 35.00, 1, '2025-12-30', '2025-12-30');

-- --------------------------------------------------------

--
-- Table structure for table `shop_pricing`
--

CREATE TABLE `shop_pricing` (
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
-- Dumping data for table `shop_pricing`
--

INSERT INTO `shop_pricing` (`pricing_id`, `shop_id`, `categories`, `price`, `pricing_label`, `description`, `image_url`, `is_displayed`) VALUES
(15, 'LMSS-00005', 'Clothes', 140.00, 'per load', 'Shirts, shorts, pants etc.', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/prices/LMSS-00005-1763373103131-Screenshot%202025-09-19%20182402.png', 'true'),
(16, 'LMSS-00005', 'Beddings', 150.00, 'per load', 'Bed sheets, pillow cases, towels, etc.', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/prices/LMSS-00005-1763373234817-Screenshot%202025-09-19%20182402.png', 'true'),
(17, 'LMSS-00005', 'Curtains', 200.00, 'per load', 'Window curtains and drapes', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/prices/LMSS-00005-1763373213292-Screenshot%20(2).png', 'true'),
(18, 'LMSS-00005', 'Kahit ano', 140.00, 'per load', 'Ambot kun nano', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/prices/LMSS-00005-1763450346361-Screenshot%20(4).png', 'false'),
(19, 'LMSS-00005', 'Folding bed', 150.00, 'per load', 'Kahit ano basta ikaw', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/prices/LMSS-00005-1763450384554-Screenshot%20(4).png', 'false'),
(20, 'LMSS-00006', 'Clothes(assorted)', 140.00, 'per load(7kg)', 'Shirts, shorts, pants etc.', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/prices/LMSS-00006-1763535044777-Screenshot%20(1).jpg', 'true'),
(21, 'LMSS-00006', 'Beddings', 250.00, 'per load(7kg)', 'Bed sheets, pillow cases, towels, curtains etc.', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/prices/LMSS-00006-1764030737961-Wallpaper.jpg', 'true'),
(22, 'LMSS-00006', 'Clothes(separate white color)', 160.00, 'per load(7kg)', 'Shirts, shorts, pants etc.', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/prices/LMSS-00006-1764036193876-download.jpg', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `shop_services`
--

CREATE TABLE `shop_services` (
  `service_id` int(10) NOT NULL,
  `shop_id` varchar(10) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_description` text DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `is_displayed` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop_services`
--

INSERT INTO `shop_services` (`service_id`, `shop_id`, `service_name`, `service_description`, `image_url`, `is_displayed`) VALUES
(16, 'LMSS-00005', 'Machine Washing washing', 'Our state of the art machine washing service guarantees your clothes are thoroughly cleaned and gently cared for. Enjoy fresh, spotless laundry with every visit.', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00005-1763113577012-download.jpg', 'false'),
(17, 'LMSS-00005', 'Dry Cleaning', 'Professional dry cleaning service for delicate fabrics and special garments. We use eco-friendly solvents to ensure your clothes look their best.', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00005-1763176622581-download.jpg', 'false'),
(18, 'LMSS-00005', 'Ironing Service', 'Expert ironing and pressing service to make your clothes crisp and wrinkle-free. Perfect for business attire and special occasions.', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00005-1763355685567-download.jpg', 'false'),
(19, 'LMSS-00005', 'Laundry Wash and More...', 'Washing service detailsâ€¦', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00005-1763109073989-Wallpaper.jpg', 'true'),
(20, 'LMSS-00005', 'Kahit ano', 'HAHAHAHAHA mao ka', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00005-1763372899704-Screenshot%202025-09-19%20182448.png', 'true'),
(21, 'LMSS-00005', 'Kaloko mo man', 'HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAHAHAHAH', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00005-1763355618810-download.jpg', 'true'),
(22, 'LMSS-00006', 'Machine Wash', 'Kahit ano basta ikaw!', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00006-1763534800030-download.jpg', 'true'),
(23, 'LMSS-00006', 'Folding', 'HAHAHAHA', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00006-1763534844284-download.jpg', 'true'),
(24, 'LMSS-00006', 'Ironing', 'HUHUHUHU', 'https://rgbiorinhvfpbeaghpcw.supabase.co/storage/v1/object/public/shop-images/services/LMSS-00006-1763535123975-Screenshot%20(1).jpg', 'true'),
(25, 'LMSS-00007', 'Washing', NULL, NULL, 'true'),
(26, 'LMSS-00007', 'DryClean', NULL, NULL, 'true');

-- --------------------------------------------------------

--
-- Table structure for table `super_admins`
--

CREATE TABLE `super_admins` (
  `id` int(10) NOT NULL,
  `sAdmin_email` varchar(100) NOT NULL,
  `sAdmin_password` varchar(100) NOT NULL,
  `date_registered` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `super_admins`
--

INSERT INTO `super_admins` (`id`, `sAdmin_email`, `sAdmin_password`, `date_registered`) VALUES
(1, 'christianlamostem@gmail.com', 'qwerty', '2025-12-13');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(11) NOT NULL,
  `shop_id` varchar(10) DEFAULT NULL,
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
  `registered_by` varchar(50) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `shop_id`, `user_fName`, `user_mName`, `user_lName`, `user_address`, `username`, `contactNum`, `email`, `role`, `status`, `password`, `date_registered`, `registered_by`, `reset_token`, `reset_token_expires`) VALUES
('LMSA-00027', 'LMSS-00006', 'Pining', 'Gar', 'Siya', 'Brgy. Calanyugan Pagsanghan, Samar', 'PiningGarSiya', '09876544444', 'pining.garsiya@sample.com', 'ADMIN', 'ACTIVE', '$2b$10$LJ306YVjtuXLSd8TDbHRveHO7L7wjaIr38OfMVTkAeWADDjiC1zxm', '2025-12-12', 'S-ADMIN', NULL, NULL),
('LMSA-00111', 'LMSS-00007', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'itchaQT', '+639631199863', 'christianlamostem@gmail.con', 'ADMIN', 'ACTIVE', '$2b$10$q/knGdCw0VzCHxpfvrPBUOnSdWB4dTv59qBLGw.ZwMCGQ3AD8ek0W', '2025-12-06', 'S-ADMIN', NULL, NULL),
('LMSU-00059', 'LMSS-00006', 'Christian', 'Dela', 'Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', 'Itchan695', '09874637287', 'Itchan695@test.com', 'CUSTOMER', 'Inactive', '$2b$10$vifiagi4fB6B6zuUjqsjI.wr2z2iQRHPWbR8HIZ7k5KhczD9eKUlm', '2025-10-31', 'ADMIN', NULL, NULL),
('LMSU-00060', 'LMSS-00006', 'Harith', 'Joy', 'Harley', 'Jungle Area, Land of Dawn', 'HarithHarley', '09833476254', 'HarithHarley@ex.com', 'CUSTOMER', 'Active', '$2b$10$VyVk9k82VTH1xXGqyAsFK.Peg8hWVqePimaS9IYMSztcbXfDlTmcO', '2025-10-31', 'ADMIN', NULL, NULL),
('LMSU-00067', 'LMSS-00006', 'Boang', 'Ka', 'Man', 'brgy. Curry Sta. Margarita, Samar', 'BuangKaMan', '0937268465', 'buang.ka.man@sample.com', 'CUSTOMER', 'Active', '$2b$10$aXYbaIJ09XmNOEsh7xKnfO6q5FaL3c7JaG9xf4ywu3vYpCDurG7HW', '2025-11-03', 'Customer', NULL, NULL),
('LMSU-00068', 'LMSS-00006', 'Hello', 'Haha', 'World', 'Brgy. Panabatan Sta. Margarita, Samar', 'helloWorld', '09874563214', 'hello.world@test.com', 'STAFF', 'ACTIVE', '$2b$10$QZdpouLfHENU33gZeB9cde2FmK195ymNyxqO/EO.6FBsREzSae306', '2025-11-03', 'Customer', NULL, NULL),
('LMSU-00069', 'LMSS-00006', 'Harry', 'Bulawan', 'Potter', 'Brgy. Calanyugan Pagsanghan, Samar', 'HarryPotter', '09874532718', 'harry.potter@sample.com', 'STAFF', 'Inactive', '$2b$10$TPCOxs894oIAM8nx9k78bexx.ueMhDZQd26YHsiqpyFAu6lGRRLMS', '2025-11-03', 'ADMIN', NULL, NULL),
('LMSU-00070', 'LMSS-00006', 'Kantotero', 'Kaluko', 'Manatad', 'Brgy. Erenas San Jorge, Samar', 'KantoteroManatad', '09876234523', 'Kantotero.Manatad@sample.com', 'customer', 'Active', '$2b$10$GD429Sg6oYZmfYDV1bGcHubTjaljv9sGKhQ2wVqxJ80hiKriZDqry', '2025-11-03', 'ADMIN', NULL, NULL),
('LMSU-00071', 'LMSS-00006', 'Christian', 'So', 'Lamoste', 'Biringan City', 'ChistianLamoste', '09857643521', 'christian2002@example.com', 'CUSTOMER', 'Active', '$2b$10$hCMg8IwrF0NawtEx7SZjvu5Hbpbbc9KqLtvodcL.fChsQJ5xr.FBq', '2025-11-03', 'Customer', NULL, NULL),
('LMSU-00072', 'LMSS-00006', 'Kai', 'Dacuba', 'Sotto', 'Brgy. Dapdap Tarangnan, Samar', 'KaiSotto', '09874634256', 'KaiSotto@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$LrTzBf8YmKhFsMo.pLWbIOqCcPKKjWcUSCXXvI6JLx.6EdCHbrMBa', '2025-11-03', 'CUSTOMER', NULL, NULL),
('LMSU-00073', 'LMSS-00005', 'Christian', 'Macorol', 'Lamoste', 'Brgy. Dapdap Tarangnan, Samar', 'christian.lamoste', '09876546372', 'christian123@example.com', 'CUSTOMER', 'Pending', '$2b$10$qw.xoDwDy8XtKw6xmjZc6ud8wVjDTspvWvF/SfJtjtIDpbFfapO/e', '2025-11-03', 'CUSTOMER', NULL, NULL),
('LMSU-00074', 'LMSS-00005', 'Pining', 'Gar', 'Siyasa', 'Brgy. Calanyugan Pagsanghan, Samar', 'PiningGarSiya', '09875647398', 'pining.gar.siya@yahoo.com', 'STAFF', 'Pending', '$2b$10$6xyuyuhwjq8eAqM/.oFscOVkj4gAu2NZAXqMEFJqgwMnnOF8h2uh2', '2025-11-03', 'ADMIN', NULL, NULL),
('LMSU-00075', 'LMSS-00005', 'Albert', 'Torre', 'Nicolas', 'Brgy. Panabatan Sta. Margarita, Samar', 'AlbertNicolas', '09874653782', 'alibert.nicolas@sample.com', 'customer', 'Active', '$2b$10$l14AZpHPNZOQz2bljuvyoujShD87jY.sioWiUk93RSClla3B0SgK2', '2025-11-03', 'ADMIN', NULL, NULL),
('LMSU-00076', 'LMSS-00005', 'Lloyd', 'Manogalpok', 'Ampatuan', 'Brgy. Ilo Sta. Margarita, Samar', 'Llyodie', '09874653987', 'lloyd.ampatuan@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$7MQQOnW45Xxx95s5LHy9re8wHWBNYlNmWfJA0dZT/OGSp7Z1R6OT6', '2025-11-03', 'CUSTOMER', NULL, NULL),
('LMSU-00077', 'LMSS-00005', 'Christian', 'Batumbakal', 'Lamoste', 'Brgy. San Agustin Gandara, Samar', 'Batumbakal69', '09874908756', 'lamoste123@test.co', 'CUSTOMER', 'PENDING', '$2b$10$OcY0FLXgRR/OLS/srNQnGu6u3N0jvK6pVPFJMVe5if/FDExqjx5vG', '2025-11-03', 'CUSTOMER', NULL, NULL),
('LMSU-00078', 'LMSS-00005', 'He', 'Ho', 'Ha', 'Brgy. Panabatan Sta. Margarita, Samar', 'hehaho', '0980989786', 'hehaho@test.com', 'CUSTOMER', 'ACTIVE', '$2b$10$KOG7t1G6KcCFY4by9y9OueMBL3/HAdlPQ6sbyqKYVFFdnuvKmpvx2', '2025-11-03', 'CUSTOMER', NULL, NULL),
('LMSU-00079', 'LMSS-00005', 'Christian', 'So', 'Lamoste', 'Biringan City', 'Itchan601', '09860986098', 'itchan123@test.cp', 'CUSTOMER', 'ACTIVE', '$2b$10$1yS8apY6diP1r36KiN9f7OMRgcEmdEagLDMDtmkHyYSVTqyKUSueu', '2025-11-03', 'CUSTOMER', NULL, NULL),
('LMSU-00080', 'LMSS-00005', 'qwerty', 'qwerty', 'qwerty', 'Brgy. Diaz Gandara, Samar', 'qwerty', '09090909090', 'qwerty@qwerty.com', 'CUSTOMER', 'Active', '$2b$10$d/WEJd0/EF2YMDZG2BWudOoop3Uf2ro1BVcELsQLeohljnoQiNbb.', '2025-11-03', 'CUSTOMER', NULL, NULL),
('LMSU-00081', 'LMSS-00005', 'John', 'John', 'John', 'Brgy. San Agustin Gandara, Samar', 'jjj', '0987465348', 'john@sample.com', 'CUSTOMER', 'Active', '$2b$10$o3KrX6qpaKN.HjjVTa6GYe/FNrsMeEgr4zva8fIz216rEcJ0ouc7S', '2025-11-03', 'CUSTOMER', NULL, NULL),
('LMSU-00082', 'LMSS-00005', 'Ambot', 'ambot', 'ambot', 'Biringan City', 'ambot', '09876098754', 'ambot.@test.com', 'staff', 'active', '$2b$10$OwrxKt.2exRoG5nGBlWWDuWlkoJOI3LKu2l.ddC.PD98b.tn3vJWW', '2025-11-03', 'CUSTOMER', NULL, NULL),
('LMSU-00083', 'LMSS-00006', 'Christian', 'Macorol', 'Lamoste', 'Brgy. San Jaun San Jorge, Samar', 'ChristianLamoste', '09875098467', 'lamoste.christian@sample.com', 'staff', 'active', '$2b$10$6tcHHmMzpRQHZMiO24USS.aeQYOchPeWur6k/6urqs308FWGU8Tfa', '2025-11-04', 'CUSTOMER', NULL, NULL),
('LMSU-00084', 'LMSS-00005', 'Agapito', 'Sagirit', 'Hampaslupa', 'Brgy. Panabatan Sta. Margarita, Samar', 'agapitoHampaslupa', '09870947381', 'agapitoHampaslupa@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$DW/BVFhLJBZsQ1JHW7trYukkTRrkdP3X/f6jbXOnhLpzvJxJbZ8f.', '2025-11-04', 'CUSTOMER', NULL, NULL),
('LMSU-00085', 'LMSS-00005', 'Christian', 'Macorol', 'Lamoste', 'Brgy. Calanyugan Pagsanghan, Samar', 'testuser1', '09898746352', 'testuser1@example.com', 'staff', 'Active', '$2b$10$MgNXjdqaN0FCnMPW1hvtgetcMfNKbsaCSAXHX68RZGUCCZv0InQk.', '2025-11-15', 'ADMIN', NULL, NULL),
('LMSU-00086', 'LMSS-00004', 'LeBron', 'Cupal', 'James', 'Brgy. Calanyugan Pagsanghan, Samar', 'LeBronJames123', '9876543210', 'LeBron.James@sample.com', 'STAFF', 'Active', '$2b$10$CIbdLECsuaTHi7BqIPadeeHxtRgD/tibL7Vmj/rcoLaqjEzj0MyX6', '2025-11-21', 'ADMIN', NULL, NULL),
('LMSU-00087', 'LMSS-00006', 'Christian', 'Te', 'Lamoste', 'Brgy. Panabatan Sta. Margarita, Samar', 'Itchan.qt', '09631199862', 'christian1@example.com', 'CUSTOMER', 'ACTIVE', '$2b$10$indpHZj3ZtX9qA/Es8sTo.CXAtC3JnaE/23/S0Ln7FXuuzZK2iB6a', '2025-11-24', 'CUSTOMER', NULL, NULL),
('LMSU-00088', 'LMSS-00006', 'Tina ', 'Moran', 'Moko', 'Biringan City', 'tina.moran.moko', '09809876543', 'tina.moran.moko@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$8zdB9BKoKV7LE54S5VtqBOnxOSq5gmzo379JrV4GsIHXYQk0MG9BS', '2025-11-24', 'CUSTOMER', NULL, NULL),
('LMSU-00089', 'LMSS-00006', 'LeBron', 'Cabubas', 'James', 'Brgy. Panabatan Sta. Margarita, Samar', 'LeBronJames123', '09631199862', 'lebron.james123@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$25C3r41TXt.hOlbmxRmb0eQtnmbUfzoGzYyauFRDk6PITD4PqgWQa', '2025-11-26', 'CUSTOMER', NULL, NULL),
('LMSU-00090', 'LMSS-00006', 'Victor', 'Manlolo', 'Wembanyama', 'Brgy. Diaz Gandara, Samar', 'VictorWem', '09631199862', 'wembanyama@test.com', 'CUSTOMER', 'ACTIVE', '$2b$10$rHkaRi.7IwGYhd1YdAB2RuWp2UvZA/gt4l7MtGd/oEPfs5zgmm7N6', '2025-11-26', 'CUSTOMER', NULL, NULL),
('LMSU-00091', 'LMSS-00006', 'Kobe', 'Kantotero', 'Brayant', 'Brgy. San Agustin Gandara, Samar', 'kobe.brayant', '09897865412', 'kobe.brayant@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$sQsN1YS.FagMYazSdYEo3uGtbzdLb90UCFMhm7cn4fwtlu3DHJGYy', '2025-11-30', 'CUSTOMER', NULL, NULL),
('LMSU-00092', 'LMSS-00006', 'Justine', 'Dumanacal', 'Brownlee', 'Brgy. Malayog Gandara, Samar', 'jus.Brownlee', '09809876485', 'justine.brownlee@test.com', 'CUSTOMER', 'ACTIVE', '$2b$10$HeeYFmHGIbuKBiv78p/qDuNFKCOliGLHleJIf/zjhV4bj9nRe1bA.', '2025-11-30', 'CUSTOMER', NULL, NULL),
('LMSU-00093', 'LMSS-00006', 'Justine', 'Kantotero', 'Doe', 'Brgy. Malayog Gandara, Samar', 'jusDoe', '09809876905', 'jus.doe@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$BwT0nFAZwHmCPgAvQj1kq.Tr2Eh9crhiLRdHYyq58LRxNtixLly12', '2025-11-30', 'CUSTOMER', NULL, NULL),
('LMSU-00094', 'LMSS-00006', 'Majin', 'Tu', 'Boo', 'Brgy. Dapdap Tarangnan, Samar', 'magin.boo', '09809785986', 'majin.boo@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$kFoYNhhCa9AwU717FuhICOhec7tCWzQTmCUMpqxmlbQDIQ3B5tYK.', '2025-11-30', 'CUSTOMER', NULL, NULL),
('LMSU-00095', 'LMSS-00006', 'Tarugo', 'Kantotero', 'Maigit', 'Mundo ng mga Halimaw', 'Tarugo69', '09809870968', 'tarugo69@test.com', 'STAFF', 'Active', '$2b$10$gKiHqoVcNp2ozY2n.btqFezETSaDzH4AyGyvE10.jejXiMAcLd7XK', '2025-11-30', 'CUSTOMER', NULL, NULL),
('LMSU-00096', 'LMSS-00006', 'Ichigo', 'Manyakol', 'Urusoka', 'Soul Society', 'ichigoUrusoka', '09127645231', 'ichigo.urusoka@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$187AukMEVOgV5Kykv3OWVul.vJu0ziPyB9fvANHyw/EMtBh0sTkIu', '2025-11-30', 'CUSTOMER', NULL, NULL),
('LMSU-00097', 'LMSS-00006', 'Rob', 'Sagirit', 'Manugalpok', 'Brgy. Panabatan Sta. Margarita, Samar', 'rob123', '09890481767', 'rob@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$F5RajgxqEE.qVT5c0H/A6.SlLddMIo.bwE2MF621dGe7gOAQ4Mdja', '2025-11-30', 'CUSTOMER', NULL, NULL),
('LMSU-00098', 'LMSS-00006', 'Register', 'New', 'Account', 'Kahit saan', 'RegisterAccount', '09870987635', 'register@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$D2ObH0uhdJl1VwhX2bU4iuXK4RpcvAB1LdiBWc6Cs5C.J77GvkKg6', '2025-11-30', 'CUSTOMER', NULL, NULL),
('LMSU-00100', 'LMSS-00006', 'Kahit', 'Pa', 'Sino', 'Brgy. Diaz Gandara, Samar', 'HaHu', '+639631199812', 'haha@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$Lmk9zOrqLLugV7k57m6fJ.1i95Q7dpUiokTgtC4silUevRXa2dK8u', '2025-12-05', 'CUSTOMER', NULL, NULL),
('LMSU-00104', 'LMSS-00006', 'hah', 'hdhd', 'hash', 'Biringan City', 'hdhd', '+639631199862', 'hd@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$KsYVw5XkPYK50GTihE6mfe.iRCmHvrZXQaEyTgmjUzwwi.VAa8vxe', '2025-12-05', 'CUSTOMER', NULL, NULL),
('LMSU-00106', 'LMSS-00006', 'David', 'null', 'Brown', '654 Cedar Road, Foresthill', 'null', '555-7890', 'david06.brown@example.com', 'CUSTOMER', 'ACTIVE', '$2b$10$p23AjMuJp1.90B14fs9h..E7mjrWHE0weRXker4za4C//NcfueZzS', '2025-12-05', 'CUSTOMER', NULL, NULL),
('LMSU-00108', 'LMSS-00006', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'jojo', '+639631199863', 'kahit@sample.com', 'CUSTOMER', 'ACTIVE', '$2b$10$AQQOFAd98aLnJm4dM14eSeLodlMizWSp7u9eQnfb4vKL5G1ppt3GS', '2025-12-06', 'CUSTOMER', NULL, NULL),
('LMSU-00109', 'LMSS-00006', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'jojo123', '+639631199811', 'christian1234@example.com', 'CUSTOMER', 'ACTIVE', '$2b$10$8uUt/mR.utMPIgR4zYUVfOwLtuHWN99WZkPkgV5WBvoEhMzklcCEy', '2025-12-06', 'CUSTOMER', NULL, NULL),
('LMSU-00110', 'LMSS-00006', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'Itchan6554', '+639631199000', 'christian1485@example.com', 'CUSTOMER', 'ACTIVE', '$2b$10$dFLovl6xwsgvhaE1b48NPOvjCu8HeZ57w.ZKBH1fguVOrbEK6Kth2', '2025-12-06', 'CUSTOMER', NULL, NULL),
('LMSU-00111', 'LMSS-00006', 'Christian', 'Macorol', 'Lamoste', 'Purok 2 Caparangasan Gandara Samar', 'kahitAno', '09908764532', 'example@john45.com', 'STAFF', 'ACTIVE', '$2b$10$29WudU5DD2uUXr/vbFqMg.cXS6GzlvojGP/V/GxXTAtYFFXx5CHkS', '2025-12-10', 'STAFF', NULL, NULL),
('LMSU-00112', 'LMSS-00006', 'Christian', 'Macorol', 'Lamoste', 'Purok 2 Caparangasan Gandara Samar', 'kahitAno', '09908764532', 'example@john435.com', 'STAFF', 'ACTIVE', '$2b$10$4T.Nu6Jc6mxGKhORwjTghuFm.NS5PfmzDxpN21UnV3boNu6ulWCoi', '2025-12-10', 'STAFF', NULL, NULL),
('LMSU-00113', 'LMSS-00006', 'John', 'Dominggo', 'Doe', 'Brgy. Malayog Gandara, Samar', 'DoeJohn', '+639890987645', 'christianlamostem@gmail.com', 'STAFF', 'ACTIVE', '$2b$10$P2K/29BMrPKlCcoQZQwUSuYxjHcOV6Md3Qh950fU8VvREjJ.up4tm', '2025-12-11', 'STAFF', NULL, NULL),
('LMSU-00114', 'LMSS-00006', 'Ambot', 'Sa', 'Imo', 'Brgy. Calanyugan Pagsanghan, Samar', 'ambotSaImo', '09126748932', 'ambotsaimo@sample.com', 'CUSTOMER', 'INACTIVE', '$2b$10$P9lnbJRpG5dYIjlwDNzvAeiKwZe7X41C.08cgIl5Li8wc91yGhfDy', '2025-12-13', 'ADMIN', NULL, NULL),
('LMSU-00115', 'LMSS-00006', 'Love', 'Ofmy', 'Life', 'Brgy. Panabatan Sta. Margarita, Samar', 'OhhmyVenus', '+639128764536', 'example@john455.com', 'CUSTOMER', 'ACTIVE', '$2b$10$YwsLgrySbY9lfz0YX0jfhuE4h6wJFusZbV2zOjJsu5GgFX/iFFpI6', '2025-12-13', 'ADMIN', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `customer_transactions`
--
ALTER TABLE `customer_transactions`
  ADD PRIMARY KEY (`laundryId`),
  ADD KEY `fk_customer_receipt_user` (`cus_id`);

--
-- Indexes for table `email_otps`
--
ALTER TABLE `email_otps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `laundry_shops`
--
ALTER TABLE `laundry_shops`
  ADD PRIMARY KEY (`shop_id`),
  ADD UNIQUE KEY `owner_emailAdd` (`admin_emailAdd`),
  ADD UNIQUE KEY `owner_contactNum` (`admin_contactNum`),
  ADD UNIQUE KEY `shop_name` (`shop_name`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`pm_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`rating_id`);

--
-- Indexes for table `shop_about`
--
ALTER TABLE `shop_about`
  ADD PRIMARY KEY (`about_id`);

--
-- Indexes for table `shop_inventory`
--
ALTER TABLE `shop_inventory`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `shop_pricing`
--
ALTER TABLE `shop_pricing`
  ADD PRIMARY KEY (`pricing_id`);

--
-- Indexes for table `shop_services`
--
ALTER TABLE `shop_services`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `super_admins`
--
ALTER TABLE `super_admins`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `email_otps`
--
ALTER TABLE `email_otps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `pm_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `shop_about`
--
ALTER TABLE `shop_about`
  MODIFY `about_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `shop_pricing`
--
ALTER TABLE `shop_pricing`
  MODIFY `pricing_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `shop_services`
--
ALTER TABLE `shop_services`
  MODIFY `service_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `super_admins`
--
ALTER TABLE `super_admins`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer_transactions`
--
ALTER TABLE `customer_transactions`
  ADD CONSTRAINT `fk_customer_receipt_user` FOREIGN KEY (`cus_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
