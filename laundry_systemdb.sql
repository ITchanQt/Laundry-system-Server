-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2025 at 10:37 AM
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

INSERT INTO `admins` (`admin_id`, `admin_fName`, `admin_mName`, `admin_lName`, `admin_address`, `admin_username`, `admin_contactNum`, `email`, `password`, `date_registered`, `role`, `status`) VALUES
('LMSA-00000', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin2', '0987654321', 'admin@test1.com', '$2b$10$N39wD24E6ZfIe3XOcjDcQuegdkRPE91wDVQXYDuyMC1S/RVbHta4e', '2025-09-17', 'Admin', 'Active'),
('LMSA-00001', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin2', '0987654321', 'admin@test2.com', '$2b$10$TvqtYmynZShjp2eoLwmJTecIh19Uu0YKJMFX9U7eopUCK7hZP/JPu', '2025-09-17', 'Admin', 'Active'),
('LMSA-00002', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin2', '0987654321', 'admin@test3.com', '$2b$10$OSL73bzC/OIWgZ.IJNJzjuWOKsm8vgwJsroXmREXV3t3ZqKWCP8pW', '2025-09-17', 'Admin', 'Active'),
('LMSA-00003', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin2', '0987654321', 'admin@test4.com', '$2b$10$G8vRi.ljocN5kvt/KOCRFujQr962czsIR7CmiIIczQd4VdrAlSBYG', '2025-09-17', 'Admin', 'Active'),
('LMSA-00004', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin2', '0987654321', 'admin@test5.com', '$2b$10$eg4Okki86CcqBXj2gk3Vm.O9gTI/XCE6ad2CYDNNb2DmpjKJ4GWnO', '2025-09-17', 'Admin', 'Active'),
('LMSA-00005', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin2', '0987654321', 'admin@test6.com', '$2b$10$CheB4K5Xjb0H1ZD.QtyAdehhhX90myS2IZMRqXVj4NMMUyoLzmIii', '2025-09-17', 'Admin', 'Active'),
('LMSA-00006', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin2', '0987654321', 'admin@test7.com', '$2b$10$KceBME/zIfm5aYB3jOAG/OBWiQcI1Xve9070xnfus3K.8QAnLv.3a', '2025-09-17', 'Admin', 'Active'),
('LMSA-00007', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin2', '0987654321', 'admin@test8.com', '$2b$10$32m.SiIpXkYIAgaVHZrj8.Of46uGH/w2U0urioH9Sp7MIU4RsMNNq', '2025-09-17', 'Admin', 'Active'),
('LMSA-00008', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin2', '0987654321', 'admin@test9.com', '$2b$10$pJgUtpTu.5EsiiraTBzV6OoAEpwsoUdRVqdJdCKuE.gCz0ph3xJ..', '2025-09-17', 'Admin', 'Active'),
('LMSA-00009', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin2', '0987654321', 'admin@test10.com', '$2b$10$fss622MUdhcvAJXiXRECQ.JD97pTU4L19DFp/FKuiXVpYUeOYKe7e', '2025-09-17', 'Admin', 'Active'),
('LMSA-00010', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin2', '0987654321', 'admin@test11.com', '$2b$10$8h/6fVcr5rM9X4PpYHBFtuZGA6z/cEVzvv3LuDNFJXFJ.x08ltfkS', '2025-09-17', 'Admin', 'Active'),
('LMSA-00011', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin2', '0987654321', 'admin@test12.com', '$2b$10$AVQ66qTutIcDMBoThV6FgOmeO1dhAydCP.w/msG4n3b/0bdChXNSG', '2025-09-17', 'Admin', 'Active'),
('LMSA-00012', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'Helloworld123', '09631199862', 'emily.chen@nursing.edu', '$2b$10$beNZ.T2pahBHpRPoKjws.uvwmMrf2W91yinbdys3j6mpuV4zzY9FO', '2025-09-17', 'Admin', 'Active'),
('LMSA-00013', 'Juan', 'Haha', 'Dela Cruz', 'Biringan City', 'JuanDC', '09876543211', 'JuanDC@sample.com', '$2b$10$Oyijtg5fVd8bPdjMIqTlY.Ft4Yakz8PReDmwEVfny1R0tZ2Den832', '2025-09-17', 'Admin', 'Active'),
('LMSA-00014', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin13', '0987654321', 'admin@test13.com', '$2b$10$5V7TX/ZKhQoz3DYJVu01BuiuzmchgNHWJ3V7ZPXxGHoP0I.JQAMyW', '2025-09-17', 'Admin', 'Active'),
('LMSA-00015', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'JuanDC', '09876543211', 'testuser22@example.com', '$2b$10$MUEFLGU0mJmeIcXUiaGyh.c2.uqD7Qhtj.O03hGuaaWQSbdwH6djS', '2025-09-19', 'Admin', 'Active'),
('LMSA-00016', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin13', '0987654321', 'admin@test33.com', '$2b$10$wZYa7W9dYZUWqpuNGD/.iuZ2DLxgcceA0jLCjOypO03zbPDBHb/3S', '2025-10-15', 'Admin', 'Active'),
('LMSA-00017', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin13', '0987654321', 'admin@test43.com', '$2b$10$vfQ4sulmP.BlK8qaI6DKEuDsKl/VWHqJiubp3p9Ll13aJr.Hldgpi', '2025-10-15', 'Admin', 'Active'),
('LMSA-00018', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin13', '0987654321', 'admin@test493.com', '$2b$10$2CJpeldyvW7zvEj70wWjY.k2cT4z249rXMH5TlbOlW0EX.vpAan8a', '2025-10-15', 'Admin', 'Active'),
('LMSA-00019', 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin13', '0987654321', 'admin@test498.com', '$2b$10$x5dd0mVJ8GWairr2htS0/uBLzqOkKFeBFHDgon1HL7w0kPgYWMkqC', '2025-10-15', 'Admin', 'Active'),
('LMSA-00020', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'JuanDc', '09631199862', 'christian109@example.com', '$2b$10$6ctLSidhaCt0NkouK5FNCOiuNx9hWpnEdeEuU2nOoyuVW.98rv3/.', '2025-10-15', 'Admin', 'Active'),
('LMSA-00021', 'HAHA', 'HAHA', 'HAHA', 'Biringan City', 'itchaQT', '09876543231', 'itchan02@gmail.com', '$2b$10$HyBlTF./VuGfamwONiZlhuPxxV3QEHtOFbn2df0x8gM1Qd2ftuDE.', '2025-10-15', 'Admin', 'Active'),
('LMSA-00022', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'itchaQT', '09631199862', 'christian100@example.com', '$2b$10$wiHdm8L.NaJi/XaOw9DVZ.SN6zNlyURFbzQVUCYyCPR1TkSi8NFlC', '2025-10-15', 'Admin', 'Active'),
('LMSA-00023', 'Pining', 'Gar', 'Siya', 'Caparangsan Gandara Samar', 'pining', '09876543265', 'pininggarsiya@sample.com', '$2b$10$PxKTPV58BFJN1mWLDIfZRO8byLn20lHxvVxA48.YN01sw4KXcTfCK', '2025-10-15', 'Admin', 'Active'),
('LMSA-00024', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'pining', '09631199862', 'example@john46.com', '$2b$10$r5H5Tu7C/g9gTzOINv6RGux6r2seAnZsBTYCoW0cx/VwOp3CWvxT.', '2025-10-28', 'Admin', 'Active'),
('LMSA-00025', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'Helloworld123', '09999999999', 'example@john45.com', '$2b$10$CaeHkukwNixLAlVnQmxsAOggfVGULNJtu/dL38L.guAi8XGVFyqzi', '2025-10-28', 'Admin', 'Active'),
('LMSA-00026', 'Tina', 'Kalo', 'Moran', 'Brgy. Panabatan Sta. Margarita, Samar', 'tina.moran', '09999999998', 'tina.moran@sample.com', '$2b$10$lPz5gzRkndDACrp0XmE95.094Z6JhjANGMJmtu79o3KUMoT8Jzjoi', '2025-10-28', 'Admin', 'Active'),
('LMSA-00027', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'pining', '09999999998', 'example@john46.con', '$2b$10$Oor3oK0ShRQwwGXr70IcRuU8rfG1d9g.TrQXqG7r9iuZR6ITIqMeK', '2025-10-29', 'Admin', 'Active');

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
  `total_amount` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_receipt`
--

INSERT INTO `customer_receipt` (`laundryId`, `cus_id`, `cus_name`, `cus_address`, `cus_phoneNum`, `batch`, `shirts`, `pants`, `jeans`, `shorts`, `towels`, `pillow_case`, `bed_sheets`, `kg`, `washing`, `num_items`, `total_amount`) VALUES
('10292025-00001', 'LMSU-00014', 'John Doe', '123 Main St, City', '1234567890', 1, 1, 1, 1, 1, 1, 1, 1, 1, '1', 7, '130'),
('10292025-00002', 'LMSU-00036', 'User1 User1', 'Biringan City', '0987654312', 1, 1, 1, 1, 1, 1, 1, 1, 1, '1', 7, '130'),
('10292025-00003', 'LMSU-00036', 'User1 User1', 'Biringan City', '0987654312', 1, 1, 1, 1, 1, 1, 1, 1, 1, '1', 7, '130');

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
  `shop_status` varchar(100) NOT NULL DEFAULT 'Active',
  `shop_type` varchar(100) NOT NULL,
  `date_registered` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laundry_shops`
--

INSERT INTO `laundry_shops` (`shop_id`, `admin_id`, `owner_fName`, `owner_mName`, `owner_lName`, `owner_emailAdd`, `owner_contactNum`, `shop_address`, `shop_name`, `shop_status`, `shop_type`, `date_registered`) VALUES
('LMSS-00001', 'LMSA-00020', 'Christian', 'Huhu', 'Lamoste', 'christian109@example.com', '09631199862', 'Purok 2', 'itchan123', 'Active', 'Washing, DryClean', '2025-10-27'),
('LMSS-00002', 'LMSA-00021', 'HAHA', 'HAHA', 'HAHA', 'itchan02@gmail.com', '09876543231', 'Biringan City', 'itchan1234', 'Active', 'Washing, DryClean', '2025-10-27'),
('LMSS-00003', 'LMSA-00012', 'Christian', 'Macorol', 'Lamoste', 'emily.chen@nursing.edu', '09631199863', 'Purok 2', 'itchan69', 'Active', 'Washing', '2025-10-28');

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
('LMSI-00016', '00001', 'Bleach15', 'bisan ano', 32, 10.00, 12, '2025-10-30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(11) NOT NULL,
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

INSERT INTO `users` (`user_id`, `user_fName`, `user_mName`, `user_lName`, `user_address`, `username`, `contactNum`, `email`, `role`, `status`, `password`, `date_registered`, `registered_by`) VALUES
('LMSU-00014', 'John', 'Middle', 'Doe', '123 Main St, City', NULL, '1234567890', 'david04.brown@example.com', 'Customer', 'Active', '$2b$10$4VAiVhLRwGaMXzv23g2ZJOxefHeM3T99tCm2j/GvxmGUESBKIZYrO', '2025-09-19', ''),
('LMSU-00018', 'Juan', 'Dela', 'Cruz', '123 Mango Street, Quezon City', 'juancruz', '09123456789', 'emily.chen@nursing.edu', 'CUSTOMER', 'Inactive', '$2b$10$ckmWmK0fSUE7ayKMXuBPUuvtfBDaoOiY9g9Pp16bRQfdJnImplZOq', '2025-09-19', 'Admin'),
('LMSU-00019', 'Juan', 'Nabaunag', 'Dela cruz', 'Biringan City', 'juandelacruz', '0987654321', 'juan.cruz@example.com', 'CUSTOMER', 'Active', '$2b$10$qzGWvgXZHddknuW2czUQaOED0JhCgNdsiCfqQgqHfWEhEvTc6eVLe', '2025-09-19', 'Admin'),
('LMSU-00020', 'Christian', NULL, 'Lamoste', 'Purok 2', NULL, '0987654321', 'christianlamostem@gmail.com', 'Staff', 'Active', '$2b$10$UXHVC/fRwl5bQ6Ezvc3gnOczkRn49qswwHLNCTRaqJLHRFgmnHfxG', '2025-09-19', 'Admin'),
('LMSU-00021', 'Christian', NULL, 'Lamoste', 'Gandara Samar', NULL, '0987654321', 'testuser10@example.com', 'Customer', 'Active', '$2b$10$GhcyHI6R4pP47g1k5vsYR./vIg9dpY8stMriNinHtMjpOKRZaGi5W', '2025-09-19', 'Admin'),
('LMSU-00022', 'Christian', NULL, 'Lamoste', 'Purok 2', 'christian.lamoste', '0987654334', 'christianmacorol02@gmail.com', 'Staff', 'active', '$2b$10$BgyQjX3L9ApiEJC9Y5lkDeCEwGoC2mG4WDqLESx6zwDjL0zNPiRkK', '2025-10-11', 'Admin'),
('LMSU-00023', 'ITCHAN', NULL, 'MACOROL', 'Caparangasan Gandara, Samar', 'itchan.macorol', '09123456789', 'christianlamoste2002@gmail.com', 'Customer', 'active', '$2b$10$LasCm0aCUbR6fQQLayBP1eYDskTXhNvwnCI.MCA.LaazxJP.5/xTO', '2025-10-11', 'Admin'),
('LMSU-00024', 'Pining', 'Mauro', 'Garcia', 'Biringan City', 'pining.garcia', '09876543234', 'pininggarsiya@sample.com', 'STAFF', 'Pending', '$2b$10$/a2FRweL3YaoAW3r2pSjFuhG99vQG/ih53/qQTizB3lcQ7WnSks1G', '2025-10-16', 'Admin'),
('LMSU-00025', 'Christian', NULL, 'Lamoste', 'Purok 2', 'itchan12', '9876543210', 'example@john45.com', 'customer', 'active', '$2b$10$skKzpBqM5cRcOiu7t.ueEeB2CwZ3DGC2flR8rxPnwiJanemTVNqYm', '2025-10-25', 'Admin'),
('LMSU-00026', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'admin', '9876543210', 'example@john35.com', 'staff', 'active', '$2b$10$snpsLgr/1S4GJyZOdviFPefzSecNJ6/xkmDr88NEUSo35rsiVTX0W', '2025-10-25', 'Admin'),
('LMSU-00027', 'Itchan', 'Lopez', 'Lamoste', 'Purok 2', 'itchanQT1968', '09631199812', 'christian111@example.com', 'CUSTOMER', 'Active', '$2b$10$95xAHlHMzXmPCeV9vqFwwunKrmnsLSyhNiI2rSNEiQ.Ead0Xlv8/K', '2025-10-25', 'Customer'),
('LMSU-00028', 'Kai', 'Pisot', 'Sotto', 'Brgy. Panabatan Sta. Margarita, Samar', 'Kaiju', '1234567896', 'kaisotto@sample.com', 'staff', 'active', '$2b$10$h9LncMvuUmaF6xSDcH2ZZ.3H2gbG30MOUIcHQGDnTuvDgMs70N9Le', '2025-10-25', 'Admin'),
('LMSU-00029', 'Kevin', 'Malaguenio', 'Durant', 'Biringan City', 'kd#7', '1234567895', 'kd7@sample.com', 'CUSTOMER', 'Active', '$2b$10$wT7KXKACD6JYzdQgm1bE6uQvz2KM.dxjPWdNv6c/z4ZvAUIDS3AdS', '2025-10-25', 'Customer'),
('LMSU-00030', 'Stephen', NULL, 'Curry', 'brgy. Curry Sta. Margarita, Samar', 'curry#30', '0987654325', 'curry30@sample.com', 'CUSTOMER', 'Pending', '$2b$10$LSiyXV3mXgKD.dn8qQiUl.eaflGTXMCP9z6WDil7dC/GJJcMr4Thq', '2025-10-25', 'Customer'),
('LMSU-00031', 'Jerald', 'Chavez', 'Reyes', 'Biringan City', 'reyesJerald', '0987654312', 'jerald@sample.cop', 'customer', 'active', '$2b$10$ow4d55g6tV8wpbQrFnYvKO7C1QOUg3A3lDHK1hEfGoGvLnfCWkS9W', '2025-10-26', 'ADMIN'),
('LMSU-00032', 'Jerald', 'Chavez', 'Reyes', 'Biringan City', 'reyesJerald01', '9876543212', 'jerald@sample.com', 'staff', 'active', '$2b$10$xu4nY2bduov17Z6t2axzheLelTLa5ffwiwQPqtA1wgaPNOMlC5bFK', '2025-10-26', 'ADMIN'),
('LMSU-00033', 'ITCHAN', 'MACOROL', 'LAMOSTE', 'Biringan City', 'LAMOSTEITCHAN', '09876543123', 'itchanLamosye@test.com', 'staff', 'Active', '$2b$10$SCG9MVPMXWs2mvTv.iEUT.bemaRjTwSSb3mhAJBg/dNnNMDfCYE.i', '2025-10-26', 'ADMIN'),
('LMSU-00034', 'Japeth', 'Dy', 'Aguilar', 'Caparangasan Gandara, Samar', 'JPDY', '0976543227', 'japjap69@test.com', 'customer', 'Active', '$2b$10$Fu53xoGsGrLVsO1GCVK00uH3tTRfmGKtuFZXT0lxw9dONeo6d/69K', '2025-10-26', 'ADMIN'),
('LMSU-00035', 'Jerald', 'Solayao', 'Anderson', 'brgy. Curry Sta. Margarita, Samar', 'jeraldA', '0987654325', 'jerald123@gmail.com', 'CUSTOMER', 'Pending', '$2b$10$GTV/bw/lBH4UFXBZSLCdJO7IIvEAHd7zT.ldjOtxvnh5WrGNNI0mu', '2025-10-26', 'Customer'),
('LMSU-00036', 'User1', 'User1', 'User1', 'Biringan City', 'User1', '0987654312', 'user1@sample.com', 'customer', 'Active', '$2b$10$MR0.pfcGFm0m/Et.eBYygO/W71P8wt2WoX.1Pwm2j0lhX8eqb2BXi', '2025-10-26', 'ADMIN'),
('LMSU-00037', 'Tina', 'Aquino', 'Moran', 'Brgy. Erenas San Jorge, Samar', 'TinaMoran', '0976543111', 'tina.moran@sample.com', 'customer', 'Active', '$2b$10$mWPuBGwAnAMfPRCB.NuDEezcS7JJvHJAFoiZ174JnYWnPIbcrVqCi', '2025-10-28', 'ADMIN'),
('LMSU-00038', 'Kan', 'haha', 'Totero', 'Caparangasan Gandara, Samar', 'Kantotero', '0998754134', 'kantotero@test.com', 'staff', 'Active', '$2b$10$CfBaTaJWv0uDXEEAhVSQLufOSxfMhLvIpTIvr5E1aQ2cDigtWsQ2C', '2025-10-28', 'ADMIN'),
('LMSU-00039', 'Kan', 'haha', 'Totero', 'Caparangasan Gandara, Samar', 'Kan.totero', '0998754135', 'kan.totero@test.com', 'customer', 'Active', '$2b$10$n.RMG2EOWf5v4yWUMUWTxe1E6x4hCq6Gb1lWqxChKlmQd.YIP7Hb.', '2025-10-28', 'ADMIN'),
('LMSU-00040', 'Tina', 'So', 'Moran', 'Brgy. Diaz Gandara, Samar', 'tinaMoran', '1234567818', 'tinamoran69@test.com', 'CUSTOMER', 'Pending', '$2b$10$V5ZejmstRh37LF8RGe9YAeIkAyJ3fJ4W2ewZHhEfjeSS880ETD6mK', '2025-10-28', 'Customer'),
('LMSU-00041', 'Juan', 'Tamayo', 'Dela cruz', 'Brgy. Erenas San Jorge, Samar', 'JuanD698', '99999999999', 'Juan.dc@sampl.com', 'customer', 'Active', '$2b$10$TX3anY5aTsXCeEh2zyHNb.iOlOr8ea1wPS6xUsKNWTxEcQYBADM62', '2025-10-28', 'ADMIN'),
('LMSU-00042', 'Juan', 'Tamayo', 'Dela cruz', 'Brgy. Erenas San Jorge, Samar', 'Juan.D698', '99999999998', 'Juan.dc@sample.com', 'customer', 'Active', '$2b$10$CrvKEOIv1NfOmXhpjxEFLOUz66uC3g0jZmUMtMDINe8zRKJpYfm6m', '2025-10-28', 'ADMIN'),
('LMSU-00043', 'Juan', 'Tamayo', 'Dela cruz', 'Brgy. Erenas San Jorge, Samar', 'Juan.D69', '99999999997', 'Juan.dc69@sample.com', 'customer', 'Active', '$2b$10$udGssiLYczgTrIkE0yIZqu.RkouPlACHuAHURQnfiQO/S.l4BDUca', '2025-10-28', 'ADMIN'),
('LMSU-00044', 'Juan', 'Tamayo', 'Dela cruz', 'Brgy. Erenas San Jorge, Samar', 'Juan.DC69', '99999999996', 'Juan.dc.69@sample.com', 'customer', 'Active', '$2b$10$AMlvPtqJLO7Gioz9dYy89eoxMSSuAksqf.wZoy0cpWe27YwfXW8Mu', '2025-10-28', 'ADMIN'),
('LMSU-00045', 'Pining', 'Hulahuga', 'Garcia', 'Biringan City', 'PiningGarcia', '9999999996', 'pining.garcia@sample.com', 'customer', 'Active', '$2b$10$yKHQOUXJ68HxCNpDnHc/7udiCnpKtc1uvFCBIc6Y.VggiMtTAWpEG', '2025-10-28', 'ADMIN'),
('LMSU-00046', 'Helo ', 'ehol', 'lohe', 'Biringan City', 'helohe', '9999999997', 'helo.lohe@sample.com', 'customer', 'Active', '$2b$10$WBzu/7lsSXefBZviVKpEruQ.hEGbLln9lI.CW.yqI81hWS7MqRmuy', '2025-10-28', 'ADMIN'),
('LMSU-00047', 'Christian', 'Macorol', 'Lamoste', 'Purok 2, Brgy. Caparangasan Gandara, Samar', 'Itchan619321', '9876543210', 'christianmacorol2002@gmail.com', 'CUSTOMER', 'Pending', '$2b$10$oQQVPkRKPCcXyeGEMqBTKeBlCk6DtOba0T.MUfBY.yzSefbaw8/XO', '2025-10-28', 'ADMIN'),
('LMSU-00048', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'itchan12', '9876543210', 'christianmacorol2003@gmail.com', 'customer', 'Active', '$2b$10$e93JpJldcv/1fKMD./6OLOV14axQ1XZxk2zQNYYds07ppYvKTbx7K', '2025-10-28', 'ADMIN'),
('LMSU-00049', 'Maka', 'Te', 'Tiko', 'Brgy. Dapdap Tarangnan, Samar', 'MakaTeTiko', '99999999999', 'Maka.te.tiko@sample.com', 'CUSTOMER', 'Pending', '$2b$10$Kn11yhyaNY13IyEC5a287O8ozr.pJy3kYa/lBxflHtrx2kr1XsZt.', '2025-10-28', 'Customer'),
('LMSU-00050', 'Kina', 'Mot', 'Fukiko', 'Brgy. Ilo Sta. Margarita, Samar', 'KinaMotFukiko', '99999999998', 'kina.mot.fukiko@test.com', 'CUSTOMER', 'Pending', '$2b$10$wDAcWfeBVxjnap59DYU6ReupM84ZXCGwExN1kciRpoyopF1aELPwO', '2025-10-28', 'Customer'),
('LMSU-00051', 'Kina', 'Mot', 'Fukiko', 'Brgy. Ilo Sta. Margarita, Samar', 'KinaMotFukiko', '99999999998', 'kina.motfukiko@test.com', 'CUSTOMER', 'Pending', '$2b$10$a4qEjzOHZModeSCJN.tWX.dIIsePfk/0IXJ/bx1rqY8FqBV87b0m.', '2025-10-28', 'Customer'),
('LMSU-00052', 'Kina', 'Mot', 'Fukiko', 'Brgy. Ilo Sta. Margarita, Samar', 'KinaMotFukiko', '99999999998', 'kina.motfukiko1@test.com', 'CUSTOMER', 'Pending', '$2b$10$uPv1BBOwu14Oca9LqKLI3uMlhwzQ/Lq5.6XdZ22ZrVRvqZOseCZNe', '2025-10-28', 'Customer'),
('LMSU-00053', 'Kina', 'Mot', 'Fukiko', 'Brgy. Ilo Sta. Margarita, Samar', 'KinaMotFukiko', '99999999998', 'kina.motfukiko12@test.com', 'CUSTOMER', 'Pending', '$2b$10$iJHOs2KKjbB9ZYu.53ZAKexwWE.PmXkHkhVY6AWDBfzxDXvhJ0c.y', '2025-10-28', 'Customer'),
('LMSU-00054', 'Kina', 'Mot', 'Fukiko', 'Brgy. Ilo Sta. Margarita, Samar', 'KinaMotFukiko', '99999999998', 'kina.motfukiko13@test.com', 'CUSTOMER', 'Pending', '$2b$10$k88BkqMGflRk./Mk7ZgYuuKCMUbUhCubfTC.EtGWvbXjOZ6aBc5Qa', '2025-10-28', 'Customer'),
('LMSU-00055', 'Hello', 'haha', 'World', 'Brgy. Ilo Sta. Margarita, Samar', 'Heloworld', '99999999997', 'helo.world@sample.com', 'CUSTOMER', 'Pending', '$2b$10$CHhq6CRY6.7Rqa64SXwheeG0YBOsI9kZ2/LIRctQaxEpCS8cRZxoy', '2025-10-28', 'Customer'),
('LMSU-00056', 'Helo ', 'Haha', 'World', 'Brgy. Panabatan Sta. Margarita, Samar', 'HeloWorld', '99999999996', 'helo.world123@sample.com', 'staff', 'Active', '$2b$10$b7UtoI1J4ccrBrJOTGohEeR9AhJLKzLr8n5x9JKa0.s5FCYUDjBgC', '2025-10-28', 'ADMIN'),
('LMSU-00057', 'huhgu', 'huhu', 'huhu', 'Brgy. Panabatan Sta. Margarita, Samar', 'huhuhuhuhhu', '99999999995', 'huhu.huhu@gmail.com', 'customer', 'Active', '$2b$10$YehUU4iE6Hh2GX/eWX47KOkkL1DOZV2laOGACXIBIxTk9hxNjy.uy', '2025-10-28', 'ADMIN'),
('LMSU-00058', 'Christian', 'Macorol', 'Lamoste', 'Brgy. Erenas San Jorge, Samar', 'itchanQT', '99999999994', 'itchanQt@sample.com', 'customer', 'Active', '$2b$10$Ggb.zPG2VTc3siJ2qOYNDO.WCy0JKdbLE0BE8WAs2bW/s5GOcUERK', '2025-10-30', 'ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

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
