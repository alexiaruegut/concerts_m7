<?php
require_once '../config/database.php';
require_once '../middleware/auth.php';
require_once '../middleware/cors.php';

header('Content-Type: application/json');

// Autenticación
$user = usuarioAutenticado();
$userId = $user['id'];

$pdo = getDB();

$stmt = $pdo->prepare("
    SELECT 
        compras.id AS compra_id,
        compras.cantidad,
        compras.total,
        compras.fecha_compra,
        tipos_entrada.tipo,
        tipos_entrada.precio,
        conciertos.nombre AS concierto,
        conciertos.fecha AS fecha_concierto,
        conciertos.ubicacion
    FROM compras
    INNER JOIN tipos_entrada ON compras.tipo_entrada_id = tipos_entrada.id
    INNER JOIN conciertos ON tipos_entrada.concierto_id = conciertos.id
    WHERE compras.usuario_id = ?
    ORDER BY compras.fecha_compra DESC
");

$stmt->execute([$userId]);
$entradas = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($entradas);
