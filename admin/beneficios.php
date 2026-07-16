<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/includes/simple-crud.php';
require_auth();

$benefitIconOptions = [
    'wifi' => 'Wi-Fi',
    'headset' => 'Atendimento',
    'credit-card' => 'Cartão de crédito',
    'camera' => 'Câmera',
    'tv' => 'TV',
];

run_simple_crud([
    'table' => 'benefits',
    'page' => 'beneficios.php',
    'title' => 'Benefícios',
    'singular' => 'Benefício',
    'description' => 'Gerencie os benefícios exibidos na seção Benefícios do site.',
    'order_by' => 'display_order ASC, id ASC',
    'empty_message' => 'Nenhum benefício cadastrado.',
    'reject_extra_fields' => true,
    'duplicate_message' => 'Já existe um benefício com este identificador.',
    'validate' => static function (array $values): array {
        $errors = [];
        $ctaLabel = trim((string) ($values['cta_label'] ?? ''));
        $ctaHref = trim((string) ($values['cta_href'] ?? ''));

        if ($ctaLabel !== '' && $ctaHref === '') {
            $errors[] = 'Informe o link do botão quando o texto do botão for preenchido.';
        }
        if ($ctaHref !== '' && $ctaLabel === '') {
            $errors[] = 'Informe o texto do botão quando o link do botão for preenchido.';
        }

        return $errors;
    },
    'fields' => [
        'slug' => [
            'label' => 'Identificador',
            'type' => 'text',
            'required' => true,
            'max' => 100,
            'placeholder' => 'atendimento-humano',
            'html_pattern' => '[a-z0-9]+(?:-[a-z0-9]+)*',
            'pattern' => '/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
            'pattern_message' => 'Use apenas letras minúsculas, números e hífen no identificador.',
            'unique' => true,
            'unique_message' => 'Já existe um benefício com este identificador.',
            'help' => 'O identificador é usado pelo site. O valor camera-seguranca possui comportamento especial: só aparece quando um plano público mencionar câmera.',
        ],
        'icon' => [
            'label' => 'Ícone',
            'type' => 'select',
            'required' => true,
            'options' => $benefitIconOptions,
        ],
        'title' => [
            'label' => 'Título',
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
        'cta_label' => [
            'label' => 'Texto do botão',
            'type' => 'text',
            'max' => 120,
            'disallow_html' => true,
        ],
        'cta_href' => [
            'label' => 'Link do botão',
            'type' => 'url',
            'html_type' => 'text',
            'max' => 500,
            'allowed_schemes' => ['https', 'mailto', 'tel'],
            'allow_http_local' => true,
            'allow_hash' => true,
            'disallow_html' => true,
            'placeholder' => 'https://exemplo.com.br ou #contato',
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
