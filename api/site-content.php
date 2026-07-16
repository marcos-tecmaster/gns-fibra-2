<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/config/database.php';
require_once dirname(__DIR__) . '/config/security.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=60, stale-while-revalidate=300');
send_security_headers(true);

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    header('Allow: GET');
    echo json_encode(['error' => 'Método não permitido.'], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $pdo = db();

    $settings = [];
    foreach ($pdo->query('SELECT setting_key, setting_value FROM settings')->fetchAll() as $row) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }

    $plans = $pdo->query(
        'SELECT id, name, speed, unit, price, audience, benefits, payment_method, featured, display_order
         FROM plans WHERE active = 1 ORDER BY display_order, id'
    )->fetchAll();

    foreach ($plans as &$plan) {
        $plan['id'] = (int) $plan['id'];
        $plan['price'] = (float) $plan['price'];
        $plan['featured'] = (bool) $plan['featured'];
        $plan['display_order'] = (int) $plan['display_order'];
        $plan['benefits'] = json_decode((string) $plan['benefits'], true) ?: [];
    }
    unset($plan);

    $coverage = $pdo->query(
        'SELECT id, region, description, map_url, display_order
         FROM coverage WHERE active = 1 ORDER BY display_order, id'
    )->fetchAll();

    foreach ($coverage as &$area) {
        $area['id'] = (int) $area['id'];
        $area['display_order'] = (int) $area['display_order'];
        $area['map_url'] = (string) ($area['map_url'] ?? '');
    }
    unset($area);

    $testimonials = $pdo->query(
        'SELECT id, customer_name, testimonial_text, city, display_order
         FROM testimonials WHERE active = 1 ORDER BY display_order, id'
    )->fetchAll();

    $banners = $pdo->query(
        'SELECT id, title, subtitle, image_path, button_text, button_url, display_order
         FROM banners WHERE active = 1 ORDER BY display_order, id'
    )->fetchAll();

    $benefits = $pdo->query(
        'SELECT id, slug, icon, title, description, cta_label, cta_href, active, display_order
         FROM benefits WHERE active = 1 ORDER BY display_order, id'
    )->fetchAll();

    foreach ($benefits as &$benefit) {
        $benefit['id'] = (int) $benefit['id'];
        $benefit['slug'] = (string) $benefit['slug'];
        $benefit['icon'] = (string) $benefit['icon'];
        $benefit['title'] = (string) $benefit['title'];
        $benefit['description'] = (string) $benefit['description'];
        $benefit['cta_label'] = $benefit['cta_label'] !== null ? (string) $benefit['cta_label'] : null;
        $benefit['cta_href'] = $benefit['cta_href'] !== null ? (string) $benefit['cta_href'] : null;
        $benefit['active'] = (bool) $benefit['active'];
        $benefit['display_order'] = (int) $benefit['display_order'];
    }
    unset($benefit);

    $faqs = $pdo->query(
        'SELECT id, question, answer, active, display_order
         FROM faqs WHERE active = 1 ORDER BY display_order, id'
    )->fetchAll();

    foreach ($faqs as &$faq) {
        $faq['id'] = (int) $faq['id'];
        $faq['question'] = (string) $faq['question'];
        $faq['answer'] = (string) $faq['answer'];
        $faq['active'] = (bool) $faq['active'];
        $faq['display_order'] = (int) $faq['display_order'];
    }
    unset($faq);

    echo json_encode([
        'settings' => $settings,
        'plans' => $plans,
        'coverage' => $coverage,
        'testimonials' => $testimonials,
        'banners' => $banners,
        'benefits' => $benefits,
        'faqs' => $faqs,
        'generated_at' => gmdate(DATE_ATOM),
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
} catch (Throwable) {
    http_response_code(500);
    echo json_encode(
        ['error' => 'Não foi possível carregar o conteúdo do site.'],
        JSON_UNESCAPED_UNICODE
    );
}
