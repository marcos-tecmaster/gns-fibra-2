<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';

require_auth();

$pdo = db();

$statusOptions = [
    'new' => 'Nova',
    'contacted' => 'Contatada',
    'qualified' => 'Qualificada',
    'installed' => 'Instalada',
    'rewarded' => 'Recompensada',
    'invalid' => 'Inválida',
    'cancelled' => 'Cancelada',
];

function referral_admin_format_date(?string $value): string
{
    if ($value === null || trim($value) === '') {
        return '—';
    }

    try {
        return (new DateTimeImmutable($value))->format('d/m/Y H:i');
    } catch (Throwable) {
        return '—';
    }
}

function referral_admin_format_phone(string $value): string
{
    $digits = preg_replace('/\D+/', '', $value) ?? '';

    if (strlen($digits) === 11) {
        return sprintf(
            '(%s) %s-%s',
            substr($digits, 0, 2),
            substr($digits, 2, 5),
            substr($digits, 7, 4)
        );
    }

    if (strlen($digits) === 10) {
        return sprintf(
            '(%s) %s-%s',
            substr($digits, 0, 2),
            substr($digits, 2, 4),
            substr($digits, 6, 4)
        );
    }

    return $value;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();

    $allowedPostFields = [
        'csrf_token' => true,
        'form_action' => true,
        'id' => true,
        'status' => true,
        'notes' => true,
    ];

    foreach (array_keys($_POST) as $postField) {
        if (!isset($allowedPostFields[$postField])) {
            flash('error', 'A requisição contém campos não permitidos.');
            redirect('indicacoes.php');
        }

        if ($postField !== 'csrf_token' && is_array($_POST[$postField])) {
            flash('error', 'O formato dos dados enviados é inválido.');
            redirect('indicacoes.php');
        }
    }

    if (post_string('form_action', 20) !== 'update') {
        flash('error', 'A ação solicitada não é válida.');
        redirect('indicacoes.php');
    }

    $referralId = post_int('id');
    $status = post_string('status', 30);
    $notes = post_string('notes', 5000);

    if ($referralId <= 0) {
        flash('error', 'Indicação não encontrada.');
        redirect('indicacoes.php');
    }

    if (!array_key_exists($status, $statusOptions)) {
        flash('error', 'Selecione um status válido.');
        redirect('indicacoes.php?action=edit&id=' . $referralId);
    }

    if ($notes !== strip_tags($notes) || str_contains($notes, '<') || str_contains($notes, '>')) {
        flash('error', 'As observações internas não podem conter HTML.');
        redirect('indicacoes.php?action=edit&id=' . $referralId);
    }

    $existingStatement = $pdo->prepare(
        'SELECT id
         FROM referrals
         WHERE id = :id'
    );

    $existingStatement->execute([
        'id' => $referralId,
    ]);

    if ($existingStatement->fetchColumn() === false) {
        flash('error', 'Indicação não encontrada.');
        redirect('indicacoes.php');
    }

    $updateStatement = $pdo->prepare(
        'UPDATE referrals
         SET status = :status,
             notes = :notes
         WHERE id = :id'
    );

    $updateStatement->execute([
        'status' => $status,
        'notes' => trim($notes) !== '' ? trim($notes) : null,
        'id' => $referralId,
    ]);

    flash('success', 'Indicação atualizada com sucesso.');
    redirect('indicacoes.php?action=edit&id=' . $referralId);
}

$filterStatus = trim((string) ($_GET['status'] ?? ''));

if ($filterStatus !== '' && !array_key_exists($filterStatus, $statusOptions)) {
    $filterStatus = '';
}

$action = trim((string) ($_GET['action'] ?? 'list'));
$referralId = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT) ?: 0;

$editing = null;

if ($action === 'edit' && $referralId > 0) {
    $editingStatement = $pdo->prepare(
        'SELECT *
         FROM referrals
         WHERE id = :id'
    );

    $editingStatement->execute([
        'id' => $referralId,
    ]);

    $editing = $editingStatement->fetch() ?: null;

    if ($editing === null) {
        flash('error', 'Indicação não encontrada.');
        redirect('indicacoes.php');
    }
}

$countRows = $pdo->query(
    'SELECT status, COUNT(*) AS total
     FROM referrals
     GROUP BY status'
)->fetchAll();

$statusCounts = array_fill_keys(array_keys($statusOptions), 0);
$totalReferrals = 0;

foreach ($countRows as $countRow) {
    $rowStatus = (string) ($countRow['status'] ?? '');
    $rowTotal = (int) ($countRow['total'] ?? 0);

    if (array_key_exists($rowStatus, $statusCounts)) {
        $statusCounts[$rowStatus] = $rowTotal;
    }

    $totalReferrals += $rowTotal;
}

if ($filterStatus !== '') {
    $listStatement = $pdo->prepare(
        'SELECT *
         FROM referrals
         WHERE status = :status
         ORDER BY created_at DESC, id DESC'
    );

    $listStatement->execute([
        'status' => $filterStatus,
    ]);

    $referrals = $listStatement->fetchAll();
} else {
    $referrals = $pdo->query(
        'SELECT *
         FROM referrals
         ORDER BY created_at DESC, id DESC'
    )->fetchAll();
}

admin_header('Indicações');
?>

