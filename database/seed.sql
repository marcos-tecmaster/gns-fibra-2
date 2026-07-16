SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

USE gns_fibra;

-- Usuários administrativos não são criados com senha padrão.
-- Execute `php database/create-admin.php usuario "Nome"` após importar este arquivo.

INSERT INTO settings (setting_key, setting_value) VALUES
('company_name', 'GNS Fibra'),
('whatsapp', 'https://wa.me/5508008008080'),
('email', 'atendimento@giganetsul.com.br'),
('address', 'R. João Lourenço Schaefer, 439 - Centro, Igrejinha - RS, 95650-000, Brasil'),
('customer_portal_url', 'https://app.giganetsul.com.br/central_assinante_web/login'),
('linktree_url', 'https://linktr.ee/gnsfibra_'),
('facebook_url', ''),
('instagram_url', ''),
('coverage_map_url', 'https://www.google.com/maps/d/viewer?mid=1L4SkzBboOM7GZyEKCoVC-qvy9J7QU1g&ll=-29.579942443027925%2C-50.71552340517935&z=13'),
('hero_title', 'Internet que acompanha o ritmo da sua vida.'),
('about_text', 'Há mais de 14 anos conectando famílias e empresas com fibra óptica, estabilidade e atendimento humano.'),
('years_in_market', '14')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

DELETE FROM banners;
DELETE FROM faqs;
DELETE FROM testimonials;
DELETE FROM coverage;
DELETE FROM plans;

INSERT INTO plans (name, speed, unit, price, audience, benefits, payment_method, featured, active, display_order) VALUES
('START', '95', 'MEGA', 59.90, 'Conexão essencial para o dia a dia', JSON_ARRAY('1 ponto Wi-Fi', 'Atendimento humano e digital', 'Pagamento por boleto ou PIX'), 'Boleto ou PIX', 0, 1, 1),
('PREMIUM', '300', 'MEGA', 79.90, 'Mais velocidade para sua rotina', JSON_ARRAY('1 ponto Wi-Fi 5', 'Atendimento humano e digital', 'Pagamento por boleto ou PIX'), 'Boleto ou PIX', 0, 1, 2),
('ULTRA', '600', 'MEGA', 99.90, 'Alta performance para toda a família', JSON_ARRAY('1 ponto Wi-Fi 5', 'Atendimento humano e digital', 'Pagamento por boleto ou PIX'), 'Boleto ou PIX', 1, 1, 3),
('SECURITY', '700', 'MEGA', 119.90, 'Internet e segurança em um só plano', JSON_ARRAY('1 ponto Wi-Fi 5', '1 câmera de segurança', 'Atendimento humano e digital', 'Pagamento por boleto ou PIX'), 'Boleto ou PIX', 0, 1, 4),
('EVOLUTION', '800', 'MEGA', 129.90, 'Performance para uso intenso', JSON_ARRAY('1 ponto Wi-Fi 5', 'Atendimento humano e digital', 'Cartão de crédito ou débito em conta'), 'Cartão de crédito ou débito em conta', 0, 1, 5),
('EXTREME', '1000', 'MEGA', 149.90, 'Velocidade máxima para sua conexão', JSON_ARRAY('1 ponto Wi-Fi 5', 'Atendimento humano e digital', 'Cartão de crédito ou débito em conta'), 'Cartão de crédito ou débito em conta', 0, 1, 6),
('EXTREME COMBO', '1000', 'MEGA', 199.90, 'O combo completo da GNS Fibra', JSON_ARRAY('1 ponto Wi-Fi 5', 'Atendimento humano e digital', 'Cartão de crédito ou débito em conta'), 'Cartão de crédito ou débito em conta', 0, 1, 7);

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

INSERT INTO coverage (region, description, map_url, active, display_order) VALUES
('Alvorada/Viamão', 'Ponto de atendimento e cobertura regional.', 'https://www.google.com/maps/d/viewer?mid=1L4SkzBboOM7GZyEKCoVC-qvy9J7QU1g&ll=-29.579942443027925%2C-50.71552340517935&z=13', 1, 1),
('Canoas/Cachoeirinha', 'Ponto de atendimento e cobertura regional.', 'https://www.google.com/maps/d/viewer?mid=1L4SkzBboOM7GZyEKCoVC-qvy9J7QU1g&ll=-29.579942443027925%2C-50.71552340517935&z=13', 1, 2),
('Bagé', 'Ponto de atendimento e cobertura regional.', 'https://www.google.com/maps/d/viewer?mid=1L4SkzBboOM7GZyEKCoVC-qvy9J7QU1g&ll=-29.579942443027925%2C-50.71552340517935&z=13', 1, 3),
('Igrejinha', 'Sede e ponto de atendimento principal.', 'https://www.google.com/maps/d/viewer?mid=1L4SkzBboOM7GZyEKCoVC-qvy9J7QU1g&ll=-29.579942443027925%2C-50.71552340517935&z=13', 1, 4);

INSERT INTO testimonials (customer_name, testimonial_text, city, active, display_order) VALUES
('Carlos Mendes', 'Migrei minha empresa para a GNS Fibra e a diferença foi imediata. Estabilidade e suporte sempre disponíveis.', 'Igrejinha', 1, 1),
('Juliana Ribeiro', 'Trabalho de casa há anos. Desde que assinei a GNS, minhas reuniões e entregas ficaram muito mais tranquilas.', 'Canoas', 1, 2),
('Roberto Almeida', 'A família inteira usa a internet ao mesmo tempo e a conexão continua estável. Foi uma mudança excelente.', 'Alvorada', 1, 3),
('Patrícia Souza', 'Atendimento humanizado de verdade. Quando preciso, falo com uma equipe que entende e resolve.', 'Bagé', 1, 4);

INSERT INTO banners (title, subtitle, image_path, button_text, button_url, active, display_order) VALUES
('Internet que acompanha o ritmo da sua vida.', 'Há mais de 14 anos conectando famílias e empresas.', NULL, 'Consultar disponibilidade', 'https://wa.me/5508008008080', 1, 1);

INSERT INTO faqs (question, answer, active, display_order) VALUES
('Como contratar um plano da GNS Fibra?', 'Entre em contato pelo WhatsApp. A equipe verifica a disponibilidade no endereço e orienta sobre os planos adequados para sua rotina.', 1, 10),
('Como verifico a cobertura no meu endereço?', 'Use a área de cobertura do site ou envie seu endereço pelo WhatsApp para a equipe verificar a disponibilidade técnica.', 1, 20),
('A GNS Fibra possui atendimento para empresas?', 'Sim. A GNS Fibra oferece soluções para residências e empresas. Entre em contato para avaliar a necessidade e a disponibilidade no local.', 1, 30),
('Onde acesso a Central do Assinante?', 'A Central do Assinante pode ser acessada pelo botão disponível no menu e nas áreas de atendimento do site.', 1, 40),
('Como solicito atendimento sendo cliente?', 'Use o WhatsApp, telefone ou Central do Assinante apresentados no site para entrar em contato com a equipe.', 1, 50),
('A instalação depende de análise técnica?', 'Sim. A contratação e a instalação dependem da cobertura e da viabilidade técnica no endereço informado.', 1, 60),
('Quais são as formas de pagamento?', 'As formas disponíveis podem variar conforme o plano e a condição comercial. Consulte a equipe antes da contratação.', 1, 70);
