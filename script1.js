const userSignup = document.querySelector("#user_signup");
const userSignupBtn = document.querySelector(".sign_up");
const userLogin = document.querySelector("#user_login");
const userLoginBtn = document.querySelector(".login");
const userSignupBtnOne = document.querySelector(".sign_up_one");
const userLoginBtnOne = document.querySelector(".login_one");
const mainDiv = document.querySelector("#main_div")

userSignupBtn.addEventListener("click", () => {
  userSignup.style.display = "block";
  userLogin.style.display = "none";
});

userLoginBtn.addEventListener("click", () => {
  userSignup.style.display = "none";
  userLogin.style.display = "block";
  mainDiv.style.display = "none";
});

userSignupBtnOne.addEventListener("click", () => {
  userSignup.style.display = "block";
  userLogin.style.display = "none";
  mainDiv.style.display = "block";
});

userLoginBtnOne.addEventListener("click", () => {
  userSignup.style.display = "none";
  userLogin.style.display = "block";
  mainDiv.style.display = "none";
});