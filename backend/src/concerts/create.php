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

if (!$data['nombre'] || !$data['artista'] || !$data['fecha'] || !$data['hora'] || !$data['ubicacion']) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan datos"]);
    exit;
}

$pdo = getDB();
$stmt = $pdo->prepare("INSERT INTO conciertos (nombre, artista, fecha, hora, ubicacion, descripcion, creado_por) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->execute([
    $data['nombre'],
    $data['artista'],
    $data['fecha'],
    $data['hora'],
    $data['ubicacion'],
    $data['descripcion'] ?? null,
    $user['id']
]);

echo json_encode(["message" => "Concierto creado correctamente"]);
