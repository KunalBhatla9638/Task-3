-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 10, 2024 at 05:25 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `categoryId` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `images` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `categoryId`, `price`, `images`) VALUES
(1, 'Logitech Pebble Keys 2 K380s, Multi-Device Bluetooth Wireless Keyboard with Customisable Shortcuts, ', 'Defy Boring: With a slim design, multiple colours and smarter tech, this Bluetooth keyboard from the Pebble 2 Collection lets you express your vibe and make your statement', 2, 1200.22, '[\"random-1.avif\",\"random-2.avif\"]'),
(2, 'Logitech Pebble Mouse 2 M350s Slim Bluetooth Wireless Mouse, Portable, Lightweight, Customisable But', 'Defy Boring: With a slim design, multiple colours and smarter tech, this Bluetooth keyboard from the Pebble 2 Collection lets you express your vibe and make your statement', 5, 1200.22, '[\"random-1.avif\",\"random-2.avif\"]'),
(11, 'Testingh', 'Defy Boring: With a slim design, multiple colours and smarter tech, this Bluetooth keyboard from the Pebble 2 Collection lets you express your vibe and make your statementh', 2, 1230.22, '[\"random-1.avif\",\"random-3.avif\"]');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
