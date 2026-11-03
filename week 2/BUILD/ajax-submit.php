
<?php
require 'config.php';
header('Content-Type: application/json');

$services = ['Web Development', 'UI/UX Design', 'SEO & Marketing', 'Maintenance & Support'];
$budgets = ['$1,000 - $3,000', '$3,000 - $5,000', '$5,000 - $10,000', '$10,000+'];

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$service = $_POST['service'] ?? '';
$budget = $_POST['budget'] ?? '';
$message = trim($_POST['message'] ?? '');

$errors = [];

if (!$name) $errors['name'] = 'Name is required';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Invalid email';
if (!preg_match('/^[0-9+\-\s]{10,15}$/', $phone)) $errors['phone'] = 'Invalid phone';
if (!in_array($service, $services)) $errors['service'] = 'Choose a service';
if (!in_array($budget, $budgets)) $errors['budget'] = 'Choose a budget';
if (strlen($message) < 10) $errors['message'] = 'Minimum 10 characters';

if ($errors) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

$items = getEnquiries();

array_unshift($items, [
    'id' => uniqid('enq_', true),
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'service' => $service,
    'budget' => $budget,
    'message' => $message,
    'status' => 'New',
    'created_at' => date('Y-m-d H:i:s')
]);

if (saveEnquiries($items)) {
    echo json_encode(['success' => true, 'message' => 'Enquiry submitted successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Could not save enquiry.']);
}
