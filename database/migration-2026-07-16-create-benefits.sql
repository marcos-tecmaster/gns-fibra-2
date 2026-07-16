SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS benefits (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  cta_label VARCHAR(120) NULL,
  cta_href VARCHAR(500) NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_benefits_slug (slug),
  INDEX idx_benefits_active_order (active, display_order, id)
) ENGINE=InnoDB;

INSERT INTO benefits (slug, icon, title, description, cta_label, cta_href, active, display_order)
SELECT seed.slug, seed.icon, seed.title, seed.description, seed.cta_label, seed.cta_href, seed.active, seed.display_order
FROM (
  SELECT
    'wifi-incluso' AS slug,
    'wifi' AS icon,
    'Wi-Fi para conectar seus dispositivos' AS title,
    'Equipamentos e recursos definidos conforme o plano contratado e a viabilidade técnica.' AS description,
    NULL AS cta_label,
    NULL AS cta_href,
    1 AS active,
    10 AS display_order
  UNION ALL
  SELECT
    'atendimento-humano',
    'headset',
    'Atendimento próximo e humanizado',
    'Uma equipe preparada para orientar você na contratação, instalação e uso dos serviços.',
    NULL,
    NULL,
    1,
    20
  UNION ALL
  SELECT
    'pagamento-flexivel',
    'credit-card',
    'Pagamento com praticidade',
    'Consulte as formas de pagamento disponíveis para o plano escolhido.',
    NULL,
    NULL,
    1,
    30
  UNION ALL
  SELECT
    'camera-seguranca',
    'camera',
    'Mais segurança para sua rotina',
    'Alguns planos podem incluir recursos adicionais de segurança. Consulte as condições disponíveis.',
    NULL,
    NULL,
    1,
    40
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM benefits);
