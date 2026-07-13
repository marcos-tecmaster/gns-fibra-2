<?php
declare(strict_types=1);

function db(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $config = [
        'environment' => getenv('GNS_APP_ENV') ?: null,
        'host' => getenv('GNS_DB_HOST') ?: null,
        'port' => getenv('GNS_DB_PORT') ?: null,
        'name' => getenv('GNS_DB_NAME') ?: null,
        'user' => getenv('GNS_DB_USER') ?: null,
        'pass' => getenv('GNS_DB_PASS'),
    ];

    $localConfigFile = __DIR__ . '/database.local.php';
    if (is_file($localConfigFile)) {
        $localConfig = require $localConfigFile;
        if (!is_array($localConfig)) {
            throw new RuntimeException('A configuração local do banco é inválida.');
        }
        $config = array_merge($config, $localConfig);
    }

    foreach (['environment', 'host', 'port', 'name', 'user', 'pass'] as $key) {
        if (!array_key_exists($key, $config) || $config[$key] === null) {
            throw new RuntimeException(
                'Banco não configurado. Defina as variáveis GNS_DB_* ou crie config/database.local.php.'
            );
        }
    }

    if (
        ($config['user'] === 'root' || $config['pass'] === '') &&
        strtolower((string) $config['environment']) === 'production'
    ) {
        throw new RuntimeException('Credenciais de banco inseguras não são permitidas em produção.');
    }

    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
        $config['host'],
        $config['port'],
        $config['name']
    );

    $pdo = new PDO($dsn, (string) $config['user'], (string) $config['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}
