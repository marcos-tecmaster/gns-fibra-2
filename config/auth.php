<?php
declare(strict_types=1);

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_name('gns_admin_session');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function h(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function redirect(string $path): never
{
    header('Location: ' . $path);
    exit;
}

function is_logged_in(): bool
{
    return isset($_SESSION['admin_user_id']);
}

function require_auth(): void
{
    if (!is_logged_in()) {
        flash('error', 'Faça login para acessar o painel.');
        redirect('login.php');
    }

    if (admin_requires_password_change() && basename($_SERVER['SCRIPT_NAME'] ?? '') !== 'trocar-senha.php') {
        redirect('trocar-senha.php');
    }
}

function login_user(array $user): void
{
    session_regenerate_id(true);
    $_SESSION['admin_user_id'] = (int) $user['id'];
    $_SESSION['admin_user_name'] = (string) $user['name'];
    $_SESSION['admin_username'] = (string) $user['username'];
    $_SESSION['admin_must_change_password'] = (int) ($user['must_change_password'] ?? 0) === 1;
    $_SESSION['last_activity'] = time();
}

function admin_requires_password_change(): bool
{
    return !empty($_SESSION['admin_must_change_password']);
}

function mark_password_changed(): void
{
    $_SESSION['admin_must_change_password'] = false;
}

function logout_user(): void
{
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
    }

    session_destroy();
}

