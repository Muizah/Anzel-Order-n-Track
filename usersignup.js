const userSignupBtn = document.querySelector(".sign_up");
const userLoginBtn = document.querySelector(".login");
const userLogin = document.querySelector("#user_login");
const userSignup = document.querySelector("#user_signup")
const subDiv = document.querySelector(".sub2")

userSignupBtn.addEventListener("click", () => {
  userSignup.style.display = "block";
  userLogin.style.display = "none";
  subDiv.style.display = "block";
});

userLoginBtn.addEventListener("click", () => {
  userSignup.style.display = "none";
  userLogin.style.display = "block";
});


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyVzq6usfmj6Zn5vtPjhIMTPSM9fCp42Y",
    authDomain: "anzel-main.firebaseapp.com",
    databaseURL: "https://anzel-main-default-rtdb.firebaseio.com",
    projectId: "anzel-main",
    storageBucket: "anzel-main.appspot.com",
    messagingSenderId: "1016468813112",
    appId: "1:1016468813112:web:f10bfb619f3e1568917dcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const signUpBtn = document.querySelector('#user_signup_btn');
const loginBtn = document.querySelector('#user_login_btn');

signUpBtn.addEventListener('click', (e) => {
    const emailInput = document.querySelector('#signupemail').value;
    const passwordInput = document.querySelector('#signuppassword').value;
    const confirmPasswordInput = document.querySelector('#confirmpassword').value;
    const username = document.querySelector("#signupusername").value;
    const userSignup = document.querySelector('#user_signup');
    const userLogin = document.querySelector('#user_login');

    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: emailInput,
                password: passwordInput,
            })
            userSignup.style.display = "none";
            userLogin.style.display = "block";
            alert('User has been created!')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage)
            // ..
        });

});

loginBtn.addEventListener('click', (e) => {
    const loginEmail = document.querySelector('#loginemail').value;
    const loginPassword = document.querySelector('#loginpassword').value;
    const username = document.querySelector("#signupusername").value;


    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            const dt = new Date();
            update(ref(database, 'users/' + user.uid), {
                email: loginEmail,
                last_login: dt,
            })

            window.location.assign("cart.html")
            alert('User is logged in!');

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
             
        });
});

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
    } else {
    }
});