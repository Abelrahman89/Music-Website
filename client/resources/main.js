let songs = [];
let playListSongs=[];
window.onload = function () {
    getSongs();
    getPlayList();

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
    // getProducts();
    console.log("hioei");
    document.getElementById('nav-home').onclick = function (event) {
        event.preventDefault();
        getProducts();
    }

    // add/update product
   /* document.getElementById('product-btn').onclick = function (event) {
        console.log("hioi");
        event.preventDefault();
        console.log("hii");
        // console("wesdsdsd");
        if (!document.getElementById('product-btn').dataset.id) {
            console.log("hieeei");
            login();
            //addProduct();
        } else {
            editProduct();
        }
    }
    */
}


async function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let url = 'http://localhost:4040/users?username=' + username + '&&password=' + password;
    console.log('url' + url);
    let products = [];
    products = await fetch(url).then(response => response.json());
    if (products.username == username) {
        console.log("success");
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

async function getPlayList() {
    for (let i = 0; i < songs.length; i++) {
        deleteSongFunction(i);
    }
  
    let url = 'http://localhost:4040/playLists' ;
    console.log('url' + url);
    
    playListSongs = await fetch(url).then(response => response.json());
    renderPlayList();


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
async function getProducts() {
    

    products.forEach(prod => renderProduct(prod));
}

function renderProduct(prod) {
    console.log("hiii");
    const div = document.createElement('div');
    div.classList = 'col-lg-4';
    div.id = prod.id;
    div.innerHTML = `<svg class="bd-placeholder-img rounded-circle" width="140" height="140"  aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
   
    <rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777"
        dy=".3em">140x140</text>
    </svg>`;
    /*  div.innerHTML = `<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
      <title>Placeholder</title>
      <rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777"
          dy=".3em">140x140</text>
      </svg>`;*/

    const h3 = document.createElement('h3');
    const h2 = document.createElement('h2');
    h2.textContent = prod.title;
    h3.textContent = "test";
    const price = document.createElement('p');
    price.textContent = prod.price;

    const description = document.createElement('p');
    description.textContent = prod.description;

    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(price);
    div.appendChild(description);

    const actions = document.createElement('p');
    const updateBtn = document.createElement('a');
    updateBtn.classList = 'btn btn-secondary';
    updateBtn.textContent = 'UPDATE';
    updateBtn.addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('product-heading').textContent = 'Edit Product';
        document.getElementById('title').value = prod.title;
        document.getElementById('price').value = prod.price;
        document.getElementById('description').value = prod.description;
        document.getElementById('product-btn').dataset.id = prod.id;
    });

    const deleteBtn = document.createElement('a');
    deleteBtn.classList = 'btn btn-secondary';
    deleteBtn.textContent = 'DELETE';
    deleteBtn.addEventListener('click', function (event) {
        event.preventDefault();

        fetch('http://localhost:3000/products/' + prod.id, {
            method: 'DELETE',
        }).then(response => {
            alert('Delete Successfully!');
            div.remove();
        });
    });

    actions.appendChild(updateBtn);
    actions.appendChild(deleteBtn);

    div.appendChild(actions);

    document.getElementById('products').appendChild(div);
}


async function addProduct() {
    console.log("hi");

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

function editProduct() {
    console.log("hi");
    const prodId = document.getElementById('product-btn').dataset.id;
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    fetch('http://localhost:3000/products/' + prodId, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            price: price,
            description: description
        })
    }).then(response => response.json())
        .then(jsonObj => {
            const productDiv = document.getElementById(prodId);
            productDiv.querySelector('h2').textContent = title;
            const paragraphArr = productDiv.querySelectorAll('p');
            paragraphArr[0].textContent = price;
            paragraphArr[1].textContent = description;

            document.getElementById('product-heading').textContent = 'Add a new Product';
            document.getElementById('product-btn').dataset.id = '';
            document.getElementById('product-form').reset();
        });
}


function addSongFunction(i) {
    // console.log('e.target.classList'+event.target);

    console.log(i)
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
        let cnt =playListSongs;
        console.log(cnt[0].songs);

        for (let i = 0; i < playListSongs[0].songs.length; i++) {
            tbodyE2.innerHTML += `
                <tr>
                    <td>${playListSongs[0].songs[i].id}</td>
                    <td>${playListSongs[0].songs[i].title}</td>                   
                    <td><button class="deleteBtn"  onclick="deleteSongFunction(${i})" id="remove-song"${i}>Delete</button></td>
                 
                </tr>
            `;
    
        }

       
}

function deleteSongFunction(i) {
   

    var index, table = document.getElementById('playlist');
   // console.log(table.rows[0]);
    for(var i = 1; i < table.rows.length; i++)
    {
        console.log(table.rows[i].cells[3]);
        table.rows[i].cells[3].onclick = function()
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




