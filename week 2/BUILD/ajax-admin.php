
<?php
require 'config.php';
requireLogin();
header('Content-Type: application/json');

$items = getEnquiries();
$action = $_POST['action'] ?? '';

if ($action === 'load') {
    $q = strtolower(trim($_POST['search'] ?? ''));
    $items = array_values(array_filter($items, fn($x) =>
        str_contains(strtolower($x['name'].' '.$x['email']), $q)
    ));
    echo json_encode($items);
    exit;
}

$id = $_POST['id'] ?? '';

foreach ($items as &$item) {
    if ($item['id'] !== $id) continue;

    if ($action === 'status') {
        $status = $_POST['status'] ?? '';
        if (!in_array($status, ['New','Contacted','Converted','Closed'])) break;
        $item['status'] = $status;
    } elseif ($action === 'delete') {
        unset($item);
        $items = array_values(array_filter($items, fn($x) => $x['id'] !== $id));
    }
    break;
}
unset($item);

if (in_array($action, ['status','delete'])) {
    echo json_encode(['success' => saveEnquiries($items)]);
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Invalid action']);
