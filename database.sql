-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: thuexehn
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asset_categories`
--

DROP TABLE IF EXISTS `asset_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset_categories`
--

LOCK TABLES `asset_categories` WRITE;
/*!40000 ALTER TABLE `asset_categories` DISABLE KEYS */;
INSERT INTO `asset_categories` VALUES (1,'Xe ô tô','Xe ô tô','2023-12-18 10:58:50','2023-12-18 10:58:50');
/*!40000 ALTER TABLE `asset_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'admin','<div>ttt1122</div>','https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1703275291941z4549515336337_654cf5b0e0ccb296414772fe87405782.jpg?alt=media&token=02488031-5a21-4d92-b13a-82f9be2148b0','2023-12-22 20:01:35','2023-12-22 20:08:40'),(3,'tt','<div>ttt</div>','https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1703275965156z4549515336337_654cf5b0e0ccb296414772fe87405782.jpg?alt=media&token=e30b817f-0f35-49f5-babc-c93717acf5c2','2023-12-22 20:12:49','2023-12-22 20:12:49');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `products` json NOT NULL,
  `description` text,
  `order_total` decimal(10,2) NOT NULL,
  `billing` json NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,'[{\"product\": 1, \"quantity\": 3, \"rental_price\": \"200001.00\"}]','tt',600003.00,'\"cod\"','tt','pending','2023-12-22 21:17:21','2023-12-22 21:17:21'),(2,2,'[{\"product\": 1, \"quantity\": 1, \"rental_price\": \"200001.00\"}, {\"product\": 3, \"quantity\": 1, \"rental_price\": \"1500000.00\"}]','tt',1700001.00,'\"cod\"','tt','pending','2023-12-22 21:21:27','2023-12-22 21:21:27'),(3,2,'[{\"product\": 1, \"quantity\": 1, \"rental_price\": \"200001.00\"}, {\"product\": 3, \"quantity\": 1, \"rental_price\": \"1500000.00\"}]','tt',1700001.00,'\"cod\"','tt','pending','2023-12-22 21:22:53','2023-12-22 21:22:53'),(4,2,'[{\"product\": 1, \"quantity\": 3, \"rental_price\": \"200001.00\"}]','tt',600003.00,'\"cod\"','ttt','pending','2023-12-22 21:46:32','2023-12-22 21:46:32'),(5,2,'[{\"product\": 1, \"quantity\": 1, \"rental_price\": \"200001.00\"}]','tt',200001.00,'\"paypal\"','tt','pending','2023-12-22 21:50:10','2023-12-22 21:50:10'),(6,2,'[{\"product\": 1, \"quantity\": 1, \"rental_price\": \"200001.00\"}]','tt',200001.00,'\"cod\"','tt','pending','2023-12-22 22:07:38','2023-12-22 22:07:38'),(7,2,'[{\"product\": 3, \"quantity\": 1, \"rental_price\": \"1500000.00\"}, {\"product\": 1, \"quantity\": 1, \"rental_price\": \"200001.00\"}]','tt',1700001.00,'\"cod\"','tt','pending','2023-12-23 03:27:37','2023-12-23 03:27:37'),(8,2,'[{\"product\": 1, \"quantity\": 1, \"rental_price\": \"200001.00\"}]','tt',200001.00,'\"paypal\"','tt','pending','2023-12-23 03:28:45','2023-12-23 03:28:45');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `password_reset_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rentals`
--

DROP TABLE IF EXISTS `rentals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rentals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `seats` int NOT NULL,
  `year` int NOT NULL,
  `brand` varchar(255) NOT NULL,
  `fuel_type` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `commune` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT 'https://example.com/default-image.jpg',
  `is_rented` tinyint(1) DEFAULT '0',
  `rental_price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rentals_category` (`category_id`),
  KEY `fk_rentals_user` (`user_id`),
  CONSTRAINT `fk_rentals_category` FOREIGN KEY (`category_id`) REFERENCES `asset_categories` (`id`),
  CONSTRAINT `fk_rentals_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentals`
--

LOCK TABLES `rentals` WRITE;
/*!40000 ALTER TABLE `rentals` DISABLE KEYS */;
INSERT INTO `rentals` VALUES (1,'Cho thuê xe giá rẻ','Xe mazda',5,2018,'hoan hai','xăng','hoa nam','test','test','test','https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1702898726929Bi%E1%BB%83u%20%C4%91%E1%BB%93%20l%E1%BB%9Bp.drawio.png?alt=media&token=430ca969-2b60-4838-b256-8414368dcddd',1,200001.00,'2023-12-18 11:25:39','2023-12-23 03:28:45',1,2),(2,'test','test',5,2018,'mazda','xăng','dd','test','test','dd','https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1702903814189logo.png?alt=media&token=cf5b4b57-81e0-4af6-8e7a-acbba1ce6c30',2,20000.00,'2023-12-18 12:50:22','2023-12-22 21:42:57',1,2),(3,'test 100','test 100',55,2018,'mazda','xăng','test 100','test 100','test 100','test 100','https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1702905578844logo.png?alt=media&token=89b8c4a3-3a0c-40e3-92fd-fa5a60c39b0f',3,1500000.00,'2023-12-18 13:19:48','2023-12-23 03:27:59',1,2);
/*!40000 ALTER TABLE `rentals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'noactive',
  `image` varchar(255) DEFAULT 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com','0938283923','admin','$2b$10$Pm75d0k6MLN2DYy3dKajwOIrZl2.Pf9TfVFbN8Yn9bcYurojRwU2u','isAdmin',NULL,'https://firebasestorage.googleapis.com/v0/b/zalo-app-66612.appspot.com/o/1702905155458logo.png?alt=media&token=69dffca1-18e2-4fc6-a04c-9f33317ab1c0','2023-10-22 15:07:48','2023-12-22 08:56:52'),(2,'client@gmail.com','0123456789','client','$2b$10$mfMBh8ExBRKkI1ZB3nrzMeW9zlmNMXamNpophj7901msfpOzW5iHa','isUser','actived','https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png','2023-12-18 10:58:35','2023-12-18 10:58:35'),(12,'nam@gmail.com','1234567890','nam','$2b$10$5zcg7qq/R2Acqe7kIhQxXeduxCD0WMFcdfgyAC7eymLJI4oql7xWS','isUser','actived',NULL,'2023-12-18 12:33:03','2023-12-18 13:13:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-23 10:31:34
