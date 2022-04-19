let songs = [{ id: 1,  title: "RUAHA NATIONAL PARK", releaseDate: "01-01-2018" },{ id: 2,  title: "EAST BERBICE-CORENTYNE", releaseDate: "09-01-2019" },
{ id: 3,  title: "BOLIVIA  NATIONAL PARK", releaseDate: "02-01-2020" },{ id: 4,  title: "SOUTH AFRICA", releaseDate: "04-01-2017" },
{ id: 5,  title: "BRAZIL NATIONAL PARK", releaseDate: "03-01-2019" },{ id: 6,  title: "GUYANA NATIONAL PARK", releaseDate: "01-10-2019" }];


let cnt = 1;
module.exports = class Song {
    constructor(id, title, releaseDate) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
    }


    static fetchAll() {

        return songs;
    }


    static getByName(title) {      
        
        return songs.filter(s => s.title.includes(title)); 
    }

}