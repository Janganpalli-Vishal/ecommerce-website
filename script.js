function signup(e) {
    e.preventDefault();

    let userName = document.querySelector('#name').value;
    let userEmail = document.querySelector('#email').value;
    let userPassword = document.querySelector('#password').value;

    if (userName && userEmail && userPassword) {

        let userData = { name: userName, email: userEmail, password: userPassword };
        localStorage.setItem("userData", JSON.stringify(userData));
        alert('Account created successfully! Please Login.');
        window.location.href = "login.html";

    } else {
        alert("Please fill out all fields");
    }
}


function login(e) {
    e.preventDefault();

    let logEmail = document.querySelector("#log-email").value;
    let logPass = document.querySelector("#log-password").value;

    let userData = JSON.parse(localStorage.getItem("userData"));
    if (logEmail === userData.email && logPass === userData.password) {
        alert('Login Successful')
        location.reload()
        window.location.href = "shop.html"
    }
    else {
        alert('Wrong Email or Password')
    }
}


let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let products = [];

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

function shopData() {
    fetch('https://dummyjson.com/products')
        .then((response) => response.json())
        .then((data) => {
            products = data.products;
            displayData(products);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

shopData();

let listCards = [];

function displayData() {
    products.forEach((product, key) => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `
            <img src="${product.images[0]}" class="img-fluid" alt="..." style="width:15rem;height: 15rem ; padding:5px">
            <div class="card-body">
                <h5 class="card-title"><b>${product.title}</b></h5>
                <h5 class="card-title">$ : ${product.price}</h5>
                <p class="card-text"><b>${product.description}</b></p>
                <a href="#" class="btns" onclick="addToCard(${key})">ADD TO CART</a>
            </div>`;
        list.appendChild(div);
    });
}
function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.images[0]}"/></div>
                <div>${value.title}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}