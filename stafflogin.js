import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
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

const staffLoginBtn = document.querySelector('#staff_login');
const username = document.querySelector("#username");
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const user = auth.currentUser;




staffLoginBtn.addEventListener('click', function (event) {

  if (username.value === 'Staff' && email.value === 'cafeteria@pau.edu.ng' && password.value === 'Cafeteria Anzel') {
    try {
      set(ref(database, 'users/' + username.value),
        {
          username : username.value,
          email : email.value,
          password : password.value
        });
      window.location.assign("staffMenu.html")
      alert("Login Successful!")
    } catch (error) {
      console.log(error)
      alert("Login Failed!")
    }
  }
  else if (username.value !== 'Staff' || email.value !== 'cafeteria@pau.edu.ng' || password.value !== 'Cafeteria Anzel') {
    alert('Please enter valid login details.');
    event.preventDefault();
  }
});