function enforce_session_timeout(int $seconds = 7200): void
{
    if (!is_logged_in()) {
        return;
    }

    $lastActivity = (int) ($_SESSION['last_activity'] ?? 0);
    if ($lastActivity > 0 && time() - $lastActivity > $seconds) {
        logout_user();
        session_start();
        flash('error', 'Sua sessão expirou. Entre novamente.');
        redirect('login.php');
    }

    $_SESSION['last_activity'] = time();
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return (string) $_SESSION['csrf_token'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="csrf_token" value="' . h(csrf_token()) . '">';
}

function verify_csrf(): void
{
    $token = $_POST['csrf_token'] ?? '';
    if (!is_string($token) || !hash_equals(csrf_token(), $token)) {
        http_response_code(419);
        exit('Sessão expirada ou requisição inválida.');
    }
}

function flash(string $type, string $message): void
{
    $_SESSION['flash'][] = ['type' => $type, 'message' => $message];
}

function consume_flashes(): array
{
    $messages = $_SESSION['flash'] ?? [];
    unset($_SESSION['flash']);
    return is_array($messages) ? $messages : [];
}

function post_string(string $key, int $maxLength = 65535): string
{
    $value = trim((string) ($_POST[$key] ?? ''));
    return mb_substr($value, 0, $maxLength);
}

function post_bool(string $key): int
{
    return isset($_POST[$key]) ? 1 : 0;
}

function post_int(string $key, int $default = 0): int
{
    return filter_var($_POST[$key] ?? $default, FILTER_VALIDATE_INT) ?: $default;
}

function post_decimal(string $key): float|false
{
    $value = trim((string) ($_POST[$key] ?? ''));
    if (str_contains($value, ',')) {
        $value = str_replace('.', '', $value);
        $value = str_replace(',', '.', $value);
    }

    return filter_var($value, FILTER_VALIDATE_FLOAT);
}

function validate_admin_password(string $password): ?string
{
    if (mb_strlen($password) < 12) {
        return 'A senha deve ter pelo menos 12 caracteres.';
    }
    if (hash_equals('GNS@2026', $password)) {
        return 'A senha inicial não pode ser reutilizada.';
    }
    if (!preg_match('/[A-Z]/', $password) || !preg_match('/[a-z]/', $password) ||
        !preg_match('/\d/', $password) || !preg_match('/[^A-Za-z0-9]/', $password)) {
        return 'Use letras maiúsculas, minúsculas, número e caractere especial.';
    }

    return null;
}

function client_ip(): string
{
    return mb_substr((string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'), 0, 45);
}

function login_is_rate_limited(PDO $pdo, string $username, int $limit = 5, int $windowSeconds = 900): bool
{
    $sessionUntil = (int) ($_SESSION['login_blocked_until'] ?? 0);
    if ($sessionUntil > time()) {
        return true;
    }

    $statement = $pdo->prepare(
        'SELECT COUNT(*) FROM login_attempts
         WHERE ip_address = :ip_address AND username = :username
           AND successful = 0 AND attempted_at >= :cutoff'
    );
    $statement->execute([
        'ip_address' => client_ip(),
        'username' => mb_strtolower($username),
        'cutoff' => date('Y-m-d H:i:s', time() - $windowSeconds),
    ]);

    if ((int) $statement->fetchColumn() >= $limit) {
        $_SESSION['login_blocked_until'] = time() + $windowSeconds;
        return true;
    }

    return false;
}

function record_login_attempt(PDO $pdo, string $username, bool $successful): void
{
    $statement = $pdo->prepare(
        'INSERT INTO login_attempts (ip_address, username, successful)
         VALUES (:ip_address, :username, :successful)'
    );
    $statement->execute([
        'ip_address' => client_ip(),
        'username' => mb_strtolower($username),
        'successful' => $successful ? 1 : 0,
    ]);

    if ($successful) {
        unset($_SESSION['login_failures'], $_SESSION['login_blocked_until']);
        $cleanup = $pdo->prepare(
            'DELETE FROM login_attempts WHERE ip_address = :ip_address AND username = :username'
        );
        $cleanup->execute([
            'ip_address' => client_ip(),
            'username' => mb_strtolower($username),
        ]);
        return;
    }

    $_SESSION['login_failures'] = (int) ($_SESSION['login_failures'] ?? 0) + 1;
    if ($_SESSION['login_failures'] >= 5) {
        $_SESSION['login_blocked_until'] = time() + 900;
    }

    $pdo->exec('DELETE FROM login_attempts WHERE attempted_at < (NOW() - INTERVAL 1 DAY)');
}

function delete_uploaded_file_if_unused(
    PDO $pdo,
    string $table,
    string $field,
    ?string $path,
    int $excludedId
): void {
    if (!$path) {
        return;
    }

    $statement = $pdo->prepare(
        "SELECT COUNT(*) FROM {$table} WHERE {$field} = :path AND id <> :id"
    );
    $statement->execute(['path' => $path, 'id' => $excludedId]);
    if ((int) $statement->fetchColumn() > 0) {
        return;
    }

    delete_managed_upload($path);
}

function delete_setting_uploaded_file_if_unused(PDO $pdo, ?string $path, string $excludedSettingKey): void
{
    if (!$path) {
        return;
    }

    $statement = $pdo->prepare(
        'SELECT COUNT(*) FROM settings WHERE setting_value = :path AND setting_key <> :setting_key'
    );
    $statement->execute(['path' => $path, 'setting_key' => $excludedSettingKey]);
    if ((int) $statement->fetchColumn() > 0) {
        return;
    }

    delete_managed_upload($path);
}

function delete_managed_upload(?string $path): void
{
    if (!$path) {
        return;
    }

    $normalizedPath = str_replace('\\', '/', trim($path));
    if (preg_match('#^uploads/[A-Za-z0-9_-]+/[a-f0-9]{32}\.(?:jpg|png|webp)$#', $normalizedPath) !== 1) {
        return;
    }

    $uploadsRoot = realpath(dirname(__DIR__) . '/uploads');
    $file = realpath(dirname(__DIR__) . '/' . ltrim($normalizedPath, '/'));
    $uploadsPrefix = $uploadsRoot ? rtrim($uploadsRoot, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR : null;
    if ($uploadsPrefix && $file && str_starts_with($file, $uploadsPrefix) && is_file($file)) {
        unlink($file);
    }
}

function upload_image(string $field, string $directory, ?string $current = null): ?string
{
    if (!isset($_FILES[$field]) || $_FILES[$field]['error'] === UPLOAD_ERR_NO_FILE) {
        return $current;
    }

    $file = $_FILES[$field];
    if ($file['error'] !== UPLOAD_ERR_OK || $file['size'] > 5 * 1024 * 1024) {
        throw new RuntimeException('A imagem deve ter no máximo 5 MB.');
    }

    if (!class_exists('finfo')) {
        throw new RuntimeException('Validação de imagem indisponível no servidor.');
    }

    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
    $extensions = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
    ];

    if (!isset($extensions[$mime])) {
        throw new RuntimeException('Formato de imagem inválido. Use JPG, PNG ou WebP.');
    }

    $targetDir = dirname(__DIR__) . '/uploads/' . trim($directory, '/');
    if (!is_dir($targetDir) && !mkdir($targetDir, 0755, true) && !is_dir($targetDir)) {
        throw new RuntimeException('Não foi possível preparar a pasta de uploads.');
    }

    $filename = bin2hex(random_bytes(16)) . '.' . $extensions[$mime];
    if (!move_uploaded_file($file['tmp_name'], $targetDir . '/' . $filename)) {
        throw new RuntimeException('Não foi possível salvar a imagem.');
    }

    return 'uploads/' . trim($directory, '/') . '/' . $filename;
}

enforce_session_timeout();
