<?php
require_once 'config.php';
requireLogin();

$enquiries = getEnquiries();

$filename = 'enquiries_export_' . date('Y-m-d_H-i-s') . '.csv';

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="' . $filename . '"');

$output = fopen('php://output', 'w');


fputcsv($output, ['ID', 'Date', 'Name', 'Email', 'Phone', 'Service', 'Budget', 'Message', 'Status'], ',', '"', '');

foreach ($enquiries as $item) {
    fputcsv($output, [
        $item['id'] ?? '',
        $item['created_at'] ?? '',
        $item['name'] ?? '',
        $item['email'] ?? '',
        $item['phone'] ?? '',
        $item['service'] ?? '',
        $item['budget'] ?? '',
        $item['message'] ?? '',
        $item['status'] ?? 'New'
  ], ',', '"', '');
}

fclose($output);
exit;