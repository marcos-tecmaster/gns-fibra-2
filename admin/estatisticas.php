<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/includes/simple-crud.php';
require_auth();

run_simple_crud([
    'table' => 'stats',
    'page' => 'estatisticas.php',
    'title' => 'Estatísticas',
    'singular' => 'Estatística',
    'description' => 'Gerencie os números e rótulos exibidos na seção Estatísticas do site.',
    'order_by' => 'display_order ASC, id ASC',
    'empty_message' => 'Nenhuma estatística cadastrada.',
    'reject_extra_fields' => true,
    'duplicate_message' => 'Já existe uma estatística com este identificador.',
    'fields' => [
        'slug' => [
            'label' => 'Identificador',
            'type' => 'text',
            'required' => true,
            'max' => 100,
            'placeholder' => 'anos-de-mercado',
            'html_pattern' => '[a-z0-9]+(?:-[a-z0-9]+)*',
            'pattern' => '/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
            'pattern_message' => 'Use apenas letras minúsculas, números e hífen no identificador.',
            'unique' => true,
            'unique_message' => 'Já existe uma estatística com este identificador.',
            'lowercase' => true,
            'full' => true,
            'help' => 'Identificador interno usado pela API e pelo site. Não use acentos, espaços ou símbolos.',
        ],
        'value' => [
            'label' => 'Valor',
            'type' => 'text',
            'required' => true,
            'max' => 60,
            'strip_tags' => true,
        ],
        'label' => [
            'label' => 'Rótulo',
            'type' => 'text',
            'required' => true,
            'max' => 140,
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
            'label' => 'Ativa',
            'type' => 'checkbox',
            'default' => 1,
        ],
    ],
    'columns' => [
        'value' => ['label' => 'Valor', 'limit' => 40],
        'label' => ['label' => 'Rótulo', 'limit' => 70],
        'display_order' => ['label' => 'Ordem'],
        'active' => ['label' => 'Status', 'type' => 'status'],
    ],
]);
