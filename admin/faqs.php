<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/includes/simple-crud.php';
require_auth();

run_simple_crud([
    'table' => 'faqs',
    'page' => 'faqs.php',
    'title' => 'Perguntas frequentes',
    'singular' => 'Pergunta frequente',
    'description' => 'Gerencie as dúvidas exibidas na seção FAQ do site.',
    'order_by' => 'display_order ASC, id ASC',
    'empty_message' => 'Nenhuma pergunta frequente cadastrada.',
    'fields' => [
        'question' => [
            'label' => 'Pergunta',
            'type' => 'text',
            'required' => true,
            'max' => 255,
            'full' => true,
            'strip_tags' => true,
        ],
        'answer' => [
            'label' => 'Resposta',
            'type' => 'textarea',
            'required' => true,
            'max' => 5000,
            'full' => true,
            'strip_tags' => true,
        ],
        'display_order' => [
            'label' => 'Ordem de exibição',
            'type' => 'number',
            'min' => 0,
            'max' => 10000,
            'default' => 0,
        ],
        'active' => [
            'label' => 'Ativa',
            'type' => 'checkbox',
            'default' => 1,
        ],
    ],
    'columns' => [
        'question' => ['label' => 'Pergunta', 'limit' => 70],
        'answer' => ['label' => 'Resposta', 'limit' => 90],
        'display_order' => ['label' => 'Ordem'],
        'active' => ['label' => 'Status', 'type' => 'status'],
    ],
]);
