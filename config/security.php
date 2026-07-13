<?php
declare(strict_types=1);

function send_security_headers(bool $api = false): void
{
    if (headers_sent()) {
        return;
    }

    header('X-Frame-Options: DENY');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()');
    header(
        "Content-Security-Policy: default-src 'self'; " .
        "base-uri 'self'; frame-ancestors 'none'; form-action 'self'; " .
        "img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " .
        "font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; " .
        "connect-src 'self'"
    );

    if (!$api) {
        header('Cache-Control: no-store, private');
        header('Pragma: no-cache');
    }

    $https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    if ($https) {
        header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
    }

    header_remove('X-Powered-By');
}
