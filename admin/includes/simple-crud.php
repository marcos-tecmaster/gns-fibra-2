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
                if (mb_strlen($rawValue) > $maxLength) {
                    $errors[] = 'O campo ' . $field['label'] . ' deve ter no máximo ' . $maxLength . ' caracteres.';
                }
                $value = mb_substr($rawValue, 0, $maxLength);
                $values[$name] = ($field['strip_tags'] ?? false) ? strip_tags($value) : $value;
            }

            if (($field['required'] ?? false) && ($values[$name] ?? '') === '') {
                $errors[] = 'Preencha o campo ' . $field['label'] . '.';
            }
            if ($type === 'url' && $values[$name] !== '' && filter_var($values[$name], FILTER_VALIDATE_URL) === false) {
                $errors[] = 'Informe uma URL válida em ' . $field['label'] . '.';
            }
        }

        if ($errors) {
            flash('error', implode(' ', $errors));
            redirect($page . '?action=' . ($recordId ? 'edit&id=' . $recordId : 'new'));
        }

        if ($recordId > 0) {
            $assignments = implode(', ', array_map(static fn(string $field): string => "{$field} = :{$field}", array_keys($values)));
            $values['id'] = $recordId;
            $pdo->prepare("UPDATE {$table} SET {$assignments} WHERE id = :id")->execute($values);
        } else {
            $columns = implode(', ', array_keys($values));
            $placeholders = implode(', ', array_map(static fn(string $field): string => ":{$field}", array_keys($values)));
            $pdo->prepare("INSERT INTO {$table} ({$columns}) VALUES ({$placeholders})")->execute($values);
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
                        <?php else: ?>
                            <input id="<?= h($name) ?>" name="<?= h($name) ?>" type="<?= h($type) ?>" value="<?= h((string) ($record[$name] ?? '')) ?>"
                                   <?= isset($field['max']) ? 'maxlength="' . (int) $field['max'] . '"' : '' ?>
                                   <?= isset($field['min']) ? 'min="' . (int) $field['min'] . '"' : '' ?>
                                   <?= $type === 'number' && isset($field['max']) ? 'max="' . (int) $field['max'] . '"' : '' ?>
                                   <?= ($field['required'] ?? false) ? 'required' : '' ?>>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
            <div class="field full"><button class="button" type="submit">Salvar</button></div>
        </form>
    </section>
    <?php
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
