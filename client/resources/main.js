let songs = [];
let playListSongs = [];
let users = [];
let firstSong = [{
    id: 00000,
    title: "testetsts"
}];
let stausLogin = "";
let numberOflements = 0;
window.onload = function () {
    let historystatus = localStorage.getItem('stausLoginHistory');
    let userName = localStorage.getItem("userName");
    let password = localStorage.getItem("password");
    // console.log("userName" + userName);
    // console.log("password" + password);
    // console.log("historystatus" + historystatus);
    if (historystatus == "stausisLogin") {
        let userId = localStorage.getItem("userId");
        // let userName = localStorage.getItem("userName");
        // let password = localStorage.getItem("password");




        //   console.log("password"+password);
        //   console.log("userName"+userName);

        if (password !== 'undefined') {
            let usernameElement = document.getElementById('username');

            let passwordElement = document.getElementById('password');

            usernameElement.value = userName;
            passwordElement.value = password;

            login();
        }

    }
    getSongs();

    SwitchButtons('login-bttn');
    //login

    document.getElementById('login-bttn').onclick = function (event) {

        event.preventDefault();
        //   console.log("log");

        if (!document.getElementById('login-bttn').dataset.id) {
            //  console.log("hieeei");
            login();

        }
    }
    document.getElementById('logout-bttn').onclick = function (event) {
        //event.preventDefault();
        if (!document.getElementById('logout-bttn').dataset.id) {
          LogOut();
        }

    }

    //search by song title
    document.getElementById('search-bttn').onclick = function (event) {

        event.preventDefault();
        if (!document.getElementById('search-bttn').dataset.id) {
            console.log("search");
            searchBySongTitle();
            /*if (!document.getElementById('search-bttn').dataset.id) {
                console.log("hieeei");
               searchBySongTitle();
    
            } 
            */
        }
    }


}
window.onbeforeunload = function () {
    // console.log("uss" + stausLogin);
    // console.log("uss" + users.username);
    //localStorage.setItem("name", "abdelrahman");
    localStorage.setItem("userId", users.username);
    localStorage.setItem("userName", users.username);
    localStorage.setItem("password", users.password);
    localStorage.setItem("stausLoginHistory", stausLogin);
    /* localStorage.setItem("userId", users.username);
     localStorage.setItem("userId", users.username);
     localStorage.setItem("userId", users.username);
     /*localStorage.setItem("name", $('#inputName').val());
     localStorage.setItem("email", $('#inputEmail').val());
     localStorage.setItem("phone", $('#inputPhone').val());
     localStorage.setItem("subject", $('#inputSubject').val());
     localStorage.setItem("detail", $('#inputDetail').val());
     // ...
     */
}

async function login() {
    //  songs = [];
    //  playListSongs = [];
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let url = 'http://localhost:4040/users?username=' + username + '&&password=' + password;
    console.log('url' + url);

    users = await fetch(url).then(response => response.json());


    /*var today = new Date();
    users.tockendate=today;
    */
    
    if (users.username == username) {
        console.log("success");
        SwitchButtons('logout-bttn');
        getPlayListByUserId();
        stausLogin = "stausisLogin";
        console.log("login" + stausLogin);
    }
    else
        alert("sorry username or password incorrect");

}

async function serchByuserAndSongId(userId, songId) {

    console.log('userId' + userId, songId);
    let url = 'http://localhost:4040/playLists/' + userId + '/' + songId;

    console.log('urlget' + url);
    let cnt2 = await fetch(url).then(response => response.json());
    console.log('cnt2' + cnt2);
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
                <td style="margin:auto">  <button class="btn btn-outline-success" onclick="addSongFunction(${i})" type="submit" id="add-song-${i}"><i class="fa-solid fa-folder-plus fa-2xl"></i></button></td>
               
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
    //let x=await fetch(url).then(response => response.json());
    //console.log("length"+playListSongs.songs.length);
    //console.log("lengthhhhh"+playListSongs.songs);


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
    console.log('cnt' + cnt);
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

        console.log('ss' + playListSongs[0].songs);
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
    if (songtitle !== '') {
        let url = 'http://localhost:4040/songs/song?title=' + songtitle;
        console.log('url' + url);

        songs = await fetch(url).then(response => response.json());
        const tbodyEl = document.getElementById("musiclist");

        tbodyEl.innerHTML = ``;
        for (let i = 0; i < songs.length; i++) {
            tbodyEl.innerHTML += `
            <tr>
                <td>${songs[i].id}</td>
                <td>${songs[i].title}</td>
                <td>${songs[i].releaseDate}</td>
                <td style="margin:auto">  <button class="btn btn-outline-success" onclick="addSongFunction(${i})" type="submit" id="add-song-${i}"><i class="fa-solid fa-folder-plus fa-2xl"></i></button></td>
             
            </tr>
        `;

        }

    }
    else {
        getSongs();
    }


}








