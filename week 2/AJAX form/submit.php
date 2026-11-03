<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (
    empty($data["name"]) ||
    empty($data["email"]) ||
    empty($data["password"])
) {
    http_response_code(400);
    echo json_encode(["message" => "Please fill all fields."]);
    exit;
}

echo json_encode(["message" => "Form submitted successfully!"]);