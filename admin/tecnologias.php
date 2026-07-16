<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/includes/simple-crud.php';
require_auth();

$technologyIconOptions = [
    'network' => 'Rede',
    'wifi' => 'Wi-Fi',
    'shield' => 'Proteção',
    'home' => 'Casa',
    'router' => 'Roteador',
    'zap' => 'Performance',
    'headset' => 'Atendimento',
];

run_simple_crud([
    'table' => 'technologies',
    'page' => 'tecnologias.php',
    'title' => 'Tecnologias',
    'singular' => 'Tecnologia',
    'description' => 'Gerencie as tecnologias exibidas na seção Tecnologias do site.',
    'order_by' => 'display_order ASC, id ASC',
    'empty_message' => 'Nenhuma tecnologia cadastrada.',
    'reject_extra_fields' => true,
    'duplicate_message' => 'Já existe uma tecnologia com este identificador.',
    'fields' => [
        'slug' => [
            'label' => 'Identificador',
            'type' => 'text',
            'required' => true,
            'max' => 100,
            'placeholder' => 'fibra-optica',
            'html_pattern' => '[a-z0-9]+(?:-[a-z0-9]+)*',
            'pattern' => '/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
            'pattern_message' => 'Use apenas letras minúsculas, números e hífen no identificador.',
            'unique' => true,
            'unique_message' => 'Já existe uma tecnologia com este identificador.',
            'lowercase' => true,
            'full' => true,
            'help' => 'Identificador interno usado pela API e pelo site. Use letras minúsculas, números e hífen.',
        ],
        'icon' => [
            'label' => 'Ícone',
            'type' => 'select',
            'required' => true,
            'options' => $technologyIconOptions,
        ],
        'name' => [
            'label' => 'Nome',
            'type' => 'text',
            'required' => true,
            'max' => 180,
            'full' => true,
            'strip_tags' => true,
        ],
        'description' => [
            'label' => 'Descrição',
            'type' => 'textarea',
            'required' => true,
            'max' => 2000,
            'full' => true,
            'strip_tags' => true,
        ],
        'availability' => [
            'label' => 'Disponibilidade',
            'type' => 'text',
            'required' => true,
            'max' => 140,
            'placeholder' => 'Conforme cobertura',
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
        'name' => ['label' => 'Nome', 'limit' => 60],
        'icon' => ['label' => 'Ícone'],
        'availability' => ['label' => 'Disponibilidade', 'limit' => 50],
        'description' => ['label' => 'Descrição', 'limit' => 90],
        'display_order' => ['label' => 'Ordem'],
        'active' => ['label' => 'Status', 'type' => 'status'],
    ],
]);
