window.onload = function() {
    getProducts2();
   // let songs = [{ id: 1,  title: "RUAHA NATIONAL PARK", releaseDate: "01-01-2018" }];
   
  
   // renderProduct(songs);
   
   /* document.getElementById('nav-home').onclick = function(event) {
        event.preventDefault();
        getProducts();
    }

    // add/update product
    document.getElementById('login-bttn').onclick = function(event) {
        login();
     //   window.location.href='https://google.com';
/*
        console.log("hioi");
        event.preventDefault();
        console.log("hii");
       // console("wesdsdsd");
        if (!document.getElementById('product-btn').dataset.id) {
            console.log("hieeei");
      
            addProduct();
        } else {
            editProduct();
        }
        */
//    }
}
async function login() {
   let username= document.getElementById('username').value;
   let password=document.getElementById('password').value;
   let url ='localhost:4040/users?username='+username+' &&& password='+password;
   console.log('url'+url);

    let products = await fetch().then(response => response.json());
    console.log("productsindex"+products);
  //  products.forEach(prod => renderProduct(prod));
}
async function getProducts() {
    console.log("hi");
    let products = await fetch('http://localhost:3000/products/').then(response => response.json());
    console.log("productsindex"+products);
    products.forEach(prod => renderProduct(prod));
}

function renderProduct(prod) {
    console.log("hiii");
    const div = document.createElement('div');
    div.classList = 'col-lg-4';
    div.id = "112";//prod.id;
    div.innerHTML = `<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
    <title>Placeholder</title>
    <rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777"
        dy=".3em">140x140</text>
    </svg>`;

    const id = document.createElement('h2');
    id.textContent = "prod.id";

    const title = document.createElement('p');
    h2.textContent = "prod.title";

    //h2.textContent = prod.title;

   
    const releaseDate = document.createElement('p');
    releaseDate.textContent = "prod.releaseDate";

    div.appendChild(id);
    div.appendChild(title);
    div.appendChild(releaseDate);

    const actions = document.createElement('p');
    const add = document.createElement('a');
    add.classList = 'btn btn-secondary';
    add.textContent = 'add';
    add.addEventListener('click', function(event) {
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
    deleteBtn.addEventListener('click', function(event) {
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


        async function getProducts2() {
            let products = [ {
                "id": 1,
                "title": "aaaaa",
                "price": 12,
                "description": "sdsdssdsd"
            },
            {
                "id": 3,
                "title": "ssdsdsd",
                "price": 12,
                "description": "rrrrr"
            }];
          
         
            products.forEach(prod => renderProduct2(prod));
        }
        
        ////////////////
        function renderProduct2(prod) {
            console.log("hiii");
            const div = document.createElement('div');
            div.classList = 'col-lg-4';
            div.id = prod.id;
            div.innerHTML = `<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777"
                dy=".3em">140x140</text>
            </svg>`;
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
            updateBtn.addEventListener('click', function(event) {
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
            deleteBtn.addEventListener('click', function(event) {
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
        
}