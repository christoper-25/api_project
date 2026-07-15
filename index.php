<!DOCTYPE html>
<html>
<head>
    <title>Deezer Search Demo</title>

    <style>
        body{
            font-family: Arial;
            margin:40px;
        }

        input{
            width:300px;
            padding:10px;
        }

        button{
            padding:10px 20px;
        }

        .song{
            border:1px solid #ddd;
            padding:15px;
            margin-top:15px;
            display:flex;
            gap:15px;
            align-items:center;
        }

        img{
            width:120px;
            border-radius:8px;
        }
    </style>
</head>

<body>

<h2>Search Songs</h2>

<input
    type="text"
    id="keyword"
    placeholder="Enter song or artist">

<button onclick="searchSong()">
    Search
</button>

<hr>

<div id="result"></div>

<script>

function searchSong(){

    let keyword = document.getElementById("keyword").value;

    fetch("search.php?q=" + encodeURIComponent(keyword))
    .then(response => response.json())
    .then(data => {

        let html = "";

        if(data.data.length==0){
            html="No songs found.";
        }

        data.data.forEach(song=>{

            html += `
                <div class="song">

                    <img src="${song.album.cover_medium}">

                    <div>

                        <h3>${song.title}</h3>

                        <b>${song.artist.name}</b><br>

                        Album : ${song.album.title}

                        <br><br>

                        <audio controls>
                            <source src="${song.preview}" type="audio/mpeg">
                        </audio>

                    </div>

                </div>
            `;

        });

        document.getElementById("result").innerHTML = html;

    });

}

</script>

</body>
</html>