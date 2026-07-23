SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS campaigns (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL,
  name VARCHAR(180) NOT NULL,
  eyebrow VARCHAR(80) NOT NULL DEFAULT '',
  headline VARCHAR(220) NOT NULL,
  description TEXT NOT NULL,
  terms TEXT NULL,
  image_path VARCHAR(500) NULL,
  image_alt VARCHAR(180) NOT NULL DEFAULT '',
  cta_label VARCHAR(100) NOT NULL,
  cta_url VARCHAR(1000) NOT NULL,
  starts_on DATE NOT NULL,
  ends_on DATE NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 0,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_campaigns_slug (slug),
  INDEX idx_campaigns_public (
    active,
    starts_on,
    ends_on,
    display_order,
    id
  )
) ENGINE=InnoDB;