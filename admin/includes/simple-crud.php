<?php
declare(strict_types=1);

function run_simple_crud(array $config): void
{
    $pdo = db();
    $table = $config['table'];
    $page = $config['page'];
    $fields = $config['fields'];
    $action = $_GET['action'] ?? 'list';
    $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT) ?: 0;

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        verify_csrf();

        if (($config['reject_extra_fields'] ?? false) === true) {
            $allowedPostFields = ['csrf_token' => true, 'form_action' => true, 'id' => true];
            foreach ($fields as $name => $_field) {
                $allowedPostFields[$name] = true;
            }
            foreach (array_keys($_POST) as $postField) {
                if (!isset($allowedPostFields[$postField])) {
                    flash('error', 'A requisição contém campos não permitidos.');
                    redirect($page);
                }
            }
        }

        if (post_string('form_action', 20) === 'delete') {
            $deleteId = post_int('id');
            $currentStatement = $pdo->prepare("SELECT * FROM {$table} WHERE id = :id");
            $currentStatement->execute(['id' => $deleteId]);
            $current = $currentStatement->fetch();

            if (!$current) {
                flash('error', $config['singular'] . ' não encontrado(a).');
                redirect($page);
            }

            $statement = $pdo->prepare("DELETE FROM {$table} WHERE id = :id");
            $statement->execute(['id' => $deleteId]);

            foreach ($fields as $name => $field) {
                if (($field['type'] ?? '') === 'file') {
                    delete_uploaded_file_if_unused(
                        $pdo,
                        $table,
                        $name,
                        isset($current[$name]) ? (string) $current[$name] : null,
                        $deleteId
                    );
                }
            }

            flash('success', $config['singular'] . ' excluído(a).');
            redirect($page);
        }

        $recordId = post_int('id');
        $values = [];
        $errors = [];
        $current = null;

        if ($recordId > 0) {
            $statement = $pdo->prepare("SELECT * FROM {$table} WHERE id = :id");
            $statement->execute(['id' => $recordId]);
            $current = $statement->fetch();

            if (!$current) {
                flash('error', $config['singular'] . ' não encontrado(a).');
                redirect($page);
            }
        }

        foreach ($fields as $name => $field) {
            $type = $field['type'] ?? 'text';

            if ($type === 'checkbox') {
                $values[$name] = post_bool($name);
            } elseif ($type === 'select') {
                $options = $field['options'] ?? [];
                $value = trim((string) ($_POST[$name] ?? ''));
                if (!array_key_exists($value, $options)) {
                    $errors[] = 'Selecione uma opção válida em ' . $field['label'] . '.';
                }
                $values[$name] = $value;
            } elseif ($type === 'number') {
                $rawNumber = $_POST[$name] ?? '';
                $number = filter_var($rawNumber, FILTER_VALIDATE_INT);
                if ($number === false) {
                    $errors[] = 'Informe um número válido em ' . $field['label'] . '.';
                    $number = (int) ($field['default'] ?? 0);
                }
                if (isset($field['min']) && $number < (int) $field['min']) {
                    $errors[] = 'O campo ' . $field['label'] . ' deve ser no mínimo ' . (int) $field['min'] . '.';
                }
                if (isset($field['max']) && $number > (int) $field['max']) {
                    $errors[] = 'O campo ' . $field['label'] . ' deve ser no máximo ' . (int) $field['max'] . '.';
                }
                $values[$name] = $number;
            } elseif ($type === 'file') {
                try {
                    $values[$name] = upload_image($name, $field['directory'], $current[$name] ?? null);
                } catch (RuntimeException $exception) {
                    $errors[] = $exception->getMessage();
                }
            } else {
                $maxLength = (int) ($field['max'] ?? 65535);
                $rawValue = trim((string) ($_POST[$name] ?? ''));
                if (($field['disallow_html'] ?? false) && ($rawValue !== strip_tags($rawValue) || str_contains($rawValue, '<') || str_contains($rawValue, '>'))) {
                    $errors[] = 'O campo ' . $field['label'] . ' não pode conter HTML.';
                }
                if (mb_strlen($rawValue) > $maxLength) {
                    $errors[] = 'O campo ' . $field['label'] . ' deve ter no máximo ' . $maxLength . ' caracteres.';
                }
                $value = mb_substr($rawValue, 0, $maxLength);
                $values[$name] = ($field['strip_tags'] ?? false) ? strip_tags($value) : $value;
            }

            if (($field['required'] ?? false) && ($values[$name] ?? '') === '') {
                $errors[] = 'Preencha o campo ' . $field['label'] . '.';
            }
            if (isset($field['pattern']) && ($values[$name] ?? '') !== '' && preg_match((string) $field['pattern'], (string) $values[$name]) !== 1) {
                $errors[] = $field['pattern_message'] ?? ('Informe um valor válido em ' . $field['label'] . '.');
            }
            if ($type === 'url' && ($values[$name] ?? '') !== '') {
                $urlError = simple_crud_validate_url((string) $values[$name], $field);
                if ($urlError !== null) {
                    $errors[] = $urlError;
                }
            }
        }

        foreach ($fields as $name => $field) {
            if (($field['unique'] ?? false) !== true || ($values[$name] ?? '') === '') {
                continue;
            }

            $uniqueStatement = $pdo->prepare("SELECT COUNT(*) FROM {$table} WHERE {$name} = :value AND id <> :id");
            $uniqueStatement->execute(['value' => $values[$name], 'id' => $recordId]);
            if ((int) $uniqueStatement->fetchColumn() > 0) {
                $errors[] = $field['unique_message'] ?? ('Já existe um registro com este valor em ' . $field['label'] . '.');
            }
        }

        foreach ($fields as $name => $field) {
            if (!isset($field['validate']) || !is_callable($field['validate'])) {
                continue;
            }
            $fieldError = $field['validate']($values[$name] ?? null, $values, $current);
            if (is_string($fieldError) && $fieldError !== '') {
                $errors[] = $fieldError;
            }
        }

        if (isset($config['validate']) && is_callable($config['validate'])) {
            $globalErrors = $config['validate']($values, $current);
            if (is_string($globalErrors) && $globalErrors !== '') {
                $errors[] = $globalErrors;
            } elseif (is_array($globalErrors)) {
                foreach ($globalErrors as $globalError) {
                    if (is_string($globalError) && $globalError !== '') {
                        $errors[] = $globalError;
                    }
                }
            }
        }

        if ($errors) {
            flash('error', implode(' ', $errors));
            redirect($page . '?action=' . ($recordId ? 'edit&id=' . $recordId : 'new'));
        }

        try {
            if ($recordId > 0) {
                $assignments = implode(', ', array_map(static fn(string $field): string => "{$field} = :{$field}", array_keys($values)));
                $values['id'] = $recordId;
                $pdo->prepare("UPDATE {$table} SET {$assignments} WHERE id = :id")->execute($values);
            } else {
                $columns = implode(', ', array_keys($values));
                $placeholders = implode(', ', array_map(static fn(string $field): string => ":{$field}", array_keys($values)));
                $pdo->prepare("INSERT INTO {$table} ({$columns}) VALUES ({$placeholders})")->execute($values);
            }
        } catch (PDOException $exception) {
            if ((string) $exception->getCode() === '23000') {
                flash('error', $config['duplicate_message'] ?? 'Já existe um registro com dados únicos iguais.');
                redirect($page . '?action=' . ($recordId ? 'edit&id=' . $recordId : 'new'));
            }
            throw $exception;
        }

        flash('success', $config['singular'] . ($recordId ? ' atualizado(a).' : ' criado(a).'));
        redirect($page);
    }

    $editing = null;
    if ($action === 'edit' && $id > 0) {
        $statement = $pdo->prepare("SELECT * FROM {$table} WHERE id = :id");
        $statement->execute(['id' => $id]);
        $editing = $statement->fetch() ?: null;
    } elseif ($action === 'new') {
        $editing = ['id' => 0];
        foreach ($fields as $name => $field) {
            $editing[$name] = $field['default'] ?? (($field['type'] ?? '') === 'checkbox' ? 0 : '');
        }
    }

    $orderBy = $config['order_by'] ?? 'id DESC';
    $records = $pdo->query("SELECT * FROM {$table} ORDER BY {$orderBy}")->fetchAll();
    admin_header($config['title']);

    if ($editing) {
        render_simple_form($config, $editing);
    } else {
        render_simple_table($config, $records);
    }

    admin_footer();
}

