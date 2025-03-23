<?php
require_once '../config/database.php';
require_once '../middleware/auth.php';
require_once '../middleware/cors.php';

header('Content-Type: application/json');

$user = usuarioAutenticado();
$pdo = getDB();

$stmt = $pdo->prepare("SELECT id, nombre, email, fecha_nacimiento, ubicacion, rol FROM usuarios WHERE id = ?");
$stmt->execute([$user['id']]);
$perfil = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($perfil);
