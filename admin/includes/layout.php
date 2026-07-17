<?php
declare(strict_types=1);

function admin_header(string $title): void
{
    $current = basename($_SERVER['SCRIPT_NAME'] ?? '');
    $items = [
        'dashboard.php' => 'Dashboard',
        'planos.php' => 'Planos',
        'estatisticas.php' => 'Estatísticas',
        'diferenciais.php' => 'Diferenciais',
        'beneficios.php' => 'Benefícios',
        'tecnologias.php' => 'Tecnologias',
        'banners.php' => 'Banners',
        'cobertura.php' => 'Cobertura',
        'depoimentos.php' => 'Depoimentos',
        'faqs.php' => 'FAQ',
        'configuracoes.php' => 'Configurações',
        'usuarios.php' => 'Usuários',
        'trocar-senha.php' => 'Trocar senha',
    ];
    ?>
    <!doctype html>
    <html lang="pt-BR">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="noindex, nofollow">
        <title><?= h($title) ?> | GNS Admin</title>
        <link rel="icon" type="image/svg+xml" href="../favicon.svg">
        <link rel="stylesheet" href="assets/admin.css">
    </head>
    <body>
    <div class="admin-shell">
        <aside class="sidebar">
            <div class="sidebar-head">
                <a class="brand" href="dashboard.php">
                    <img src="../logo-gns.png" alt="GNS Fibra">
                    <span><strong>GNS Fibra</strong><small>Painel administrativo</small></span>
                </a>
                <a class="mobile-logout" href="logout.php">Sair</a>
            </div>
            <nav>
                <?php foreach ($items as $file => $label): ?>
                    <a class="<?= $current === $file ? 'active' : '' ?>" href="<?= h($file) ?>"><?= h($label) ?></a>
                <?php endforeach; ?>
            </nav>
            <div class="sidebar-footer">
                <span><?= h($_SESSION['admin_user_name'] ?? '') ?></span>
                <a href="logout.php">Sair</a>
            </div>
        </aside>
        <main class="content">
            <header class="topbar">
                <div>
                    <p class="eyebrow">Administração</p>
                    <h1><?= h($title) ?></h1>
                </div>
                <a class="button secondary" href="../" target="_blank" rel="noopener noreferrer">Ver site</a>
            </header>
            <?php foreach (consume_flashes() as $message): ?>
                <div class="alert <?= h($message['type']) ?>"><?= h($message['message']) ?></div>
            <?php endforeach; ?>
    <?php
}

function admin_footer(): void
{
    ?>
        </main>
    </div>
    </body>
    </html>
    <?php
}
