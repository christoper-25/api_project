<?php

function searchSongs($keyword)
{
    $keyword = urlencode($keyword);

    $url = "https://api.deezer.com/search?q={$keyword}";

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    curl_close($ch);

    return json_decode($response, true);
}