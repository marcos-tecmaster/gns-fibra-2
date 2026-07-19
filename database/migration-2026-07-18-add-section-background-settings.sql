SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO settings (setting_key, setting_value)
SELECT seed.setting_key, seed.setting_value
FROM (
  SELECT 'coverage_image_path' AS setting_key, '' AS setting_value
  UNION ALL
  SELECT 'cta_background_image_path', ''
) AS seed
WHERE NOT EXISTS (
  SELECT 1 FROM settings WHERE settings.setting_key = seed.setting_key
);
