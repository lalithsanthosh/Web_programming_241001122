<?php
// Enable CORS for React frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method Not Allowed. Please send a POST request.'
    ]);
    exit();
}

require_once 'db.php';

// Read raw JSON sent by React fetch()
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

// Fallback in case of FormData submission
if (!$data) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$service = isset($data['service']) ? trim($data['service']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';

// Validation
if (empty($name) || empty($email) || empty($service) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'All fields (name, email, service, message) are required.'
    ]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Please provide a valid email address.'
    ]);
    exit();
}

try {
    $stmt = $pdo->prepare("INSERT INTO leads (name, email, service, message) VALUES (:name, :email, :service, :message)");
    $stmt->execute([
        ':name' => $name,
        ':email' => strtolower($email),
        ':service' => $service,
        ':message' => $message,
    ]);

    echo json_encode([
        'success' => true,
        'message' => "Thank you, {$name}! Your project request has been saved successfully."
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Could not save lead to database: ' . $e->getMessage()
    ]);
}
