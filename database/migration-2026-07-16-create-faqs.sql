SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS faqs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(255) NOT NULL,
  answer TEXT NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_faqs_active_order (active, display_order, id)
) ENGINE=InnoDB;

INSERT INTO faqs (question, answer, active, display_order)
SELECT seed.question, seed.answer, seed.active, seed.display_order
FROM (
  SELECT
    'Como contratar um plano da GNS Fibra?' AS question,
    'Entre em contato pelo WhatsApp. A equipe verifica a disponibilidade no endereço e orienta sobre os planos adequados para sua rotina.' AS answer,
    1 AS active,
    10 AS display_order
  UNION ALL
  SELECT
    'Como verifico a cobertura no meu endereço?',
    'Use a área de cobertura do site ou envie seu endereço pelo WhatsApp para a equipe verificar a disponibilidade técnica.',
    1,
    20
  UNION ALL
  SELECT
    'A GNS Fibra possui atendimento para empresas?',
    'Sim. A GNS Fibra oferece soluções para residências e empresas. Entre em contato para avaliar a necessidade e a disponibilidade no local.',
    1,
    30
  UNION ALL
  SELECT
    'Onde acesso a Central do Assinante?',
    'A Central do Assinante pode ser acessada pelo botão disponível no menu e nas áreas de atendimento do site.',
    1,
    40
  UNION ALL
  SELECT
    'Como solicito atendimento sendo cliente?',
    'Use o WhatsApp, telefone ou Central do Assinante apresentados no site para entrar em contato com a equipe.',
    1,
    50
  UNION ALL
  SELECT
    'A instalação depende de análise técnica?',
    'Sim. A contratação e a instalação dependem da cobertura e da viabilidade técnica no endereço informado.',
    1,
    60
  UNION ALL
  SELECT
    'Quais são as formas de pagamento?',
    'As formas disponíveis podem variar conforme o plano e a condição comercial. Consulte a equipe antes da contratação.',
    1,
    70
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM faqs);
