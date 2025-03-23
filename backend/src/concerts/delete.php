<?php
require_once '../config/database.php';
require_once '../middleware/cors.php';
require_once '../middleware/auth.php';

header('Content-Type: application/json');

$usuario = usuarioAutenticado();
if (!$usuario || $usuario['rol'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Acceso denegado']);
    exit;
}

$id = $_GET['id'] ?? null;
if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta el parámetro ID']);
    exit;
}

try {
    $pdo = getDB();
    $stmt = $pdo->prepare("DELETE FROM conciertos WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al borrar concierto', 'detalle' => $e->getMessage()]);
}
