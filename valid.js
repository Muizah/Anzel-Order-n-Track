// const email = document.querySelector('#signupemail');
// const password = document.querySelector('#signuppassword');
// const confirmPassword = document.querySelector('#confirmpassword');

// const emailError = document.querySelector('email_error1');
// const passwordError = document.getElementById('password_error1');
// const confirmError = document.getElementById('password_confirm_error');


// email.addEventListener('textInput', email_Verify);
// password.addEventListener('textInput', pass_Verify);

// function validated(){
// 	if (email.value.length < 9) {
// 		email.style.border = "1px solid red";
// 		emailError.style.display = "block";
// 		email.focus();
// 		return false;
// 	}
  
// 	if (password.value.length < 6) {
// 		password.style.border = "1px solid red";
// 		passwordError.style.display = "block";
// 		password.focus();
// 		return false;
// 	}
//   if (password != confirmPassword) {
// 		password.style.border = "1px solid red";
//     confirmPassword.style.border = "1px solid red";
// 		passwordError.style.display = "block";
//     confirmError.style.display = "block";
// 		password.focus();
//     confirmPassword.focus();
// 		return ('Password must be the same.');
// 	}

// }
// function email_Verify(){
// 	if (email.value.length >= 8) {
// 		email.style.border = "1px solid silver";
// 		emailError.style.display = "none";
// 		return true;
// 	}
// }
// function pass_Verify(){
// 	if (password.value.length >= 5) {
// 		password.style.border = "1px solid silver";
// 		passwordError.style.display = "none";
// 		return true;
// 	}
// }