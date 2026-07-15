<?php

header("Content-Type: application/json");

$q = $_GET["q"] ?? "";

if (!$q) {
    echo json_encode([
        "error" => "No search query"
    ]);
    exit;
}


// =====================
// DEEZER SEARCH (ALL RESULTS)
// =====================

$deezerUrl = "https://api.deezer.com/search?q=" . urlencode($q);

$ch = curl_init($deezerUrl);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$deezerResponse = curl_exec($ch);

curl_close($ch);


$deezerData = json_decode($deezerResponse, true);

$tracks = $deezerData["data"] ?? [];


// =====================
// GENIUS SEARCH
// =====================

$token = "YOUR_GENIUS_TOKEN";

$geniusUrl = "https://api.genius.com/search?q=" . urlencode($q);

$ch = curl_init($geniusUrl);

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer " . $token
]);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$geniusResponse = curl_exec($ch);

curl_close($ch);


$geniusData = json_decode($geniusResponse, true);

$geniusSong =
    $geniusData["response"]["hits"][0]["result"] ?? null;


// =====================
// RETURN ALL SONGS
// =====================

echo json_encode([
    "songs" => $tracks,
    "genius" => $geniusSong
], JSON_PRETTY_PRINT);

?>