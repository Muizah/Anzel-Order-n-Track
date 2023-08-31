 import {initializeApp} from 'firebase/app'
 import {getFirestore, collection, onSnapshot , addDoc, deleteDoc, doc, query, where, orderBy} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDyVzq6usfmj6Zn5vtPjhIMTPSM9fCp42Y",
    authDomain: "anzel-main.firebaseapp.com",
    databaseURL: "https://anzel-main-default-rtdb.firebaseio.com",
    projectId: "anzel-main",
    storageBucket: "anzel-main.appspot.com",
    messagingSenderId: "1016468813112",
    appId: "1:1016468813112:web:f10bfb619f3e1568917dcd"
};
 
initializeApp(firebaseConfig)
const db  = getFirestore()
const colRef = collection(db, 'menu')

// const q = query(colRef, where("Quantity", "==", "50"), orderBy('name', 'asc'))
     
onSnapshot(colRef, (snapshot) => {
    let menu = []
     snapshot.docs.forEach((doc) => {
            menu.push({ ...doc.data(), id: doc.id }) 
        })
        console.log(menu)
})
 
const addItemForm = document.querySelector('.add')
addItemForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    name: addItemForm.name.value,
    price: addItemForm.price.value,
    quantity: addItemForm.quantity.value,
    image: addItemForm.image.value,
  })
  .then(() => {
    addItemForm.reset()
  })
})

// deleting docs
const deleteItemForm = document.querySelector('.delete')
deleteItemForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'menu', deleteItemForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteItemForm.reset()
    })
})
 