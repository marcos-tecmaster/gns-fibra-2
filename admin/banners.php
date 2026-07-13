<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/includes/simple-crud.php';
require_auth();

run_simple_crud([
    'table' => 'banners',
    'page' => 'banners.php',
    'title' => 'Banners',
    'singular' => 'Banner',
    'description' => 'Conteúdo promocional e imagem principal.',
    'order_by' => 'display_order, id',
    'fields' => [
        'title' => ['label' => 'Título', 'required' => true, 'max' => 180],
        'subtitle' => ['label' => 'Subtítulo', 'type' => 'textarea', 'full' => true],
        'image_path' => ['label' => 'Imagem', 'type' => 'file', 'directory' => 'banners'],
        'button_text' => ['label' => 'Texto do botão', 'max' => 100],
        'button_url' => ['label' => 'Link do botão', 'type' => 'url', 'max' => 1000],
        'display_order' => ['label' => 'Ordem', 'type' => 'number', 'min' => 0, 'default' => 0],
        'active' => ['label' => 'Ativo', 'type' => 'checkbox', 'default' => 1],
    ],
    'columns' => [
        'image_path' => ['label' => 'Imagem', 'type' => 'image'],
        'title' => ['label' => 'Título'],
        'button_text' => ['label' => 'Botão'],
        'active' => ['label' => 'Status', 'type' => 'status'],
    ],
]);
