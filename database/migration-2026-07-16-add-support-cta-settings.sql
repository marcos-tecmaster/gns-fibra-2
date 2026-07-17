SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO settings (setting_key, setting_value)
SELECT seed.setting_key, seed.setting_value
FROM (
  SELECT 'support_enabled' AS setting_key, '1' AS setting_value
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
) AS seed
WHERE NOT EXISTS (
  SELECT 1
  FROM settings existing_settings
  WHERE existing_settings.setting_key = seed.setting_key
);
