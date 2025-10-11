-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2025 at 10:58 AM
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
('LMSA-00015', 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'JuanDC', '09876543211', 'testuser22@example.com', '$2b$10$MUEFLGU0mJmeIcXUiaGyh.c2.uqD7Qhtj.O03hGuaaWQSbdwH6djS', '2025-09-19', 'Admin', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `cus_id` varchar(50) NOT NULL,
  `cus_fName` varchar(100) NOT NULL,
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

INSERT INTO `customers` (`cus_id`, `cus_fName`, `cus_lName`, `cus_eMail`, `cus_role`, `cus_status`, `cus_phoneNum`, `cus_address`, `cus_username`, `registeredBy`, `date_registered`) VALUES
('10112025-00011', 'John', 'Doe', 'example@john80.com', '', 'PENDING', '9876543210', 'itchan', '123 Main St', 'Customer', '2025-10-11'),
('10112025-00012', 'John', 'Doe', 'example@john81.com', '', 'PENDING', '9876543210', 'itchan', '123', 'Customer', '2025-10-11'),
('10112025-00013', 'John', 'Doe', 'example@john82.com', '', 'PENDING', '9876543210', 'itchan', 'Caparangasan', 'Customer', '2025-10-11'),
('10112025-00014', 'John', 'Doe', 'example@john84.com', '', 'PENDING', '9876543210', 'Caparangasan', 'itchan', 'Customer', '2025-10-11'),
('10112025-00015', 'John', 'Doe', 'example@john85.com', '', 'PENDING', '9876543210', 'Caparangasan', 'itchan123', 'Customer', '2025-10-11'),
('10112025-00016', 'Christian', 'Lamoste', 'itchan@test.com', '', 'PENDING', '0987654321', 'Caparangasan Gandara, Samar', 'ITchanQt', 'ADMIN', '2025-10-11'),
('10112025-00017', 'John', 'Doe', 'example@john45.com', 'CUSTOMER', 'PENDING', '9876543210', 'Caparangasan', 'itchan12', 'Customer', '2025-10-11'),
('10112025-00018', 'John', 'Doe', 'example@john46.com', 'CUSTOMER', 'ACTIVE', '9876543210', 'Caparangasan', 'itchan2', 'Customer', '2025-10-11');

-- --------------------------------------------------------

--
-- Table structure for table `customer_receipt`
--

CREATE TABLE `customer_receipt` (
  `laundryId` varchar(10) NOT NULL,
  `cus_id` varchar(50) NOT NULL,
  `cus_name` varchar(100) NOT NULL,
  `cus_eMail` varchar(100) NOT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `laundry_shops`
--

CREATE TABLE `laundry_shops` (
  `shop_id` varchar(10) NOT NULL,
  `owner_fName` varchar(100) NOT NULL,
  `owner_mName` varchar(100) NOT NULL,
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

INSERT INTO `laundry_shops` (`shop_id`, `owner_fName`, `owner_mName`, `owner_lName`, `owner_emailAdd`, `owner_contactNum`, `shop_address`, `shop_name`, `shop_status`, `shop_type`, `date_registered`) VALUES
('LMSS-00001', 'Christian', '', 'Lamoste', 'christian.lamoste3@example.com', '555-10053', '99 Pine Street, Lakeside', 'Itchan\'s Laundry3', 'active', 'Washing, DryClean', '2025-09-17'),
('LMSS-00002', 'Christian', 'b.', 'Lamoste', 'christian.lamoste1@example.com', '555-10051', '99 Pine Street, Lakeside', 'Itchan\'s Laundry1', 'active', 'Washing, DryClean', '2025-09-17'),
('LMSS-00003', 'Christian', 'M.', 'Lamoste', 'christian.lamoste@example.com', '555-1005', '99 Pine Street, Lakeside', 'Itchan\'s Laundry', 'Active', 'Washing', '2025-09-17'),
('LMSS-00004', 'Christian', 'Macorol', 'Lamoste', 'emily.chen@nursing.edu', '09631199862', 'Purok 2', 'HAHA2', 'Active', 'Washing, DryClean', '2025-09-17'),
('LMSS-00005', 'Christian', 'Macorol', 'Lamoste', 'testuser1@example.com', '09631199869', 'Purok 2', 'HAHA69', 'Active', 'DryClean', '2025-09-17');

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
('LMSU-00001', 'David', 'E.', 'Brown', '654 Cedar Road, Foresthill', 'david.brown', '555-7890', 'david.brown@example.com', 'staff', 'active', '$2b$10$bZzYRfyufmuS7Gwl/hEoHOIRM7xaEc34UKfRD4wqf62LhPOAV1zPe', '2025-09-19', ''),
('LMSU-00002', 'David', 'E.', 'Brown', '654 Cedar Road, Foresthill', 'david.brown', '555-7890', 'david1.brown@example.com', 'staff', 'active', '$2b$10$AJmvfxy5jCcVfMKQvGJMOuxpy8Qy730Gei4mt/khMNZuHXTzA358i', '2025-09-19', ''),
('LMSU-00003', 'David', 'E.', 'Brown', '654 Cedar Road, Foresthill', 'david.brown', '555-7890', 'david2.brown@example.com', 'staff', 'active', '$2b$10$7hu1.9gVd7Qnlg/HFdqZMe.KQjfYjsKmt6LYFp4BCUg7BVjT3CdsG', '2025-09-19', ''),
('LMSU-00004', 'David', 'E.', 'Brown', '654 Cedar Road, Foresthill', 'david.brown', '555-7890', 'david3.brown@example.com', 'staff', 'active', '$2b$10$08.ZHwCSciqm6ekmBVypjOazlA5oFhRvMCRUnM8VgeuKTgwtdEZoC', '2025-09-19', ''),
('LMSU-00005', 'David', NULL, 'Brown', '654 Cedar Road, Foresthill', 'david.brown', '555-7890', 'david4.brown@example.com', 'staff', 'active', '$2b$10$2Q6n8TdvOB7ygFwZzoKUUeXBGt4/XPxCnCbJsou/jNn7xshn9t99u', '2025-09-19', ''),
('LMSU-00006', 'David', NULL, 'Brown', '654 Cedar Road, Foresthill', NULL, '555-7890', 'david5.brown@example.com', 'staff', 'active', '$2b$10$mTw4nV8qVmqd2LarTN3C/uIIbWVjvtvKnKzfcFosCoAMM4HMRWlma', '2025-09-19', ''),
('LMSU-00007', 'Christian', '', 'Lamoste', 'Purok 2', NULL, '0987654321', 'christianmacorol2002@gmail.com', 'staff', 'Active', '$2b$10$UlItkV5FYxcCXFw32aPHaeoIxlkSRhqxMnZk/dxRPzU/Yoysdae0C', '2025-09-19', ''),
('LMSU-00008', 'Christian', '', 'Lamoste', 'Gandara Samar', NULL, '0987654321', 'christianmacorol@gmail.com', 'customer', 'Active', '$2b$10$pbuwNdqOMHzF/7dgj0A9iORJDZ/3kCOKbRLdjjmj6LASly0DL/pt2', '2025-09-19', ''),
('LMSU-00009', 'David', 'E.', 'Brown', '654 Cedar Road, Foresthill', 'david.brown', '555-7890', 'david6.brown@example.com', 'staff', 'active', '$2b$10$zXP.jHCZ5T4XurbWxbElM.67DGPjd6kWSuMCGwl5ijHLlunyyFOTa', '2025-09-19', ''),
('LMSU-00010', 'David', 'E.', 'Brown', '654 Cedar Road, Foresthill', 'david.brown', '555-7890', 'david69.brown@example.com', 'staff', 'active', '$2b$10$w3KNnmDSg.WH32DUkBnXTOVi.ruqQwLoRJh.NBV6Hy30o4FmoPiFW', '2025-09-19', ''),
('LMSU-00011', 'David', NULL, 'Brown', '654 Cedar Road, Foresthill', NULL, '555-7890', 'david01.brown@example.com', 'staff', 'active', '$2b$10$GD6mf5CnueM7zejglJDN2O05tfNFY7vQEdphzAZ6nJwpHbUbjZw.a', '2025-09-19', ''),
('LMSU-00012', 'David', NULL, 'Brown', '654 Cedar Road, Foresthill', NULL, '555-7890', 'david02.brown@example.com', 'Staff', 'active', '$2b$10$xkQ4E/6sNJM3fQATO3r3yeOSXI1oFlTW9bw49xGbNQbJlq5ygU6U.', '2025-09-19', ''),
('LMSU-00013', 'David', 'E.', 'Brown', '654 Cedar Road, Foresthill', 'david.brown', '555-7890', 'david03.brown@example.com', 'Staff', 'active', '$2b$10$68OKqSEbxJHHUJCkb.luHe4LVQO8Bi5.8CMIhNR8KNQRmblyNzmGm', '2025-09-19', ''),
('LMSU-00014', 'David', NULL, 'Brown', '654 Cedar Road, Foresthill', NULL, '555-7890', 'david04.brown@example.com', 'Staff', 'active', '$2b$10$4VAiVhLRwGaMXzv23g2ZJOxefHeM3T99tCm2j/GvxmGUESBKIZYrO', '2025-09-19', ''),
('LMSU-00015', 'John', NULL, 'Doe', 'Biringan City', NULL, '0987654321', 'John.doe@test.com', 'Staff', 'Active', '$2b$10$6eG/7OxrIyPaYg9uO7OGUeIrdt3jn8epJkbna/ELJm3/4Hip9iYsO', '2025-09-19', ''),
('LMSU-00016', 'David', 'null', 'Brown', '654 Cedar Road, Foresthill', 'null', '555-7890', 'david05.brown@example.com', 'Staff', 'active', '$2b$10$WE3uBj8YtaQVe1I21UDdxOBnumfshRVqAO8Mcip4GVqFVWT9NcHdO', '2025-09-19', ''),
('LMSU-00017', 'David', 'null', 'Brown', '654 Cedar Road, Foresthill', 'null', '555-7890', 'david06.brown@example.com', 'Staff', 'active', '$2b$10$gpx4gkxBBC/KOqFEg/vntus5VAnuFnN0aPWCUBZBFNNGqeSFqdl96', '2025-09-19', 'Admin'),
('LMSU-00018', 'Christian', NULL, 'Lamoste', 'Purok 2', NULL, '0987654321', 'emily.chen@nursing.edu', 'Staff', 'Active', '$2b$10$ckmWmK0fSUE7ayKMXuBPUuvtfBDaoOiY9g9Pp16bRQfdJnImplZOq', '2025-09-19', 'Admin'),
('LMSU-00019', 'Juan', NULL, 'Dela cruz', 'Biringan City', NULL, '0987654321', 'juan.dc@test.com', 'Customer', 'Active', '$2b$10$qzGWvgXZHddknuW2czUQaOED0JhCgNdsiCfqQgqHfWEhEvTc6eVLe', '2025-09-19', 'Admin'),
('LMSU-00020', 'Christian', NULL, 'Lamoste', 'Purok 2', NULL, '0987654321', 'christianlamostem@gmail.com', 'Staff', 'Active', '$2b$10$UXHVC/fRwl5bQ6Ezvc3gnOczkRn49qswwHLNCTRaqJLHRFgmnHfxG', '2025-09-19', 'Admin'),
('LMSU-00021', 'Christian', NULL, 'Lamoste', 'Gandara Samar', NULL, '0987654321', 'testuser10@example.com', 'Customer', 'Active', '$2b$10$GhcyHI6R4pP47g1k5vsYR./vIg9dpY8stMriNinHtMjpOKRZaGi5W', '2025-09-19', 'Admin'),
('LMSU-00022', 'Christian', NULL, 'Lamoste', 'Purok 2', 'christian.lamoste', '0987654334', 'christianmacorol02@gmail.com', 'Staff', 'active', '$2b$10$BgyQjX3L9ApiEJC9Y5lkDeCEwGoC2mG4WDqLESx6zwDjL0zNPiRkK', '2025-10-11', 'Admin'),
('LMSU-00023', 'ITCHAN', NULL, 'MACOROL', 'Caparangasan Gandara, Samar', 'itchan.macorol', '09123456789', 'christianlamoste2002@gmail.com', 'Customer', 'active', '$2b$10$LasCm0aCUbR6fQQLayBP1eYDskTXhNvwnCI.MCA.LaazxJP.5/xTO', '2025-10-11', 'Admin');

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
  ADD UNIQUE KEY `cus_username` (`cus_username`);

--
-- Indexes for table `customer_receipt`
--
ALTER TABLE `customer_receipt`
  ADD PRIMARY KEY (`laundryId`);

--
-- Indexes for table `laundry_shops`
--
ALTER TABLE `laundry_shops`
  ADD PRIMARY KEY (`shop_id`),
  ADD UNIQUE KEY `owner_emailAdd` (`owner_emailAdd`),
  ADD UNIQUE KEY `owner_contactNum` (`owner_contactNum`),
  ADD UNIQUE KEY `shop_name` (`shop_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
