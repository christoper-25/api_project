<?php

header("Content-Type: application/json");

if (!function_exists('curl_init')) {
    echo json_encode(["error" => "cURL is not enabled in PHP."]);
    exit;
}

$q = trim($_GET['q'] ?? '');

if (!$q) {
    echo json_encode(["error" => "No search query provided."]);
    exit;
}

function searchSongs($keyword)
{
    $keyword = urlencode($keyword);
    $url = "https://api.deezer.com/search?q={$keyword}";

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    $response = curl_exec($ch);
    $error = curl_error($ch);

    curl_close($ch);

    if ($response === false) {
        return ["error" => "cURL error: {$error}"];
    }

    return json_decode($response, true);
}

$result = searchSongs($q);

echo json_encode($result);
