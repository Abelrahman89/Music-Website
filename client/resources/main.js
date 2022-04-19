let songs = [];
let playListSongs = [];
let users = [];
let firstSong=[{id: 00000,
title: "testetsts"}];
let numberOflements = 0;
window.onload = function () {
    SwitchButtons('login-bttn');
    getSongs();


    //login

    document.getElementById('login-bttn').onclick = function (event) {

        event.preventDefault();
        //   console.log("log");

        if (!document.getElementById('login-bttn').dataset.id) {
            //  console.log("hieeei");
            login();

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
    //  songs = [];
    //  playListSongs = [];
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let url = 'http://localhost:4040/users?username=' + username + '&&password=' + password;
    console.log('url' + url);

    users = await fetch(url).then(response => response.json());
    if (users.username == username) {
        console.log("success");
        SwitchButtons('logout-bttn');
        getPlayListByUserId();
    }
    else
        alert("sorry username or password incorrect");

}

async function serchByuserAndSongId(userId,songId) {

console.log('userId'+userId,songId);
    let url = 'http://localhost:4040/playLists/' + userId + '/' + songId;
    
console.log('urlget'+url);
    let cnt2 = await fetch(url).then(response => response.json());
    console.log('cnt2'+cnt2);
    return cnt2;

}
async function getSongs() {
    for (let i = 0; i < songs.length; i++) {
        clearPlayList(i);
    }

    let url = 'http://localhost:4040/songs';
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
async function getPlayListByUserIdwithoutRender() {
    for (let i = 0; i < songs.length; i++) {
        clearPlayList(i);
    }

    let url = 'http://localhost:4040/playLists/' + users.id;
    console.log('url' + url);

    playListSongs = await fetch(url).then(response => response.json());

   


}

async function getPlayListByUserId() {
    for (let i = 0; i < songs.length; i++) {
        clearPlayList(i);
    }

    let url = 'http://localhost:4040/playLists/' + users.id;
    console.log('url' + url);

    playListSongs = await fetch(url).then(response => response.json());

   

    renderPlayList();


}

async function addSonginplayList(songId, songTitle) {
    console.log('uid' + playListSongs.userId);
    let cnt = 0;
    try {
        cnt = numberOflements;//playListSongs.songs.length;
    } catch (error) {
        cnt = 0;
    }
console.log('cnt'+cnt);
    if (cnt > 0) {
        let newsong = { id: songId, title: songTitle };
        playListSongs.songs.push(newsong);
    }
    else {
        console.log('usid' + users.id);
        let newPlayList = [{ userId: users.id, playListId: 1, songs: [{ id: songId, title: songTitle }] }];
        playListSongs = newPlayList;
       // let newsong = [{ id: songId, title: songTitle }];
        //playListSongs.songs = newsong;
        /* console.log('uid'+playListSongs.songs[0].id);
         console.log('uid'+playListSongs[0].userId);
         */

         console.log('ss'+playListSongs[0].songs);
    }

    if (cnt > 0) {
        let result = await fetch('http://localhost:4040/playLists/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                userId: playListSongs.userId,
                playListId: playListSongs.playListId,
                songs: playListSongs.songs
            })
        }).then(res => res.json());
    }
    else {

        let result = await fetch('http://localhost:4040/playLists/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                userId: playListSongs[0].userId,
                playListId: playListSongs[0].playListId,
                songs: playListSongs[0].songs
            })
        }).then(res => res.json());
    }
    getPlayListByUserIdwithoutRender();
}
async function deleteSongFromPlayList(userId, songId) {
    console.log('uid' + userId, 'songid' + songId);

    let url = 'http://localhost:4040/playLists/' + userId + '/' + songId;
    console.log('url' + url);

    fetch(url, {
        method: 'DELETE',
    }).then(response => {
        alert('Delete Successfully!');

    });


}
async function searchBySongTitle() {
    console.log('sdsdsdsdsd');
    let songtitle = document.getElementById('songtitle').value;
    console.log('songtitle' + songtitle);
    let url = 'http://localhost:4040/songs/song?title=' + songtitle;
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








async function addSongFunction(i) {
   
let   cnt=await serchByuserAndSongId(users.id,songs[i].id);
console.log('cntttt'+cnt);
    if (cnt > 0) {
        alert("sorry you added this song before");
    }
    else {
  



        addSonginplayList(songs[i].id, songs[i].title);
        numberOflements++;
        console.log('numberOflements'+numberOflements);

        const tbodyE2 = document.getElementById("tb2");
        tbodyE2.innerHTML += `
        <tr id=${i}>
            <td>${songs[i].id}</td>
            <td>${songs[i].title}</td>
          
            <td><button class="deleteBtn"  onclick="deleteSongFunction(${i})" id="remove-song"${i}>Delete</button></td>
        </tr>
    `;
    }
   // playListSongs = [];
   //getPlayListByUserIdwithoutRender();
  // console.log('read'+playListSongs[0].songs);
}
function renderPlayList() {
    // console.log('e.target.classList'+event.target);

    console.log('hi1');
    const tbodyE2 = document.getElementById("tb2");
    //let cnt =playListSongs;
    // console.log(playListSongs.songs);
    try {
        console.log('hi2');
        if (playListSongs.songs.length > 0) {
            for (let i = 0; i < playListSongs.songs.length; i++) {
                numberOflements++;
                //console.log('plid'+playListSongs.songs[i].id);
                //  console.log(songs[1].id);
                let index = songs.findIndex(e => e.id === playListSongs.songs[i].id);
                console.log('index' + index);
                tbodyE2.innerHTML += `
            <tr id=${index}>
                <td>${playListSongs.songs[i].id}</td>
                <td>${playListSongs.songs[i].title}</td>                   
                <td><button class="deleteBtn"  onclick="deleteSongFunction(${index})" id="remove-song"${index}>Delete</button></td>
             
            </tr>
        `;

            }
        }
        else {

          //  addTextNoelements();
          console.log("");
        }

    } catch (error) {

        console.log("");
      //  addTextNoelements();

    }
}
function clearPlayList(j) {
    //  console.log('hi' + i);
    var index, table = document.getElementById('playlist');

    console.log('table.rows.length' + table.rows.length);
    for (var i = 1; i < table.rows.length; i++) {

        //  console.log(table.rows[i].cells[2]);
        table.rows[i].cells[2].onclick = function () {
            var c = confirm("do you want to delete this row");
            if (c === true) {
                index = this.parentElement.rowIndex;
                console.log('index' + index);
                table.deleteRow(index);
                numberOflements--;
            }

            //
        };

    }


}
function deletefirstRow() {

    var index, table = document.getElementById('playlist');
    table.deleteRow(1);



}
async function deleteSongFunction(i) {

 await    deleteSongFromPlayList(users.id, songs[i].id);
    clearPlayList(i);


}

function SwitchButtons(buttonId) {
    var hideBtn, showBtn;

    let element = document.getElementById("userPrinted");

    //username
    let userElement = document.getElementById("username");

    //password
    let passwordElement = document.getElementById("password");


    if (buttonId == 'logout-bttn') {
        showBtn = 'logout-bttn';
        hideBtn = 'login-bttn';


        element.removeAttribute("hidden");

        userElement.setAttribute("hidden", "hidden");
        passwordElement.setAttribute("hidden", "hidden");
        element.innerText = users.username;


    } else {

        showBtn = 'login-bttn';
        hideBtn = 'logout-bttn';
        element.setAttribute("hidden", "hidden");


        userElement.removeAttribute("hidden");
        passwordElement.removeAttribute("hidden");
    }

    document.getElementById(hideBtn).style.display = 'none';
    //    document.getElementById(usernameHidden).style.display = 'none';    
    document.getElementById(showBtn).style.display = '';

}

function addTextNoelements() {
    const tbodyE2 = document.getElementById("tb2");
    tbodyE2.innerHTML += `
    <tr id=-1>
        <td>   </td>
        <td  style="color: red; font-size: 30px; font-style: italic;">you dont have songs yet in your playlist</td>                   
        <td>   </td>
     
    </tr>
`;
}

