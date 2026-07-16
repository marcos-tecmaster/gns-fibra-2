<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_auth();

$counts = ['plans' => 0, 'coverage' => 0, 'testimonials' => 0, 'faqs' => 0, 'active_faqs' => 0];
$databaseError = null;

try {
    $counts['plans'] = (int) db()->query('SELECT COUNT(*) FROM plans')->fetchColumn();
    $counts['coverage'] = (int) db()->query('SELECT COUNT(*) FROM coverage')->fetchColumn();
    $counts['testimonials'] = (int) db()->query('SELECT COUNT(*) FROM testimonials')->fetchColumn();
    $counts['faqs'] = (int) db()->query('SELECT COUNT(*) FROM faqs')->fetchColumn();
    $counts['active_faqs'] = (int) db()->query('SELECT COUNT(*) FROM faqs WHERE active = 1')->fetchColumn();
} catch (PDOException) {
    $databaseError = 'Não foi possível consultar os indicadores do banco.';
}

admin_header('Dashboard');
?>
<?php if ($databaseError): ?>
    <div class="alert error"><?= h($databaseError) ?></div>
<?php endif; ?>

<section class="cards">
    <article class="card">
        <span>Planos cadastrados</span>
        <strong><?= $counts['plans'] ?></strong>
        <a class="muted" href="planos.php">Gerenciar planos →</a>
    </article>
    <article class="card">
        <span>Pontos de atendimento</span>
        <strong><?= $counts['coverage'] ?></strong>
        <a class="muted" href="cobertura.php">Gerenciar cobertura →</a>
    </article>
    <article class="card">
        <span>Depoimentos</span>
        <strong><?= $counts['testimonials'] ?></strong>
        <a class="muted" href="depoimentos.php">Gerenciar depoimentos →</a>
    </article>
    <article class="card">
        <span>FAQs ativas / total</span>
        <strong><?= $counts['active_faqs'] ?>/<?= $counts['faqs'] ?></strong>
        <a class="muted" href="faqs.php">Gerenciar FAQ →</a>
    </article>
</section>

<section class="panel">
    <div class="panel-header">
        <div>
            <h2>Acesso rápido</h2>
            <p class="muted">Atualize o conteúdo publicado pela futura API do site.</p>
        </div>
    </div>
    <div class="actions">
        <a class="button" href="planos.php?action=new">Novo plano</a>
        <a class="button secondary" href="banners.php?action=new">Novo banner</a>
        <a class="button secondary" href="cobertura.php?action=new">Nova cobertura</a>
        <a class="button secondary" href="faqs.php?action=new">Nova FAQ</a>
        <a class="button secondary" href="configuracoes.php">Configurações</a>
        <a class="button secondary" href="../api/site-content.php" target="_blank" rel="noopener">Ver API</a>
    </div>
</section>
<?php admin_footer(); ?>
