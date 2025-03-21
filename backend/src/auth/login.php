<?php
require_once '../config/database.php';
require_once '../helpers/jwt.php';
require_once '../middleware/cors.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan datos"]);
    exit;
}

$pdo = getDB();
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
$stmt->execute([$data['email']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    http_response_code(401);
    echo json_encode(["error" => "Usuario no encontrado"]);
    exit;
}

if (!password_verify($data['password'], $user['password'])) {
    http_response_code(401);
    echo json_encode(["error" => "Credenciales incorrectas"]);
    exit;
}

$token = crearJWT($user);

echo json_encode([
    "message" => "Inicio de sesión exitoso",
    "user" => [
        "id" => $user["id"],
        "nombre" => $user["nombre"],
        "email" => $user["email"],
        "rol" => $user["rol"]
    ],
    "token" => $token
]);
