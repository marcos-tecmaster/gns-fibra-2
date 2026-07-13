SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gns_fibra;

SET @has_must_change := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'must_change_password'
);
SET @sql := IF(
  @has_must_change = 0,
  'ALTER TABLE users ADD COLUMN must_change_password TINYINT(1) NOT NULL DEFAULT 1 AFTER password_hash',
  'SELECT 1'
);
PREPARE statement FROM @sql;
EXECUTE statement;
DEALLOCATE PREPARE statement;

SET @has_password_changed := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'password_changed_at'
);
SET @sql := IF(
  @has_password_changed = 0,
  'ALTER TABLE users ADD COLUMN password_changed_at TIMESTAMP NULL DEFAULT NULL AFTER must_change_password',
  'SELECT 1'
);
PREPARE statement FROM @sql;
EXECUTE statement;
DEALLOCATE PREPARE statement;

CREATE TABLE IF NOT EXISTS login_attempts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ip_address VARCHAR(45) NOT NULL,
  username VARCHAR(100) NOT NULL,
  successful TINYINT(1) NOT NULL DEFAULT 0,
  attempted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_login_rate_limit (ip_address, username, successful, attempted_at)
) ENGINE=InnoDB;

UPDATE users
SET must_change_password = 1
WHERE username = 'admin';
