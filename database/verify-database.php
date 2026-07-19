<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

require_once dirname(__DIR__) . '/config/database.php';

function verification_connection(array $arguments): PDO
{
    if (count($arguments) === 1) {
        return db();
    }

    if (count($arguments) !== 2 || !str_starts_with($arguments[1], '--database=')) {
        throw new InvalidArgumentException('Uso: php database/verify-database.php [--database=NOME]');
    }

    $databaseName = substr($arguments[1], strlen('--database='));
    if ($databaseName === '' || preg_match('/^[a-zA-Z0-9_-]{1,64}$/', $databaseName) !== 1) {
        throw new InvalidArgumentException('Nome de banco invalido.');
    }

    $localConfigFile = dirname(__DIR__) . '/config/database.local.php';
    if (!is_file($localConfigFile)) {
        throw new RuntimeException('O override CLI requer config/database.local.php.');
    }

    $config = require $localConfigFile;
    if (!is_array($config)) {
        throw new RuntimeException('A configuracao local do banco e invalida.');
    }
    foreach (['host', 'port', 'user', 'pass'] as $key) {
        if (!array_key_exists($key, $config)) {
            throw new RuntimeException('A configuracao local do banco esta incompleta.');
        }
    }

    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
        $config['host'],
        $config['port'],
        $databaseName
    );

    return new PDO($dsn, (string) $config['user'], (string) $config['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
}

const EXPECTED_TABLES = [
    'banners',
    'benefits',
    'coverage',
    'differentials',
    'faqs',
    'history_gallery',
    'login_attempts',
    'plans',
    'settings',
    'stats',
    'technologies',
    'testimonials',
    'users',
];

const REQUIRED_COLUMNS = [
    'banners' => ['id', 'title', 'subtitle', 'image_path', 'button_text', 'button_url', 'active', 'display_order'],
    'benefits' => ['id', 'slug', 'icon', 'title', 'description', 'cta_label', 'cta_href', 'active', 'display_order'],
    'coverage' => ['id', 'region', 'description', 'map_url', 'active', 'display_order'],
    'differentials' => ['id', 'slug', 'icon', 'title', 'description', 'active', 'display_order'],
    'faqs' => ['id', 'question', 'answer', 'active', 'display_order'],
    'history_gallery' => ['id', 'slug', 'title', 'description', 'image_path', 'image_alt', 'active', 'display_order'],
    'login_attempts' => ['id', 'ip_address', 'username', 'successful', 'attempted_at'],
    'plans' => ['id', 'name', 'speed', 'unit', 'price', 'audience', 'benefits', 'payment_method', 'featured', 'active', 'display_order'],
    'settings' => ['id', 'setting_key', 'setting_value'],
    'stats' => ['id', 'slug', 'value', 'label', 'active', 'display_order'],
    'technologies' => ['id', 'slug', 'icon', 'name', 'description', 'availability', 'active', 'display_order'],
    'testimonials' => ['id', 'customer_name', 'testimonial_text', 'city', 'active', 'display_order'],
    'users' => ['id', 'name', 'username', 'password_hash', 'must_change_password', 'password_changed_at', 'active'],
];

const REQUIRED_INDEXES = [
    'banners' => ['PRIMARY', 'idx_banners_public'],
    'benefits' => ['PRIMARY', 'uq_benefits_slug', 'idx_benefits_active_order'],
    'coverage' => ['PRIMARY', 'idx_coverage_public'],
    'differentials' => ['PRIMARY', 'uq_differentials_slug', 'idx_differentials_active_order'],
    'faqs' => ['PRIMARY', 'idx_faqs_active_order'],
    'history_gallery' => ['PRIMARY', 'uq_history_gallery_slug', 'idx_history_gallery_active_order'],
    'login_attempts' => ['PRIMARY', 'idx_login_rate_limit'],
    'plans' => ['PRIMARY', 'idx_plans_public'],
    'settings' => ['PRIMARY', 'setting_key'],
    'stats' => ['PRIMARY', 'uq_stats_slug', 'idx_stats_active_order'],
    'technologies' => ['PRIMARY', 'uq_technologies_slug', 'idx_technologies_active_order'],
    'testimonials' => ['PRIMARY', 'idx_testimonials_public'],
    'users' => ['PRIMARY', 'username'],
];

const REQUIRED_SETTINGS = [
    'company_name', 'whatsapp', 'email', 'address', 'customer_portal_url', 'linktree_url',
    'facebook_url', 'instagram_url', 'coverage_map_url', 'coverage_image_path', 'hero_title',
    'about_text', 'years_in_market', 'support_enabled', 'support_eyebrow', 'support_title',
    'support_description', 'support_button_label', 'support_whatsapp_message', 'cta_enabled',
    'cta_eyebrow', 'cta_title', 'cta_description', 'cta_button_label', 'cta_whatsapp_message',
    'cta_background_image_path', 'history_enabled', 'history_eyebrow', 'history_title',
    'history_title_highlight', 'history_description', 'history_secondary_text',
    'history_experience_suffix', 'history_experience_label', 'history_team_title',
    'history_team_description',
];

function report_failure(string $message, int &$failures): void
{
    ++$failures;
    fwrite(STDOUT, "[FALHA] {$message}" . PHP_EOL);
}

function report_success(string $message): void
{
    fwrite(STDOUT, "[OK] {$message}" . PHP_EOL);
}

try {
    $pdo = verification_connection($argv);
    $failures = 0;
    $databaseName = (string) $pdo->query('SELECT DATABASE()')->fetchColumn();

    if ($databaseName === '') {
        report_failure('Nenhum banco esta selecionado.', $failures);
    } else {
        report_success("Banco selecionado: {$databaseName}");
    }

    $tableRows = $pdo->query(
        'SELECT TABLE_NAME, ENGINE, TABLE_COLLATION
         FROM information_schema.TABLES
         WHERE TABLE_SCHEMA = DATABASE()'
    )->fetchAll();
    $tables = [];
    foreach ($tableRows as $row) {
        $tables[(string) $row['TABLE_NAME']] = $row;
    }

    foreach (EXPECTED_TABLES as $table) {
        if (!isset($tables[$table])) {
            report_failure("Tabela ausente: {$table}", $failures);
            continue;
        }
        if (strtoupper((string) $tables[$table]['ENGINE']) !== 'INNODB') {
            report_failure("Engine inesperada em {$table}", $failures);
        }
        if (!str_starts_with(strtolower((string) $tables[$table]['TABLE_COLLATION']), 'utf8mb4_')) {
            report_failure("Collation nao utf8mb4 em {$table}", $failures);
        }
    }
    report_success(count(array_intersect(EXPECTED_TABLES, array_keys($tables))) . '/13 tabelas obrigatorias encontradas.');

    $columnRows = $pdo->query(
        'SELECT TABLE_NAME, COLUMN_NAME
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE()'
    )->fetchAll();
    $columns = [];
    foreach ($columnRows as $row) {
        $columns[(string) $row['TABLE_NAME']][] = (string) $row['COLUMN_NAME'];
    }
    foreach (REQUIRED_COLUMNS as $table => $requiredColumns) {
        foreach ($requiredColumns as $column) {
            if (!in_array($column, $columns[$table] ?? [], true)) {
                report_failure("Coluna ausente: {$table}.{$column}", $failures);
            }
        }
    }

    $indexRows = $pdo->query(
        'SELECT DISTINCT TABLE_NAME, INDEX_NAME
         FROM information_schema.STATISTICS
         WHERE TABLE_SCHEMA = DATABASE()'
    )->fetchAll();
    $indexes = [];
    foreach ($indexRows as $row) {
        $indexes[(string) $row['TABLE_NAME']][] = (string) $row['INDEX_NAME'];
    }
    foreach (REQUIRED_INDEXES as $table => $requiredIndexes) {
        foreach ($requiredIndexes as $index) {
            if (!in_array($index, $indexes[$table] ?? [], true)) {
                report_failure("Indice ausente: {$table}.{$index}", $failures);
            }
        }
    }
    if ($failures === 0) {
        report_success('Colunas e indices essenciais conferidos.');
    }

    $settingKeys = isset($tables['settings'])
        ? $pdo->query('SELECT setting_key FROM settings')->fetchAll(PDO::FETCH_COLUMN)
        : [];
    foreach (REQUIRED_SETTINGS as $settingKey) {
        if (!in_array($settingKey, $settingKeys, true)) {
            report_failure("Setting ausente: {$settingKey}", $failures);
        }
    }
    report_success(count(array_intersect(REQUIRED_SETTINGS, $settingKeys)) . '/36 settings obrigatorias encontradas.');

    foreach (EXPECTED_TABLES as $table) {
        if (!isset($tables[$table])) {
            continue;
        }
        $count = (int) $pdo->query("SELECT COUNT(*) FROM `{$table}`")->fetchColumn();
        fwrite(STDOUT, sprintf("[CONTAGEM] %-20s %d", $table, $count) . PHP_EOL);
    }

    $uploadReferences = [];
    if (isset($tables['banners'])) {
        foreach ($pdo->query("SELECT image_path FROM banners WHERE image_path IS NOT NULL AND image_path <> ''")->fetchAll(PDO::FETCH_COLUMN) as $path) {
            $uploadReferences[] = (string) $path;
        }
    }
    if (isset($tables['history_gallery'])) {
        foreach ($pdo->query("SELECT image_path FROM history_gallery WHERE image_path IS NOT NULL AND image_path <> ''")->fetchAll(PDO::FETCH_COLUMN) as $path) {
            $uploadReferences[] = (string) $path;
        }
    }
    $uploadSettings = isset($tables['settings'])
        ? $pdo->query(
            "SELECT setting_value FROM settings
             WHERE setting_key IN ('coverage_image_path', 'cta_background_image_path')
               AND setting_value <> ''"
        )->fetchAll(PDO::FETCH_COLUMN)
        : [];
    foreach ($uploadSettings as $path) {
        $uploadReferences[] = (string) $path;
    }

    foreach (array_values(array_unique($uploadReferences)) as $path) {
        $normalized = str_replace('\\', '/', $path);
        $valid = str_starts_with($normalized, 'uploads/')
            && !str_contains($normalized, '..')
            && is_file(dirname(__DIR__) . '/' . $normalized);
        if (!$valid) {
            report_failure("Referencia de upload invalida ou ausente: {$normalized}", $failures);
        } else {
            report_success("Upload referenciado: {$normalized}");
        }
    }

    if ($failures > 0) {
        fwrite(STDOUT, "Verificacao reprovada: {$failures} divergencia(s)." . PHP_EOL);
        exit(2);
    }

    fwrite(STDOUT, 'Verificacao aprovada.' . PHP_EOL);
    exit(0);
} catch (Throwable) {
    fwrite(STDERR, 'Falha ao verificar o banco. Revise a configuracao e a disponibilidade do servidor.' . PHP_EOL);
    exit(3);
}
