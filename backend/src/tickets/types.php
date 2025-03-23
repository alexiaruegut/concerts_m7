<?php
// /tickets/types.php
require_once '../config/database.php';
require_once '../middleware/cors.php';

header('Content-Type: application/json');

if (!isset($_GET['concert_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "concert_id requerido"]);
    exit;
}

$pdo = getDB();
$stmt = $pdo->prepare("SELECT * FROM tipos_entrada WHERE concierto_id = ?");
$stmt->execute([$_GET['concert_id']]);
$tipos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($tipos);
