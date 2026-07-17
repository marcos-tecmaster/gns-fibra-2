<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/includes/simple-crud.php';
require_auth();

$differentialIconOptions = [
    'wifi' => 'Wi-Fi',
    'zap' => 'Performance',
    'headset' => 'Atendimento',
    'shield' => 'Proteção',
    'home' => 'Casa',
];

run_simple_crud([
    'table' => 'differentials',
    'page' => 'diferenciais.php',
    'title' => 'Diferenciais',
    'singular' => 'Diferencial',
    'description' => 'Gerencie os cards exibidos na seção Diferenciais do site.',
    'order_by' => 'display_order ASC, id ASC',
    'empty_message' => 'Nenhum diferencial cadastrado.',
    'reject_extra_fields' => true,
    'duplicate_message' => 'Já existe um diferencial com este identificador.',
    'fields' => [
        'slug' => [
            'label' => 'Identificador',
            'type' => 'text',
            'required' => true,
            'max' => 100,
            'placeholder' => 'fibra-ponta-a-ponta',
            'html_pattern' => '[a-z0-9]+(?:-[a-z0-9]+)*',
            'pattern' => '/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
            'pattern_message' => 'Use apenas letras minúsculas, números e hífen no identificador.',
            'unique' => true,
            'unique_message' => 'Já existe um diferencial com este identificador.',
            'lowercase' => true,
            'full' => true,
            'help' => 'Identificador interno usado pela API e pelo site. Não use acentos, espaços ou símbolos.',
        ],
        'icon' => [
            'label' => 'Ícone',
            'type' => 'select',
            'required' => true,
            'options' => $differentialIconOptions,
        ],
        'title' => [
            'label' => 'Título',
            'type' => 'text',
            'required' => true,
            'max' => 180,
            'strip_tags' => true,
            'full' => true,
        ],
        'description' => [
            'label' => 'Descrição',
            'type' => 'textarea',
            'required' => true,
            'max' => 2000,
            'strip_tags' => true,
            'full' => true,
        ],
        'display_order' => [
            'label' => 'Ordem de exibição',
            'type' => 'number',
            'min' => 0,
            'max' => 10000,
            'default' => 0,
        ],
        'active' => [
            'label' => 'Ativo',
            'type' => 'checkbox',
            'default' => 1,
        ],
    ],
    'columns' => [
        'title' => ['label' => 'Título', 'limit' => 60],
        'icon' => ['label' => 'Ícone'],
        'description' => ['label' => 'Descrição', 'limit' => 90],
        'display_order' => ['label' => 'Ordem'],
        'active' => ['label' => 'Status', 'type' => 'status'],
    ],
]);
