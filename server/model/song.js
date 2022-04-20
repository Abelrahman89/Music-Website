let songs = [{ id: 1,  title: "Ed Sheeran - Shape of You", releaseDate: "01-01-2018" },{ id: 2,  title: "Ed Sheeran - Thinking Out Loud", releaseDate: "09-01-2019" },
{ id: 3,  title: "Maroon 5 - Girls Like You ft. Cardi B", releaseDate: "02-01-2020" },{ id: 4,  title: "Pharrell Williams - Happy ", releaseDate: "04-01-2017" },
{ id: 5,  title: "See You Again (Charlie Puth, Wiz Khalifa)", releaseDate: "03-01-2019" },{ id: 6,  title: "Adele - Hello", releaseDate: "01-10-2019" }];


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