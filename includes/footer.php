<footer class="music-player">

    <!-- Left: Current Song -->
    <div class="player-left">

        <img
            id="playerCover"
            src="assets/images/default-cover.png"
            alt="Album Cover">

        <div class="song-info">

            <h4 id="playerTitle">No song playing</h4>

            <p id="playerArtist">Select a song to begin</p>

        </div>

        <button class="favorite-btn" title="Add to Favorites">
            <i class="far fa-heart"></i>
        </button>

    </div>

    <!-- Center: Playback Controls -->
    <div class="player-center">

        <div class="controls">

            <button id="shuffleBtn">
                <i class="fas fa-random"></i>
            </button>

            <button id="prevBtn">
                <i class="fas fa-backward-step"></i>
            </button>

            <button id="playBtn" class="play-button">
                <i class="fas fa-play"></i>
            </button>

            <button id="nextBtn">
                <i class="fas fa-forward-step"></i>
            </button>

            <button id="repeatBtn">
                <i class="fas fa-repeat"></i>
            </button>

        </div>

        <div class="progress-area">

            <span id="currentTime">0:00</span>

            <input
                type="range"
                id="progressBar"
                min="0"
                max="100"
                value="0">

            <span id="duration">0:30</span>

        </div>

    </div>

    <!-- Right: Volume -->
    <div class="player-right">

        <i class="fas fa-volume-low"></i>

        <input
            type="range"
            id="volume"
            min="0"
            max="100"
            value="100">

    </div>

    <!-- Audio Element -->
    <audio id="audioPlayer"></audio>

</footer>