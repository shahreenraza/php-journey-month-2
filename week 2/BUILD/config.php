<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

define('DATA_FILE', __DIR__ . '/data/enquiries.json');
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'AdminPass123!'); 

function e(?string $string): string {
    return htmlspecialchars($string ?? '', ENT_QUOTES, 'UTF-8');
}

function isLoggedIn(): bool {
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

function requireLogin(): void {
    if (!isLoggedIn()) {
        header('Location: login.php');
        exit;
    }
}

function getEnquiries(): array {
    if (!file_exists(DATA_FILE)) {
        return [];
    }
    $data = file_get_contents(DATA_FILE);
    $decoded = json_decode($data, true);
    return is_array($decoded) ? $decoded : [];
}

function saveEnquiries(array $enquiries): bool {
    $dir = dirname(DATA_FILE);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return file_put_contents(DATA_FILE, json_encode($enquiries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false;
}

function getDashboardStats(array $enquiries): array {
    $total = count($enquiries);
    $thisWeek = 0;
    $converted = 0;
    
    $startOfWeek = strtotime('monday this week 00:00:00');

    foreach ($enquiries as $item) {
        $itemTime = strtotime($item['created_at']);
        if ($itemTime >= $startOfWeek) {
            $thisWeek++;
        }
        if (($item['status'] ?? '') === 'Converted') {
            $converted++;
        }
    }

    $conversionRate = $total > 0 ? round(($converted / $total) * 100, 1) : 0;

    return [
        'total' => $total,
        'this_week' => $thisWeek,
        'conversion_rate' => $conversionRate
    ];
}