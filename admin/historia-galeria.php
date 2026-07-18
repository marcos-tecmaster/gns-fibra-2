<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/includes/simple-crud.php';
require_auth();

run_simple_crud([
    'table' => 'history_gallery',
    'page' => 'historia-galeria.php',
    'title' => 'Galeria da história',
    'singular' => 'Imagem da história',
    'description' => 'Gerencie os cards e imagens exibidos na seção História / Quem Somos do site.',
    'order_by' => 'display_order ASC, id ASC',
    'empty_message' => 'Nenhum item cadastrado na galeria da história.',
    'reject_extra_fields' => true,
    'duplicate_message' => 'Já existe um item da galeria com este identificador.',
    'file_clear_action' => [
        'field' => 'image_path',
        'label' => 'Remover imagem',
        'confirm' => 'Remover somente esta imagem? O título, a descrição e os demais dados serão mantidos.',
    ],
    'fields' => [
        'slug' => [
            'label' => 'Identificador',
            'type' => 'text',
            'required' => true,
            'max' => 100,
            'placeholder' => 'estrutura',
            'html_pattern' => '[a-z0-9]+(?:-[a-z0-9]+)*',
            'pattern' => '/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
            'pattern_message' => 'Use apenas letras minúsculas, números e hífen no identificador.',
            'unique' => true,
            'unique_message' => 'Já existe um item da galeria com este identificador.',
            'lowercase' => true,
            'full' => true,
            'help' => 'Identificador interno usado pela API e pelo site. Não use acentos, espaços ou símbolos.',
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
            'max' => 1500,
            'strip_tags' => true,
            'full' => true,
        ],
        'image_path' => [
            'label' => 'Imagem',
            'type' => 'file',
            'directory' => 'history',
            'help' => 'Use JPG, PNG ou WebP até 5 MB. Se nenhuma imagem for enviada, o card usa o placeholder visual.',
        ],
        'image_alt' => [
            'label' => 'Texto alternativo',
            'type' => 'text',
            'required' => true,
            'max' => 180,
            'strip_tags' => true,
            'full' => true,
        ],
        'display_order' => [
            'label' => 'Ordem',
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
        'image_path' => ['label' => 'Imagem', 'type' => 'image'],
        'title' => ['label' => 'Título', 'limit' => 60],
        'description' => ['label' => 'Descrição', 'limit' => 90],
        'display_order' => ['label' => 'Ordem'],
        'active' => ['label' => 'Status', 'type' => 'status'],
    ],
]);
