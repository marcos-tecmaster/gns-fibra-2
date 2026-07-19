<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/includes/simple-crud.php';
require_auth();

run_simple_crud([
    'table' => 'banners',
    'page' => 'banners.php',
    'title' => 'Imagens do Hero',
    'singular' => 'Imagem do Hero',
    'description' => 'Gerencie as imagens de fundo do Hero. A primeira imagem ativa, pela ordem, será usada no site. Os textos do Hero são administrados em Configurações.',
    'order_by' => 'display_order, id',
    'reject_extra_fields' => true,
    'file_clear_action' => [
        'field' => 'image_path',
        'label' => 'Remover imagem',
        'confirm' => 'Remover somente esta imagem de fundo? A identificação interna, a observação, a ordem e o status serão mantidos.',
        'success' => 'Imagem de fundo removida com sucesso. Os dados internos do registro foram preservados.',
    ],
    'fields' => [
        'title' => ['label' => 'Identificação interna', 'required' => true, 'max' => 180, 'help' => 'Usada somente para localizar o registro no painel. Não aparece no site.'],
        'subtitle' => ['label' => 'Observação interna', 'type' => 'textarea', 'full' => true, 'help' => 'Campo opcional para organização da equipe. Não aparece no site.'],
        'image_path' => ['label' => 'Imagem de fundo', 'type' => 'file', 'directory' => 'banners', 'help' => 'A primeira imagem ativa com arquivo válido será usada como fundo do Hero.'],
        'display_order' => ['label' => 'Ordem', 'type' => 'number', 'min' => 0, 'default' => 0, 'help' => 'A menor ordem entre as imagens ativas tem prioridade.'],
        'active' => ['label' => 'Ativo', 'type' => 'checkbox', 'default' => 1],
    ],
    'columns' => [
        'image_path' => ['label' => 'Imagem de fundo', 'type' => 'image'],
        'title' => ['label' => 'Identificação interna'],
        'display_order' => ['label' => 'Ordem'],
        'active' => ['label' => 'Status', 'type' => 'status'],
    ],
]);
