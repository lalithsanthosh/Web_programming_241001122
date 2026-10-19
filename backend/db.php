<?php
// ==============================================================================
// Database Connection Configuration (PDO MySQL)
// Standard XAMPP Defaults: Host=localhost, User=root, Password="" (empty)
// ==============================================================================

$host = 'localhost';
$dbname = 'portfolio_db';
$username = 'root';
$password = ''; // Default XAMPP MySQL has no password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit();
}
