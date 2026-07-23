<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';
require_once __DIR__ . '/includes/simple-crud.php';
require_auth();
$parseCampaignDate = static function (string $value): ?DateTimeImmutable {
    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);
    $errors = DateTimeImmutable::getLastErrors();
    if ($date === false) {
        return null;
    }
    if (
        $errors !== false
        && (
            (int) $errors['warning_count'] > 0
            || (int) $errors['error_count'] > 0
        )
    ) {
        return null;
    }
    return $date->format('Y-m-d') === $value ? $date : null;
};
run_simple_crud([
    'table' => 'campaigns',
    'page' => 'campanhas.php',
    'title' => 'Campanhas',
    'singular' => 'Campanha',
    'description' => 'Gerencie campanhas sazonais e comerciais exibidas no site.',
    'order_by' => 'starts_on DESC, display_order ASC, id DESC',
    'empty_message' => 'Nenhuma campanha cadastrada.',
    'reject_extra_fields' => true,
    'duplicate_message' => 'Já existe uma campanha com este identificador.',
    'file_clear_action' => [
        'field' => 'image_path',
        'label' => 'Remover imagem',
        'confirm' => 'Remover somente a imagem desta campanha? Os textos, datas e demais dados serão mantidos.',
        'success' => 'Imagem removida. Os demais dados da campanha foram preservados.',
    ],
    'fields' => [
        'slug' => [
            'label' => 'Identificador',
            'type' => 'text',
            'required' => true,
            'max' => 100,
            'placeholder' => 'campanha-de-verao',
            'html_pattern' => '[a-z0-9]+(?:-[a-z0-9]+)*',
            'pattern' => '/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
            'pattern_message' => 'Use apenas letras minúsculas, números e hífen no identificador.',
            'unique' => true,
            'unique_message' => 'Já existe uma campanha com este identificador.',
            'lowercase' => true,
            'full' => true,
            'help' => 'Identificador interno. Não use acentos, espaços ou símbolos.',
        ],
        'name' => [
            'label' => 'Nome interno',
            'type' => 'text',
            'required' => true,
            'max' => 180,
            'strip_tags' => true,
            'full' => true,
            'help' => 'Nome usado para identificar a campanha no painel.',
        ],
        'eyebrow' => [
            'label' => 'Chamada superior',
            'type' => 'text',
            'max' => 80,
            'strip_tags' => true,
            'full' => true,
            'help' => 'Texto curto exibido acima do título, como Campanha especial.',
        ],
        'headline' => [
            'label' => 'Título público',
            'type' => 'text',
            'required' => true,
            'max' => 220,
            'strip_tags' => true,
            'full' => true,
        ],
        'description' => [
            'label' => 'Descrição',
            'type' => 'textarea',
            'required' => true,
            'max' => 2500,
            'strip_tags' => true,
            'full' => true,
        ],
        'terms' => [
            'label' => 'Condições e observações',
            'type' => 'textarea',
            'max' => 5000,
            'strip_tags' => true,
            'full' => true,
            'help' => 'Informe somente condições comerciais confirmadas. Não use HTML.',
        ],
        'image_path' => [
            'label' => 'Imagem',
            'type' => 'file',
            'directory' => 'campaigns',
            'help' => 'Tamanho recomendado: 1500 x 1000 px, proporção 3:2. Use JPG, PNG ou WebP até 5 MB. Prefira artes sem textos importantes nas bordas.',
        ],
        'image_alt' => [
            'label' => 'Texto alternativo da imagem',
            'type' => 'text',
            'max' => 180,
            'strip_tags' => true,
            'full' => true,
            'help' => 'Obrigatório quando uma imagem estiver cadastrada.',
        ],
        'cta_label' => [
            'label' => 'Texto do botão',
            'type' => 'text',
            'required' => true,
            'max' => 100,
            'strip_tags' => true,
            'full' => true,
        ],
        'cta_url' => [
            'label' => 'Destino do botão',
            'type' => 'url',
            'required' => true,
            'max' => 1000,
            'allowed_schemes' => ['https', 'http'],
            'allow_hash' => true,
            'allow_http_local' => true,
            'placeholder' => '#planos',
            'full' => true,
            'help' => 'Aceita link interno iniciado por #, HTTPS ou HTTP somente em ambiente local.',
        ],
        'starts_on' => [
            'label' => 'Data de início',
            'type' => 'date',
            'required' => true,
            'max' => 10,
        ],
        'ends_on' => [
            'label' => 'Data de término',
            'type' => 'date',
            'required' => true,
            'max' => 10,
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
            'default' => 0,
        ],
    ],
    'validate' => static function (array $values, ?array $_current) use ($parseCampaignDate): array {
        $errors = [];
        $startsValue = trim((string) ($values['starts_on'] ?? ''));
        $endsValue = trim((string) ($values['ends_on'] ?? ''));
        $startsOn = $parseCampaignDate($startsValue);
        $endsOn = $parseCampaignDate($endsValue);
        if ($startsOn === null) {
            $errors[] = 'Informe uma data de início válida.';
        }
        if ($endsOn === null) {
            $errors[] = 'Informe uma data de término válida.';
        }
        if ($startsOn !== null && $endsOn !== null && $endsOn < $startsOn) {
            $errors[] = 'A data de término não pode ser anterior à data de início.';
        }
        $imagePath = trim((string) ($values['image_path'] ?? ''));
        $imageAlt = trim((string) ($values['image_alt'] ?? ''));
        if ($imagePath !== '' && $imageAlt === '') {
            $errors[] = 'Informe o texto alternativo da imagem.';
        }
        return $errors;
    },
    'columns' => [
        'image_path' => [
            'label' => 'Imagem',
            'type' => 'image',
        ],
        'name' => [
            'label' => 'Nome interno',
            'limit' => 45,
        ],
        'headline' => [
            'label' => 'Título público',
            'limit' => 65,
        ],
        'starts_on' => [
            'label' => 'Início',
        ],
        'ends_on' => [
            'label' => 'Término',
        ],
        'display_order' => [
            'label' => 'Ordem',
        ],
        'active' => [
            'label' => 'Status',
            'type' => 'status',
        ],
    ],
]);