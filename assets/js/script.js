document.getElementById("trendingSongs")
document.getElementById("newReleases")
document.getElementById("topArtists")
document.getElementById("albums")


const searchInput = document.getElementById("searchInput");

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