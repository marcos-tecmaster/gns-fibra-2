<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_auth();

$counts = [
    'plans' => 0,
    'stats' => 0,
    'active_stats' => 0,
    'differentials' => 0,
    'active_differentials' => 0,
    'history_gallery' => 0,
    'active_history_gallery' => 0,
    'coverage' => 0,
    'testimonials' => 0,
    'benefits' => 0,
    'active_benefits' => 0,
    'technologies' => 0,
    'active_technologies' => 0,
    'faqs' => 0,
    'active_faqs' => 0,
];
$databaseError = null;

try {
    $counts['plans'] = (int) db()->query('SELECT COUNT(*) FROM plans')->fetchColumn();
    $counts['stats'] = (int) db()->query('SELECT COUNT(*) FROM stats')->fetchColumn();
    $counts['active_stats'] = (int) db()->query('SELECT COUNT(*) FROM stats WHERE active = 1')->fetchColumn();
    $counts['differentials'] = (int) db()->query('SELECT COUNT(*) FROM differentials')->fetchColumn();
    $counts['active_differentials'] = (int) db()->query('SELECT COUNT(*) FROM differentials WHERE active = 1')->fetchColumn();
    $counts['history_gallery'] = (int) db()->query('SELECT COUNT(*) FROM history_gallery')->fetchColumn();
    $counts['active_history_gallery'] = (int) db()->query('SELECT COUNT(*) FROM history_gallery WHERE active = 1')->fetchColumn();
    $counts['coverage'] = (int) db()->query('SELECT COUNT(*) FROM coverage')->fetchColumn();
    $counts['testimonials'] = (int) db()->query('SELECT COUNT(*) FROM testimonials')->fetchColumn();
    $counts['benefits'] = (int) db()->query('SELECT COUNT(*) FROM benefits')->fetchColumn();
    $counts['active_benefits'] = (int) db()->query('SELECT COUNT(*) FROM benefits WHERE active = 1')->fetchColumn();
    $counts['technologies'] = (int) db()->query('SELECT COUNT(*) FROM technologies')->fetchColumn();
    $counts['active_technologies'] = (int) db()->query('SELECT COUNT(*) FROM technologies WHERE active = 1')->fetchColumn();
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
        <span>Estatísticas ativas / total</span>
        <strong><?= $counts['active_stats'] ?>/<?= $counts['stats'] ?></strong>
        <a class="muted" href="estatisticas.php">Gerenciar estatísticas →</a>
    </article>
    <article class="card">
        <span>Diferenciais ativos / total</span>
        <strong><?= $counts['active_differentials'] ?>/<?= $counts['differentials'] ?></strong>
        <a class="muted" href="diferenciais.php">Gerenciar diferenciais →</a>
    </article>
    <article class="card">
        <span>Galeria da história ativos / total</span>
        <strong><?= $counts['active_history_gallery'] ?>/<?= $counts['history_gallery'] ?></strong>
        <a class="muted" href="historia-galeria.php">Gerenciar galeria →</a>
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
        <span>Benefícios ativos / total</span>
        <strong><?= $counts['active_benefits'] ?>/<?= $counts['benefits'] ?></strong>
        <a class="muted" href="beneficios.php">Gerenciar benefícios →</a>
    </article>
    <article class="card">
        <span>Tecnologias ativas / total</span>
        <strong><?= $counts['active_technologies'] ?>/<?= $counts['technologies'] ?></strong>
        <a class="muted" href="tecnologias.php">Gerenciar tecnologias →</a>
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
        <a class="button secondary" href="estatisticas.php?action=new">Nova estatística</a>
        <a class="button secondary" href="diferenciais.php?action=new">Novo diferencial</a>
        <a class="button secondary" href="historia-galeria.php?action=new">Novo item de história</a>
        <a class="button secondary" href="beneficios.php?action=new">Novo benefício</a>
        <a class="button secondary" href="tecnologias.php?action=new">Nova tecnologia</a>
        <a class="button secondary" href="banners.php?action=new">Nova imagem do Hero</a>
        <a class="button secondary" href="cobertura.php?action=new">Nova cobertura</a>
        <a class="button secondary" href="faqs.php?action=new">Nova FAQ</a>
        <a class="button secondary" href="configuracoes.php">Configurações</a>
        <a class="button secondary" href="../api/site-content.php" target="_blank" rel="noopener">Ver API</a>
    </div>
</section>
<?php admin_footer(); ?>
