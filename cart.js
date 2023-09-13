// Importing necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, getDocs, updateDoc, getDoc, increment } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

// Firebase configuration object with credentials and settings
const firebaseConfig = {
    apiKey: "AIzaSyDyVzq6usfmj6Zn5vtPjhIMTPSM9fCp42Y",
    authDomain: "anzel-main.firebaseapp.com",
    databaseURL: "https://anzel-main-default-rtdb.firebaseio.com",
    projectId: "anzel-main",
    storageBucket: "anzel-main.appspot.com",
    messagingSenderId: "1016468813112",
    appId: "1:1016468813112:web:f10bfb619f3e1568917dcd"
};

// Initialize Firebase with the provided configuration
initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore()

// Get a reference to the 'menu' collection in Firestore
const colRef = collection(db, 'menu')

async function getData() {
    const dbRef = collection(db, "menu");

    // Initial load of data
    const initialSnapshot = await getDocs(dbRef);
    const menu = initialSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    addAllItemsToDiv(menu);

    // Real-time updates listener
    onSnapshot(dbRef, (querySnapshot) => {
        const menu = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        addAllItemsToDiv(menu);
    });
}


// Execute getData function when the window loads
window.onload = getData;

// DOM elements
var items = document.querySelector('#items');
const cartItems = document.querySelector('#cartItem');
const total = document.querySelector('#total');
let cart = [];

// Function to add an item to the menu list in the DOM
function addItem(image, name, price, quantity, itemId) {
    // Create HTML elements
    const newDiv = document.createElement('div');
    const itemTwo = document.createElement('img');
    const itemThree = document.createElement('p');
    const itemFour = document.createElement('p');
    const itemFive = document.createElement('p');
    const itemSix = document.createElement('button');

    // Set attributes and content
    itemTwo.setAttribute('src', image);
    itemThree.innerHTML = name;
    itemFour.innerHTML = '₦' + price;
    itemFive.innerHTML = quantity;
    itemSix.innerHTML = 'Add to cart';

    itemSix.setAttribute('data-item-id', itemId);

    //Add class names
    itemFive.classList.add('itemFive');
    itemSix.classList.add('add');

    // Add event listener to "Add to cart" button
    itemSix.addEventListener('click', (event) => {
        const name = itemThree.innerHTML;
        const itemId = event.target.dataset.itemId;

        addToCart({ name, price, image, quantity, itemId });

        const itemRef = doc(db, "menu", itemId);

        updateDoc(itemRef, { Quantity: increment(-1) })
            .then(() => console.log(`Item '${name}' quantity decremented`))
            .catch(error => console.error("Error updating quantity:", error));
    });

    //Add elements to the newDiv element
    newDiv.appendChild(itemTwo);
    newDiv.appendChild(itemThree);
    newDiv.appendChild(itemFour);
    newDiv.appendChild(itemFive);
    newDiv.appendChild(itemSix);

    items.appendChild(newDiv);

}

// Function to add all items to the menu list in the DOM
function addAllItemsToDiv(menuDocsLIst) {
    // Clear the HTML content of the items container
    items.innerHTML = "";
    // Iterate through menu items and call addItem for each
    menuDocsLIst.forEach(element => {
        addItem(element.Image, element.Name, element.Price, element.Quantity, element.id)
    });
};


// Function to add an item to the cart
function addToCart(item) {
    cart.push(item);
    updateCartDisplay();
}


// Function to update the cart display
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

        cart.forEach(async (item, index) => {
            var { image, name, price, quantity, itemId } = item;
            total += parseInt(price);

            document.querySelector('#total').innerHTML = "₦ " + total + " .00";

            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');

            cartItemDiv.innerHTML = `
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size: 17px; color: navy; font-weight: 800;'>${name}</p>
                <h2 style='font-size: 15px; color: navy;'>₦${price}.00</h2>
                <i class='fa-solid fa-trash'></i>
            `;

            const trashIcon = cartItemDiv.querySelector('.fa-trash');
            trashIcon.addEventListener('click', async (event) => {
                const itemId = item.itemId; // Get the item ID from the item
                const itemRef = doc(db, "menu", itemId);
                const updatedQuantity = increment(1);  // Increment quantity

                try {
                    await updateDoc(itemRef, { Quantity: updatedQuantity });
                    console.log(`Item '${name}' quantity incremented`);
                } catch (error) {
                    console.error("Error updating quantity:", error);
                }

                cart.splice(index, 1);
                updateCartDisplay();
            });
            cartItemContainer.appendChild(cartItemDiv);
        });
    }
}


const checkoutBtn = document.querySelector('#checkout');
checkoutBtn.addEventListener('click', async () => {
    if (cart.length > 0) {
        const totalAmount = getTotalAmountFromCart();

        var handler = PaystackPop.setup({
            key: 'pk_test_9f6809ab3f16f06a20deeb2178fdc462830efb21',
            email: 'mapampa7@gmail.com',
            amount: totalAmount * 100, // Amount in kobo (N2000)
            currency: 'NGN',
            ref: 'ABFDEFW32456', // Unique reference for the transaction
            callback: function (response) {
                alert('Payment complete! Reference: ' + response.reference);
                window.location.href = 'checkout.html';
            },
            onClose: function () {
                alert('Payment window closed.');
                
            }
        });
        handler.openIframe();
    } else {
        alert("Your cart is empty. Please add items before proceeding.");
    }
});



function getTotalAmountFromCart() {
    // Initialize total amount to 0
    let totalAmount = 0;

    // Loop through each item in the cart
    cart.forEach(item => {
        // Add the price of the item to the total amount
        totalAmount += parseInt(item.price);
    });

    return totalAmount;
}
