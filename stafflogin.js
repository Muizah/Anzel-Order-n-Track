// Import the initializeApp function from the Firebase App SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

// Import functions for interacting with the Firebase Realtime Database
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";

// Import functions for Firebase Authentication
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// Link to available Firebase libraries

// Configuration object for Firebase
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
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

// Get a reference to Firebase Authentication
const auth = getAuth();

// Get references to HTML elements
const staffLoginBtn = document.querySelector('#staff_login');
const username = document.querySelector("#username");
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const user = auth.currentUser;

// Add an event listener to the staffLoginBtn button
staffLoginBtn.addEventListener('click', function (event) {

  // Check if the entered values match the expected staff login credentials
  if (username.value === 'Staff' && email.value === 'cafeteria@pau.edu.ng' && password.value === 'Cafeteria Anzel') {
    try {
      // If credentials match, set the user information in the Firebase Database
      set(ref(database, 'users/' + username.value),
        {
          username : username.value,
          email : email.value,
          password : password.value
        });

      // Redirect to the staffMenu.html page
      window.location.assign("staffMenu.html")

      // Display an alert indicating successful login
      alert("Login Successful!")
    } catch (error) {
      // If an error occurs during the process, log it and display an alert
      console.log(error)
      alert("Login Failed!")
    }
  }
  // If entered values do not match the expected credentials, display an alert
  else if (username.value !== 'Staff' || email.value !== 'cafeteria@pau.edu.ng' || password.value !== 'Cafeteria Anzel') {
    alert('Please enter valid login details.');
    event.preventDefault(); // Prevent the default form submission behavior
  }
});
