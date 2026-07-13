<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/includes/simple-crud.php';
require_auth();

run_simple_crud([
    'table' => 'testimonials',
    'page' => 'depoimentos.php',
    'title' => 'Depoimentos',
    'singular' => 'Depoimento',
    'description' => 'Avaliações exibidas no site.',
    'order_by' => 'display_order, id',
    'fields' => [
        'customer_name' => ['label' => 'Nome do cliente', 'required' => true, 'max' => 150],
        'city' => ['label' => 'Cidade', 'max' => 150],
        'testimonial_text' => ['label' => 'Depoimento', 'type' => 'textarea', 'required' => true, 'full' => true],
        'display_order' => ['label' => 'Ordem', 'type' => 'number', 'min' => 0, 'default' => 0],
        'active' => ['label' => 'Ativo', 'type' => 'checkbox', 'default' => 1],
    ],
    'columns' => [
        'customer_name' => ['label' => 'Cliente'],
        'city' => ['label' => 'Cidade'],
        'testimonial_text' => ['label' => 'Texto', 'limit' => 100],
        'active' => ['label' => 'Status', 'type' => 'status'],
    ],
]);