async function addSongFunction(i) {

    let exit=  await checkTockenTime();
  if(exit==1)
  {
      LogOut();
  }
  else{
  //SwitchButtons('logout-bttn');
    //  console.log('user' + users.length);
    if (users.length <= 0) {
        alert("You Should Login First");
    }
    else {
        let cnt = await serchByuserAndSongId(users.id, songs[i].id);

        if (cnt > 0) {
            alert("sorry you added this song before");
        }
        else {


            let cnt = await serchByuserAndSongId(users.id, 999999);

            if (cnt <= 0) {
                deletefirstRow();
            }


            addSonginplayList(songs[i].id, songs[i].title);
            numberOflements++;
            console.log('numberOflements' + numberOflements);

            const tbodyE2 = document.getElementById("tb2");
            tbodyE2.innerHTML += `
        <tr id=${i}>
            <td>${songs[i].id}</td>
            <td>${songs[i].title}</td>
          
            <td><button class="deleteBtn"  onclick="deleteSongFunction(${i})" id="remove-song"${i}><i class="fa-solid fa-minus fa-2xl"></i></i></i></button></td>
        </tr>
    `;
        }
        // playListSongs = [];
        //getPlayListByUserIdwithoutRender();
        // console.log('read'+playListSongs[0].songs);
    }
}
}
async function renderPlayList() {
    const tbodyE2 = document.getElementById("tb2");


    let cnt = await serchByuserAndSongId(users.id, 999999);

    if (cnt > 0) {
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
                <td><button class="deleteBtn"  onclick="deleteSongFunction(${index})" id="remove-song"${index}><i class="fa-solid fa-minus fa-2xl"></i></i></i></button></td>
     
             
            </tr>
        `;

            }
        }
    }
    else {
        addTextNoelements();
    }

    //console.log("lengthhf"+playListSongs.songs.length );
    /*
        try {
            //console.log('hi2');
            if (playListSongs.songs.length > 0) {
              //  let p= playListSongs.songs;
                for (let i = 0; i <playListSongs.songs.length; i++) {
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
    
               // addTextNoelements();
              console.log("");
            }
    
        } catch (error) {
    
            console.log("dffff"+error);
          addTextNoelements();
    
        }
        */
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
    try {
        var index, table = document.getElementById('playlist');
        table.deleteRow(1);


    } catch (error) {
        alert("You Should Login First");
    }



}
async function deleteSongFunction(i) {
  let exit=  await checkTockenTime();
  if(exit==1)
  {
      LogOut();
  }
  else{
    await deleteSongFromPlayList(users.id, songs[i].id);
    clearPlayList(i);
  }


}

function SwitchButtons(buttonId) {
    var hideBtn, showBtn, hideBtn2;



    let element = document.getElementById("userPrinted");

    //username
    let userElement = document.getElementById("username");

    //password
    let passwordElement = document.getElementById("password");


    if (buttonId == 'logout-bttn') {
        console.log("yes");
        showBtn = 'logout-bttn';
        hideBtn = 'login-bttn';



        element.removeAttribute("hidden");

        userElement.setAttribute("hidden", "hidden");
        passwordElement.setAttribute("hidden", "hidden");
        element.innerText = users.username;
        /*  for(let i=0;i<songs.length;i++)
      {
          document.getElementById('add-song-'+i).style.display = '';
      }
      */


    } else {

        showBtn = 'login-bttn';
        hideBtn = 'logout-bttn';
        element.setAttribute("hidden", "hidden");


        userElement.removeAttribute("hidden");
        passwordElement.removeAttribute("hidden");
        /*  console.log();
          for(let i=0;i<songs.length;i++)
      {
          document.getElementById('add-song-'+i).style.display = 'none';
      }
      */
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
        <td  style="color: red; font-size: 30px; font-style: italic;">you don't have songs yet in your playlist</td>                   
        <td>   </td>
     
    </tr>
`;
}

async function checkTockenTime() {
    var today = new Date();
    console.log('today'+today);

    var tockendate =new Date (users.tokenCreatedDate);
    console.log('tockendate'+tockendate);


var diffMs = (today - tockendate); // milliseconds between now & Christmas
var diffDays = Math.floor(diffMs / 86400000); // days
var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
if(diffDays>=1 || diffHrs>=1 || diffMins>=20)
{
    alert (" sorry session time out");
    console.log("greater");
    return 1;//logout
    

}
else
{

    console.log("less");
    return 0; //continue
}
}

 function LogOut(){
    let songs = [];
    let playListSongs = [];
    let users = [];
    let firstSong = [{
        id: 00000,
        title: "testetsts"
    }];
    let numberOflements = 0;
    console.log('sjhsjhjh');

    historystatus = '';
    let userName = '';
    let password=''

    SwitchButtons('login-bttn');

    stausLogin = "stausisLogout";
}
