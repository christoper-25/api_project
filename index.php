<?php
session_start();

// Sample Data (Will be replaced with MySQL later)

$quickPicks = [
    ["title" => "Liked Songs", "image" => "https://picsum.photos/300?random=1"],
    ["title" => "Daily Mix 1", "image" => "https://picsum.photos/300?random=2"],
    ["title" => "Daily Mix 2", "image" => "https://picsum.photos/300?random=3"],
    ["title" => "Top Hits", "image" => "https://picsum.photos/300?random=4"],
    ["title" => "Chill Vibes", "image" => "https://picsum.photos/300?random=5"],
    ["title" => "Coding Music", "image" => "https://picsum.photos/300?random=6"]
];

$playlists = [
    [
        "title" => "Made For You",
        "desc" => "Hand-picked songs you'll love.",
        "image" => "https://picsum.photos/300?random=11"
    ],
    [
        "title" => "Today's Top Hits",
        "desc" => "The biggest songs today.",
        "image" => "https://picsum.photos/300?random=12"
    ],
    [
        "title" => "Lo-Fi Beats",
        "desc" => "Relax while studying.",
        "image" => "https://picsum.photos/300?random=13"
    ],
    [
        "title" => "Workout Mix",
        "desc" => "Boost your energy.",
        "image" => "https://picsum.photos/300?random=14"
    ],
    [
        "title" => "Acoustic",
        "desc" => "Soft acoustic favorites.",
        "image" => "https://picsum.photos/300?random=15"
    ],
    [
        "title" => "Party Mix",
        "desc" => "Weekend vibes.",
        "image" => "https://picsum.photos/300?random=16"
    ]
];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Musicify</title>

    <link rel="stylesheet" href="assets/css/style.css">

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" rel="stylesheet">
</head>

<body>

    <div class="app">

        <?php include 'includes/sidebar.php'; ?>

        <main class="main">

            <?php include 'includes/topbar.php'; ?>

            <!-- Greeting -->
            <section class="greeting">
                <h1>Discover Music</h1>
                <p>Listen to trending songs from around the world.</p>
            </section>

            <!-- NOW PLAYING (new: centered player + lyrics) -->
            <section class="section now-playing" id="nowPlayingSection" style="display:none;">
                <button id="backBtn" style="margin-bottom:15px;background:none;border:none;color:inherit;cursor:pointer;font-size:1rem;">
                    <i class="fas fa-arrow-left"></i> Back
                </button>
                <div class="now-playing-content" style="max-width:520px;margin:0 auto;text-align:center;">
                    <img id="npCover" src="" width="260" style="border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,.35);">
                    <h2 id="npTitle" style="margin-top:16px;">-</h2>
                    <p id="npArtist" style="opacity:.7;">-</p>
                    <div class="lyrics-box" id="lyricsBox" style="margin-top:24px;text-align:left;max-height:360px;overflow-y:auto;line-height:1.7;">
                        <p style="opacity:.6;">Select a song to see lyrics.</p>
                    </div>
                </div>
            </section>

            <section class="section" id="searchSection" style="display:none;">

                <div class="section-header">
                    <h2>
                        <i class="fas fa-search"></i>
                        Search Results
                    </h2>
                </div>

                <div class="card-grid" style=" display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
    margin-top: 20px;" id="searchResults"></div>

            </section>

            <!-- Trending Songs -->
            <section class="section" id="trendingSection">

                <div class="section-header">
                    <h2>
                        <i class="fas fa-fire"></i>
                        Trending Songs
                    </h2>
                    <a href="#">View All</a>
                </div>

                <div class="card-grid" id="trendingSongs">
                    <!-- Filled by JavaScript -->
                </div>

            </section>

            <!-- New Releases -->
            <section class="section" id="newReleasesSection">

                <div class="section-header">
                    <h2>
                        <i class="fas fa-compact-disc"></i>
                        New Releases
                    </h2>
                    <a href="#">View All</a>
                </div>

                <div class="card-grid" id="newReleases">
                </div>

            </section>

            <!-- Top Artists -->
            <section class="section" id="topArtistsSection">

                <div class="section-header">
                    <h2>
                        <i class="fas fa-microphone"></i>
                        Top Artists
                    </h2>
                    <a href="#">View All</a>
                </div>

                <div class="card-grid" id="topArtists">
                </div>

            </section>

            <!-- Popular Albums -->
            <section class="section" id="albumsSection">

                <div class="section-header">
                    <h2>
                        <i class="fas fa-record-vinyl"></i>
                        Popular Albums
                    </h2>
                    <a href="#">View All</a>
                </div>

                <div class="card-grid" id="albums">
                </div>

            </section>

        </main>

    </div>

    <?php include 'includes/footer.php'; ?>

    <script src="assets/js/script.js"></script>
    <audio id="player" controls></audio>


</body>

</html>