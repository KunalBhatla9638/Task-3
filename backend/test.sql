-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2024 at 03:35 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `categoryname` varchar(100) NOT NULL,
  `createdBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `categoryname`, `createdBy`) VALUES
(6, 'tv', 2),
(11, 'Books', 4),
(12, 'gaming keyboard', 21),
(13, 'mouse', 21),
(15, 'test', 21),
(21, 'demo', 21),
(23, 'shoes', 7);

-- --------------------------------------------------------

--
-- Table structure for table `email`
--

CREATE TABLE `email` (
  `countemail` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `email`
--

INSERT INTO `email` (`countemail`) VALUES
(9);

-- --------------------------------------------------------

--
-- Table structure for table `productphotos`
--

CREATE TABLE `productphotos` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `photo_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `productphotos`
--

INSERT INTO `productphotos` (`id`, `productId`, `photo_name`) VALUES
(15, 6, '[\"img6.jpg\"]'),
(78, 69, '[\"mouse1.jpg\"]'),
(79, 70, '[\"mouse2.jpg\"]'),
(80, 71, '[\"img.jpg\",\"img2.jpg\",\"img3.jpg\",\"img4.jpg\",\"keyboard2.jpg\"]'),
(81, 72, '[\"img.jpg\",\"img3.jpg\",\"img4.jpg\",\"keyboard2.jpg\",\"mouse1.jpg\"]'),
(82, 73, '[\"img4.jpg\",\"img7.jpg\",\"img8.jpg\"]'),
(83, 74, '[\"airbuds.jpg\",\"img2.jpg\",\"img3.jpg\",\"img4.jpg\",\"img8.jpg\",\"keyboard2.jpg\"]'),
(84, 75, '[\"airbuds.jpg\",\"img.jpg\",\"img2.jpg\",\"img3.jpg\",\"img4.jpg\",\"img5.jpg\",\"img6.jpg\",\"img7.jpg\",\"img8.jpg\",\"keyboard2.jpg\",\"mouse1.jpg\",\"mouse2.jpg\"]'),
(87, 78, '[\"img6.jpg\",\"img7.jpg\",\"img8.jpg\"]'),
(88, 79, '[\"shoe1.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `images` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `categoryId`, `price`, `images`) VALUES
(6, 'Steelbird SBH-34 Jai Shree Ram Reflective ISI Certified Full Face Graphic Helmet for Men and Women with Inner Smoke Sun Shield', 'High Impact Resistant Thermoplastic shell\nBreathable Padding with Neck Protector and Extra Comfort for long Drives\nQuick Release Micro-Metric Buckle meeting European Standards.\nNight Reflective Full Face Helmet\nAnti Scratch Coated Visor Quick Release Visor mechanism Kit', 11, '700.00', '[\"img6.jpg\"]'),
(69, 'ZEBRONICS New Launch Uzi High Precision Wired Gaming Mouse with 4 Buttons, Rainbow LED Lights, DPI Switch with', 'Ergonomic design: Crafted for both gaming and work, the ZEB-Uzi is a lightweight wired mouse designed with ergonomics in mind, ensuring a usage experience free from fatigue.', 13, '555.00', '[\"img5.jpg\",\"img6.jpg\",\"img7.jpg\",\"keyboard2.jpg\",\"mouse1.jpg\",\"mouse2.jpg\"]'),
(70, 'Razer DeathAdder Essential White Edition - 6400 DPI Ergonomic Wired Gaming Mouse - RZ01-03850200-R3M1', 'High-Precision 6,400 DPI Optical Sensor: Offers on-the-fly sensitivity adjustment through dedicated DPI buttons (reprogrammable) for gaming and creative work', 13, '2100.00', '[\"mouse1.jpg\",\"mouse2.jpg\",\"mouse2.jpg\"]'),
(71, ' Redragon K596 PRO RGB Mechanical Gaming Keyboard, 5.0 BT/2.4 Ghz/Wired Three Modes, 87 Keys TKL Compact', 'Wireless and Wired Mode - Featuring dual wired and wireless modes. Easy wireless setup with an included dongle that allows for low latency connection without interference ', 12, '5000.00', '[\"img.jpg\",\"img2.jpg\",\"img3.jpg\",\"keyboard2.jpg\"]'),
(72, 'SteelSeries Store Apex 5 Hybrid Mechanical Gaming Keyboard, Per-Key RGB Illumination, Aircraft Grade Aluminum Alloy Frame, OLED Smart Display (Hybrid Blue Switch, USB)', 'Hybrid mechanical gaming switches – The tactile click of a blue mechanical switch plus a smooth membrane OLED smart display – Customize with gifs, game info, discord messages, and more.', 12, '4000.00', '[\"img2.jpg\",\"img3.jpg\",\"img7.jpg\",\"keyboard2.jpg\"]'),
(73, 'iQOO Z6 Lite 5G (Stellar Green, 6GB RAM, 128GB Storage) with Charger | Qualcomm Snapdragon 4 Gen 1 Processor | 120Hz FHD+ Display | Travel Adaptor Included in The Box', 'iQOO Z6 Lite 5G (Stellar Green, 6GB RAM, 128GB Storage) with Charger | Qualcomm Snapdragon 4 Gen 1 Processor | 120Hz FHD+ Display | Travel Adaptor Included in The Box', 13, '4000.00', '[\"img3.jpg\",\"img8.jpg\",\"airbuds.jpg\",\"img.jpg\",\"img2.jpg\"]'),
(74, 'testing12 changed this shit again', 'Kunal changed this also', 13, '4495.69', '[\"img2.jpg\",\"img8.jpg\"]'),
(75, 'demo', 'DEMO', 15, '4495.69', '[\"airbuds.jpg\",\"img3.jpg\",\"img4.jpg\",\"keyboard2.jpg\",\"mouse1.jpg\",\"mouse2.jpg\"]'),
(78, 'testing 22', 'testing', 21, '300.00', '[\"img7.jpg\",\"img8.jpg\"]'),
(79, 'OFF LIMITS STUSSYY (Memory TECH) Running Shoes for Men', 'Phylon TPR sole provides traction and grip over varied surfaces The upper has a PU base and a super soft lining for added', 23, '1100.00', '[\"shoe1.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role`) VALUES
(1, 'Admin'),
(2, 'User'),
(3, 'Prime-User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `hobbies` varchar(200) DEFAULT NULL,
  `userRole` int(11) DEFAULT NULL,
  `profile_pic` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `gender`, `hobbies`, `userRole`, `profile_pic`) VALUES
(1, 'Demo1', 'Demo1', 'Demo1@gmail.com', '$2b$12$8gYGMYvWiQzdsZqGdsXP7.4eUtovWtEoeWF8lrdjBZ6O9rNpAodC6', 'Other', 'coding', 2, 'Static'),
(2, 'Demo2', 'Demo2', 'Demo2@gmail.com', '$2b$12$jdGB7bPCQX8sZ6t8B3nkLunCv9o/jwwL.J0y/72lSjxteeJcVWZn2', 'Other', 'Coding, Exploring', 2, '1712654780165-banner.png'),
(4, 'randome', 'randome', 'randome@gmail.com', '$2b$12$zqm80kTTaiHyh/qjR0nVEObkO9EGl/AHg8EQsbmdpcwcurowjAaJO', 'Female', 'coding, surfing', 2, '1712655168070-nature2.avif'),
(6, 'admin', 'admin', 'admin@gmail.com', '$2b$12$EsR/dKOS0iqIjMJTaDGiGurMk44DiTvumW4aBV93MZamrE6tEBe0m', 'Male', 'coding, surfingM', 1, '1712656085181-nature2.avif'),
(7, 'kunal', 'kunal', 'kunal@gmail.com', '$2b$12$LxUyto0a7lPNm9zR7X4FReAHkVcgF56r/uVCnowfjON4PDIOdGPLG', 'Male', 'coding, surfingM', 2, '1712743475171-service6.jpg'),
(8, 'Demo', 'Demo', 'Demo@gmail.com', '$2b$12$OeP0cazDeSYd7wCfW.m.QOy1DP5Y6pRzLeh9F7aZukYUR/8aFVw3e', 'Female', 'Reading,Sports', 2, '1712761901826-banner.png'),
(9, 'final', 'final', 'final@gmail.com', '$2b$12$6AfeXWIv2g0p9Es7T5.QNue4uryE.vg0SogiUeSaqwKfdZrW0WHHW', 'Female', 'Sports', 2, '1712762573482-service3.webp'),
(10, 'Kunal', 'Demo', 'user@gmail.com', '$2b$12$kAHH/rObeKM0wrguc3RzQOINQsQC5fCK83XzwtAx4MjnlmHjAobce', 'Other', 'Reading,Music', 2, '1712762648688-nature1.avif'),
(11, 'final', '2324', 'user2@gmail.com', '$2b$12$78w3oXFFKCV7tXSAPUdJCeiS8..jK20qT8nYCTzu6nt3i0MOCSGIe', 'Female', 'Music,Sports', 2, '1712762756597-service1.webp'),
(12, 'final', '2324', 'user3@gmail.com', '$2b$12$w7Y1prRe5sk8TdMhqCZtrOjZIifsgYto4GSdFKVb5LXrpBZ8/YhVa', 'Female', 'Music,Sports', 2, '1712762786867-service1.webp'),
(13, 'final', '2324', 'user4@gmail.com', '$2b$12$WvpDkSprMEBC5.T3b8NbcOlEMW3zwBaa5MEOpbeDfB9yooz2Q2/6G', 'Female', 'Music,Sports', 2, '1712762855341-service1.webp'),
(14, 'final', '2324', 'user5@gmail.com', '$2b$12$8cNayhvVYKi/QNrpveZV6eHeLjelYRJik65pAIE6CQ0Ps4b6NqRl6', 'Female', 'Music,Sports', 2, '1712762895950-service1.webp'),
(15, 'final', 'Bhatla', 'kunall@gmail.com', '$2b$12$2Dqtd8St.HbLWExgRwpLPOXIx7tQeu6/G/jt/8.1V2wyl2xwwGd0S', 'Female', 'Sports,Reading', 2, '1712762968288-service1.webp'),
(16, 'final', 'Bhatla', 'kunalsl@gmail.com', '$2b$12$KwQxlju1cvMf8FxhgeVei.LRGf1tlgmBz6eD1u4RyAIQdehbAMmIK', 'Female', 'Sports,Reading', 2, '1712762993660-service1.webp'),
(17, 'final', 'final', 'kundfgal@gmail.com', '$2b$12$pkAxFIlY3zjDuZjfxsHqP.4xhb/yUTIHEsAziJ86ZZ16GYU6fT3yu', 'Female', 'Reading', 2, '1712763062229-nature1.avif'),
(18, 'final', 'final', 'kundfgasl@gmail.com', '$2b$12$jZ1z0o20C1YFaHCT8XZIY.Wfl1a0WvqkMX55Eta8fbnLrjj/MMG4u', 'Female', 'Reading', 2, '1712763130861-nature1.avif'),
(19, 'final', 'final', 'kundfgdasl@gmail.com', '$2b$12$0.oPnYj/byTBzyAflrlhKuANuGjEqFfP4Mqs1XuY5zi5znuU.VbAG', 'Female', 'Reading', 2, '1712763152574-nature1.avif'),
(20, 'Demo', '2324', 'ufdgser@gmail.com', '$2b$12$FsuGmTgBcGdae445QAuVzuNTjEixeVnN.gLYE.qKwvxde7u/8XPeS', 'Other', 'Reading,Sports', 2, '1712763223378-service4.jpg'),
(21, 'bulbul', 'bulbul', 'bulbul@gmail.com', '$2b$12$mJSbu4umU4.f5dIi/QMIcOUAs8o9h4WdRtzUZ/TDwnei9W4cF.t1a', 'Female', 'Reading,Sports', 2, '1712835026719-gallery1.avif');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`);

--
-- Indexes for table `productphotos`
--
ALTER TABLE `productphotos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userRole` (`userRole`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `productphotos`
--
ALTER TABLE `productphotos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `productphotos`
--
ALTER TABLE `productphotos`
  ADD CONSTRAINT `productphotos_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`userRole`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
