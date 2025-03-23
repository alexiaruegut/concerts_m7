<?php
require_once '../config/database.php';
require_once '../middleware/auth.php';
require_once '../middleware/cors.php';

header('Content-Type: application/json');

// 1. Verificar autenticación
$user = usuarioAutenticado(); // ← usuario logueado con token
$usuario_id = $user['id'];

$pdo = getDB();

// 2. Leer datos del body
$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['tipo_entrada_id']) ||
    !isset($data['cantidad']) ||
    !isset($data['nombre_comprador']) ||
    !isset($data['email'])
) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan campos obligatorios"]);
    exit;
}

// 3. Obtener precio del tipo de entrada
$stmt = $pdo->prepare("SELECT precio FROM tipos_entrada WHERE id = ?");
$stmt->execute([$data['tipo_entrada_id']]);
$entrada = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$entrada) {
    http_response_code(404);
    echo json_encode(["error" => "Tipo de entrada no encontrado"]);
    exit;
}

$total = $entrada['precio'] * $data['cantidad'];

// 4. Insertar la compra con usuario logueado
$stmt = $pdo->prepare("
    INSERT INTO compras (usuario_id, tipo_entrada_id, cantidad, total, nombre_comprador, email, telefono)
    VALUES (?, ?, ?, ?, ?, ?, ?)
");

$stmt->execute([
    $usuario_id,
    $data['tipo_entrada_id'],
    $data['cantidad'],
    $total,
    $data['nombre_comprador'],
    $data['email'],
    $data['telefono'] ?? null
]);

echo json_encode([
    "message" => "Compra realizada con éxito",
    "compra_id" => $pdo->lastInsertId(),
    "total" => $total
]);
