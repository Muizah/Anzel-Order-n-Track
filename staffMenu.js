import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, getDocs, getDoc, setDoc, updateDoc, deleteField, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
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
const storage = getStorage();
const auth = getAuth();

async function getData() {
    const dbRef = collection(db, "menu");

    // Initial load
    const initialSnapshot = await getDocs(dbRef);
    const menu = initialSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    addAllItemsToDiv(menu);

    // Real-time updates
    onSnapshot(dbRef, (querySnapshot) => {
        const menu = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        addAllItemsToDiv(menu);
    });
}

window.onload = getData;

var items = document.querySelector('#items');
var menuList = [];

function addItem(image, name, price, quantity, documentId) {
    const newDiv = document.createElement('div');
    const itemTwo = document.createElement('img');
    const itemThree = document.createElement('p');
    const itemFour = document.createElement('p');
    const itemFive = document.createElement('p');
    const itemSix = document.createElement('button');

    itemTwo.setAttribute('src', image);
    itemThree.innerHTML = name;
    itemFour.innerHTML = '₦' + price;
    itemFive.innerHTML = quantity;
    itemSix.innerHTML = 'Edit';

    // Set the data-document-id attribute
    newDiv.setAttribute('data-document-id', documentId);

    itemFive.classList.add('itemFive');
    itemSix.classList.add('itemSix');

    newDiv.appendChild(itemTwo);
    newDiv.appendChild(itemThree);
    newDiv.appendChild(itemFour);
    newDiv.appendChild(itemFive);
    newDiv.appendChild(itemSix);

    items.appendChild(newDiv);
}

function addAllItemsToDiv(menuDocsList) {
    items.innerHTML = "";
    menuDocsList.forEach(element => {
        addItem(element.Image, element.Name, element.Price, element.Quantity, element.id);
    });
}

items.addEventListener('click', (e) => {
    const target = e.target;

    if (target.textContent === 'Edit') {
        const parentDiv = target.parentElement;
        const documentId = parentDiv.getAttribute('data-document-id');

        const image = parentDiv.querySelector('img').src;
        const name = parentDiv.querySelector('p').textContent;
        const price = parentDiv.querySelector('p:nth-child(3)').textContent;
        const quantity = parentDiv.querySelector('.itemFive').textContent;

        // Populate the pop-up box with the current data.
        document.getElementById('updateName').value = name;
        document.getElementById('updatePrice').value = price;
        document.getElementById('updateQuantity').value = quantity;
        document.getElementById('updateDocumentId').value = documentId;

        // Show the pop-up box.
        document.getElementById('updatePopup').style.display = 'block';

        // Add an event listener to the "Update" button in the pop-up box.
        document.getElementById('updateSubmit').addEventListener('click', async () => {
            const documentId = document.getElementById('updateDocumentId').value;
            const updatedName = document.getElementById('updateName').value;
            const updatedPrice = document.getElementById('updatePrice').value;
            const updatedQuantity = document.getElementById('updateQuantity').value;
            const updatedImageInput = document.getElementById('updateImageInput');
            const updatedImageFile = updatedImageInput.files[0];

            await UpdItem(documentId);

            const itemRef = doc(db, 'menu', documentId);

            try {
                await updateDoc(itemRef, {
                    Name: updatedName,
                    Price: updatedPrice,
                    Quantity: updatedQuantity,
                });

                if (updatedImageFile) {
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

// Add an event listener to the "Cancel" button in the pop-up box.
document.getElementById('updateCancel').addEventListener('click', () => {
    // Hide the pop-up box without making any changes.
    document.getElementById('updatePopup').style.display = 'none';
});

function UpdItem(documentId) {
    // Get the updated values from your form fields
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
        updateDoc(itemRef, updateData)
            .then(() => {
                document.getElementById('updatePopup').style.display = 'none';
            })
            .catch(error => {
                console.error('Error updating document:', error);
            });
    }
}

const logoutButton = document.querySelector('#logout');

    logoutButton.addEventListener('click', () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log('User logged out');
        }).catch((error) => {
            // An error happened.
            console.error(error);
        });
    });