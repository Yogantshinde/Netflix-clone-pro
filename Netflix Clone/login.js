document
.getElementById("loginForm")
.addEventListener("submit", function(e){

e.preventDefault();

const username =
document
.getElementById("username")
.value
.trim();

const password =
document
.getElementById("password")
.value
.trim();

if(
username === "admin" &&
password === "1234"
){

localStorage.setItem(
"user",
username
);

window.location.href =
"index.html";

}
else{

alert(
"Invalid Username or Password"
);

}

});