function render_simple_form(array $config, array $record): void
{
    ?>
    <section class="panel">
        <div class="panel-header">
            <h2><?= (int) $record['id'] > 0 ? 'Editar ' : 'Novo(a) ' ?><?= h(mb_strtolower($config['singular'])) ?></h2>
            <a class="button secondary" href="<?= h($config['page']) ?>">Cancelar</a>
        </div>
        <form method="post" enctype="multipart/form-data" class="form-grid">
            <?= csrf_field() ?>
            <input type="hidden" name="form_action" value="save">
            <input type="hidden" name="id" value="<?= (int) $record['id'] ?>">
            <?php foreach ($config['fields'] as $name => $field): ?>
                <?php
                $type = $field['type'] ?? 'text';
                $full = ($field['full'] ?? false) || in_array($type, ['textarea', 'file'], true);
                ?>
                <?php if ($type === 'checkbox'): ?>
                    <label class="check"><input type="checkbox" name="<?= h($name) ?>" <?= (int) ($record[$name] ?? 0) === 1 ? 'checked' : '' ?>> <?= h($field['label']) ?></label>
                <?php else: ?>
                    <div class="field <?= $full ? 'full' : '' ?>">
                        <label for="<?= h($name) ?>"><?= h($field['label']) ?></label>
                        <?php if ($type === 'textarea'): ?>
                            <textarea id="<?= h($name) ?>" name="<?= h($name) ?>"
                                      <?= isset($field['max']) ? 'maxlength="' . (int) $field['max'] . '"' : '' ?>
                                      <?= ($field['required'] ?? false) ? 'required' : '' ?>><?= h($record[$name] ?? '') ?></textarea>
                        <?php elseif ($type === 'file'): ?>
                            <?php if (!empty($record[$name])): ?><img class="image-preview" src="../<?= h($record[$name]) ?>" alt="Imagem atual"><?php endif; ?>
                            <input id="<?= h($name) ?>" name="<?= h($name) ?>" type="file" accept="image/jpeg,image/png,image/webp">
                        <?php elseif ($type === 'select'): ?>
                            <select id="<?= h($name) ?>" name="<?= h($name) ?>" <?= ($field['required'] ?? false) ? 'required' : '' ?>>
                                <?php foreach (($field['options'] ?? []) as $optionValue => $optionLabel): ?>
                                    <?php $optionValue = (string) $optionValue; ?>
                                    <option value="<?= h($optionValue) ?>" <?= (string) ($record[$name] ?? '') === $optionValue ? 'selected' : '' ?>><?= h((string) $optionLabel) ?></option>
                                <?php endforeach; ?>
                            </select>
                        <?php else: ?>
                            <?php $htmlType = (string) ($field['html_type'] ?? $type); ?>
                            <input id="<?= h($name) ?>" name="<?= h($name) ?>" type="<?= h($htmlType) ?>" value="<?= h((string) ($record[$name] ?? '')) ?>"
                                   <?= isset($field['max']) ? 'maxlength="' . (int) $field['max'] . '"' : '' ?>
                                   <?= isset($field['min']) ? 'min="' . (int) $field['min'] . '"' : '' ?>
                                   <?= $type === 'number' && isset($field['max']) ? 'max="' . (int) $field['max'] . '"' : '' ?>
                                   <?= isset($field['placeholder']) ? 'placeholder="' . h((string) $field['placeholder']) . '"' : '' ?>
                                   <?= isset($field['html_pattern']) ? 'pattern="' . h((string) $field['html_pattern']) . '"' : '' ?>
                                   <?= isset($field['inputmode']) ? 'inputmode="' . h((string) $field['inputmode']) . '"' : '' ?>
                                   <?= ($field['required'] ?? false) ? 'required' : '' ?>>
                        <?php endif; ?>
                        <?php if (!empty($field['help'])): ?>
                            <p class="field-help"><?= h((string) $field['help']) ?></p>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
            <div class="field full"><button class="button" type="submit">Salvar</button></div>
        </form>
    </section>
    <?php
}

