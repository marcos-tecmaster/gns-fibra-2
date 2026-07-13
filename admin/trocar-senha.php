<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';

if (!is_logged_in()) {
    redirect('login.php');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $currentPassword = (string) ($_POST['current_password'] ?? '');
    $newPassword = (string) ($_POST['new_password'] ?? '');
    $confirmation = (string) ($_POST['password_confirmation'] ?? '');

    $statement = db()->prepare('SELECT password_hash FROM users WHERE id = :id AND active = 1');
    $statement->execute(['id' => (int) $_SESSION['admin_user_id']]);
    $hash = $statement->fetchColumn();

    $error = null;
    if (!$hash || !password_verify($currentPassword, (string) $hash)) {
        $error = 'A senha atual está incorreta.';
    } elseif ($newPassword !== $confirmation) {
        $error = 'A confirmação da nova senha não confere.';
    } else {
        $error = validate_admin_password($newPassword);
    }

    if ($error) {
        flash('error', $error);
        redirect('trocar-senha.php');
    }

    db()->prepare(
        'UPDATE users
         SET password_hash = :password_hash, must_change_password = 0,
             password_changed_at = NOW()
         WHERE id = :id'
    )->execute([
        'password_hash' => password_hash($newPassword, PASSWORD_DEFAULT),
        'id' => (int) $_SESSION['admin_user_id'],
    ]);

    mark_password_changed();
    session_regenerate_id(true);
    flash('success', 'Senha alterada com segurança.');
    redirect('dashboard.php');
}

admin_header('Trocar senha');
?>
<?php if (admin_requires_password_change()): ?>
    <div class="alert warning">
        A senha inicial ainda está ativa. Você precisa substituí-la antes de acessar o painel.
    </div>
<?php endif; ?>
<section class="panel password-panel">
    <div class="panel-header">
        <div>
            <h2>Defina uma nova senha</h2>
            <p class="muted">Use no mínimo 12 caracteres com maiúscula, minúscula, número e símbolo.</p>
        </div>
    </div>
    <form method="post" class="form-grid">
        <?= csrf_field() ?>
        <div class="field full">
            <label for="current_password">Senha atual</label>
            <input id="current_password" name="current_password" type="password" required autocomplete="current-password">
        </div>
        <div class="field">
            <label for="new_password">Nova senha</label>
            <input id="new_password" name="new_password" type="password" minlength="12" required autocomplete="new-password">
        </div>
        <div class="field">
            <label for="password_confirmation">Confirmar nova senha</label>
            <input id="password_confirmation" name="password_confirmation" type="password" minlength="12" required autocomplete="new-password">
        </div>
        <div class="field full"><button class="button" type="submit">Atualizar senha</button></div>
    </form>
</section>
<?php admin_footer(); ?>
