<?php

header("Content-Type: application/json");

$query = $_GET['q'] ?? '';

if ($query == '') {
    echo json_encode([
        "data" => []
    ]);
    exit;
}

$url = "https://api.deezer.com/search?q=" . urlencode($query);

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

curl_close($ch);

echo $response;