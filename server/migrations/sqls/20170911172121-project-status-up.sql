ALTER TABLE `projects` ADD COLUMN (
  `status` int(11) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL, 
)