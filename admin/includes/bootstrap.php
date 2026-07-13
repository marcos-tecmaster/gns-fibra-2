<?php
declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/config/database.php';
require_once dirname(__DIR__, 2) . '/config/security.php';
require_once dirname(__DIR__, 2) . '/config/auth.php';

send_security_headers();

function setting(string $key, string $default = ''): string
{
    static $settings = null;

    if ($settings === null) {
        $settings = [];
        try {
            foreach (db()->query('SELECT setting_key, setting_value FROM settings')->fetchAll() as $row) {
                $settings[$row['setting_key']] = $row['setting_value'];
            }
        } catch (PDOException) {
            $settings = [];
        }
    }

    return (string) ($settings[$key] ?? $default);
}
