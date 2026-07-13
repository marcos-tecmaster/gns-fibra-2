<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/includes/simple-crud.php';
require_auth();

run_simple_crud([
    'table' => 'coverage',
    'page' => 'cobertura.php',
    'title' => 'Cobertura',
    'singular' => 'Região',
    'description' => 'Cidades, regiões, pontos de atendimento e mapas.',
    'order_by' => 'display_order, id',
    'fields' => [
        'region' => ['label' => 'Cidade ou região', 'required' => true, 'max' => 150],
        'description' => ['label' => 'Descrição', 'type' => 'textarea', 'full' => true],
        'map_url' => ['label' => 'Link do Google Maps', 'type' => 'url', 'max' => 1000, 'full' => true],
        'display_order' => ['label' => 'Ordem', 'type' => 'number', 'min' => 0, 'default' => 0],
        'active' => ['label' => 'Ativo', 'type' => 'checkbox', 'default' => 1],
    ],
    'columns' => [
        'display_order' => ['label' => 'Ordem'],
        'region' => ['label' => 'Cidade/região'],
        'description' => ['label' => 'Descrição', 'limit' => 70],
        'map_url' => ['label' => 'Google Maps', 'limit' => 45],
        'active' => ['label' => 'Status', 'type' => 'status'],
    ],
]);
