<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_auth();


$fieldGroups = [
    'Identidade visual' => [
        'company_logo_path' => [
            'label' => 'Logo principal da empresa',
            'type' => 'file',
            'directory' => 'branding',
            'fallback_path' => '../logo-gns.png',
            'custom_state_label' => 'Logo personalizada',
            'fallback_state_label' => 'Logo oficial padrão',
            'clear_label' => 'Remover logo personalizada',
            'clear_confirm' => 'Remover somente a logo personalizada? A logo oficial padrão voltará a ser utilizada e nenhuma outra configuração será alterada.',
            'clear_success' => 'Logo personalizada removida. A logo oficial padrão voltou a ser utilizada.',
            'help' => 'Use PNG, JPG ou WebP de até 5 MB. Recomendado: fundo transparente, formato quadrado ou horizontal e boa legibilidade nos temas claro e escuro. Ao remover a imagem personalizada, a logo oficial padrão será restaurada automaticamente.',
        ],
    ],
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
    'Cobertura' => [
        'coverage_image_path' => [
            'label' => 'Imagem da seção Cobertura',
            'type' => 'file',
            'directory' => 'coverage',
            'help' => 'Use JPG, PNG ou WebP até 5 MB. Recomendado: 1200 × 1200 ou 1200 × 900.',
        ],
    ],
    'História e conteúdo institucional' => [
        'history_enabled' => ['label' => 'Exibir seção História', 'type' => 'checkbox'],
        'history_eyebrow' => ['label' => 'Rótulo', 'type' => 'text', 'max' => 80],
        'history_title' => ['label' => 'Título principal', 'type' => 'text', 'max' => 220],
        'history_title_highlight' => ['label' => 'Destaque do título', 'type' => 'text', 'max' => 120],
        'history_description' => ['label' => 'Texto principal', 'type' => 'textarea', 'max' => 1500],
        'history_secondary_text' => ['label' => 'Texto complementar', 'type' => 'textarea', 'max' => 1500],
        'history_experience_suffix' => ['label' => 'Sufixo dos anos', 'type' => 'text', 'max' => 40],
        'history_experience_label' => ['label' => 'Legenda dos anos', 'type' => 'text', 'max' => 100],
        'history_team_title' => ['label' => 'Título do card da equipe', 'type' => 'text', 'max' => 100],
        'history_team_description' => ['label' => 'Descrição do card da equipe', 'type' => 'text', 'max' => 140],
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
        'cta_background_image_path' => [
            'label' => 'Imagem de fundo do CTA',
            'type' => 'file',
            'directory' => 'cta',
            'help' => 'Use JPG, PNG ou WebP até 5 MB. Recomendado: 1600 × 900 ou 1920 × 1080.',
        ],
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
    $allowedPostKeys = array_merge(
        array_keys($fields),
        ['csrf_token', 'form_action', 'setting_key', 'clear_setting_file']
    );
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
    foreach (array_keys($_FILES) as $uploadedKey) {
        if (!isset($fields[$uploadedKey]) || ($fields[$uploadedKey]['type'] ?? '') !== 'file') {
            flash('error', 'Arquivo inesperado no envio das configurações.');
            redirect('configuracoes.php');
        }
    }

    $pdo = db();
    $clearSettingKey = post_string('clear_setting_file', 120);

    if ($clearSettingKey !== '') {
        $settingKey = $clearSettingKey;
        $field = $fields[$settingKey] ?? null;
        if (!is_array($field) || ($field['type'] ?? '') !== 'file') {
            flash('error', 'A ação solicitada não está disponível.');
            redirect('configuracoes.php');
        }

        $currentStatement = $pdo->prepare('SELECT setting_value FROM settings WHERE setting_key = :setting_key');
        $currentStatement->execute(['setting_key' => $settingKey]);
        $currentPath = trim((string) ($currentStatement->fetchColumn() ?: ''));
        if ($currentPath === '') {
            flash('error', 'Esta configuração já está sem imagem.');
            redirect('configuracoes.php');
        }

                try {
            $pdo->beginTransaction();

            $deleteSetting = $pdo->prepare(
                'DELETE FROM settings WHERE setting_key = :setting_key'
            );

            $deleteSetting->execute([
                'setting_key' => $settingKey,
            ]);

            if ($deleteSetting->rowCount() !== 1) {
                throw new RuntimeException(
                    'A configuração da imagem não foi removida do banco.'
                );
            }

            $pdo->commit();
        } catch (Throwable $exception) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }

            flash('error', 'Não foi possível remover a imagem. Tente novamente.');
            redirect('configuracoes.php');
        }

        delete_setting_uploaded_file_if_unused(
            $pdo,
            $currentPath,
            $settingKey,
            (string) ($field['directory'] ?? '')
        );
        flash(
            'success',
            (string) ($field['clear_success'] ?? 'Imagem removida com sucesso. Os textos e demais configurações foram preservados.')
        );
        redirect('configuracoes.php');
    }

    $values = [];
    $uploadedFileValues = [];
    foreach ($fields as $key => $field) {
        if ($field['type'] === 'file') {
            $currentStatement = $pdo->prepare('SELECT setting_value FROM settings WHERE setting_key = :setting_key');
            $currentStatement->execute(['setting_key' => $key]);
            $values[$key] = trim((string) ($currentStatement->fetchColumn() ?: ''));
            continue;
        }
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
        'history_enabled' => [
            'history_eyebrow',
            'history_title',
            'history_title_highlight',
            'history_description',
            'history_secondary_text',
            'history_experience_suffix',
            'history_experience_label',
            'history_team_title',
            'history_team_description',
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

    foreach ($fields as $key => $field) {
        if (($field['type'] ?? '') !== 'file') {
            continue;
        }
        $previousValue = $values[$key];
        try {
            $values[$key] = upload_image($key, $field['directory'], $previousValue ?: null) ?? '';
            if ($values[$key] !== $previousValue && $values[$key] !== '') {
                $uploadedFileValues[$key] = [
                    'new' => $values[$key],
                    'old' => $previousValue,
                    'directory' => (string) $field['directory'],
                ];
            }
        } catch (RuntimeException $exception) {
            foreach ($uploadedFileValues as $uploadedKey => $paths) {
                delete_setting_uploaded_file_if_unused($pdo, $paths['new'], $uploadedKey, $paths['directory']);
            }
            flash('error', $exception->getMessage());
            redirect('configuracoes.php');
        }
    }

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
        foreach ($uploadedFileValues as $uploadedKey => $paths) {
            if ($paths['old'] !== '') {
                delete_setting_uploaded_file_if_unused($pdo, $paths['old'], $uploadedKey, $paths['directory']);
            }
        }
    } catch (Throwable $exception) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        foreach ($uploadedFileValues as $uploadedKey => $paths) {
            delete_setting_uploaded_file_if_unused($pdo, $paths['new'], $uploadedKey, $paths['directory']);
        }
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
<form method="post" enctype="multipart/form-data">
    <?= csrf_field() ?>

    <?php foreach ($fieldGroups as $groupTitle => $groupFields): ?>
        <section class="panel">
            <div class="panel-header">
                <div>
                    <h2><?= h($groupTitle) ?></h2>
                    <p class="muted">Informações retornadas pela API pública.</p>
                </div>
                <?php if ($groupTitle === 'História e conteúdo institucional'): ?>
                    <a class="button secondary" href="historia-galeria.php">Gerenciar galeria da história</a>
                <?php endif; ?>
            </div>
            <div class="form-grid">
                <?php foreach ($groupFields as $key => $field): ?>
                    <div class="field <?= in_array($field['type'], ['textarea', 'file'], true) ? 'full' : '' ?>">
                        <?php if ($field['type'] === 'checkbox'): ?>
                            <label class="check" for="<?= h($key) ?>">
                                <input
                                    id="<?= h($key) ?>"
                                    name="<?= h($key) ?>"
                                    type="checkbox"
                                    value="1"
                                    <?= ($settings[$key] ?? '1') === '1' ? 'checked' : '' ?>>
                                <span><?= h($field['label']) ?></span>
                            </label>
                        <?php elseif ($field['type'] === 'file'): ?>
                            <label for="<?= h($key) ?>"><?= h($field['label']) ?></label>
                            <?php
                            $currentFilePath = trim((string) ($settings[$key] ?? ''));
                            $fallbackPath = trim((string) ($field['fallback_path'] ?? ''));
                            $previewPath = $currentFilePath !== '' ? '../' . ltrim($currentFilePath, '/') : $fallbackPath;
                            $hasCustomFile = $currentFilePath !== '';
                            ?>
                            <?php if ($previewPath !== ''): ?>
                                <div class="identity-preview">
                                    <img
                                        class="image-preview <?= $fallbackPath !== '' ? 'identity-logo-preview' : '' ?>"
                                        src="<?= h($previewPath) ?>"
                                        alt="<?= h($fallbackPath !== ''
                                                    ? (($hasCustomFile ? 'Logo personalizada' : 'Logo oficial padrão') . ' da empresa')
                                                    : ('Imagem atual de ' . $field['label'])) ?>"
                                        <?php if ($fallbackPath !== ''): ?>
                                        onerror="this.onerror=null;this.src='<?= h($fallbackPath) ?>';const state=this.parentElement.querySelector('[data-image-state]');if(state){state.textContent='<?= h((string) ($field['fallback_state_label'] ?? 'Imagem padrão')) ?> (fallback)';}"
                                        <?php endif; ?>>
                                    <?php if ($fallbackPath !== ''): ?>
                                        <span class="badge" data-image-state>
                                            <?= h((string) ($hasCustomFile
                                                ? ($field['custom_state_label'] ?? 'Imagem personalizada')
                                                : ($field['fallback_state_label'] ?? 'Imagem padrão'))) ?>
                                        </span>
                                        <p class="field-help">A logo oficial versionada nunca é apagada. Remover a personalizada restaura somente o fallback.</p>
                                    <?php endif; ?>
                                </div>
                            <?php endif; ?>
                            <input id="<?= h($key) ?>" name="<?= h($key) ?>" type="file" accept="image/jpeg,image/png,image/webp">
                            <?php if (!empty($field['help'])): ?><p class="field-help"><?= h($field['help']) ?></p><?php endif; ?>
                            <?php if ($hasCustomFile): ?>
                                <button
                                    class="button warning small"
                                    type="submit"
                                    name="clear_setting_file"
                                    value="<?= h($key) ?>"
                                    formnovalidate
                                    onclick="return confirm(<?= h(json_encode(
                                                                (string) ($field['clear_confirm']
                                                                    ?? 'Remover somente esta imagem? Os textos e demais configurações serão mantidos.'),
                                                                JSON_UNESCAPED_UNICODE | JSON_HEX_APOS | JSON_HEX_QUOT
                                                            )) ?>);">
                                    <?= h((string) ($field['clear_label'] ?? 'Remover imagem')) ?>
                                </button>
                            <?php endif; ?>
                        <?php else: ?>
                            <label for="<?= h($key) ?>"><?= h($field['label']) ?></label>
                            <?php if ($field['type'] === 'textarea'): ?>
                                <textarea
                                    id="<?= h($key) ?>"
                                    name="<?= h($key) ?>"
                                    maxlength="<?= h((string) ($field['max'] ?? '')) ?>"
                                    <?= ($field['required'] ?? false) ? 'required' : '' ?>><?= h($settings[$key] ?? '') ?></textarea>
                            <?php else: ?>
                                <input
                                    id="<?= h($key) ?>"
                                    name="<?= h($key) ?>"
                                    type="<?= h($field['type']) ?>"
                                    value="<?= h($settings[$key] ?? '') ?>"
                                    <?= isset($field['max']) ? 'maxlength="' . h((string) $field['max']) . '"' : '' ?>
                                    <?= isset($field['max_value']) ? 'max="' . h((string) $field['max_value']) . '"' : '' ?>
                                    <?= ($field['type'] === 'number') ? 'min="0"' : '' ?>
                                    <?= ($field['required'] ?? false) ? 'required' : '' ?>>
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