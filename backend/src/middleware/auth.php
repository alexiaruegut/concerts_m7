<?php
require_once __DIR__ . '/../helpers/jwt.php';

function usuarioAutenticado() {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["error" => "Token requerido"]);
        exit;
    }

    $token = str_replace("Bearer ", "", $headers['Authorization']);
    try {
        return verificarJWT($token);
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["error" => "Token inválido"]);
        exit;
    }
}
