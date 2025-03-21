<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function crearJWT($user) {
    $payload = [
        "id" => $user["id"],
        "email" => $user["email"],
        "rol" => $user["rol"],
        "exp" => time() + (60 * 60 * 24)
    ];
    return JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');
}

function verificarJWT($token) {
    return (array) JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
}
