SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

SET @coverage_map_column_was_missing := (
  SELECT COUNT(*) = 0 FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'coverage' AND COLUMN_NAME = 'map_url'
);
SET @sql := IF(
  @coverage_map_column_was_missing = 1,
  'ALTER TABLE coverage ADD COLUMN map_url VARCHAR(1000) NOT NULL DEFAULT '''' AFTER description',
  'SELECT 1'
);
PREPARE statement FROM @sql;
EXECUTE statement;
DEALLOCATE PREPARE statement;

UPDATE coverage
SET map_url = 'https://www.google.com/maps/d/viewer?mid=1L4SkzBboOM7GZyEKCoVC-qvy9J7QU1g&ll=-29.579942443027925%2C-50.71552340517935&z=13'
WHERE @coverage_map_column_was_missing = 1
  AND (map_url IS NULL OR map_url = '')
  AND region IN ('Alvorada/Viamão', 'Canoas/Cachoeirinha', 'Bagé', 'Igrejinha');
