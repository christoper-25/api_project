const trendingSongs = document.getElementById("trendingSongs");
const newReleases = document.getElementById("newReleases");
const topArtists = document.getElementById("topArtists");
const albums = document.getElementById("albums");

const searchInput = document.getElementById("searchInput");

const searchSection = document.getElementById("searchSection");

const searchResults = document.getElementById("searchResults");


const audioPlayer = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");

const progressBar = document.getElementById("progressBar");

const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");



let timer;



// Search when typing

    searchInput.addEventListener("keyup", function(){


        clearTimeout(timer);


        let query = this.value.trim();



        if(query.length < 2){


            searchSection.style.display = "none";

            searchResults.innerHTML = "";

            loadFeaturedSongs(trendingSongs, "trending");

            return;


        }



        timer = setTimeout(()=>{


            searchSong(query);


        },500);



    });

}




// ===============================
// DEEZER + GENIUS SEARCH
// ===============================


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




        data.songs.forEach(song=>{


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

                    <i class="fas fa-play"></i>

                </button>



                ${
                    song.genius_url
                    ?
                    `
                    <a 
                    href="${song.genius_url}"
                    target="_blank"
                    class="lyrics-button">

                        <i class="fas fa-music"></i>
                        Lyrics

                    </a>
                    `
                    :
                    ""
                }



            `;



            let playButton =
            card.querySelector(".play-button");



            playButton.addEventListener("click",()=>{


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






if(trendingSongs){
    loadFeaturedSongs(trendingSongs, "trending");
}

if(newReleases){
    loadFeaturedSongs(newReleases, "new release");
}

if(topArtists){
    loadFeaturedSongs(topArtists, "artist");
}

if(albums){
    loadFeaturedSongs(albums, "album");
}

// ===============================
// AUDIO PLAYER
// ===============================


function playPreview(url,title,artist,cover){



    if(!url){


        alert("No preview available.");

        return;


    }



    audioPlayer.src = url;


    audioPlayer.load();



    audioPlayer.play()

    .then(()=>{


        updatePlayer(

            title,

            artist,

            cover

        );


        setPauseIcon();


    })

    .catch(error=>{


        console.log(error);


    });



}




// ===============================
// UPDATE FOOTER
// ===============================


function updatePlayer(title,artist,cover){



    let playerTitle =
    document.getElementById("playerTitle");



    let playerArtist =
    document.getElementById("playerArtist");



    let playerCover =
    document.getElementById("playerCover");



    if(playerTitle)

        playerTitle.textContent = title;



    if(playerArtist)

        playerArtist.textContent = artist;



    if(playerCover)

        playerCover.src = cover;



}





// ===============================
// PLAY / PAUSE BUTTON
// ===============================


if(playBtn){


    playBtn.addEventListener("click",()=>{


        if(audioPlayer.paused){


            audioPlayer.play();

            setPauseIcon();


        }

        else{


            audioPlayer.pause();

            setPlayIcon();


        }



    });


}





function setPauseIcon(){


    let icon =
    document.querySelector("#playBtn i");



    if(icon)

        icon.className =
        "fas fa-pause";


}



function setPlayIcon(){


    let icon =
    document.querySelector("#playBtn i");



    if(icon)

        icon.className =
        "fas fa-play";


}





// ===============================
// PROGRESS BAR
// ===============================


if(audioPlayer){


    audioPlayer.addEventListener("timeupdate",()=>{


        if(!audioPlayer.duration)

            return;



        let percent =

        (audioPlayer.currentTime /
        audioPlayer.duration) * 100;



        if(progressBar)

            progressBar.value = percent;



        if(currentTime)

            currentTime.textContent =
            formatTime(audioPlayer.currentTime);



        if(duration)

            duration.textContent =
            formatTime(audioPlayer.duration);



    });



}





if(progressBar){


    progressBar.addEventListener("input",()=>{


        audioPlayer.currentTime =

        (progressBar.value / 100)

        * audioPlayer.duration;



    });


}




// ===============================
// VOLUME
// ===============================


if(volume){


    volume.addEventListener("input",()=>{


        audioPlayer.volume =
        volume.value / 100;


    });


}




// ===============================
// TIME FORMAT
// ===============================


function formatTime(seconds){


    if(isNaN(seconds))

        return "0:00";



    let min =
    Math.floor(seconds / 60);



    let sec =
    Math.floor(seconds % 60);



    if(sec < 10)

        sec = "0" + sec;



    return min + ":" + sec;


}
