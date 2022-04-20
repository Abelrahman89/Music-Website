
var today = new Date();

let users = [{ id: 1,username: "abdo", password: "123456",tokenCreatedDate:today,tokentext:"123456789"},
{ id: 2,username: "ahmed", password: "123456",tokenCreatedDate:today,today:"123456789"}
];
let cnt = 1;
module.exports = class User {
    constructor(id, username,password,token ) {
        this.id = id;
        this.username = username;
        this.token= token;
 
           }
  

    update() {
       
        let index = users.findIndex(b => b.username == this.username);
       /* users[index].token.createdDate="18-04-2022";
        users[index].token.tokentext="18-04-2022 new";
        */
       console.log("this"+this.username);
       console.log("this"+this.tokentext);
     
        if (index > -1) {
            console.log("index"+index);
            users.splice(index, 1, this);
         // users.push(this);
            return this;
        }
        else {
            throw console.error("Not Found");
        }
    }
    static getByUserName(userName,password) {
     //   console.log('userName'+userName);
        let index = users.findIndex(b =>( b.username == userName && b.password==password));
        if (index > -1) {
            return users[index];
        }
        else {
            throw console.error("Not Found");
        }
    }
    static getByUserNameTocken(userName,password) {
        //   console.log('userName'+userName);
           let index = users.findIndex(b =>( b.username == userName && b.password==password));
           
           if (index > -1) {
               let userTocken={id:users[index].id,username:users[index].username,tokenCreatedDate:users[index].tokenCreatedDate ,tokentext:users[index].tokentext};
               return userTocken;
           }
           else {
               throw console.error("Not Found");
           }
       }
   /* static getByName(userName) 
    {
        return users.filter(s => s.title.includes(userName)); 
     }
     */
   
}