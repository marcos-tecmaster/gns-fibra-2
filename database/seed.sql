-- SEED INICIAL SEGURO
--
-- Importe este arquivo somente depois de selecionar o banco correto.
-- Ele nao cria nem escolhe o banco, nao apaga conteudo e nao redefine registros existentes.
-- Pode ser reexecutado: em banco populado, preserva todas as alteracoes feitas pelo painel.
-- Destina-se ao conteudo oficial de uma instalacao nova, nao a sincronizacao de producao.
-- Usuarios administrativos nao sao criados com senha padrao.
-- Execute `php database/create-admin.php usuario "Nome"` apos a instalacao.

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

START TRANSACTION;

-- `company_name` funciona como marcador persistente de instalacao inicializada.
-- Depois da primeira carga, nenhuma tabela e repopulada por este arquivo, mesmo
-- que todo o seu conteudo tenha sido removido posteriormente pelo painel.
SET @seed_is_initial_install := NOT EXISTS (
  SELECT 1 FROM settings WHERE setting_key = 'company_name'
);

INSERT INTO settings (setting_key, setting_value)
SELECT seed.setting_key, seed.setting_value
FROM (
  SELECT 'company_name' AS setting_key, 'GNS Fibra' AS setting_value
  UNION ALL SELECT 'whatsapp', 'https://wa.me/5508008008080'
  UNION ALL SELECT 'email', 'atendimento@giganetsul.com.br'
  UNION ALL SELECT 'address', 'R. João Lourenço Schaefer, 439 - Centro, Igrejinha - RS, 95650-000, Brasil'
  UNION ALL SELECT 'customer_portal_url', 'https://app.giganetsul.com.br/central_assinante_web/login'
  UNION ALL SELECT 'linktree_url', 'https://linktr.ee/gnsfibra_'
  UNION ALL SELECT 'facebook_url', 'https://facebook.com/giganetsul.alvorada'
  UNION ALL SELECT 'instagram_url', 'https://instagram.com/gns_fibra'
  UNION ALL SELECT 'coverage_map_url', 'https://www.google.com/maps/d/viewer?mid=1L4SkzBboOM7GZyEKCoVC-qvy9J7QU1g&ll=-29.579942443027925%2C-50.71552340517935&z=13'
  UNION ALL SELECT 'coverage_image_path', 'uploads/coverage/9d5a2f1e67396dc16b49e30550b02c52.jpg'
  UNION ALL SELECT 'hero_title', 'Internet que acompanha o ritmo da sua vida.'
  UNION ALL SELECT 'about_text', 'Conectando você ao Mundo🛜'
  UNION ALL SELECT 'years_in_market', '14'
  UNION ALL SELECT 'support_enabled', '1'
  UNION ALL SELECT 'support_eyebrow', 'ATENDIMENTO GNS FIBRA'
  UNION ALL SELECT 'support_title', 'Atendimento humano para ajudar você de verdade.'
  UNION ALL SELECT 'support_description', 'Seja para conhecer os planos, verificar sua conexão ou acessar os serviços de cliente, nossa equipe está pronta para orientar você.'
  UNION ALL SELECT 'support_button_label', 'Conhecer planos pelo WhatsApp'
  UNION ALL SELECT 'support_whatsapp_message', 'Olá! Quero conhecer os planos da GNS Fibra.'
  UNION ALL SELECT 'cta_enabled', '1'
  UNION ALL SELECT 'cta_eyebrow', 'VAMOS CONECTAR VOCÊ'
  UNION ALL SELECT 'cta_title', 'Pronto para falar com a GNS Fibra?'
  UNION ALL SELECT 'cta_description', 'Conte onde você mora ou trabalha e nossa equipe ajuda a verificar a cobertura e encontrar a opção adequada.'
  UNION ALL SELECT 'cta_button_label', 'Falar pelo WhatsApp'
  UNION ALL SELECT 'cta_whatsapp_message', 'Olá! Quero verificar a cobertura e conhecer os planos da GNS Fibra.'
  UNION ALL SELECT 'cta_background_image_path', 'uploads/cta/9c0d1bd3dbaafb209599ebdf3dbfccd3.jpg'
  UNION ALL SELECT 'history_enabled', '1'
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
WHERE @seed_is_initial_install = 1
  AND NOT EXISTS (
    SELECT 1 FROM settings existing_settings
    WHERE existing_settings.setting_key = seed.setting_key
  );

INSERT INTO plans (name, speed, unit, price, audience, benefits, payment_method, featured, active, display_order)
SELECT seed.name, seed.speed, seed.unit, seed.price, seed.audience, seed.benefits,
       seed.payment_method, seed.featured, seed.active, seed.display_order
FROM (
  SELECT 'START' AS name, '95' AS speed, 'MEGA' AS unit, 59.90 AS price,
         'Conexão essencial para o dia a dia' AS audience,
         JSON_ARRAY('1 ponto Wi-Fi', 'Atendimento humano e digital', 'Pagamento por boleto ou PIX') AS benefits,
         'Boleto ou PIX' AS payment_method, 0 AS featured, 1 AS active, 1 AS display_order
  UNION ALL
  SELECT 'PREMIUM', '300', 'MEGA', 79.90, 'Mais velocidade para sua rotina',
         JSON_ARRAY('1 ponto Wi-Fi 5', 'Atendimento humano e digital', 'Pagamento por boleto ou PIX'),
         'Boleto ou PIX', 0, 1, 2
  UNION ALL
  SELECT 'ULTRA', '600', 'MEGA', 99.90, 'Alta performance para toda a família',
         JSON_ARRAY('1 ponto Wi-Fi 5', 'Atendimento humano e digital', 'Pagamento por boleto ou PIX'),
         'Boleto ou PIX', 1, 1, 3
  UNION ALL
  SELECT 'SECURITY', '700', 'MEGA', 119.90, 'Internet e segurança em um só plano',
         JSON_ARRAY('1 ponto Wi-Fi 5', '1 câmera de segurança', 'Atendimento humano e digital', 'Pagamento por boleto ou PIX'),
         'Boleto ou PIX', 0, 1, 4
  UNION ALL
  SELECT 'EVOLUTION', '800', 'MEGA', 129.90, 'Performance para uso intenso',
         JSON_ARRAY('1 ponto Wi-Fi 5', 'Atendimento humano e digital', 'Cartão de crédito ou débito em conta'),
         'Cartão de crédito ou débito em conta', 0, 1, 5
  UNION ALL
  SELECT 'EXTREME', '1000', 'MEGA', 149.90, 'Velocidade máxima para sua conexão',
         JSON_ARRAY('1 ponto Wi-Fi 5', 'Atendimento humano e digital', 'Cartão de crédito ou débito em conta'),
         'Cartão de crédito ou débito em conta', 0, 1, 6
  UNION ALL
  SELECT 'EXTREME COMBO', '1000', 'MEGA', 199.90, 'O combo completo da GNS Fibra',
         JSON_ARRAY('1 ponto Wi-Fi 5', 'Atendimento humano e digital', 'Cartão de crédito ou débito em conta'),
         'Cartão de crédito ou débito em conta', 0, 1, 7
) AS seed
WHERE @seed_is_initial_install = 1
  AND NOT EXISTS (SELECT 1 FROM plans);

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
WHERE @seed_is_initial_install = 1
  AND NOT EXISTS (SELECT 1 FROM stats);

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
WHERE @seed_is_initial_install = 1
  AND NOT EXISTS (SELECT 1 FROM differentials);

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
    'Espaço preparado para fotos dos veículos de atendimento.',
    NULL,
    'Nossa frota',
    1,
    30
) AS seed
WHERE @seed_is_initial_install = 1
  AND NOT EXISTS (SELECT 1 FROM history_gallery);

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
WHERE @seed_is_initial_install = 1
  AND NOT EXISTS (SELECT 1 FROM benefits);

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
WHERE @seed_is_initial_install = 1
  AND NOT EXISTS (SELECT 1 FROM technologies);

