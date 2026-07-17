<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_auth();

$fieldGroups = [
    'Empresa e contato' => [
        'company_name' => ['label' => 'Nome da empresa', 'type' => 'text', 'required' => true, 'max' => 120],
        'whatsapp' => ['label' => 'WhatsApp', 'type' => 'url', 'required' => true, 'max' => 255],
        'email' => ['label' => 'E-mail', 'type' => 'email', 'required' => true, 'max' => 180],
        'address' => ['label' => 'Endereço', 'type' => 'textarea', 'required' => true, 'max' => 500],
    ],
    'Links' => [
        'customer_portal_url' => ['label' => 'Central do Assinante', 'type' => 'url', 'max' => 255],
        'linktree_url' => ['label' => 'Linktree', 'type' => 'url', 'max' => 255],
        'facebook_url' => ['label' => 'Facebook', 'type' => 'url', 'max' => 255],
        'instagram_url' => ['label' => 'Instagram', 'type' => 'url', 'max' => 255],
        'coverage_map_url' => ['label' => 'Mapa de cobertura', 'type' => 'url', 'max' => 500],
    ],
    'Hero/Institucional' => [
        'hero_title' => ['label' => 'Texto principal do hero', 'type' => 'textarea', 'required' => true, 'max' => 220],
        'about_text' => ['label' => 'Texto sobre a empresa', 'type' => 'textarea', 'required' => true, 'max' => 500],
        'years_in_market' => ['label' => 'Anos de mercado', 'type' => 'number', 'required' => true, 'max_value' => 100],
    ],
    'Suporte' => [
        'support_enabled' => ['label' => 'Exibir seção de Suporte', 'type' => 'checkbox'],
        'support_eyebrow' => ['label' => 'Chamada superior', 'type' => 'text', 'max' => 80],
        'support_title' => ['label' => 'Título', 'type' => 'textarea', 'max' => 220],
        'support_description' => ['label' => 'Descrição', 'type' => 'textarea', 'max' => 600],
        'support_button_label' => ['label' => 'Texto do botão principal', 'type' => 'text', 'max' => 80],
        'support_whatsapp_message' => ['label' => 'Mensagem do WhatsApp principal', 'type' => 'textarea', 'max' => 400],
    ],
    'CTA final' => [
        'cta_enabled' => ['label' => 'Exibir CTA final', 'type' => 'checkbox'],
        'cta_eyebrow' => ['label' => 'Chamada superior', 'type' => 'text', 'max' => 80],
        'cta_title' => ['label' => 'Título', 'type' => 'textarea', 'max' => 220],
        'cta_description' => ['label' => 'Descrição', 'type' => 'textarea', 'max' => 600],
        'cta_button_label' => ['label' => 'Texto do botão principal', 'type' => 'text', 'max' => 80],
        'cta_whatsapp_message' => ['label' => 'Mensagem do WhatsApp principal', 'type' => 'textarea', 'max' => 400],
    ],
];

function flatten_setting_fields(array $fieldGroups): array
{
    $fields = [];
    foreach ($fieldGroups as $groupFields) {
        foreach ($groupFields as $key => $field) {
            $fields[$key] = $field;
        }
    }

    return $fields;
}

function clean_setting_text(string $value): string
{
    $value = trim(str_replace("\0", '', $value));
    return trim(strip_tags($value));
}

function has_setting_html(string $value): bool
{
    return $value !== strip_tags($value);
}

