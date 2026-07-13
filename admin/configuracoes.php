<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_auth();

$fields = [
    'company_name' => ['label' => 'Nome da empresa', 'type' => 'text', 'required' => true],
    'whatsapp' => ['label' => 'WhatsApp', 'type' => 'url', 'required' => true],
    'email' => ['label' => 'E-mail', 'type' => 'email', 'required' => true],
    'address' => ['label' => 'Endereço', 'type' => 'textarea', 'required' => true],
    'customer_portal_url' => ['label' => 'Central do Assinante', 'type' => 'url'],
    'linktree_url' => ['label' => 'Linktree', 'type' => 'url'],
    'facebook_url' => ['label' => 'Facebook', 'type' => 'url'],
    'instagram_url' => ['label' => 'Instagram', 'type' => 'url'],
    'coverage_map_url' => ['label' => 'Mapa de cobertura', 'type' => 'url'],
    'hero_title' => ['label' => 'Texto principal do hero', 'type' => 'textarea', 'required' => true],
    'about_text' => ['label' => 'Texto sobre a empresa', 'type' => 'textarea', 'required' => true],
    'years_in_market' => ['label' => 'Anos de mercado', 'type' => 'number', 'required' => true],
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $values = [];
    foreach ($fields as $key => $field) {
        $value = $field['type'] === 'number' ? (string) max(0, post_int($key)) : post_string($key);
        if (($field['required'] ?? false) && $value === '') {
            flash('error', 'Preencha todos os campos obrigatórios.');
            redirect('configuracoes.php');
        }
        if ($field['type'] === 'url' && $value !== '' && filter_var($value, FILTER_VALIDATE_URL) === false) {
            flash('error', 'Informe uma URL válida em ' . $field['label'] . '.');
            redirect('configuracoes.php');
        }
        if ($field['type'] === 'email' && filter_var($value, FILTER_VALIDATE_EMAIL) === false) {
            flash('error', 'Informe um e-mail válido.');
            redirect('configuracoes.php');
        }
        $values[$key] = $value;
    }

    $pdo = db();
    $statement = $pdo->prepare(
        'INSERT INTO settings (setting_key, setting_value) VALUES (:setting_key, :setting_value)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), updated_at = CURRENT_TIMESTAMP'
    );

    $pdo->beginTransaction();
    try {
        foreach ($values as $key => $value) {
            $statement->execute(['setting_key' => $key, 'setting_value' => $value]);
        }
        $pdo->commit();
    } catch (Throwable $exception) {
        $pdo->rollBack();
        throw $exception;
    }

    flash('success', 'Configurações atualizadas.');
    redirect('configuracoes.php');
}

$settings = [];
foreach (db()->query('SELECT setting_key, setting_value FROM settings')->fetchAll() as $row) {
    $settings[$row['setting_key']] = $row['setting_value'];
}

admin_header('Configurações');
?>
<section class="panel">
    <div class="panel-header">
        <div><h2>Dados institucionais</h2><p class="muted">Informações retornadas pela API pública.</p></div>
    </div>
    <form method="post" class="form-grid">
        <?= csrf_field() ?>
        <?php foreach ($fields as $key => $field): ?>
            <div class="field <?= $field['type'] === 'textarea' ? 'full' : '' ?>">
                <label for="<?= h($key) ?>"><?= h($field['label']) ?></label>
                <?php if ($field['type'] === 'textarea'): ?>
                    <textarea id="<?= h($key) ?>" name="<?= h($key) ?>" <?= ($field['required'] ?? false) ? 'required' : '' ?>><?= h($settings[$key] ?? '') ?></textarea>
                <?php else: ?>
                    <input id="<?= h($key) ?>" name="<?= h($key) ?>" type="<?= h($field['type']) ?>" value="<?= h($settings[$key] ?? '') ?>" <?= ($field['required'] ?? false) ? 'required' : '' ?>>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
        <div class="field full"><button class="button" type="submit">Salvar configurações</button></div>
    </form>
</section>
<?php admin_footer(); ?>
