<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

require_once dirname(__DIR__) . '/config/database.php';
require_once dirname(__DIR__) . '/config/auth.php';

$username = trim((string) ($argv[1] ?? ''));
$name = trim((string) ($argv[2] ?? ''));

if ($username === '' || $name === '') {
    fwrite(STDERR, "Uso: php database/create-admin.php usuario \"Nome completo\"\n");
    exit(1);
}

fwrite(STDOUT, 'Senha temporária: ');
$password = trim((string) fgets(STDIN));
$validationError = validate_admin_password($password);
if ($validationError) {
    fwrite(STDERR, $validationError . PHP_EOL);
    exit(1);
}

$statement = db()->prepare(
    'INSERT INTO users (name, username, password_hash, must_change_password, active)
     VALUES (:name, :username, :password_hash, 1, 1)'
);
$statement->execute([
    'name' => mb_substr($name, 0, 150),
    'username' => mb_substr($username, 0, 100),
    'password_hash' => password_hash($password, PASSWORD_DEFAULT),
]);

fwrite(STDOUT, "Administrador criado. A troca de senha será exigida no primeiro login.\n");
