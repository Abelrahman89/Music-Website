let songs = [];
let playListSongs = [];

let users = [];
let usersTocken = [];
let firstSong = [{
    id: 00000,
    title: "testetsts"
}];
let stausLogin = "";
let numberOflements = 0;
let savedPassword = "";
currentSong = -1;
currentSongIndex = -1;
window.onload = function () {

    let historystatus = localStorage.getItem('stausLoginHistory');
    let userName = localStorage.getItem("userName");
    let password = localStorage.getItem("password");
    console.log("userName" + userName);
    console.log("password" + password);
    console.log("historystatus" + historystatus);
    if (historystatus === "stausisLogin") {
        console.log("historystatusssss" + historystatus);
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

    // if (historystatus == "stausisLogin") {
    SwitchButtons('login-bttn');
    //   }

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

            tbodyE2 = document.getElementById("tb2");
            tbodyE2.innerHTML = ``;
            songs = [];
            playListSongs = [];
            users = [];
            firstSong = [{
                id: 00000,
                title: "testetsts"
            }];
            numberOflements = 0;
            console.log('sjhsjhjh');
            usernameElement = document.getElementById('username');

            passwordElement = document.getElementById('password');
            historystatus = '';
            userName = '';
            password = ''
            usernameElement.value = "";
            passwordElement.value = "";
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
    document.getElementById("musicplay").addEventListener('ended', async function () {
        if (users.length <= 0) {
            alert("You Should Login First");
        }
        console.log("play next song" + currentSong);

        await playNextSong();

    });

    document.getElementById('nextSong').onclick = async function (event) {
   
        event.preventDefault();
      
        if (users.length <= 0) {
            alert("You Should Login First");
        }
       else{
        if (!document.getElementById('nextSong').dataset.id) {
           
            playNextSong();

        }
       }
    }

    document.getElementById('backSong').onclick = async function (event) {
   
        event.preventDefault();
        if (users.length <= 0) {
            alert("You Should Login First");
        }

        if (!document.getElementById('backSong').dataset.id) {
           
          await   playPreviousSong();

        }
    }


    document.getElementById('shuffle-bttn').onclick = async function (event) {
      
        event.preventDefault();
        if (users.length <= 0) {
            alert("You Should Login First");
        }

        if (!document.getElementById('shuffle-bttn').dataset.id) {
           await  randomArray();
            await playSongFunction(currentSong);

        }
    }
    
    document.getElementById('normalSongList-bttn').onclick = async function (event) {

        event.preventDefault();
        if (users.length <= 0) {
            alert("You Should Login First");
        }
        else{

        if (!document.getElementById('normalSongList-bttn').dataset.id) {
            let tbodyE2 = document.getElementById("tb2");
            tbodyE2.innerHTML = ``;
            await getPlayListByUserId();
            await playSongFunction(currentSong);

        }
    }
    }
    

}
window.onbeforeunload = function () {

    console.log("aaaaaaaaaaa");
    console.log("aaaaaaaaaaa" + stausLogin);
    // console.log("uss" + users.username);
    //localStorage.setItem("name", "abdelrahman");
    localStorage.setItem("userId", users.username);
    localStorage.setItem("userName", users.username);
    localStorage.setItem("password", savedPassword);
    localStorage.setItem("stausLoginHistory", stausLogin);
    localStorage.setItem("tokenCreatedDate", users.tokenCreatedDate);
    localStorage.setItem("tokentext", users.tokentext);
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



async function playSongFunction(i) {

    let exit1 = await validateTocken();
    let exit = await checkTockenTime();
    if (exit == 1 || exit1 == 1) {
        LogOut();
    }
    else {
        /*
    console.log("play song");
        //  document.getElementById("source1").pause();
          document.getElementById("source1").setAttribute('src', "../sound/Adele - Hello.mp3");
          document.getElementById("source1").setAttribute('type', "audio/ogg");
         
          //document.getElementById("source1").load();
          document.getElementById("source1").play();
         
       */

        //  http://localhost:4040/
        currentSong = i;
        currentSongIndex=playListSongs.songs.findIndex(e=>e.id==i);
        console.log("currentSodddng"+currentSong);
        console.log("currentSongdddIndex"+currentSongIndex);
        let audio = document.getElementById("musicplay");
        let source = document.getElementById("source1");
        console.log("heloossfff" + "./sound/" + i);
        source.src = "./sound/" +i + ".mp3";
        source.type = "audio/ogg";
        console.log("name"+playListSongs.songs[currentSongIndex].title);
    document.getElementById("songName").innerText=playListSongs.songs[currentSongIndex].title;
        //source.src = "./sound/Pharrell Williams - Happy.mp3" ;

        audio.load();
        audio.play();
    }


}

async function playNextSong() {
   // currentSongIndex=playListSongs.songs.findIndex(e=>e.id==i);
    console.log("currentSong"+currentSong);
    console.log("currentSongIndex"+currentSongIndex);
    if(currentSongIndex>=0  && (currentSongIndex + 1) < playListSongs.songs.length){
        console.log("prev");
    }
    else{
        currentSongIndex=-1;
      //  currentSong=playListSongs.songs[0].id;
    }
   // for (let i = currentSongIndex + 1; i < playListSongs.songs.length; i++) {
    
let i=currentSongIndex + 1;
currentSongIndex = i;
        currentSong= playListSongs.songs[i].id;
        console.log("cccccc"+currentSong);
        console.log("iiiiiiii"+currentSongIndex);
        let audio = document.getElementById("musicplay");
        let source = document.getElementById("source1");
        console.log("heloossdddd" + "./sound/" + playListSongs.songs[i].id);
        source.src = "./sound/" + playListSongs.songs[i].id + ".mp3";
        source.type = "audio/ogg";
        document.getElementById("songName").innerText=playListSongs.songs[i].title;
        //source.src = "./sound/Pharrell Williams - Happy.mp3" ;

        audio.load();
        audio.play();


    //}




}

async function playPreviousSong() {

   // if(currentSongIndex>=0 && (currentSongIndex-1) < playListSongs.songs.length){


        if(currentSongIndex>=0  && (currentSongIndex ) < playListSongs.songs.length){
            console.log("prev");
        }
        else{
            currentSongIndex=playListSongs.songs.length;
            //currentSong=playListSongs.songs[currentSongIndex].id;
        }

    console.log("previous");
    //for (let i = currentSongIndex -1 ; i < playListSongs.songs.length; i++) {
        let i=currentSongIndex -1;
        if(i<0){
            currentSongIndex=playListSongs.songs.length-1;
        
        i=currentSongIndex;
        console.log("i"+i);
        }
        currentSongIndex = i;
        currentSong= playListSongs.songs[i].id;
        let audio = document.getElementById("musicplay");
        let source = document.getElementById("source1");
        console.log("helooss" + "./sound/" + playListSongs.songs[i].id);
        source.src = "./sound/" + playListSongs.songs[i].id + ".mp3";
        source.type = "audio/ogg";
        document.getElementById("songName").innerText=playListSongs.songs[i].title;
        //source.src = "./sound/Pharrell Williams - Happy.mp3" ;

        audio.load();
        audio.play();


  //  }
  //  }

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
        console.log("successsssssss");

        savedPassword = password;
        stausLogin = "stausisLogin";
        console.log("login" + stausLogin);
        SwitchButtons('logout-bttn');
        await getPlayListByUserId();
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
  /*  for (let i = 0; i < songs.length; i++) {
        clearPlayList(i);
    }
    */

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
                <td style="margin:auto;text-align:center">  <button class="btn btn-outline-success" onclick="addSongFunction(${i})" type="submit" id="add-song-${i}"><i class="fa-solid fa-folder-plus fa-2xl"></i></button></td>
               
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
try {
    currentSong =playListSongs.songs[0].id;
    currentSongIndex =0;
    renderPlayList();
} catch (error) {
    console.log("hh");
}
  


}

async function addSonginplayList(songId, songTitle) {
    console.log('uid' + playListSongs.userId);
    let cnt = 0;
    console.log("numberOflements" + numberOflements);
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
                <td style="margin:auto ;text-align:center">  <button class="btn btn-outline-success" onclick="addSongFunction(${i})" type="submit" id="add-song-${i}"><i class="fa-solid fa-folder-plus fa-2xl"></i></button></td>
             
            </tr>
        `;

        }

    }
    else {
        const tbodyEl = document.getElementById("musiclist");

        tbodyEl.innerHTML = ``;
        getSongs();
    }


}








async function addSongFunction(i) {

    let exit1 = await validateTocken();
    let exit = await checkTockenTime();
    if (users.length <= 0) {
        alert("You Should Login First");
    }
    else {
        if (exit == 1 || exit1 == 1) {
            LogOut();
        }
        else {
            //SwitchButtons('logout-bttn');
            //  console.log('user' + users.length);
            if (users.length <= 0) {
                alert("You Should Login First");
            }
            else {
                let cnt = 0;
                try {
                    cnt = await serchByuserAndSongId(users.id, songs[i].id);
                } catch (error) {

                }

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
          
            <td style="margin:auto ;text-align:center"> <button class="deleteBtn"  onclick="deleteSongFunction(${i})" id="remove-song"${i}><i class="fa-solid fa-minus fa-2xl"></i></i></i></button>
          
            </td>
            <td style="margin:auto ;text-align:center">
            <button class="dd"  onclick="playSongFunction(${songs[i].id})" id="play-song"${i}><i class="fa-solid fa-play fa-2xl"></i></button> </td>
         
        </tr>
    `;
                }
                // playListSongs = [];
                //getPlayListByUserIdwithoutRender();
                // console.log('read'+playListSongs[0].songs);
            }
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
                <td style="margin:auto ;text-align:center"> <button class="deleteBtn"  onclick="deleteSongFunction(${index})" id="remove-song"${index}><i class="fa-solid fa-minus fa-2xl"></i></button>
                </td>
                <td style="margin:auto ;text-align:center">
            <button class="dd"  onclick="playSongFunction(${playListSongs.songs[i].id})" id="play-song"${i}><i class="fa-solid fa-play fa-2xl"></i></button> </td>
         
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

async function clearPlayList(i) {
    let j=i;
    console.log('hi' + i);
    var index, table = document.getElementById('playlist');

    console.log('table.rows.length' + table.rows.length);
    for (var i = 1; i < table.rows.length; i++) {
console.log("hello"+i)

        //  console.log(table.rows[i].cells[2]);
        table.rows[i].cells[2].onclick = async function () {
          var c = confirm("do you want to delete this row");
            if (c === true) {
          
                index = this.parentElement.rowIndex;
                console.log('index' + index);
                table.deleteRow(index);
              //   deleteSongFromPlayList(users.id, songs[j].id);
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
        //alert("You Should Login First");
        console.log("delete not successfully");
    }



}

function deleteRow(i) {
    try {
        var  table = document.getElementById('playlist');
        table.deleteRow(i);


    } catch (error) {
        //alert("You Should Login First");
        console.log("delete not successfully");
    }



}


async function deleteSongFunction(i) {
    let exit1 = await validateTocken();
    let exit = await checkTockenTime();
    if (exit == 1 || exit1 == 1) {
        LogOut();
    }
    else{
        console.log("fffff");
        var c = confirm("do you want to delete this row");
        if (c === true) {
            let index =  playListSongs.songs.findIndex(e => e.id === songs[i].id);
            console.log('indewwwwx'+index);
           deleteRow(index+1);
 //   await clearPlayList(i);
 //await clearPlayList2();
    await deleteSongFromPlayList(users.id, songs[i].id);
        }

}


}


async function clearPlayList2(i) {
    console.log('hi' + i);
    var index, table = document.getElementById('playlist');

    console.log('table.rows.length' + table.rows.length);

console.log("hello"+i)

        //  console.log(table.rows[i].cells[2]);
        table.rows[i].cells[2].onclick = function () {
          
          
                index = this.parentElement.rowIndex;
                console.log('index' + index);
                table.deleteRow(index);
               
                numberOflements--;
           

            //
        };

    


}



function cs_change_music(music) {

    document.getElementById("my-audio").pause();
    document.getElementById("my-audio").setAttribute('src', music);
    document.getElementById("my-audio").load();
    document.getElementById("my-audio").play();
}

function SwitchButtons(buttonId) {
    var hideBtn, showBtn, hideBtn2;


    console.log("hhiiiiiiii" + buttonId);
    let element = document.getElementById("userPrinted");

    //username
    let userElement = document.getElementById("username");

    //password
    let passwordElement = document.getElementById("password");


    if (buttonId == 'logout-bttn') {

        console.log("11111111111");
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
        console.log("22222222222");

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
    console.log('today' + today);

    var tockendate = new Date(users.tokenCreatedDate);
    console.log('tockendate' + tockendate);


    var diffMs = (today - tockendate); // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    if (diffDays >=20 && diffHrs >=15 && diffMins >= 500) {
        alert(" sorry session time out");
        console.log("greater");
        return 1;//logout


    }
    else {

        console.log("less");
        return 0; //continue
    }
}

function LogOut() {







    usernameElement = document.getElementById('username');

    passwordElement = document.getElementById('password');
    historystatus = '';
    userName = '';
    password = ''
    usernameElement.value = "";
    passwordElement.value = "";
    savedPassword = "";

    const tbodyEl = document.getElementById("tb2");

    tbodyEl.innerHTML = ``;
    stausLogin = "stausisLogout";

    SwitchButtons('login-bttn');


}

async function randomArray() {
    let songArray=playListSongs;
    for (let i = songArray.songs.length - 1; i > 0; i--) {
    

        let j = Math.floor(Math.random() * (i + 1));
                    
        let temp = songArray.songs[i];
        songArray.songs[i] = songArray.songs[j];
        songArray.songs[j] = temp;
        
    }
    for (let  i = songArray.songs.length - 1; i > 0; i--) {
    
console.log( songArray.songs[i].title);
        
    }
        currentSong=songArray.songs[0].id;
        currentSongIndex=0;
        console.log('currentSorrrng'+currentSong);
        console.log('rrrrrcurrentSongIndex'+currentSongIndex);
        playListSongs=songArray;
    //return songArray;
  }





async function validateTocken() {
    var today = new Date();
    console.log('today' + today);


   // let username = document.getElementById('username').value;
   // let password = document.getElementById('password').value;
    console.log(users.tokenCreatedDate);
    let url='';
    if( users.tokentext!==undefined)
    {
        url = 'http://localhost:4040/users/' + users.username + '/' + users.tokentext;
    }
   else
   {
    url = 'http://localhost:4040/users/' + users.username + '/' + "123456789";
   }
    


    var tockendate = new Date(usersTocken.tokenCreatedDate);
    console.log('tockendate' + tockendate);


    var diffMs = (today - tockendate); // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    if (diffDays >= 11 && diffHrs >= 15 && diffMins >= 500) {
        alert(" sorry session time out");
        console.log("big");
        return 1;//logout


    }
    else {

        console.log("less");
        return 0; //continue
    }
}



