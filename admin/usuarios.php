<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_auth();

$pdo = db();
$action = $_GET['action'] ?? 'list';
$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT) ?: 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $postAction = post_string('form_action', 20);
    $userId = post_int('id');

    if ($postAction === 'delete') {
        if ($userId === (int) $_SESSION['admin_user_id']) {
            flash('error', 'Você não pode excluir o próprio usuário.');
        } elseif ((int) $pdo->query('SELECT COUNT(*) FROM users WHERE active = 1')->fetchColumn() <= 1) {
            flash('error', 'Mantenha pelo menos um usuário administrativo ativo.');
        } else {
            $pdo->prepare('DELETE FROM users WHERE id = :id')->execute(['id' => $userId]);
            flash('success', 'Usuário excluído.');
        }
        redirect('usuarios.php');
    }

    $name = post_string('name', 150);
    $username = post_string('username', 100);
    $password = (string) ($_POST['password'] ?? '');
    $active = post_bool('active');

    if ($userId === (int) $_SESSION['admin_user_id'] && !$active) {
        flash('error', 'Você não pode desativar o próprio usuário.');
        redirect('usuarios.php?action=edit&id=' . $userId);
    }

    if ($name === '' || $username === '' || ($userId === 0 && $password === '')) {
        flash('error', 'Preencha nome, usuário e senha para novos usuários.');
        redirect('usuarios.php?action=' . ($userId ? 'edit&id=' . $userId : 'new'));
    }

    try {
        if ($password !== '' && ($passwordError = validate_admin_password($password))) {
            throw new RuntimeException($passwordError);
        }

        if ($userId > 0) {
            $params = ['id' => $userId, 'name' => $name, 'username' => $username, 'active' => $active];
            $sql = 'UPDATE users SET name=:name, username=:username, active=:active';
            if ($password !== '') {
                $sql .= ', password_hash=:password_hash, must_change_password=1, password_changed_at=NULL';
                $params['password_hash'] = password_hash($password, PASSWORD_DEFAULT);
            }
            $sql .= ' WHERE id=:id';
            $pdo->prepare($sql)->execute($params);
        } else {
            $pdo->prepare(
                'INSERT INTO users (name, username, password_hash, must_change_password, active)
                 VALUES (:name, :username, :password_hash, 1, :active)'
            )
                ->execute([
                    'name' => $name,
                    'username' => $username,
                    'password_hash' => password_hash($password, PASSWORD_DEFAULT),
                    'active' => $active,
                ]);
        }
        flash('success', $userId ? 'Usuário atualizado.' : 'Usuário criado.');
    } catch (PDOException $exception) {
        if ((string) $exception->getCode() === '23000') {
            flash('error', 'Este nome de usuário já está em uso.');
        } else {
            throw $exception;
        }
    } catch (RuntimeException $exception) {
        flash('error', $exception->getMessage());
    }

    redirect('usuarios.php');
}

$editing = null;
if ($action === 'edit' && $id > 0) {
    $statement = $pdo->prepare('SELECT id, name, username, active FROM users WHERE id=:id');
    $statement->execute(['id' => $id]);
    $editing = $statement->fetch() ?: null;
} elseif ($action === 'new') {
    $editing = ['id' => 0, 'name' => '', 'username' => '', 'active' => 1];
}

$users = $pdo->query('SELECT id, name, username, active, created_at FROM users ORDER BY name')->fetchAll();
admin_header('Usuários');
?>
<?php if ($editing): ?>
    <section class="panel">
        <div class="panel-header"><h2><?= (int) $editing['id'] ? 'Editar usuário' : 'Novo usuário' ?></h2><a class="button secondary" href="usuarios.php">Cancelar</a></div>
        <form method="post" class="form-grid">
            <?= csrf_field() ?><input type="hidden" name="form_action" value="save"><input type="hidden" name="id" value="<?= (int) $editing['id'] ?>">
            <div class="field"><label for="name">Nome</label><input id="name" name="name" value="<?= h($editing['name']) ?>" required></div>
            <div class="field"><label for="username">Usuário</label><input id="username" name="username" value="<?= h($editing['username']) ?>" required autocomplete="username"></div>
            <div class="field full"><label for="password">Senha temporária <?= (int) $editing['id'] ? '(deixe em branco para manter)' : '' ?></label><input id="password" name="password" type="password" <?= (int) $editing['id'] ? '' : 'required' ?> minlength="12" autocomplete="new-password"><small class="muted">A troca será exigida no próximo login.</small></div>
            <label class="check"><input type="checkbox" name="active" <?= (int) $editing['active'] === 1 ? 'checked' : '' ?>> Ativo</label>
            <div class="field full"><button class="button" type="submit">Salvar usuário</button></div>
        </form>
    </section>
<?php else: ?>
    <section class="panel">
        <div class="panel-header"><div><h2>Usuários administrativos</h2><p class="muted">Controle quem pode acessar o painel.</p></div><a class="button" href="usuarios.php?action=new">Novo usuário</a></div>
        <table><thead><tr><th>Nome</th><th>Usuário</th><th>Status</th><th>Criado em</th><th>Ações</th></tr></thead><tbody>
        <?php foreach ($users as $user): ?><tr>
            <td><?= h($user['name']) ?></td><td><?= h($user['username']) ?></td>
            <td><span class="badge <?= (int) $user['active'] === 1 ? '' : 'off' ?>"><?= (int) $user['active'] === 1 ? 'Ativo' : 'Inativo' ?></span></td>
            <td><?= h(date('d/m/Y', strtotime($user['created_at']))) ?></td>
            <td><div class="actions"><a class="button secondary small" href="usuarios.php?action=edit&id=<?= (int) $user['id'] ?>">Editar</a>
                <form method="post" onsubmit="return confirm('Excluir este usuário?')"><?= csrf_field() ?><input type="hidden" name="form_action" value="delete"><input type="hidden" name="id" value="<?= (int) $user['id'] ?>"><button class="button danger small" type="submit">Excluir</button></form>
            </div></td>
        </tr><?php endforeach; ?>
        </tbody></table>
    </section>
<?php endif; ?>
<?php admin_footer(); ?>
