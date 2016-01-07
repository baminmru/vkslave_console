
delimiter $$

CREATE TABLE `bp3_favorites` (
  `instanceid` binary(16) DEFAULT NULL,
  `session` binary(16) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  UNIQUE KEY `UK_bp3_favorites` (`session`,`instanceid`),
  KEY `IX_bp3_favorites_instanceid` (`instanceid`),
  KEY `UK_bp3_favorites_session` (`session`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
$$

