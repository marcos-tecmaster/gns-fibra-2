<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/config/database.php';
require_once dirname(__DIR__) . '/config/security.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');
header('Pragma: no-cache');
send_security_headers(true);

function referral_response(int $status, array $payload): never
{
    http_response_code($status);

    echo json_encode(
        $payload,
        JSON_UNESCAPED_UNICODE |
        JSON_UNESCAPED_SLASHES |
        JSON_THROW_ON_ERROR
    );

    exit;
}

function referral_normalize_text(mixed $value): string
{
    if (!is_string($value)) {
        return '';
    }

    return trim(preg_replace('/\s+/u', ' ', $value) ?? '');
}

function referral_normalize_phone(mixed $value): string
{
    if (!is_string($value)) {
        return '';
    }

    return preg_replace('/\D+/', '', $value) ?? '';
}

function referral_client_ip(): string
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';

    if (!is_string($ip) || filter_var($ip, FILTER_VALIDATE_IP) === false) {
        return 'unknown';
    }

    return $ip;
}

function referral_ip_hash(string $ip): string
{
    /*
     * Hash rotativo diário para reduzir a retenção de um identificador estável.
     * Não armazena o endereço IP original.
     */
    $dailyContext = gmdate('Y-m-d') . '|gns-referrals-v1';

    return hash('sha256', $ip . '|' . $dailyContext);
}

function referral_same_origin(): bool
{
    $host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));

    if ($host === '') {
        return false;
    }

    $origin = trim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));

    if ($origin !== '') {
        $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
        $originPort = parse_url($origin, PHP_URL_PORT);

        if ($originHost === '') {
            return false;
        }

        $expectedHost = strtolower((string) preg_replace('/:\d+$/', '', $host));

        if ($originHost !== $expectedHost) {
            return false;
        }

        if ($originPort !== null && !str_contains($host, ':' . $originPort)) {
            return false;
        }

        return true;
    }

    $referer = trim((string) ($_SERVER['HTTP_REFERER'] ?? ''));

    if ($referer !== '') {
        $refererHost = strtolower((string) parse_url($referer, PHP_URL_HOST));
        $expectedHost = strtolower((string) preg_replace('/:\d+$/', '', $host));

        return $refererHost !== '' && $refererHost === $expectedHost;
    }

    /*
     * Clientes sem Origin/Referer serão aceitos somente em ambiente local.
     * Navegadores normais enviam pelo menos um desses cabeçalhos.
     */
    return in_array(
        referral_client_ip(),
        ['127.0.0.1', '::1'],
        true
    );
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');

    referral_response(405, [
        'success' => false,
        'error' => 'Método não permitido.',
    ]);
}

if (!referral_same_origin()) {
    referral_response(403, [
        'success' => false,
        'error' => 'Origem da solicitação não permitida.',
    ]);
}

$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));

if (!str_starts_with($contentType, 'application/json')) {
    referral_response(415, [
        'success' => false,
        'error' => 'Envie os dados no formato JSON.',
    ]);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);

if ($contentLength > 16384) {
    referral_response(413, [
        'success' => false,
        'error' => 'O conteúdo enviado ultrapassa o limite permitido.',
    ]);
}

$rawBody = file_get_contents('php://input');

if (!is_string($rawBody) || trim($rawBody) === '') {
    referral_response(400, [
        'success' => false,
        'error' => 'Nenhum dado foi enviado.',
    ]);
}

try {
    $input = json_decode(
        $rawBody,
        true,
        32,
        JSON_THROW_ON_ERROR
    );
} catch (JsonException) {
    referral_response(400, [
        'success' => false,
        'error' => 'O JSON enviado é inválido.',
    ]);
}

if (!is_array($input) || array_is_list($input)) {
    referral_response(400, [
        'success' => false,
        'error' => 'O formato dos dados é inválido.',
    ]);
}

$allowedFields = [
    'referrer_name',
    'referrer_phone',
    'referrer_contract',
    'referred_name',
    'referred_phone',
    'referred_city',
    'referred_neighborhood',
    'consent',
    'website',
];

$extraFields = array_diff(array_keys($input), $allowedFields);

if ($extraFields !== []) {
    referral_response(400, [
        'success' => false,
        'error' => 'A solicitação contém campos não permitidos.',
    ]);
}

/*
 * Honeypot invisível.
 * Usuários reais deixam este campo vazio.
 */
$honeypot = referral_normalize_text($input['website'] ?? '');

if ($honeypot !== '') {
    referral_response(202, [
        'success' => true,
        'message' => 'Indicação recebida para análise.',
    ]);
}

$referrerName = referral_normalize_text($input['referrer_name'] ?? '');
$referrerPhone = referral_normalize_phone($input['referrer_phone'] ?? '');
$referrerContract = referral_normalize_text($input['referrer_contract'] ?? '');

$referredName = referral_normalize_text($input['referred_name'] ?? '');
$referredPhone = referral_normalize_phone($input['referred_phone'] ?? '');
$referredCity = referral_normalize_text($input['referred_city'] ?? '');
$referredNeighborhood = referral_normalize_text($input['referred_neighborhood'] ?? '');