function simple_crud_validate_url(string $value, array $field): ?string
{
    $label = (string) ($field['label'] ?? 'URL');

    if (($field['allow_hash'] ?? false) === true && str_starts_with($value, '#')) {
        return preg_match('/^#[A-Za-z0-9_-]+$/', $value) === 1
            ? null
            : 'Informe um link interno válido em ' . $label . '.';
    }

    if (str_contains($value, '<') || str_contains($value, '>') || $value !== strip_tags($value)) {
        return 'O campo ' . $label . ' não pode conter HTML.';
    }

    $parts = parse_url($value);
    $scheme = isset($parts['scheme']) ? mb_strtolower((string) $parts['scheme']) : '';
    $allowedSchemes = $field['allowed_schemes'] ?? null;

    if (is_array($allowedSchemes)) {
        $allowedSchemes = array_map(static fn($scheme): string => mb_strtolower((string) $scheme), $allowedSchemes);
        if (!in_array($scheme, $allowedSchemes, true)) {
            if ($scheme === 'http' && ($field['allow_http_local'] ?? false) === true && simple_crud_is_local_http_url($value)) {
                return null;
            }
            return 'Use um link com protocolo permitido em ' . $label . '.';
        }
    }

    if ($scheme === 'mailto') {
        $email = preg_replace('/\?.*$/', '', mb_substr($value, 7));
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false
            ? null
            : 'Informe um e-mail válido em ' . $label . '.';
    }

    if ($scheme === 'tel') {
        return preg_match('/^tel:\+?[0-9().\-\s]+$/', $value) === 1
            ? null
            : 'Informe um telefone válido em ' . $label . '.';
    }

    if (filter_var($value, FILTER_VALIDATE_URL) === false) {
        return 'Informe uma URL válida em ' . $label . '.';
    }

    if ($scheme === 'http' && ($field['allow_http_local'] ?? false) === true && !simple_crud_is_local_http_url($value)) {
        return 'Use HTTPS em ' . $label . ', exceto para endereços locais.';
    }

    return null;
}