INSERT INTO coverage (region, description, map_url, active, display_order)
SELECT seed.region, seed.description, seed.map_url, seed.active, seed.display_order
FROM (
  SELECT 'Alvorada/Porto Alegre/Viamão' AS region,
         'Ponto de atendimento e cobertura regional.' AS description,
         'https://maps.app.goo.gl/pAwaHUgwf1KyETC87' AS map_url,
         1 AS active, 1 AS display_order
  UNION ALL
  SELECT 'Canoas/Cachoeirinha/Gravataí', 'Ponto de atendimento e cobertura regional.',
         'https://maps.app.goo.gl/bKhzYgLAxssgNbu4A', 1, 2
  UNION ALL
  SELECT 'Bagé', 'Ponto de atendimento e cobertura regional.',
         'https://maps.app.goo.gl/soZbyam4ZMgpJVew5', 1, 3
  UNION ALL
  SELECT 'Igrejinha/Três Coroas/Parobé/Sapiranga/Campo Bom', 'Sede e ponto de atendimento principal.',
         'https://maps.app.goo.gl/8StgicPHqyXtJMvr5', 1, 4
) AS seed
WHERE @seed_is_initial_install = 1
  AND NOT EXISTS (SELECT 1 FROM coverage);

INSERT INTO testimonials (customer_name, testimonial_text, city, active, display_order)
SELECT seed.customer_name, seed.testimonial_text, seed.city, seed.active, seed.display_order
FROM (
  SELECT 'Carlos Mendes' AS customer_name,
         'Migrei minha empresa para a GNS Fibra e a diferença foi imediata. Estabilidade e suporte sempre disponíveis.' AS testimonial_text,
         'Igrejinha' AS city, 1 AS active, 1 AS display_order
  UNION ALL
  SELECT 'Juliana Ribeiro', 'Trabalho de casa há anos. Desde que assinei a GNS, minhas reuniões e entregas ficaram muito mais tranquilas.', 'Canoas', 1, 2
  UNION ALL
  SELECT 'Roberto Almeida', 'A família inteira usa a internet ao mesmo tempo e a conexão continua estável. Foi uma mudança excelente.', 'Alvorada', 1, 3
  UNION ALL
  SELECT 'Patrícia Souza', 'Atendimento humanizado de verdade. Quando preciso, falo com uma equipe que entende e resolve.', 'Bagé', 1, 4
) AS seed
WHERE @seed_is_initial_install = 1
  AND NOT EXISTS (SELECT 1 FROM testimonials);