$consent = $input['consent'] ?? false;
$consentAccepted = $consent === true || $consent === 1 || $consent === '1';

$errors = [];

if (mb_strlen($referrerName) < 3 || mb_strlen($referrerName) > 180) {
    $errors['referrer_name'] = 'Informe o nome do cliente indicador.';
}

if (
    strlen($referrerPhone) < 10 ||
    strlen($referrerPhone) > 13
) {
    $errors['referrer_phone'] = 'Informe um telefone válido para o cliente indicador.';
}

if (mb_strlen($referrerContract) > 100) {
    $errors['referrer_contract'] = 'O contrato informado ultrapassa o limite permitido.';
}

if (mb_strlen($referredName) < 3 || mb_strlen($referredName) > 180) {
    $errors['referred_name'] = 'Informe o nome da pessoa indicada.';
}

if (
    strlen($referredPhone) < 10 ||
    strlen($referredPhone) > 13
) {
    $errors['referred_phone'] = 'Informe um telefone válido para a pessoa indicada.';
}

if ($referrerPhone !== '' && $referrerPhone === $referredPhone) {
    $errors['referred_phone'] = 'O telefone indicado deve ser diferente do telefone do cliente.';
}

if (mb_strlen($referredCity) < 2 || mb_strlen($referredCity) > 120) {
    $errors['referred_city'] = 'Informe a cidade da pessoa indicada.';
}

if (
    mb_strlen($referredNeighborhood) < 2 ||
    mb_strlen($referredNeighborhood) > 150
) {
    $errors['referred_neighborhood'] = 'Informe o bairro da pessoa indicada.';
}

if (!$consentAccepted) {
    $errors['consent'] = 'O consentimento para envio da indicação é obrigatório.';
}

if ($errors !== []) {
    referral_response(422, [
        'success' => false,
        'error' => 'Revise os campos informados.',
        'fields' => $errors,
    ]);
}

try {
    $pdo = db();
    $clientIpHash = referral_ip_hash(referral_client_ip());

    /*
     * No máximo 5 registros pelo mesmo identificador técnico
     * dentro de uma hora.
     */
    $rateLimitStatement = $pdo->prepare(
        'SELECT COUNT(*)
         FROM referrals
         WHERE ip_hash = :ip_hash
           AND created_at >= (CURRENT_TIMESTAMP - INTERVAL 1 HOUR)'
    );

    $rateLimitStatement->execute([
        'ip_hash' => $clientIpHash,
    ]);

    if ((int) $rateLimitStatement->fetchColumn() >= 5) {
        referral_response(429, [
            'success' => false,
            'error' => 'Muitas indicações foram enviadas. Aguarde antes de tentar novamente.',
        ]);
    }

    /*
     * Evita repetir o mesmo telefone indicado no intervalo de 24 horas.
     */
    $duplicateStatement = $pdo->prepare(
        'SELECT id
         FROM referrals
         WHERE referred_phone = :referred_phone
           AND created_at >= (CURRENT_TIMESTAMP - INTERVAL 24 HOUR)
         LIMIT 1'
    );

    $duplicateStatement->execute([
        'referred_phone' => $referredPhone,
    ]);

    if ($duplicateStatement->fetchColumn() !== false) {
        referral_response(409, [
            'success' => false,
            'error' => 'Este telefone já foi indicado recentemente.',
        ]);
    }

    $insertStatement = $pdo->prepare(
        'INSERT INTO referrals (
            referrer_name,
            referrer_phone,
            referrer_contract,
            referred_name,
            referred_phone,
            referred_city,
            referred_neighborhood,
            consent,
            consent_at,
            privacy_version,
            status,
            source,
            notes,
            ip_hash
         ) VALUES (
            :referrer_name,
            :referrer_phone,
            :referrer_contract,
            :referred_name,
            :referred_phone,
            :referred_city,
            :referred_neighborhood,
            1,
            CURRENT_TIMESTAMP,
            :privacy_version,
            :status,
            :source,
            NULL,
            :ip_hash
         )'
    );

    $insertStatement->execute([
        'referrer_name' => $referrerName,
        'referrer_phone' => $referrerPhone,
        'referrer_contract' => $referrerContract !== ''
            ? $referrerContract
            : null,
        'referred_name' => $referredName,
        'referred_phone' => $referredPhone,
        'referred_city' => $referredCity,
        'referred_neighborhood' => $referredNeighborhood,
        'privacy_version' => '1.0',
        'status' => 'new',
        'source' => 'website',
        'ip_hash' => $clientIpHash,
    ]);

    referral_response(201, [
        'success' => true,
        'message' => 'Indicação enviada com sucesso. A equipe da GNS Fibra fará a análise.',
        'referral_id' => (int) $pdo->lastInsertId(),
    ]);
} catch (Throwable) {
    referral_response(500, [
        'success' => false,
        'error' => 'Não foi possível registrar a indicação.',
    ]);
}