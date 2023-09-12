// Import functions from the Firebase App SDK for initializing the app
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

// Import functions for interacting with Firestore database
import { getFirestore, collection, onSnapshot, doc, getDocs, getDoc, setDoc, updateDoc, deleteField, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

// Import functions for interacting with Firebase Storage
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

// Import functions for Firebase Authentication
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
const db = getFirestore();

// Get a reference to Firebase Storage
const storage = getStorage();

// Get a reference to Firebase Authentication
const auth = getAuth();

// Function to retrieve data from Firestore and populate the menu
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
var menuList = [];

// Function to add an item to the menu list in the DOM
function addItem(image, name, price, quantity, documentId) {
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
    itemSix.innerHTML = 'Edit';
    newDiv.setAttribute('data-document-id', documentId);
    itemFive.classList.add('itemFive');
    itemSix.classList.add('itemSix');

    // Append elements to the DOM
    newDiv.appendChild(itemTwo);
    newDiv.appendChild(itemThree);
    newDiv.appendChild(itemFour);
    newDiv.appendChild(itemFive);
    newDiv.appendChild(itemSix);

    items.appendChild(newDiv);
}

// Function to add all items to the menu list in the DOM
function addAllItemsToDiv(menuDocsList) {
    items.innerHTML = "";
    menuDocsList.forEach(element => {
        addItem(element.Image, element.Name, element.Price, element.Quantity, element.id);
    });
}

// Event listener for clicks on items
items.addEventListener('click', (e) => {
    const target = e.target;

    if (target.textContent === 'Edit') {
        // Retrieve information of the clicked item
        const parentDiv = target.parentElement;
        const documentId = parentDiv.getAttribute('data-document-id');
        const image = parentDiv.querySelector('img').src;
        const name = parentDiv.querySelector('p').textContent;
        const price = parentDiv.querySelector('p:nth-child(3)').textContent;
        const quantity = parentDiv.querySelector('.itemFive').textContent;

        // Populate the update form with current data
        document.getElementById('updateName').value = name;
        document.getElementById('updatePrice').value = price;
        document.getElementById('updateQuantity').value = quantity;
        document.getElementById('updateDocumentId').value = documentId;

        // Show the update popup
        document.getElementById('updatePopup').style.display = 'block';

        // Add an event listener to the "Update" button in the pop-up box
        document.getElementById('updateSubmit').addEventListener('click', async () => {
            await UpdItem(documentId);
            const itemRef = doc(db, 'menu', documentId);

            // Update Firestore document with new data
            try {
                await updateDoc(itemRef, {
                    Name: updatedName,
                    Price: updatedPrice,
                    Quantity: updatedQuantity,
                });

                if (updatedImageFile) {
                    // Upload and update image if provided
                    const storageRef = ref(storage, 'menu_images/' + documentId);
                    const snapshot = await uploadBytes(storageRef, updatedImageFile);
                    const downloadURL = await getDownloadURL(snapshot.ref);

                    await updateDoc(itemRef, {
                        Image: downloadURL,
                    });
                }

                document.getElementById('updatePopup').style.display = 'none';
            } catch (error) {
                console.error('Error updating document:', error);
            }
        });
    }
});

// Event listener for clicks on the "Cancel" button in the pop-up box
document.getElementById('updateCancel').addEventListener('click', () => {
    // Hide the update popup
    document.getElementById('updatePopup').style.display = 'none';
});

// Function to update an item in Firestore
function UpdItem(documentId) {
    // Get updated values from form fields
    const updatedName = document.getElementById('updateName').value;
    const updatedPrice = document.getElementById('updatePrice').value;
    const updatedQuantity = document.getElementById('updateQuantity').value;
    const updatedImageInput = document.getElementById('updateImageInput');
    const updatedImageFile = updatedImageInput.files[0];

    // Update the Firestore document with the new data
    const itemRef = doc(db, 'menu', documentId);

    const updateData = {
        Name: updatedName,
        Price: updatedPrice,
        Quantity: updatedQuantity,
    };

    if (updatedImageFile) {
        // Upload and update image if provided
        const storageRef = ref(storage, 'menu_images/' + documentId);
        uploadBytes(storageRef, updatedImageFile)
            .then(snapshot => getDownloadURL(snapshot.ref))
            .then(downloadURL => {
                updateData.Image = downloadURL;
                return updateDoc(itemRef, updateData);
            })
            .then(() => {
                document.getElementById('updatePopup').style.display = 'none';
            })
            .catch(error => {
                console.error('Error updating document:', error);
            });
    } else {
        // Update without changing the image
        updateDoc(itemRef, updateData)
            .then(() => {
                document.getElementById('updatePopup').style.display = 'none';
            })
            .catch(error => {
                console.error('Error updating document:', error);
            });
    }
}

// Event listener for the "Logout" button
const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', () => {
    window.location.assign("stafflogin.html"); 
});
