<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';

if (is_logged_in()) {
    redirect('dashboard.php');
}

$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $username = post_string('username', 100);
    $password = (string) ($_POST['password'] ?? '');

    try {
        $pdo = db();
        if (login_is_rate_limited($pdo, $username)) {
            throw new RuntimeException('Login temporariamente bloqueado.');
        }

        $statement = $pdo->prepare(
            'SELECT id, name, username, password_hash, active, must_change_password
             FROM users WHERE username = :username LIMIT 1'
        );
        $statement->execute(['username' => $username]);
        $user = $statement->fetch();

        if ($user && (int) $user['active'] === 1 && password_verify($password, $user['password_hash'])) {
            $usesInitialPassword = hash_equals('GNS@2026', $password);
            if ($usesInitialPassword && (int) $user['must_change_password'] !== 1) {
                $pdo->prepare('UPDATE users SET must_change_password = 1 WHERE id = :id')
                    ->execute(['id' => $user['id']]);
                $user['must_change_password'] = 1;
            }
            record_login_attempt($pdo, $username, true);
            login_user($user);
            redirect(admin_requires_password_change() ? 'trocar-senha.php' : 'dashboard.php');
        }

        record_login_attempt($pdo, $username, false);
        $error = 'Usuário ou senha inválidos.';
        usleep(350000);
    } catch (Throwable) {
        $error = 'Não foi possível autenticar. Verifique os dados ou tente novamente mais tarde.';
        usleep(350000);
    }
}
?>
<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Login | GNS Admin</title>
    <link rel="icon" type="image/png" sizes="48x48" href="../favicon-48.png">
    <link rel="stylesheet" href="assets/admin.css">
</head>
<body class="login-page">
    <main class="login-card panel">
        <img class="login-logo" src="../logo-gns.png" alt="GNS Fibra">
        <h1>Painel GNS Fibra</h1>
        <p>Entre com suas credenciais administrativas.</p>
        <?php foreach (consume_flashes() as $message): ?>
            <div class="alert <?= h($message['type']) ?>"><?= h($message['message']) ?></div>
        <?php endforeach; ?>
        <?php if ($error): ?>
            <div class="alert error"><?= h($error) ?></div>
        <?php endif; ?>
        <form method="post" autocomplete="on">
            <?= csrf_field() ?>
            <div class="field">
                <label for="username">Usuário</label>
                <input id="username" name="username" type="text" maxlength="100" required autofocus autocomplete="username">
            </div>
            <div class="field">
                <label for="password">Senha</label>
                <input id="password" name="password" type="password" required autocomplete="current-password">
            </div>
            <button class="button" type="submit">Entrar</button>
        </form>
    </main>
</body>
</html>
