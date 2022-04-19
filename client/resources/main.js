let songs = [];
let playListSongs=[];
let users=[];
window.onload = function () {
    getSongs();


//login

    document.getElementById('login-bttn').onclick = function (event) {

        event.preventDefault();
        console.log("log");

        if (!document.getElementById('login-bttn').dataset.id) {
            console.log("hieeei");
            login();

        } else {
            editProduct();
        }
    }

    //search by song title
    document.getElementById('search-bttn').onclick = function (event) {

      //  event.preventDefault();
        console.log("search");
        searchBySongTitle();
        /*if (!document.getElementById('search-bttn').dataset.id) {
            console.log("hieeei");
           searchBySongTitle();

        } 
        */
    }
   
 
}


async function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let url = 'http://localhost:4040/users?username=' + username + '&&password=' + password;
    console.log('url' + url);
    
    users = await fetch(url).then(response => response.json());
    if (users.username == username) {
        console.log("success");
        getPlayListByUserId();
    }
    else
        alert("sorry username or password incorrect");

}
async function getSongs() {
    for (let i = 0; i < songs.length; i++) {
        deleteSongFunction(i);
    }
  
    let url = 'http://localhost:4040/songs' ;
    console.log('url' + url);
    
    songs = await fetch(url).then(response => response.json());
    const tbodyEl = document.getElementById("musiclist");

    let st = '';
    for (let i = 0; i < songs.length; i++) {
        tbodyEl.innerHTML += `
            <tr>
                <td>${songs[i].id}</td>
                <td>${songs[i].title}</td>
                <td>${songs[i].releaseDate}</td>
                <td style="margin:auto">  <button class="btn btn-outline-success" onclick="addSongFunction(${i})" type="submit" id="add-song-${i}">add to playlist</button></td>
             
            </tr>
        `;

    }


}

async function getPlayListByUserId() {
    for (let i = 0; i < songs.length; i++) {
        deleteSongFunction(i);
    }
  
    let url = 'http://localhost:4040/playLists/'+users.id;
    console.log('url' + url);
    
    playListSongs = await fetch(url).then(response => response.json());
    renderPlayList();


}

async function addSonginplayList(songId,songTitle) {

 if(playListSongs.songs.length>0)
 {
    console.log("hi");
    playListSongs.songs.id=songId;
    playListSongs.songs.title=songTitle;
 }
 console.log(playListSongs.songs);
 console.log(playListSongs.userId);
 console.log(playListSongs.playListId);

 for (let i = 0; i < playListSongs.songs.length; i++) {
    console.log("n"+playListSongs.songs[i].songId);
 }
        let result = await fetch('http://localhost:4040/playLists/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                userId: playListSongs.userId,
                playListId: playListSongs.playListId,
                songs:  playListSongs.songs
            })
        }).then(res => res.json());
   
    }

async function searchBySongTitle() {
    console.log('sdsdsdsdsd');
    let songtitle = document.getElementById('songtitle').value;
    console.log('songtitle' + songtitle);
    let url = 'http://localhost:4040/songs/song?title='+songtitle ;
    console.log('url' + url);
    
    songs = await fetch(url).then(response => response.json());
    const tbodyEl = document.getElementById("musiclist");

    let st = '';
    for (let i = 0; i < songs.length; i++) {
        tbodyEl.innerHTML += `
            <tr>
                <td>${songs[i].id}</td>
                <td>${songs[i].title}</td>
                <td>${songs[i].releaseDate}</td>
                <td style="margin:auto">  <button class="btn btn-outline-success" onclick="addSongFunction(${i})" type="submit" id="add-song-${i}">add to playlist</button></td>
             
            </tr>
        `;

    }


}





async function addProduct() {
//    console.log("hi");

    let result = await fetch('http://localhost:3000/products/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            description: document.getElementById('description').value
        })
    }).then(res => res.json());
    document.getElementById('product-form').reset();

    renderProduct(result);
}




function addSongFunction(i) {
    // console.log('e.target.classList'+event.target);

//    console.log(i)
addSonginplayList(songs[i].id,songs[i].title);
        const tbodyE2 =  document.getElementById("tb2");
        tbodyE2.innerHTML  += `
        <tr id=${i}>
            <td>${songs[i].id}</td>
            <td>${songs[i].title}</td>
          
            <td><button class="deleteBtn"  onclick="deleteSongFunction(${i})" id="remove-song"${i}>Delete</button></td>
        </tr>
    `;
}
function renderPlayList() {
    // console.log('e.target.classList'+event.target);

   
        const tbodyE2 =  document.getElementById("tb2");
        //let cnt =playListSongs;
       // console.log(playListSongs.songs);

        for (let i = 0; i < playListSongs.songs.length; i++) {
            tbodyE2.innerHTML += `
                <tr id=${i}>
                    <td>${playListSongs.songs[i].id}</td>
                    <td>${playListSongs.songs[i].title}</td>                   
                    <td><button class="deleteBtn"  onclick="deleteSongFunction(${i})" id="remove-song"${i}>Delete</button></td>
                 
                </tr>
            `;
    
        }

       
}

function deleteSongFunction(i) {
   
    console.log(i);
    var index, table = document.getElementById('playlist');
   // console.log(table.rows[0]);
    for(var i = 1; i < table.rows.length; i++)
    {
        console.log(table.rows[i].cells[2]);
        table.rows[i].cells[2].onclick = function()
        {
            var c = confirm("do you want to delete this row");
            if(c === true)
            {
                index = this.parentElement.rowIndex;
                table.deleteRow(index);
            }
            
         
        };
        
    }


}




