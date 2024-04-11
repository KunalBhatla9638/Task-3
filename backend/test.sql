-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2024 at 08:33 PM
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
(15, 'test', 21);

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
(10, 1, '[\"img5.jpg\",\"img.jpg\"]'),
(11, 2, '[\"img2.jpg\",\"img4.jpg\"]'),
(12, 3, '[\"img4.jpg\"]'),
(13, 4, '[\"img2.jpg\",\"img3.jpg\",\"img4.jpg\"]'),
(14, 5, '[\"img.jpg\",\"img2.jpg\"]'),
(15, 6, '[\"img6.jpg\"]'),
(16, 7, '[\"img7.jpg\"]'),
(17, 8, '[\"img7.jpg\",\"img8.jpg\"]');

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
(1, 'Daikin 0.8 Ton 3 Star, Fixed Speed Split AC (Copper, PM 2.5 Filter, 2022 Model, FTL28U, White)', 'Split AC with non-inverter compressor: Power chill operation to ensure quick cooling\nCapacity 0.8 Ton: Suitable for small sized rooms (up to 100 sq.ft)\n3 Star: Energy efficiency', 12, '4495.69', '[\"img5.jpg\",\"img.jpg\"]'),
(2, 'STRIFF Mpad Mouse Mat 230X190X3mm Gaming Mouse Pad, Non-Slip Rubber Base, Waterproof Surface, Premium-Textured, Compatible with Laser and Optical Mice(Universe Black)', '9.4 Inches X 7.9 Inches) 240mm x 200mm x 2mm Size: This mouse pad is ideal for Gamers, Graphic Designers, Students, or anyone using mouse for long sessions. This helps to improve the gaming experience for gamers or the work efficiency in the office.', 12, '1500.00', '[\"img2.jpg\",\"img4.jpg\"]'),
(3, 'GIZGA essentials (35cm x 25cm Extended Gaming Mouse Pad, Laptop Desk Mat, Computer Mouse Pad with Smooth Mouse Control, Mercerized Surface, Antifray Stitched Embroidery Edges, Anti-Slip Rubber Base', 'ULTRA-SMOOTH SURFACE: Gizga Essentials Mouse pad is made of Premium-textured and Mercerized surface that the mouse glides over nicely, it is optimized for fast movement while maintaining excellent speed and control, great for daily work or gaming.', 12, '1000.00', '[\"img4.jpg\"]'),
(4, 'V-CUBE Designs Desk Mat|90X45cm|2.4mm Thick(Padded)|Premium Vegan Leather Laptop Mat/Extended Mouse Pad/Stitched, Reversible, Sturdy Deskspread with High Tear/Peel Strength|Anti-Slip,Splash-Proof|Blue', 'BUILT - V-CUBE DESIGNS Premium 90cm X 45cm Desk Mat / Laptop Mat is an excellent desk accessory made with High Quality Vegan Leather with High Tear and Peel Strength. Stitched around the Borders of the Mat for an enhanced look. The 2.4mm Thickness increases the comfort while using the Mat while maintaining stability. This Handmade Extended Mouse Pad is reversible with Vegan Leather and Same Colour (Navy Blue) on both sides.', 12, '2100.00', '[\"img2.jpg\",\"img3.jpg\",\"img4.jpg\"]'),
(5, 'Logitech G213 Prodigy USB Gaming Keyboard, LIGHTSYNC RGB Backlit Keys, Spill-Resistant, Customizable Keys, Dedicated Multi-Media Keys - Black', 'Brilliant Color Spectrum Illumination Personalize five individual lighting zones from a spectrum of over 16.8 million colors. Change colors to match your setup, specific games, or to showcase your favorite colors. Synchronize lighting effects with other Logitech G devices using Logitech Gaming S', 12, '3100.00', '[\"img.jpg\",\"img2.jpg\"]'),
(6, 'Steelbird SBH-34 Jai Shree Ram Reflective ISI Certified Full Face Graphic Helmet for Men and Women with Inner Smoke Sun Shield', 'High Impact Resistant Thermoplastic shell\nBreathable Padding with Neck Protector and Extra Comfort for long Drives\nQuick Release Micro-Metric Buckle meeting European Standards.\nNight Reflective Full Face Helmet\nAnti Scratch Coated Visor Quick Release Visor mechanism Kit', 11, '700.00', '[\"img6.jpg\"]'),
(7, 'LG 7 Kg 5 Star Inverter Touch panel Fully-Automatic Front Load Washing Machine with In-Built Heater (FHM1207SDM, Middle Black, Steam for Hygiene Wash)', 'Fully-automatic front load washing machine with Hygiene Steam/direct-drive technology: Best Wash Quality, Energy and Water efficient\nCapacity - 7 Kg: Suitable for 3 – 4 members\nEnergy Rating 5 Star: Best in class efficiency | Energy consumption – 0.0064* KWh/kg/cycle & Water Consumption: 13.14 L/Kg/Cycle (Please refer BEE label for more information)', 12, '21000.00', '[\"img7.jpg\"]'),
(8, 'Whirlpool 7 Kg 5 Star Royal Fully-Automatic Top Loading Washing Machine (WHITEMAGIC ROYAL 7.0 GENX, Grey, Hard Water Wash, ZPF Technology)', 'Fully-automatic top load washing machine : Affordable with best wash quality with Hard Water Wash\nCapacity:7 kg (Suitable for Small to Medium sized family)\nEnergy star rating 5 Star: Best in class efficiency\nManufacturer Warranty :2 years on product, 5 years on motor\nMotor : 740 RPM ; Higher spin speed helps in faster drying', 12, '15000.00', '[\"img7.jpg\",\"img8.jpg\"]');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `productphotos`
--
ALTER TABLE `productphotos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
