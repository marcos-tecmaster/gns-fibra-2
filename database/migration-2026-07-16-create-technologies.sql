SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS technologies (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  name VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  availability VARCHAR(140) NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_technologies_slug (slug),
  INDEX idx_technologies_active_order (active, display_order, id)
) ENGINE=InnoDB;

INSERT INTO technologies (slug, icon, name, description, availability, active, display_order)
SELECT seed.slug, seed.icon, seed.name, seed.description, seed.availability, seed.active, seed.display_order
FROM (
  SELECT
    'fibra-optica' AS slug,
    'network' AS icon,
    'Fibra óptica' AS name,
    'Conexão de alta capacidade para residências e empresas.' AS description,
    'Conforme cobertura' AS availability,
    1 AS active,
    10 AS display_order
  UNION ALL
  SELECT
    'wifi',
    'wifi',
    'Wi-Fi',
    'Recursos definidos de acordo com o plano, equipamento e viabilidade técnica.',
    'Conforme o plano',
    1,
    20
  UNION ALL
  SELECT
    'rede-monitorada',
    'shield',
    'Rede monitorada',
    'Infraestrutura acompanhada para oferecer mais estabilidade e confiabilidade.',
    'Rede GNS Fibra',
    1,
    30
  UNION ALL
  SELECT
    'casa-empresa',
    'home',
    'Casa e empresa',
    'Soluções adaptadas para diferentes perfis de uso.',
    'Para cada rotina',
    1,
    40
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM technologies);
