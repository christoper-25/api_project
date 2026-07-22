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

    // ===== ADDED BY KWATRO =====
    // Dati play button lang ang naka-click. Ngayon kahit saan sa card
    // (image o title) i-click, tatawagin din yung playPreview() —
    // kaya same behavior din yung click sa card at click sa play button.
    card.addEventListener("click", function() {
        playPreview(song.preview, title, artist, image);
    });
    // ===== END KWATRO EDIT =====

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

    // ===== ADDED BY KWATRO =====
    // Bug fix: when the user had scrolled down the page and then typed a search,
    // the results would render inside #searchSection but stay out of view,
    // so the user had to manually scroll back up to see them.
    // This line scrolls the page so #searchSection comes into view automatically
    // as soon as a search starts, using smooth scrolling instead of an instant jump.
    searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
    // ===== END KWATRO EDIT =====

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

            // ===== ADDED BY KWATRO =====
            // Pareho ng sa createSongCard() — para pati sa search results,
            // click sa card mismo (hindi lang sa play button) ay magpe-preview na rin.
            card.addEventListener("click", function() {
                playPreview(
                    song.preview,
                    song.title,
                    song.artist.name,
                    song.album.cover_medium
                );
            });
            // ===== END KWATRO EDIT =====

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

    // ===== ADDED BY KWATRO =====
    // Pagkatapos i-update yung footer player (logic sa itaas), ipapakita rin
    // natin yung centered "Now Playing" view at ku-kunin/idi-display yung
    // lyrics ng kasalukuyang tumutugtog na kanta.
    openNowPlaying(title, artist, cover);
    fetchLyrics(title, artist);
    // ===== END KWATRO EDIT =====
}

