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

searchInput.addEventListener("keyup", function(){


    clearTimeout(timer);


    let query = this.value.trim();



    if(query.length < 2){

        searchSection.style.display = "none";

        searchResults.innerHTML = "";

        return;

    }



    timer = setTimeout(function(){

        searchSong(query);

    },500);



});





async function searchSong(query){


    searchSection.style.display = "block";


    searchResults.innerHTML = `

        <div class="loading">

            <i class="fas fa-spinner fa-spin"></i>

            Searching "${query}"...

        </div>

    `;



    try{


        let response = await fetch(

            "search.php?q=" + encodeURIComponent(query)

        );



        let data = await response.json();



        searchResults.innerHTML = "";



        if(!data.songs || data.songs.length === 0){


            searchResults.innerHTML = `

                <p>No songs found.</p>

            `;


            return;

        }





        data.songs.forEach(song => {
            let card = document.createElement("div");
            card.className = "music-card";
            card.innerHTML = `
                <img 
                src="${song.album.cover_medium}"
                width="200"
                >
                <h3>
                ${song.title}
                </h3>
                <p>
                ${song.artist.name}
                </p>
                <button class="play-button">

                    <i class="fas fa-play" class=""></i>
                </button>
            `;

            card.querySelector(".play-button")
.addEventListener("click", function(){
console.log(song.preview);
    playPreview(
        song.preview,
        song.title,
        song.artist.name,
        song.album.cover_medium
    );

});



            searchResults.appendChild(card);



        });



    }

    catch(error){


        console.log(error);


        searchResults.innerHTML = `

            <p>
            ❌ Error loading songs.
            </p>

        `;


    }



}





function playPreview(url, title, artist, cover){

    let audio = document.getElementById("audioPlayer");


    if(!url){

        alert("No preview available for this song.");

        return;

    }


    audio.src = url;

    audio.load();


    audio.play()
    .then(()=>{

        console.log("Playing:", title);

    })
    .catch(error=>{

        console.log("Playback error:", error);

    });



    let playerTitle = document.getElementById("playerTitle");
    let playerArtist = document.getElementById("playerArtist");
    let playerCover = document.getElementById("playerCover");



    if(playerTitle)
        playerTitle.textContent = title;


    if(playerArtist)
        playerArtist.textContent = artist;


    if(playerCover)
        playerCover.src = cover;



    let icon = document.querySelector("#playBtn i");

    if(icon){

        icon.className = "fas fa-pause";

    }

}