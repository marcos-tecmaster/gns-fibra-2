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

    if ($postAction === 'delete') {
        $deleteId = post_int('id');
        $statement = $pdo->prepare('DELETE FROM plans WHERE id = :id');
        $statement->execute(['id' => $deleteId]);
        flash('success', 'Plano excluído.');
        redirect('planos.php');
    }

    $planId = post_int('id');
    $name = post_string('name', 120);
    $speed = post_string('speed', 30);
    $unit = post_string('unit', 20) ?: 'MEGA';
    $price = post_decimal('price');
    $audience = post_string('audience', 180);
    $paymentMethod = post_string('payment_method', 180);
    $benefits = array_values(array_filter(array_map('trim', preg_split('/\R/', post_string('benefits')) ?: [])));
    $featured = post_bool('featured');
    $active = post_bool('active');
    $displayOrder = max(0, post_int('display_order'));

    if ($name === '' || $speed === '' || $price === false || !$benefits) {
        flash('error', 'Preencha nome, velocidade, preço e pelo menos um benefício.');
        redirect('planos.php?action=' . ($planId ? 'edit&id=' . $planId : 'new'));
    }

    $pdo->beginTransaction();
    try {
        if ($featured) {
            $pdo->exec('UPDATE plans SET featured = 0');
        }

        $params = [
            'name' => $name,
            'speed' => $speed,
            'unit' => $unit,
            'price' => $price,
            'audience' => $audience,
            'benefits' => json_encode($benefits, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
            'payment_method' => $paymentMethod,
            'featured' => $featured,
            'active' => $active,
            'display_order' => $displayOrder,
        ];

        if ($planId > 0) {
            $params['id'] = $planId;
            $sql = 'UPDATE plans SET name=:name, speed=:speed, unit=:unit, price=:price, audience=:audience,
                    benefits=:benefits, payment_method=:payment_method, featured=:featured, active=:active,
                    display_order=:display_order WHERE id=:id';
        } else {
            $sql = 'INSERT INTO plans (name, speed, unit, price, audience, benefits, payment_method, featured, active, display_order)
                    VALUES (:name, :speed, :unit, :price, :audience, :benefits, :payment_method, :featured, :active, :display_order)';
        }

        $pdo->prepare($sql)->execute($params);
        $pdo->commit();
        flash('success', $planId > 0 ? 'Plano atualizado.' : 'Plano criado.');
    } catch (Throwable $exception) {
        $pdo->rollBack();
        throw $exception;
    }

    redirect('planos.php');
}

$editing = null;
if (($action === 'edit' || $action === 'new') && $id > 0) {
    $statement = $pdo->prepare('SELECT * FROM plans WHERE id = :id');
    $statement->execute(['id' => $id]);
    $editing = $statement->fetch() ?: null;
}

if ($action === 'new') {
    $editing = [
        'id' => 0, 'name' => '', 'speed' => '', 'unit' => 'MEGA', 'price' => '',
        'audience' => '', 'benefits' => '[]', 'payment_method' => '',
        'featured' => 0, 'active' => 1, 'display_order' => 0,
    ];
}

$plans = $pdo->query('SELECT * FROM plans ORDER BY display_order, id')->fetchAll();
admin_header('Planos');
?>
<?php if ($editing): ?>
    <?php $benefits = json_decode((string) $editing['benefits'], true) ?: []; ?>
    <section class="panel">
        <div class="panel-header">
            <h2><?= (int) $editing['id'] > 0 ? 'Editar plano' : 'Novo plano' ?></h2>
            <a class="button secondary" href="planos.php">Cancelar</a>
        </div>
        <form method="post" class="form-grid">
            <?= csrf_field() ?>
            <input type="hidden" name="form_action" value="save">
            <input type="hidden" name="id" value="<?= (int) $editing['id'] ?>">
            <div class="field">
                <label for="name">Nome</label>
                <input id="name" name="name" value="<?= h($editing['name']) ?>" maxlength="120" required>
            </div>
            <div class="field">
                <label for="audience">Descrição curta</label>
                <input id="audience" name="audience" value="<?= h($editing['audience']) ?>" maxlength="180">
            </div>
            <div class="field">
                <label for="speed">Velocidade</label>
                <input id="speed" name="speed" value="<?= h($editing['speed']) ?>" maxlength="30" required>
            </div>
            <div class="field">
                <label for="unit">Unidade</label>
                <select id="unit" name="unit">
                    <option value="MEGA" <?= $editing['unit'] === 'MEGA' ? 'selected' : '' ?>>MEGA</option>
                    <option value="GIGA" <?= $editing['unit'] === 'GIGA' ? 'selected' : '' ?>>GIGA</option>
                </select>
            </div>
            <div class="field">
                <label for="price">Preço mensal</label>
                <input id="price" name="price" inputmode="decimal" value="<?= h(number_format((float) $editing['price'], 2, ',', '.')) ?>" required>
            </div>
            <div class="field">
                <label for="display_order">Ordem de exibição</label>
                <input id="display_order" name="display_order" type="number" min="0" value="<?= (int) $editing['display_order'] ?>">
            </div>
            <div class="field full">
                <label for="payment_method">Forma de pagamento</label>
                <input id="payment_method" name="payment_method" value="<?= h($editing['payment_method']) ?>" maxlength="180">
            </div>
            <div class="field full">
                <label for="benefits">Benefícios, um por linha</label>
                <textarea id="benefits" name="benefits" required><?= h(implode("\n", $benefits)) ?></textarea>
            </div>
            <label class="check"><input type="checkbox" name="featured" <?= (int) $editing['featured'] === 1 ? 'checked' : '' ?>> Mais contratado</label>
            <label class="check"><input type="checkbox" name="active" <?= (int) $editing['active'] === 1 ? 'checked' : '' ?>> Ativo</label>
            <div class="field full"><button class="button" type="submit">Salvar plano</button></div>
        </form>
    </section>
<?php else: ?>
    <section class="panel">
        <div class="panel-header">
            <div><h2>Planos cadastrados</h2><p class="muted">Gerencie preços, benefícios e ordem de exibição.</p></div>
            <a class="button" href="planos.php?action=new">Novo plano</a>
        </div>
        <table>
            <thead><tr><th>Ordem</th><th>Plano</th><th>Velocidade</th><th>Preço</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>
            <?php foreach ($plans as $plan): ?>
                <tr>
                    <td><?= (int) $plan['display_order'] ?></td>
                    <td><strong><?= h($plan['name']) ?></strong><?php if ((int) $plan['featured'] === 1): ?> <span class="badge">Mais contratado</span><?php endif; ?></td>
                    <td><?= h($plan['speed']) ?> <?= h($plan['unit']) ?></td>
                    <td>R$ <?= h(number_format((float) $plan['price'], 2, ',', '.')) ?></td>
                    <td><span class="badge <?= (int) $plan['active'] === 1 ? '' : 'off' ?>"><?= (int) $plan['active'] === 1 ? 'Ativo' : 'Inativo' ?></span></td>
                    <td><div class="actions">
                        <a class="button secondary small" href="planos.php?action=edit&id=<?= (int) $plan['id'] ?>">Editar</a>
                        <form method="post" onsubmit="return confirm('Excluir este plano?')">
                            <?= csrf_field() ?><input type="hidden" name="form_action" value="delete"><input type="hidden" name="id" value="<?= (int) $plan['id'] ?>">
                            <button class="button danger small" type="submit">Excluir</button>
                        </form>
                    </div></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </section>
<?php endif; ?>
<?php admin_footer(); ?>
