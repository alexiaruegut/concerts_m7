<?php
require_once '../config/database.php';
require_once '../middleware/cors.php';
require_once '../middleware/auth.php';

header('Content-Type: application/json');

$usuario = usuarioAutenticado();
if (!$usuario || $usuario['rol'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Acceso no autorizado']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['nombre']) ||
    !isset($data['artista']) ||
    !isset($data['fecha']) ||
    !isset($data['ubicacion'])
) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan campos obligatorios']);
    exit;
}

try {
    $pdo = getDB();

    $stmt = $pdo->prepare("INSERT INTO conciertos (nombre, artista, fecha, hora, ubicacion, descripcion, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)");

    $stmt->execute([
        $data['nombre'],
        $data['artista'],
        $data['fecha'],
        $data['hora'],
        $data['ubicacion'],
        $data['descripcion'] ?? null,
        $data['imagen'] ?? null
    ]);

    if ($ok) {
        echo json_encode([
            'success' => true,
            'id' => $pdo->lastInsertId()
        ]);
    } else {
        echo json_encode(['error' => 'Falló la ejecución del insert']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al insertar en la base de datos', 'detalle' => $e->getMessage()]);
}
