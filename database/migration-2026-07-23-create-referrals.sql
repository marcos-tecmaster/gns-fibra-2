SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS referrals (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

  referrer_name VARCHAR(180) NOT NULL,
  referrer_phone VARCHAR(30) NOT NULL,
  referrer_contract VARCHAR(100) NULL,

  referred_name VARCHAR(180) NOT NULL,
  referred_phone VARCHAR(30) NOT NULL,
  referred_city VARCHAR(120) NOT NULL,
  referred_neighborhood VARCHAR(150) NOT NULL,

  consent TINYINT(1) NOT NULL DEFAULT 0,
  consent_at DATETIME NOT NULL,
  privacy_version VARCHAR(30) NOT NULL DEFAULT '1.0',

  status VARCHAR(30) NOT NULL DEFAULT 'new',
  source VARCHAR(50) NOT NULL DEFAULT 'website',
  notes TEXT NULL,

  ip_hash CHAR(64) NOT NULL,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_referrals_status_created (
    status,
    created_at
  ),

  INDEX idx_referrals_referrer_phone (
    referrer_phone
  ),

  INDEX idx_referrals_referred_phone (
    referred_phone
  ),

  INDEX idx_referrals_ip_created (
    ip_hash,
    created_at
  )
) ENGINE=InnoDB;