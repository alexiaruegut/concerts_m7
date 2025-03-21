<?php
require_once '../config/database.php';
require_once '../middleware/auth.php';
require_once '../middleware/cors.php';

header('Content-Type: application/json');

$user = usuarioAutenticado();
if ($user['rol'] !== 'admin') {
    http_response_code(403);
    echo json_encode(["error" => "No autorizado"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data['id']) {
    http_response_code(400);
    echo json_encode(["error" => "ID de concierto requerido"]);
    exit;
}

$pdo = getDB();
$stmt = $pdo->prepare("DELETE FROM conciertos WHERE id = ?");
$stmt->execute([$data['id']]);

echo json_encode(["message" => "Concierto eliminado correctamente"]);
