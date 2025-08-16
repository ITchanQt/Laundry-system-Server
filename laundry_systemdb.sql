-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2025 at 06:01 PM
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
  `id` int(10) NOT NULL,
  `admin_fName` varchar(100) NOT NULL,
  `admin_mName` varchar(100) NOT NULL,
  `admin_lName` varchar(100) NOT NULL,
  `admin_address` varchar(100) NOT NULL,
  `admin_username` varchar(100) NOT NULL,
  `admin_contactNum` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `admin_fName`, `admin_mName`, `admin_lName`, `admin_address`, `admin_username`, `admin_contactNum`, `email`, `password`) VALUES
(1, 'Admin', 'Middle', 'Test', '123 Admin Street', 'admin1', '1234567890', 'admin@test.com', '$2b$10$bo/S4Tivbm8Aa9NlwCG7n.sh9Aq1llBUhpofzVI8jD9EZKXQ0WlTu'),
(2, 'Christian', 'Macorol', 'Lamoste', 'Caparangsan Gandara Samar', 'Helloworld', '09631199862', 'testuser10@example.com', '$2b$10$RNm6zaxuDP0/NkauBg/WkuvqgsrJjTvphISH70KEGMiufaPlRixgi'),
(3, 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'Helloworld', '09631199862', 'emily.chen@nursing.edu', '$2b$10$qNsTE969JgHCPfNuyiGvaOI3kmA.tkoXSVqbAyf/Fvc4.P6/8/KtW'),
(4, 'Christian', 'Macorol', 'Lamoste', 'Purok 2', 'Helloworld', '09631199862', 'christianlamostem@gmail.com', '$2b$10$eeEHlmZBP9wlEJ6Bvd8fmORyeRsOvRiZ0h5e23jQHbaVd3eCR1bza');

-- --------------------------------------------------------

--
-- Table structure for table `laundry_shops`
--

CREATE TABLE `laundry_shops` (
  `owner_id` int(20) NOT NULL,
  `owner_fName` varchar(100) NOT NULL,
  `owner_mName` varchar(100) NOT NULL,
  `owner_lName` varchar(100) NOT NULL,
  `owner_emailAdd` varchar(100) NOT NULL,
  `owner_contactNum` varchar(100) NOT NULL,
  `shop_address` varchar(100) NOT NULL,
  `shop_name` varchar(100) NOT NULL,
  `shop_status` varchar(100) NOT NULL,
  `shop_type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laundry_shops`
--

INSERT INTO `laundry_shops` (`owner_id`, `owner_fName`, `owner_mName`, `owner_lName`, `owner_emailAdd`, `owner_contactNum`, `shop_address`, `shop_name`, `shop_status`, `shop_type`) VALUES
(4, 'Alice', 'F.', 'Cooper', 'alice.cooper@example.com', '555-1001', '12 Market Street, Downtown', 'Alice\'s Boutique', '', 'clothing'),
(5, 'Brian', 'G.', 'Lee', 'brian.lee@example.com', '555-1002', '45 River Avenue, Midtown', 'Lee\'s Electronics', '', 'electronics'),
(6, 'Carla', 'H.', 'Martinez', 'carla.martinez@example.com', '555-1003', '78 Park Lane, Uptown', 'Carla\'s Café', '', 'food'),
(7, 'Elena', 'J.', 'Santos', 'elena.santos@example.com', '555-1005', '99 Pine Street, Lakeside', 'Elena\'s Flowers', '', 'florist');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_fName` varchar(255) NOT NULL,
  `user_mName` varchar(255) NOT NULL,
  `user_lName` varchar(255) NOT NULL,
  `user_address` varchar(255) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `contactNum` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_fName`, `user_mName`, `user_lName`, `user_address`, `username`, `contactNum`, `email`, `role`, `status`, `password`) VALUES
(10, 'John', 'A.', 'Doe', '123 Elm Street, Springfield', 'john.doe', '555-1234', 'john.doe@example.com', 'admin', 'active', '$2b$10$N8Onqeq/.M2zFzd6apXunuG7tW2yN.T/A5AxWlUM4NPwHS3AN4c7.'),
(11, 'Jane', 'B.', 'Smith', '456 Oak Avenue, Rivertown', 'jane.smith', '555-5678', 'jane.smith@example.com', 'user', 'active', '$2b$10$XNwYGgk7xclgto6Qotb9ruLBfhRZCTfAvIwhjd69f/0CYbmpWotFS'),
(12, 'Michael', 'C.', 'Johnson', '789 Maple Lane, Lakeview', 'michael.johnson', '555-9012', 'michael.johnson@example.com', 'staff', 'inactive', '$2b$10$.ifL4RSXN.OSlwg/EPcLfe1ycdMz0qH0UzLgKnLFDn1N4JYmpuSBi'),
(13, 'Emily', 'D.', 'Williams', '321 Birch Blvd, Mountainview', 'emily.williams', '555-3456', 'emily.williams@example.com', 'user', 'active', '$2b$10$A2MEi6WC7jeyz3t2MTqzfO845LOvL0.B4chVvVYx4.SlveFflc7xm'),
(14, 'David', 'E.', 'Brown', '654 Cedar Road, Foresthill', 'david.brown', '555-7890', 'david.brown@example.com', 'staff', 'active', '$2b$10$1fsIMUj7rDj1IAKmkYfm6ehGegFGAelIvA7Dz8b.o1TVg/WTe4.2u');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `laundry_shops`
--
ALTER TABLE `laundry_shops`
  ADD PRIMARY KEY (`owner_id`),
  ADD UNIQUE KEY `owner_emailAdd` (`owner_emailAdd`),
  ADD UNIQUE KEY `owner_contactNum` (`owner_contactNum`),
  ADD UNIQUE KEY `shop_name` (`shop_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `laundry_shops`
--
ALTER TABLE `laundry_shops`
  MODIFY `owner_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