<?php if ($editing !== null): ?>
    <section class="panel">
        <div class="panel-header">
            <div>
                <h2>Indicação #<?= (int) $editing['id'] ?></h2>
                <p class="muted">
                    Recebida em <?= h(referral_admin_format_date((string) $editing['created_at'])) ?>
                </p>
            </div>
            <a class="button secondary" href="indicacoes.php">Voltar</a>
        </div>

        <div class="cards">
            <article class="card">
                <span>Cliente indicador</span>
                <strong><?= h((string) $editing['referrer_name']) ?></strong>
                <span class="muted">
                    <?= h(referral_admin_format_phone((string) $editing['referrer_phone'])) ?>
                </span>
                <span class="muted">
                    Contrato:
                    <?= h(trim((string) ($editing['referrer_contract'] ?? '')) !== ''
                        ? (string) $editing['referrer_contract']
                        : 'Não informado') ?>
                </span>
            </article>

            <article class="card">
                <span>Pessoa indicada</span>
                <strong><?= h((string) $editing['referred_name']) ?></strong>
                <span class="muted">
                    <?= h(referral_admin_format_phone((string) $editing['referred_phone'])) ?>
                </span>
                <span class="muted">
                    <?= h((string) $editing['referred_neighborhood']) ?>,
                    <?= h((string) $editing['referred_city']) ?>
                </span>
            </article>

            <article class="card">
                <span>Consentimento</span>
                <strong><?= (int) $editing['consent'] === 1 ? 'Confirmado' : 'Não confirmado' ?></strong>
                <span class="muted">
                    Registrado em
                    <?= h(referral_admin_format_date((string) $editing['consent_at'])) ?>
                </span>
                <span class="muted">
                    Versão da privacidade:
                    <?= h((string) $editing['privacy_version']) ?>
                </span>
            </article>

            <article class="card">
                <span>Origem</span>
                <strong><?= h((string) $editing['source']) ?></strong>
                <span class="muted">
                    Última atualização:
                    <?= h(referral_admin_format_date((string) $editing['updated_at'])) ?>
                </span>
            </article>
        </div>

        <form method="post" class="form-grid">
            <?= csrf_field() ?>

            <input type="hidden" name="form_action" value="update">
            <input type="hidden" name="id" value="<?= (int) $editing['id'] ?>">

            <div class="field">
                <label for="status">Status operacional</label>
                <select id="status" name="status" required>
                    <?php foreach ($statusOptions as $statusValue => $statusLabel): ?>
                        <option
                            value="<?= h($statusValue) ?>"
                            <?= (string) $editing['status'] === $statusValue ? 'selected' : '' ?>
                        >
                            <?= h($statusLabel) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="field full">
                <label for="notes">Observações internas</label>
                <textarea
                    id="notes"
                    name="notes"
                    maxlength="5000"
                ><?= h((string) ($editing['notes'] ?? '')) ?></textarea>
                <p class="field-help">
                    Campo interno. Não é publicado no site nem enviado à pessoa indicada.
                </p>
            </div>

            <div class="field full">
                <button class="button" type="submit">Salvar acompanhamento</button>
            </div>
        </form>
    </section>
<?php else: ?>
    <section class="cards">
        <article class="card">
            <span>Total de indicações</span>
            <strong><?= $totalReferrals ?></strong>
        </article>

        <article class="card">
            <span>Novas</span>
            <strong><?= $statusCounts['new'] ?></strong>
        </article>

        <article class="card">
            <span>Contatadas</span>
            <strong><?= $statusCounts['contacted'] ?></strong>
        </article>

        <article class="card">
            <span>Instaladas</span>
            <strong><?= $statusCounts['installed'] ?></strong>
        </article>

        <article class="card">
            <span>Recompensadas</span>
            <strong><?= $statusCounts['rewarded'] ?></strong>
        </article>
    </section>

    <section class="panel">
        <div class="panel-header">
            <div>
                <h2>Indique e Ganhe</h2>
                <p class="muted">
                    Acompanhe as indicações recebidas pelo formulário público.
                    A recompensa nunca é concedida automaticamente.
                </p>
            </div>
        </div>

        <form method="get" class="form-grid">
            <div class="field">
                <label for="status">Filtrar por status</label>
                <select id="status" name="status">
                    <option value="">Todos</option>

                    <?php foreach ($statusOptions as $statusValue => $statusLabel): ?>
                        <option
                            value="<?= h($statusValue) ?>"
                            <?= $filterStatus === $statusValue ? 'selected' : '' ?>
                        >
                            <?= h($statusLabel) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="field">
                <label>&nbsp;</label>
                <div class="actions">
                    <button class="button" type="submit">Filtrar</button>
                    <a class="button secondary" href="indicacoes.php">Limpar</a>
                </div>
            </div>
        </form>

        <?php if ($referrals === []): ?>
            <p class="muted">Nenhuma indicação encontrada.</p>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>Indicador</th>
                        <th>Pessoa indicada</th>
                        <th>Localidade</th>
                        <th>Status</th>
                        <th>Recebida em</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <?php foreach ($referrals as $referral): ?>
                        <tr>
                            <td>
                                <strong><?= h((string) $referral['referrer_name']) ?></strong><br>
                                <span class="muted">
                                    <?= h(referral_admin_format_phone((string) $referral['referrer_phone'])) ?>
                                </span>
                            </td>

                            <td>
                                <strong><?= h((string) $referral['referred_name']) ?></strong><br>
                                <span class="muted">
                                    <?= h(referral_admin_format_phone((string) $referral['referred_phone'])) ?>
                                </span>
                            </td>

                            <td>
                                <?= h((string) $referral['referred_neighborhood']) ?><br>
                                <span class="muted"><?= h((string) $referral['referred_city']) ?></span>
                            </td>

                            <td>
                                <?= h($statusOptions[(string) $referral['status']] ?? 'Desconhecido') ?>
                            </td>

                            <td>
                                <?= h(referral_admin_format_date((string) $referral['created_at'])) ?>
                            </td>

                            <td>
                                <a
                                    class="button secondary small"
                                    href="indicacoes.php?action=edit&id=<?= (int) $referral['id'] ?>"
                                >
                                    Acompanhar
                                </a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </section>
<?php endif; ?>

<?php admin_footer(); ?>