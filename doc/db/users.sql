USE ledayin;

SHOW CREATE TABLE user;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '系统生成，内部使用',
  `phone` varchar(16) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '手机号, 可作为用户名登陆',
  `password` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户密码',
  `avatarUrl` varchar(256) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '头像 URL',
  `name` varchar(32) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '姓名',
  `gender` int(2) DEFAULT NULL COMMENT '1: 男，2：女',
  `birthday` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '生日',
  `lastLoginTime` datetime DEFAULT NULL,
  `lastLoginIp` varchar(16) COLLATE utf8mb4_bin DEFAULT NULL,
  `creationTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '记录数据的状态，0或 NULL：无状态，1：已删除（回收站），2：待清理，通常就0，1就好。',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

SELECT *
FROM user;