function simple_crud_is_local_http_url(string $value): bool
{
    $host = parse_url($value, PHP_URL_HOST);
    if (!is_string($host)) {
        return false;
    }

    $host = mb_strtolower(trim($host, '[]'));
    return $host === 'localhost'
        || $host === '127.0.0.1'
        || $host === '::1'
        || str_ends_with($host, '.localhost')
        || str_ends_with($host, '.test');
}

function render_simple_table(array $config, array $records): void
{
    ?>
    <section class="panel">
        <div class="panel-header">
            <div><h2><?= h($config['title']) ?></h2><p class="muted"><?= h($config['description'] ?? '') ?></p></div>
            <a class="button" href="<?= h($config['page']) ?>?action=new">Adicionar</a>
        </div>
        <?php if (!$records): ?>
            <p class="muted"><?= h($config['empty_message'] ?? 'Nenhum registro encontrado.') ?></p>
        <?php else: ?>
        <table>
            <thead><tr>
                <?php foreach ($config['columns'] as $column): ?><th><?= h($column['label']) ?></th><?php endforeach; ?>
                <th>Ações</th>
            </tr></thead>
            <tbody>
            <?php foreach ($records as $record): ?>
                <tr>
                    <?php foreach ($config['columns'] as $name => $column): ?>
                        <td>
                            <?php if (($column['type'] ?? '') === 'status'): ?>
                                <span class="badge <?= (int) $record[$name] === 1 ? '' : 'off' ?>"><?= (int) $record[$name] === 1 ? 'Ativo' : 'Inativo' ?></span>
                            <?php elseif (($column['type'] ?? '') === 'image'): ?>
                                <?= $record[$name] ? '<img class="image-preview" src="../' . h($record[$name]) . '" alt="">' : '—' ?>
                            <?php else: ?>
                                <?= h(mb_strimwidth((string) ($record[$name] ?? ''), 0, (int) ($column['limit'] ?? 90), '…')) ?>
                            <?php endif; ?>
                        </td>
                    <?php endforeach; ?>
                    <td><div class="actions">
                        <a class="button secondary small" href="<?= h($config['page']) ?>?action=edit&id=<?= (int) $record['id'] ?>">Editar</a>
                        <form method="post" onsubmit="return confirm('Confirma a exclusão?')">
                            <?= csrf_field() ?><input type="hidden" name="form_action" value="delete"><input type="hidden" name="id" value="<?= (int) $record['id'] ?>">
                            <button class="button danger small" type="submit">Excluir</button>
                        </form>
                    </div></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
        <?php endif; ?>
    </section>
    <?php
}
