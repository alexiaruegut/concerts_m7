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

if (!$data['id'] || !$data['nombre'] || !$data['artista'] || !$data['fecha'] || !$data['hora'] || !$data['ubicacion']) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan datos"]);
    exit;
}

$pdo = getDB();
$stmt = $pdo->prepare("UPDATE conciertos SET nombre = ?, artista = ?, fecha = ?, hora = ?, ubicacion = ?, descripcion = ? WHERE id = ?");
$stmt->execute([
    $data['nombre'],
    $data['artista'],
    $data['fecha'],
    $data['hora'],
    $data['ubicacion'],
    $data['descripcion'] ?? null,
    $data['id']
]);

echo json_encode(["message" => "Concierto actualizado correctamente"]);