// Play / Pause button sa footer.
// Ito yung nagpapagana sa play/pause button doon (hindi galing sa mga
// card, kundi yung nasa footer player mismo).
if (playBtn) {
    playBtn.addEventListener("click", function() {
        if (!audio.src) return; // wala pang na-load na song, wala munang gagawin

        if (audio.paused) {
            // kung naka-pause, i-resume/play — parehong kanta pa rin
            // yung tumutugtog, itutuloy lang kung saan ito huminto
            audio.play();
            setPlayIcon(true);
        } else {
            // kung tumutugtog, i-pause — mananatili yung current time
            // (hindi mare-restart), kaya pwedeng i-resume ulit
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

// =====================================================================
// ADDED BY KWATRO (bago): lahat ng code mula dito pababa ay bago —
// walang natanggal o na-restructure sa mga existing code sa itaas nito.
// Ito yung "Now Playing" centered view + lyrics display na hiwalay sa
// footer player sa itaas (na hindi natin ginalaw).
// =====================================================================

// Mga reference sa bagong elements na dapat nasa index.php (sa loob ng
// #nowPlayingSection): cover image, title, artist, lyrics box, at
// "Back" button.
const nowPlayingSection = document.getElementById("nowPlayingSection");
const npCover = document.getElementById("npCover");
const npTitle = document.getElementById("npTitle");
const npArtist = document.getElementById("npArtist");
const lyricsBox = document.getElementById("lyricsBox");
const backBtn = document.getElementById("backBtn");

// List ng mga existing sections (Trending, New Releases, Top Artists,
// Albums) na itatago habang bukas yung Now Playing view.
const sectionsToHide = [
    document.getElementById("trendingSection"),
    document.getElementById("newReleasesSection"),
    document.getElementById("topArtistsSection"),
    document.getElementById("albumsSection")
];

// Ipinapakita yung centered Now Playing panel: nilalagyan ng laman
// (cover/title/artist) yung bagong elements, itinatago yung ibang
// sections, tapos sini-scroll pataas para makita agad.
function openNowPlaying(title, artist, cover) {
    if (!nowPlayingSection) return;

    if (npCover) npCover.src = cover;
    if (npTitle) npTitle.textContent = title;
    if (npArtist) npArtist.textContent = artist;

    nowPlayingSection.style.display = "block";

    sectionsToHide.forEach(sec => {
        if (sec) sec.style.display = "none";
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Kabaligtaran ng openNowPlaying(): itinatago yung Now Playing panel at
// ibinabalik yung normal na view — ito yung tinatawag pag pinindot yung
// "Back" button. Hindi nito hinihinto yung audio, kasi tumutugtog pa rin
// sa footer player.
function closeNowPlaying() {
    if (!nowPlayingSection) return;

    nowPlayingSection.style.display = "none";

    sectionsToHide.forEach(sec => {
        if (sec) sec.style.display = "";
    });
}

if (backBtn) {
    backBtn.addEventListener("click", closeNowPlaying);
}

// Kumukuha ng lyrics gamit ang lrclib.net API, base sa artist + title ng
// kasalukuyang tumutugtog. Kaibahan sa dating lyrics.ovh: nagbibigay ito
// ng "synced lyrics" — may timestamp bawat linya (hal. [00:12.50]) — kaya
// kaya na nating malaman kung aling linya ang dapat lumabas sa oras na yun.
let currentLyrics = []; // array ng { time (seconds), text } bawat linya
let activeLyricIndex = -1; // index ng linyang kasalukuyang naka-highlight

async function fetchLyrics(title, artist) {
    if (!lyricsBox) return;

    currentLyrics = [];
    activeLyricIndex = -1;

    lyricsBox.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            Loading lyrics...
        </div>
    `;

    try {
        const response = await fetch(
            `https://lrclib.net/api/get?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(title)}`
        );

        if (!response.ok) throw new Error("Lyrics not found");

        const data = await response.json();

        if (data.syncedLyrics) {
            // May timestamp bawat linya — dito tayo mag-hihighlight/mag-cecenter
            // habang tumutugtog yung kanta.
            currentLyrics = parseLRC(data.syncedLyrics);
            renderLyrics();
        } else if (data.plainLyrics) {
            // Walang timestamp na available — ipapakita na lang bilang plain
            // centered lines, wala lang mag-hihighlight.
            lyricsBox.innerHTML = data.plainLyrics
                .split("\n")
                .filter(line => line.trim() !== "")
                .map(line => `<p class="lyric-line">${line}</p>`)
                .join("");
        } else {
            lyricsBox.innerHTML = `<p class="lyric-line">Lyrics not found for this song.</p>`;
        }

    } catch (error) {
        console.log("Lyrics error:", error);
        lyricsBox.innerHTML = `<p class="lyric-line">Failed to load lyrics.</p>`;
    }
}

// Kino-convert yung "LRC" text (format ng synced lyrics: [mm:ss.xx]Text)
// papuntang array ng { time, text }, pinagsort base sa oras.
function parseLRC(lrcText) {
    const timeExp = /\[(\d{2}):(\d{2}(?:\.\d{1,3})?)\]/g;
    const lines = [];

    lrcText.split("\n").forEach(line => {
        const matches = [...line.matchAll(timeExp)];
        if (matches.length === 0) return;

        const text = line.replace(timeExp, "").trim();

        matches.forEach(match => {
            const minutes = parseInt(match[1], 10);
            const seconds = parseFloat(match[2]);
            lines.push({ time: minutes * 60 + seconds, text });
        });
    });

    return lines.sort((a, b) => a.time - b.time);
}

// Ipinapakita yung lahat ng linya sa lyrics box, isa-isang <p class="lyric-line">
// na may data-index para madali itong mahanap pag hi-nahighlight.
function renderLyrics() {
    lyricsBox.innerHTML = currentLyrics
        .map((line, index) => `<p class="lyric-line" data-index="${index}">${line.text || "♪"}</p>`)
        .join("");
}

// Sinusubaybayan yung audio.currentTime para malaman kung anong linya ng
// lyrics ang "kasabay" ng tugtog ngayon, tapos ino-update yung highlight.
// (Idinagdag na listener ito sa "timeupdate" — hindi pinalitan yung
// existing na listener sa taas na para sa progress bar.)
audio.addEventListener("timeupdate", function() {
    if (!currentLyrics.length) return;

    let newIndex = -1;
    for (let i = 0; i < currentLyrics.length; i++) {
        if (audio.currentTime >= currentLyrics[i].time) {
            newIndex = i;
        } else {
            break;
        }
    }

    if (newIndex !== activeLyricIndex) {
        activeLyricIndex = newIndex;
        highlightActiveLyricLine();
    }
});

// Nag-a-add ng "active" class sa linyang kasalukuyang tumutugma sa oras
// ng kanta (ito yung nagbibigay ng highlight + mas malaking font), at
// ino-scroll papunta sa gitna ng lyrics box yung linyang iyon.
function highlightActiveLyricLine() {
    const allLines = lyricsBox.querySelectorAll(".lyric-line");
    allLines.forEach(el => el.classList.remove("active"));

    if (activeLyricIndex < 0) return;

    const activeLine = lyricsBox.querySelector(`.lyric-line[data-index="${activeLyricIndex}"]`);
    if (activeLine) {
        activeLine.classList.add("active");
        activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}