<?php
// Enable CORS for React frontend (Vite runs on localhost:5173 or localhost:3000)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request from React browser fetch
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';

try {
    $stmt = $pdo->query("SELECT id, title, category, description, image_url, video_url FROM projects ORDER BY id ASC");
    $projects = $stmt->fetchAll();

    echo json_encode([
        'success' => true,
        'data' => $projects
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to retrieve projects: ' . $e->getMessage()
    ]);
}
