<?php
require_once '../config/database.php';
require_once '../middleware/cors.php';

header('Content-Type: application/json');

$pdo = getDB();
$stmt = $pdo->query("SELECT * FROM conciertos ORDER BY fecha ASC");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
