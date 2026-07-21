const trendingSongsContainer = document.getElementById("trendingSongs");
const newReleasesContainer = document.getElementById("newReleases");
const topArtistsContainer = document.getElementById("topArtists");
const albumsContainer = document.getElementById("albums");

const searchInput = document.getElementById("searchInput");

function createSongCard(song) {
    const image = song.album?.cover_medium || song.artist?.picture_medium || "assets/images/default-cover.png";
    const title = song.title || song.name || "Untitled";
    const artist = song.artist?.name || "Unknown Artist";

    const card = document.createElement("div");
    card.className = "music-card";
    card.innerHTML = `
        <img src="${image}" width="200">
        <h3>${title}</h3>
        <p>${artist}</p>
        <button class="play-button">
            <i class="fas fa-play"></i>
        </button>
    `;

    card.querySelector(".play-button").addEventListener("click", function() {
        playPreview(song.preview, title, artist, image);
    });

    return card;
}

async function loadSection(type, container) {
    if (!container) return;

    container.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            Loading songs...
        </div>
    `;

    try {
        const response = await fetch("search.php?type=" + encodeURIComponent(type));
        const data = await response.json();

        if (!data.songs || data.songs.length === 0) {
            container.innerHTML = `<p>No songs found.</p>`;
            return;
        }

        container.innerHTML = "";
        data.songs.slice(0, 6).forEach(song => {
            container.appendChild(createSongCard(song));
        });
    } catch (error) {
        console.error(error);
        container.innerHTML = `<p>Failed to load songs.</p>`;
    }
}

window.addEventListener("DOMContentLoaded", function() {
    loadSection("trending", trendingSongsContainer);
    loadSection("new", newReleasesContainer);
    loadSection("artists", topArtistsContainer);
    loadSection("popular", albumsContainer);
});

const searchSection = document.getElementById("searchSection");
const searchResults = document.getElementById("searchResults");

let timer;

// Search when typing
searchInput.addEventListener("keyup", function() {
    clearTimeout(timer);

    let query = this.value.trim();

    if (query.length < 2) {
        searchSection.style.display = "none";
        searchResults.innerHTML = "";
        return;
    }

    timer = setTimeout(function() {
        searchSong(query);
    }, 500);
});

async function searchSong(query) {
    searchSection.style.display = "block";

    searchResults.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            Searching "${query}"...
        </div>
    `;

    try {
        let response = await fetch("search.php?q=" + encodeURIComponent(query));
        let data = await response.json();

        searchResults.innerHTML = "";

        if (!data.songs || data.songs.length === 0) {
            searchResults.innerHTML = `<p>No songs found.</p>`;
            return;
        }

        data.songs.forEach(song => {
            let card = document.createElement("div");
            card.className = "music-card";
            card.innerHTML = `
                <img src="${song.album.cover_medium}" width="200">
                <h3>${song.title}</h3>
                <p>${song.artist.name}</p>
                <button class="play-button">
                    <i class="fas fa-play"></i>
                </button>
            `;

            card.querySelector(".play-button").addEventListener("click", function() {
                playPreview(
                    song.preview,
                    song.title,
                    song.artist.name,
                    song.album.cover_medium
                );
            });

            searchResults.appendChild(card);
        });

    } catch (error) {
        console.log(error);
        searchResults.innerHTML = `<p>❌ Error loading songs.</p>`;
    }
}

// ===== PLAYER (footer) =====

const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");

const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const playerCover = document.getElementById("playerCover");

function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function setPlayIcon(isPlaying) {
    const icon = playBtn?.querySelector("i");
    if (!icon) return;
    icon.className = isPlaying ? "fas fa-pause" : "fas fa-play";
}

function playPreview(url, title, artist, cover) {
    if (!url) {
        alert("No preview available for this song.");
        return;
    }

    audio.src = url;
    audio.load();

    audio.play()
        .then(() => {
            console.log("Playing:", title);
            setPlayIcon(true);
        })
        .catch(error => {
            console.log("Playback error:", error);
        });

    if (playerTitle) playerTitle.textContent = title;
    if (playerArtist) playerArtist.textContent = artist;
    if (playerCover) playerCover.src = cover;
}

// Play / Pause button in the footer
if (playBtn) {
    playBtn.addEventListener("click", function() {
        if (!audio.src) return; // wala pang na-load na song

        if (audio.paused) {
            audio.play();
            setPlayIcon(true);
        } else {
            audio.pause();
            setPlayIcon(false);
        }
    });
}

// Keep icon in sync if audio ends or is paused/played some other way
audio.addEventListener("play", () => setPlayIcon(true));
audio.addEventListener("pause", () => setPlayIcon(false));
audio.addEventListener("ended", () => setPlayIcon(false));

// Progress bar + time display
audio.addEventListener("timeupdate", function() {
    if (!progressBar) return;
    const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progressBar.value = percent;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", function() {
    if (durationEl) durationEl.textContent = formatTime(audio.duration);
});

// Let user seek by dragging the progress bar
if (progressBar) {
    progressBar.addEventListener("input", function() {
        if (!audio.duration) return;
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });
}

// Volume control
if (volumeSlider) {
    volumeSlider.addEventListener("input", function() {
        audio.volume = volumeSlider.value / 100;
    });
}

// Prev / Next — placeholders lang for now dahil wala pang playlist/queue logic
if (prevBtn) {
    prevBtn.addEventListener("click", function() {
        console.log("Previous button clicked — wala pang queue/playlist logic.");
    });
}

if (nextBtn) {
    nextBtn.addEventListener("click", function() {
        console.log("Next button clicked — wala pang queue/playlist logic.");
    });
}

// Shuffle / Repeat — toggle lang ng visual state for now
if (shuffleBtn) {
    shuffleBtn.addEventListener("click", function() {
        shuffleBtn.classList.toggle("active");
    });
}

if (repeatBtn) {
    repeatBtn.addEventListener("click", function() {
        repeatBtn.classList.toggle("active");
        audio.loop = repeatBtn.classList.contains("active");
    });
}