<?php

header("Content-Type: application/json");

$type = trim($_GET["type"] ?? "search");
$q = trim($_GET["q"] ?? "");

if ($type === "search" && !$q) {
    echo json_encode([
        "error" => "No search query"
    ]);
    exit;
}

function fetchUrl($url, $headers = [])
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    if (!empty($headers)) {
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    }

    $response = curl_exec($ch);
    $error = curl_error($ch);

    curl_close($ch);

    if ($response === false) {
        return ["error" => "cURL error: {$error}"];
    }

    return json_decode($response, true);
}

// =====================
// DEEZER SEARCH
// =====================

if ($type === "search") {
    $deezerUrl = "https://api.deezer.com/search?q=" . urlencode($q);
    $deezerData = fetchUrl($deezerUrl);

    if (isset($deezerData["error"])) {
        echo json_encode(["error" => $deezerData["error"]]);
        exit;
    }

    $tracks = $deezerData["data"] ?? [];

    // =====================
    // GENIUS SEARCH
    // =====================

    $token = "yvBQ9bM2rk8SlTizh86zHMDMJdQzj-m0Rbiu7hdStMFN88_RCLlbOnochfQPFmbs";
    $geniusUrl = "https://api.genius.com/search?q=" . urlencode($q);
    $geniusData = fetchUrl($geniusUrl, ["Authorization: Bearer {$token}"]);

    if (isset($geniusData["error"])) {
        echo json_encode(["error" => $geniusData["error"]]);
        exit;
    }

    $geniusSong = $geniusData["response"]["hits"][0]["result"] ?? null;
} else {
    switch ($type) {
        case "trending":
            $deezerUrl = "https://api.deezer.com/chart/0/tracks";
            break;
        case "new":
            $deezerUrl = "https://api.deezer.com/search?q=" . urlencode("new releases");
            break;
        case "popular":
            $deezerUrl = "https://api.deezer.com/search?q=" . urlencode("popular songs");
            break;
        case "artists":
            $deezerUrl = "https://api.deezer.com/search?q=" . urlencode("top artists");
            break;
        default:
            echo json_encode(["error" => "Invalid request type"]);
            exit;
    }

    $deezerData = fetchUrl($deezerUrl);

    if (isset($deezerData["error"])) {
        echo json_encode(["error" => $deezerData["error"]]);
        exit;
    }

    $tracks = $deezerData["data"] ?? [];
    $geniusSong = null;
}

// =====================
// RESPONSE
// =====================

echo json_encode([
    "songs" => $tracks,
    "genius" => $geniusSong
]);
