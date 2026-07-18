SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS history_gallery (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  image_path VARCHAR(500) NULL,
  image_alt VARCHAR(180) NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_history_gallery_slug (slug),
  INDEX idx_history_gallery_active_order (active, display_order, id)
) ENGINE=InnoDB;

INSERT INTO settings (setting_key, setting_value)
SELECT seed.setting_key, seed.setting_value
FROM (
  SELECT 'history_enabled' AS setting_key, '1' AS setting_value
  UNION ALL SELECT 'history_eyebrow', 'Quem somos'
  UNION ALL SELECT 'history_title', 'Nossa'
  UNION ALL SELECT 'history_title_highlight', 'História'
  UNION ALL SELECT 'history_description', 'Há mais de 14 anos conectando famílias e empresas com fibra óptica, estabilidade e atendimento humano.'
  UNION ALL SELECT 'history_secondary_text', 'Nossa trajetória é construída diariamente por uma equipe que conhece a região, investe em infraestrutura e entende que conexão de qualidade também depende de atendimento humano.'
  UNION ALL SELECT 'history_experience_suffix', '+ anos'
  UNION ALL SELECT 'history_experience_label', 'de experiência'
  UNION ALL SELECT 'history_team_title', 'Equipe local'
  UNION ALL SELECT 'history_team_description', 'próxima do cliente'
) AS seed
WHERE NOT EXISTS (
  SELECT 1 FROM settings WHERE settings.setting_key = seed.setting_key
);

INSERT INTO history_gallery (slug, title, description, image_path, image_alt, active, display_order)
SELECT seed.slug, seed.title, seed.description, seed.image_path, seed.image_alt, seed.active, seed.display_order
FROM (
  SELECT
    'estrutura' AS slug,
    'Estrutura' AS title,
    'Infraestrutura e equipamentos que sustentam nossa operação.' AS description,
    'uploads/history/install.jpg' AS image_path,
    'Estrutura' AS image_alt,
    1 AS active,
    10 AS display_order
  UNION ALL
  SELECT
    'equipe',
    'Nossa equipe',
    'Profissionais próximos, preparados para orientar e atender você.',
    NULL,
    'Nossa equipe',
    1,
    20
  UNION ALL
  SELECT
    'frota',
    'Nossa frota',
    'Estrutura de atendimento para acompanhar nossa área de cobertura.',
    NULL,
    'Nossa frota',
    1,
    30
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM history_gallery);
