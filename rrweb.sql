SET NAMES utf8;

DROP TABLE IF EXISTS `rrweb`;

CREATE TABLE `rrweb` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `uin` int(6) DEFAULT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `session` varchar(100) DEFAULT NULL,
  `data` text CHARACTER SET utf8 COLLATE utf8_bin,
  `startTime` int(11) DEFAULT NULL,
  `endTime` int(11) DEFAULT NULL,
  `updateTime` int(11) DEFAULT NULL,
  `is_use` int(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;