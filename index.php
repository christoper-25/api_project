<input id="search" placeholder="Search song">
<button onclick="searchSong()">Search</button>

<div id="results"></div>

<audio id="player" controls></audio>

<script>
async function searchSong() {

    let q = document.getElementById("search").value;

    if (!q) return;

    let results = document.getElementById("results");

    // Show loading
    results.innerHTML = `
        <p>🔄 Searching for "${q}"...</p>
    `;

    try {

        let response = await fetch(
            "search.php?q=" + encodeURIComponent(q)
        );

        let data = await response.json();

        results.innerHTML = "";

        if (!data.songs || data.songs.length === 0) {
            results.innerHTML = "<p>No songs found.</p>";
            return;
        }


        data.songs.forEach(song => {

            let div = document.createElement("div");

            div.innerHTML = `
                <img src="${song.album.cover_medium}" width="100">

                <h3>${song.title}</h3>

                <p>${song.artist.name}</p>

                <button>▶ Play Preview</button>

                <hr>
            `;

            div.querySelector("button").onclick = function() {
                play(song.preview);
            };

            results.appendChild(div);

        });


    } catch (error) {

        results.innerHTML = `
            <p>❌ Error loading songs.</p>
        `;

        console.error(error);
    }
}


function play(url) {

    let player = document.getElementById("player");

    player.src = url;
    player.play();

}
</script>