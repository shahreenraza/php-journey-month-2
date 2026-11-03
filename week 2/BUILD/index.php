
<?php
require 'config.php';

$errors = [];
$success = '';

$services = [
    'Web Development',
    'UI/UX Design',
    'SEO & Marketing',
    'Maintenance & Support'
];

$budgets = [
    '$1,000 - $3,000',
    '$3,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000+'
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $service = $_POST['service'] ?? '';
    $budget = $_POST['budget'] ?? '';
    $message = trim($_POST['message'] ?? '');

    if (!$name) $errors['name'] = 'Name is required';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL))
        $errors['email'] = 'Enter a valid email';
    if (!preg_match('/^[0-9+\-\s]{10,15}$/', $phone))
        $errors['phone'] = 'Enter a valid phone number';
    if (!in_array($service, $services))
        $errors['service'] = 'Choose a service';
    if (!in_array($budget, $budgets))
        $errors['budget'] = 'Choose a budget';
    if (strlen($message) < 10)
        $errors['message'] = 'Enter at least 10 characters';

    if (!$errors) {
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
            $success = 'Enquiry submitted successfully!';
        } else {
            $errors['general'] = 'Could not save enquiry';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Enquiry Manager v2</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5" style="max-width:650px">
    <h2 class="mb-4">Submit an Enquiry</h2>

    <div id="result">
        <?php if ($success): ?>
            <div class="alert alert-success"><?= e($success) ?></div>
        <?php endif; ?>
        <?php if (isset($errors['general'])): ?>
            <div class="alert alert-danger"><?= e($errors['general']) ?></div>
        <?php endif; ?>
    </div>

    <form id="enquiry-form" method="POST" action="index.php">
        <?php foreach ([
            'name'=>'Full Name',
            'email'=>'Email',
            'phone'=>'Phone',
            'message'=>'Message'
        ] as $field=>$label): ?>
            <div class="mb-3">
                <label class="form-label"><?= e($label) ?></label>
                <?php if ($field === 'message'): ?>
                    <textarea class="form-control" name="message" required></textarea>
                <?php else: ?>
                    <input class="form-control" name="<?= e($field) ?>"
                        type="<?= $field === 'email' ? 'email' : 'text' ?>" required>
                <?php endif; ?>
                <small class="text-danger" id="error-<?= e($field) ?>">
                    <?= e($errors[$field] ?? '') ?>
                </small>
            </div>
        <?php endforeach; ?>

        <div class="mb-3">
            <label class="form-label">Service</label>
            <select class="form-select" name="service" required>
                <option value="">Choose service</option>
                <?php foreach ($services as $s): ?>
                    <option value="<?= e($s) ?>"><?= e($s) ?></option>
                <?php endforeach; ?>
            </select>
            <small class="text-danger" id="error-service"><?= e($errors['service'] ?? '') ?></small>
        </div>

        <div class="mb-3">
            <label class="form-label">Budget</label>
            <select class="form-select" name="budget" required>
                <option value="">Choose budget</option>
                <?php foreach ($budgets as $b): ?>
                    <option value="<?= e($b) ?>"><?= e($b) ?></option>
                <?php endforeach; ?>
            </select>
            <small class="text-danger" id="error-budget"><?= e($errors['budget'] ?? '') ?></small>
        </div>

        <button class="btn btn-primary w-100" type="submit">Submit Enquiry</button>
    </form>
</div>

<script>
const form = document.getElementById('enquiry-form');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    document.querySelectorAll('[id^="error-"]').forEach(el => el.textContent = '');
    document.getElementById('result').innerHTML = '';

    try {
        const response = await fetch('ajax-submit.php', {
            method: 'POST',
            body: new FormData(form)
        });

        const data = await response.json();

        if (!response.ok) {
            Object.entries(data.errors || {}).forEach(([field, message]) => {
                const el = document.getElementById('error-' + field);
                if (el) el.textContent = message;
            });
            return;
        }

        document.getElementById('result').innerHTML =
            '<div class="alert alert-success">' + data.message + '</div>';

        form.reset();
    } catch (error) {
        document.getElementById('result').innerHTML =
            '<div class="alert alert-danger">Request failed. Please try again.</div>';
    }
});
</script>
</body>
</html>

</body>
</html>