$fields = flatten_setting_fields($fieldGroups);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $allowedPostKeys = array_merge(array_keys($fields), ['csrf_token']);
    foreach (array_keys($_POST) as $postedKey) {
        if (!in_array((string) $postedKey, $allowedPostKeys, true)) {
            flash('error', 'Campo inesperado no envio das configurações.');
            redirect('configuracoes.php');
        }
        if ((string) $postedKey !== 'csrf_token' && is_array($_POST[$postedKey])) {
            flash('error', 'Formato inválido no envio das configurações.');
            redirect('configuracoes.php');
        }
    }

    $values = [];
    foreach ($fields as $key => $field) {
        if ($field['type'] === 'checkbox') {
            $values[$key] = isset($_POST[$key]) ? '1' : '0';
            continue;
        }

        if ($field['type'] === 'number') {
            $numericValue = max(0, post_int($key));
            $maxValue = (int) ($field['max_value'] ?? PHP_INT_MAX);
            $value = (string) min($numericValue, $maxValue);
        } else {
            $rawValue = (string) ($_POST[$key] ?? '');
            if (has_setting_html($rawValue)) {
                flash('error', 'Não use HTML nos campos de configuração.');
                redirect('configuracoes.php');
            }
            $value = clean_setting_text($rawValue);
        }

        if (($field['required'] ?? false) && $value === '') {
            flash('error', 'Preencha todos os campos obrigatórios.');
            redirect('configuracoes.php');
        }
        if (isset($field['max']) && mb_strlen($value) > (int) $field['max']) {
            flash('error', 'O campo ' . $field['label'] . ' ultrapassa o limite permitido.');
            redirect('configuracoes.php');
        }
        if ($field['type'] === 'url' && $value !== '' && filter_var($value, FILTER_VALIDATE_URL) === false) {
            flash('error', 'Informe uma URL válida em ' . $field['label'] . '.');
            redirect('configuracoes.php');
        }
        if ($field['type'] === 'email' && $value !== '' && filter_var($value, FILTER_VALIDATE_EMAIL) === false) {
            flash('error', 'Informe um e-mail válido.');
            redirect('configuracoes.php');
        }
        $values[$key] = $value;
    }

    $enabledRequiredGroups = [
        'support_enabled' => [
            'support_title',
            'support_description',
            'support_button_label',
            'support_whatsapp_message',
        ],
        'cta_enabled' => [
            'cta_title',
            'cta_description',
            'cta_button_label',
            'cta_whatsapp_message',
        ],
    ];
    foreach ($enabledRequiredGroups as $enabledKey => $requiredKeys) {
        if (($values[$enabledKey] ?? '0') !== '1') {
            continue;
        }
        foreach ($requiredKeys as $requiredKey) {
            if (($values[$requiredKey] ?? '') === '') {
                flash('error', 'Preencha os textos obrigatórios das seções ativas.');
                redirect('configuracoes.php');
            }
        }
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
<form method="post">
    <?= csrf_field() ?>
    <?php foreach ($fieldGroups as $groupTitle => $groupFields): ?>
        <section class="panel">
            <div class="panel-header">
                <div>
                    <h2><?= h($groupTitle) ?></h2>
                    <p class="muted">Informações retornadas pela API pública.</p>
                </div>
            </div>
            <div class="form-grid">
                <?php foreach ($groupFields as $key => $field): ?>
                    <div class="field <?= $field['type'] === 'textarea' ? 'full' : '' ?>">
                        <?php if ($field['type'] === 'checkbox'): ?>
                            <label class="check" for="<?= h($key) ?>">
                                <input
                                    id="<?= h($key) ?>"
                                    name="<?= h($key) ?>"
                                    type="checkbox"
                                    value="1"
                                    <?= ($settings[$key] ?? '1') === '1' ? 'checked' : '' ?>
                                >
                                <span><?= h($field['label']) ?></span>
                            </label>
                        <?php else: ?>
                            <label for="<?= h($key) ?>"><?= h($field['label']) ?></label>
                            <?php if ($field['type'] === 'textarea'): ?>
                                <textarea
                                    id="<?= h($key) ?>"
                                    name="<?= h($key) ?>"
                                    maxlength="<?= h((string) ($field['max'] ?? '')) ?>"
                                    <?= ($field['required'] ?? false) ? 'required' : '' ?>
                                ><?= h($settings[$key] ?? '') ?></textarea>
                            <?php else: ?>
                                <input
                                    id="<?= h($key) ?>"
                                    name="<?= h($key) ?>"
                                    type="<?= h($field['type']) ?>"
                                    value="<?= h($settings[$key] ?? '') ?>"
                                    <?= isset($field['max']) ? 'maxlength="' . h((string) $field['max']) . '"' : '' ?>
                                    <?= isset($field['max_value']) ? 'max="' . h((string) $field['max_value']) . '"' : '' ?>
                                    <?= ($field['type'] === 'number') ? 'min="0"' : '' ?>
                                    <?= ($field['required'] ?? false) ? 'required' : '' ?>
                                >
                            <?php endif; ?>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </section>
    <?php endforeach; ?>
    <section class="panel">
        <button class="button" type="submit">Salvar configurações</button>
    </section>
</form>
<?php admin_footer(); ?>
