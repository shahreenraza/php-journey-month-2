<?php

header("Content-Type: application/json; charset=UTF-8");

function sendResponse($status, $message)
{
    echo json_encode([
        "status" => $status,
        "message" => $message
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    sendResponse("error", "Invalid request method.");
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$subject = trim($_POST["subject"] ?? "");
$message = trim($_POST["message"] ?? "");

if ($name === "" || $email === "" || $subject === "" || $message === "") {
    sendResponse("error", "Please fill in all fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse("error", "Please enter a valid email address.");
}

sendResponse(
    "success",
    "Your message has been received. Thank you for contacting GreenLeaf Digital Studio!"
);
