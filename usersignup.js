// DOM elements
const userSignupBtn = document.querySelector(".sign_up");
const userLoginBtn = document.querySelector(".login");
const userLogin = document.querySelector("#user_login");
const userSignup = document.querySelector("#user_signup")
const subDiv = document.querySelector(".sub2")

// Event listener for sign up button click
userSignupBtn.addEventListener("click", () => {
  userSignup.style.display = "block";   // Show the sign up form
  userLogin.style.display = "none";     // Hide the login form
  subDiv.style.display = "block";       // Show sub div
});

// Event listener for login button click
userLoginBtn.addEventListener("click", () => {
  userSignup.style.display = "none";    // Hide the sign up form
  userLogin.style.display = "block";    // Show the login form
});


// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// DOM elements for signup and login buttons
const signUpBtn = document.querySelector('#user_signup_btn');
const loginBtn = document.querySelector('#user_login_btn');

// Event listener for sign up button click
signUpBtn.addEventListener('click', (e) => {
    // Retrieve user input values
    const emailInput = document.querySelector('#signupemail').value;
    const passwordInput = document.querySelector('#signuppassword').value;
    const confirmPasswordInput = document.querySelector('#confirmpassword').value;
    const username = document.querySelector("#signupusername").value;
    const userSignup = document.querySelector('#user_signup');
    const userLogin = document.querySelector('#user_login');

    // Create user with email and password
    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => {
            const user = userCredential.user;
            // Store user information in the database
            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: emailInput,
                password: passwordInput,
            })
            // Hide signup form and show login form
            userSignup.style.display = "none";
            userLogin.style.display = "block";
            alert('User has been created!')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
});

// Event listener for login button click
loginBtn.addEventListener('click', (e) => {
    // Retrieve user input values
    const loginEmail = document.querySelector('#loginemail').value;
    const loginPassword = document.querySelector('#loginpassword').value;
    const username = document.querySelector("#signupusername").value;

    // Sign in with email and password
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            // Update user information in the database
            const dt = new Date();
            update(ref(database, 'users/' + user.uid), {
                email: loginEmail,
                last_login: dt,
            })
            // Redirect to cart.html and show success alert
            window.location.assign("cart.html")
            alert('User is logged in!');
        })
        .catch((error) => {
            const errorCode = error.code;
            // Handle login error if needed
        });
});

// Get the currently authenticated user
const user = auth.currentUser;

// Event listener for changes in authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        // User is logged in
    } else {
        // User is logged out
    }
});