INSERT INTO banners (title, subtitle, image_path, button_text, button_url, active, display_order)
SELECT seed.title, seed.subtitle, seed.image_path, seed.button_text, seed.button_url, seed.active, seed.display_order
FROM (
  SELECT 'Internet que acompanha o ritmo da sua vida.' AS title,
         'Há mais de 14 anos conectando famílias e empresas.' AS subtitle,
         'uploads/banners/aa600cfdc6e7513743ae73286e957a93.jpg' AS image_path,
         'Consultar disponibilidade' AS button_text,
         'https://wa.me/5508008008080' AS button_url,
         1 AS active, 1 AS display_order
) AS seed
WHERE @seed_is_initial_install = 1
  AND NOT EXISTS (SELECT 1 FROM banners);

INSERT INTO faqs (question, answer, active, display_order)
SELECT seed.question, seed.answer, seed.active, seed.display_order
FROM (
  SELECT 'Como contratar um plano da GNS Fibra?' AS question,
         'Entre em contato pelo WhatsApp. A equipe verifica a disponibilidade no endereço e orienta sobre os planos adequados para sua rotina.' AS answer,
         1 AS active, 10 AS display_order
  UNION ALL
  SELECT 'Como verifico a cobertura no meu endereço?', 'Use a área de cobertura do site ou envie seu endereço pelo WhatsApp para a equipe verificar a disponibilidade técnica.', 1, 20
  UNION ALL
  SELECT 'A GNS Fibra possui atendimento para empresas?', 'Sim. A GNS Fibra oferece soluções para residências e empresas. Entre em contato para avaliar a necessidade e a disponibilidade no local.', 1, 30
  UNION ALL
  SELECT 'Onde acesso a Central do Assinante?', 'A Central do Assinante pode ser acessada pelo botão disponível no menu e nas áreas de atendimento do site.', 1, 40
  UNION ALL
  SELECT 'Como solicito atendimento sendo cliente?', 'Use o WhatsApp, telefone ou Central do Assinante apresentados no site para entrar em contato com a equipe.', 1, 50
  UNION ALL
  SELECT 'A instalação depende de análise técnica?', 'Sim. A contratação e a instalação dependem da cobertura e da viabilidade técnica no endereço informado.', 1, 60
  UNION ALL
  SELECT 'Quais são as formas de pagamento?', 'As formas disponíveis podem variar conforme o plano e a condição comercial. Consulte a equipe antes da contratação.', 1, 70
) AS seed
WHERE @seed_is_initial_install = 1
  AND NOT EXISTS (SELECT 1 FROM faqs);

COMMIT;
