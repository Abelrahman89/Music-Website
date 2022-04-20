let playLists = [{ userId: 1, playListId: 1, songs: [{ id: 1, title: "RUAHA NATIONAL PARK" }, { id: 2, title: "BOLIVIA  NATIONAL PARK", }] },

];
let cnt = 1;
module.exports = class playList {
    constructor(userId, playListId, songs) {
        this.userId = userId;
        this.playListId = playListId;
        this.songs = songs;




    }
    save() {
        let index = playLists.findIndex(b => b.userId == this.userId);
        // console.log("body" + index + "this.userId" + this.userId);
        if (index > -1) {
            // console.log("hi");
            playLists.splice(index, 1, this);
        }
        else {
            cnt++;
            this.playListId = cnt;

            playLists.push(this);
        }


        return this;
    }

    static fetchAll() {

        return playLists;
    }



    static getByUserId(userId) {
        let playListIndex = playLists.findIndex(b => b.userId == userId);
        console.log('in' + playListIndex);
        if (playListIndex > -1) {
            return playLists[playListIndex];
        }
        else {
            let newPlayList = [{ userId: userId, playListId: 1, songs: [] }];


            //throw console.error("Not Found");
            return newPlayList;
        }
    }

    static getByUserIdSongId(userId, songId) {

        let playListIndex = playLists.findIndex(b => b.userId == userId);
        console.log('in' + playListIndex);
        if (playListIndex > -1) {
            if (songId==999999)
            {
                console.log("999");
             
              try {
                let songs = playLists[playListIndex].songs;
                let v=songs.length;
                if(v>0)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
              } catch (error) {
                return 0;
              }
            return 1;
            }
            else{
            // return playLists[playListIndex];
            let songs = playLists[playListIndex].songs;
            console.log('ss' + songs);

            let cnt = songs.findIndex(e => e.id == songId);
            console.log('cnt'+cnt);
            if (cnt > -1) { return 1; }
            else { return 0; }
            }
        }
        else {

            return 0;
        }
    }

 
/*
    static delete(userId, songId) {
        let index = playLists.findIndex(b => b.userId == userId);
        let p = playList.getByUserId(userId, songId);
        //console.log('p'+p);
        let songs = p.songs.filter(s => s.id != songId);
        //console.log('sds'+  songs[2].id);
        p.songs = songs;
        //console.log('songsp'+  p.songs);
        playLists.slice(index, 1, p);

        return p;

    }
    */
    static delete(userId, songId,tokentext) {
      
        let index = playLists.findIndex(b => b.userId == userId);
        let p = playList.getByUserId(userId, songId);
        //console.log('p'+p);
        let songs = p.songs.filter(s => s.id != songId);
        //console.log('sds'+  songs[2].id);
        p.songs = songs;
        //console.log('songsp'+  p.songs);
        playLists.slice(index, 1, p);

        return p;

    } 
   

}