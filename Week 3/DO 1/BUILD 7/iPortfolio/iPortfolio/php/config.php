<?php
header("Content-Type: application/json");

// Accept only POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method."
    ]);
    exit;
}

// Get form data
$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$subject = trim($_POST["subject"] ?? "");
$message = trim($_POST["message"] ?? "");

// Validate required fields
if ($name === "" || $email === "" || $subject === "" || $message === "") {
    echo json_encode([
        "status" => "error",
        "message" => "Please fill in all fields."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "status" => "error",
        "message" => "Please enter a valid email address."
    ]);
    exit;
}

// Temporary success response
echo json_encode([
    "status" => "success",
    "message" => "Your message has been received. Thank you for contacting GreenLeaf Digital Studio!"
]);
