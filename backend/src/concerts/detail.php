<?php
require_once '../config/database.php';
require_once '../middleware/cors.php';

header('Content-Type: application/json');

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "ID de concierto requerido"]);
    exit;
}

$pdo = getDB();
$stmt = $pdo->prepare("SELECT * FROM conciertos WHERE id = ?");
$stmt->execute([$_GET['id']]);
$concierto = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$concierto) {
    http_response_code(404);
    echo json_encode(["error" => "Concierto no encontrado"]);
    exit;
}

echo json_encode($concierto);
