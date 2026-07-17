SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS stats (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL,
  value VARCHAR(60) NOT NULL,
  label VARCHAR(140) NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_stats_slug (slug),
  INDEX idx_stats_active_order (active, display_order, id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS differentials (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_differentials_slug (slug),
  INDEX idx_differentials_active_order (active, display_order, id)
) ENGINE=InnoDB;

INSERT INTO stats (slug, value, label, active, display_order)
SELECT seed.slug, seed.value, seed.label, seed.active, seed.display_order
FROM (
  SELECT 'anos-de-mercado' AS slug, '14+' AS value, 'Anos de mercado' AS label, 1 AS active, 10 AS display_order
  UNION ALL
  SELECT 'rede-fibra-optica', '100%', 'Rede em fibra óptica', 1, 20
  UNION ALL
  SELECT 'rede-monitorada', '24/H', 'Rede monitorada', 1, 30
  UNION ALL
  SELECT 'atendimento-proximo', 'Humanizado', 'Atendimento próximo', 1, 40
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM stats);

INSERT INTO differentials (slug, icon, title, description, active, display_order)
SELECT seed.slug, seed.icon, seed.title, seed.description, seed.active, seed.display_order
FROM (
  SELECT
    'fibra-ponta-a-ponta' AS slug,
    'wifi' AS icon,
    'Fibra de ponta a ponta' AS title,
    'Mais velocidade e estabilidade para todos os seus dispositivos.' AS description,
    1 AS active,
    10 AS display_order
  UNION ALL
  SELECT
    'alta-performance',
    'zap',
    'Alta performance',
    'Conexão preparada para streaming, games, trabalho e estudo.',
    1,
    20
  UNION ALL
  SELECT
    'suporte-humanizado',
    'headset',
    'Suporte humanizado',
    'Atendimento próximo, rápido e focado em resolver.',
    1,
    30
  UNION ALL
  SELECT
    'rede-confiavel',
    'shield',
    'Rede confiável',
    'Infraestrutura monitorada para manter sua rotina conectada.',
    1,
    40
  UNION ALL
  SELECT
    'casa-empresa',
    'home',
    'Casa e empresa',
    'Soluções adequadas para cada perfil de consumo.',
    1,
    50
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM differentials);
