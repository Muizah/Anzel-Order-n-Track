// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, updatePassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
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

const resetPassword = document.querySelector('#password_reset');

resetPassword.addEventListener('click', (e) => {
    const email = document.querySelector('#email').value;

    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            alert('Check your email for the password reset link!');
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage)
            // ..
        });
});