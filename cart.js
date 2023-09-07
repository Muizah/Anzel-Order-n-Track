import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, getDocs } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDyVzq6usfmj6Zn5vtPjhIMTPSM9fCp42Y",
    authDomain: "anzel-main.firebaseapp.com",
    databaseURL: "https://anzel-main-default-rtdb.firebaseio.com",
    projectId: "anzel-main",
    storageBucket: "anzel-main.appspot.com",
    messagingSenderId: "1016468813112",
    appId: "1:1016468813112:web:f10bfb619f3e1568917dcd"
};

initializeApp(firebaseConfig);
const db = getFirestore()
const colRef = collection(db, 'menu')

async function getAllDataOnce() {
    const querySnapshot = await getDocs(collection(db, "menu"));
    var menu = [];
    querySnapshot.forEach(doc => {
        menu.push(doc.data());
    });
    addAllItemsToDiv(menu);
}

window.onload = getAllDataOnce;

async function getAllDataRealtime() {
    document.querySelector('#items').innerHTML = "";
    menuNo = 0;
    const dbRef = collection(db, "menu");
    onSnapshot(dbRef, (querySnapshot) => {
        var menu = [];
        querySnapshot.forEach(doc => {
            menu.push(doc.data());
        });
        addAllItemsToDiv(menu);
    });
}

window.onload = getAllDataRealtime;

var menuNo = 0;
var items = document.querySelector('#items');
const cartItems = document.querySelector('#cartItem');
const total = document.querySelector('#total');
let cart = [];

function addItem(image, name, quantity, price) {
    const newDiv = document.createElement('div');
    const itemTwo = document.createElement('img');
    const itemThree = document.createElement('p');
    const itemFour = document.createElement('p');
    const itemFive = document.createElement('p');
    const itemSix = document.createElement('button');


    itemTwo.setAttribute('src', image);
    itemThree.innerHTML = name;
    itemFour.innerHTML = price;
    itemFive.innerHTML = '₦' + quantity;
    itemSix.innerHTML = 'Add to cart';

    itemFive.classList.add('itemFive');
    itemSix.classList.add('add');


    itemSix.addEventListener('click', () => {
        addToCart({ name, price, image, quantity });
    });


    newDiv.appendChild(itemTwo);
    newDiv.appendChild(itemThree);
    newDiv.appendChild(itemFour);
    newDiv.appendChild(itemFive);
    newDiv.appendChild(itemSix);

    items.appendChild(newDiv);
}

function addAllItemsToDiv(menuDocsLIst) {
    menuNo = 0;
    items.innerHTML = "";
    menuDocsLIst.forEach(element => {
        addItem(element.Image, element.Name, element.Price, element.Quantity)
    });
};
function addToCart(item) {
    cart.push(item);
    updateCartDisplay();
}

function delElement(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function decrementQuantity(itemIndex) {
    if (cart[itemIndex].quantity > 0) {
        cart[itemIndex].quantity--;
        updateCartDisplay();
    }
}


function updateCartDisplay(a) {
    let j = 0, total = 0;
    document.querySelector('#count').innerHTML = cart.length;
    if (cart.length == 0) {
        document.querySelector('#cartItem').innerHTML = "Your cart is empty";
        document.querySelector('#total').innerHTML = "₦ " + 0 + " .00";
    }
    else {
        const cartItemContainer = document.querySelector('#cartItem');
        cartItemContainer.innerHTML = "";

        cart.forEach((item, index) => {
            var { image, name, price, quantity } = item;
            total += parseInt(quantity);

            document.querySelector('#total').innerHTML = "₦ " + total + " .00";

            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');

            cartItemDiv.innerHTML = `
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size: 17px; color: navy; font-weight: 800;'>${name}</p>
                <h2 style='font-size: 15px; color: navy;'>₦${quantity}.00</h2>
                <i class='fa-solid fa-trash'></i>
            `;

            const trashIcon = cartItemDiv.querySelector('.fa-trash');
            trashIcon.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCartDisplay();
            });

            cartItemContainer.appendChild(cartItemDiv);
        });
    }
}



