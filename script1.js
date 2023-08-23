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