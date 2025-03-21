<?php
require_once '../config/database.php';
require_once '../middleware/cors.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data['email'] || !$data['password']) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan datos"]);
    exit;
}

$pdo = getDB();
$stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email, password, fecha_nacimiento, ubicacion) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([
    $data['nombre'],
    $data['email'],
    password_hash($data['password'], PASSWORD_BCRYPT),
    $data['fecha_nacimiento'],
    $data['ubicacion']
]);

echo json_encode(["message" => "Usuario registrado"]);
