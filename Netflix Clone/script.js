// ================= LOGIN CHECK =================

const user = localStorage.getItem("user");

if (!user) {
    window.location.href = "login.html";
}

// Welcome User
const welcomeUser = document.getElementById("welcomeUser");

if (welcomeUser) {
    welcomeUser.innerHTML = `👋 Welcome, ${user}`;
}

// ================= MOVIES DATA =================

const movies = [
{
id:1,
title:"Avengers Endgame",
genre:"action",
rating:"8.9",
image:"https://picsum.photos/400/600?random=1",
description:"The Avengers assemble for their final battle against Thanos."
},
{
id:2,
title:"Joker",
genre:"horror",
rating:"8.5",
image:"https://picsum.photos/400/600?random=2",
description:"The origin story of Joker."
},
{
id:3,
title:"Interstellar",
genre:"scifi",
rating:"9.0",
image:"https://picsum.photos/400/600?random=3",
description:"A journey through space and time."
},
{
id:4,
title:"Deadpool",
genre:"comedy",
rating:"8.4",
image:"https://picsum.photos/400/600?random=4",
description:"The funniest superhero ever."
},
{
id:5,
title:"Batman",
genre:"action",
rating:"8.7",
image:"https://picsum.photos/400/600?random=5",
description:"The Dark Knight protects Gotham."
},
{
id:6,
title:"Spider-Man",
genre:"action",
rating:"8.6",
image:"https://picsum.photos/400/600?random=6",
description:"Friendly neighborhood superhero."
},
{
id:7,
title:"IT",
genre:"horror",
rating:"7.8",
image:"https://picsum.photos/400/600?random=7",
description:"The terrifying clown returns."
},
{
id:8,
title:"The Hangover",
genre:"comedy",
rating:"8.0",
image:"https://picsum.photos/400/600?random=8",
description:"Comedy adventure with friends."
},
{
id:9,
title:"Doctor Strange",
genre:"scifi",
rating:"8.2",
image:"https://picsum.photos/400/600?random=9",
description:"Master of the mystic arts."
},
{
id:10,
title:"Thor Ragnarok",
genre:"action",
rating:"8.3",
image:"https://picsum.photos/400/600?random=10",
description:"Thor battles to save Asgard."
},
{
id:11,
title:"The Nun",
genre:"horror",
rating:"7.5",
image:"https://picsum.photos/400/600?random=11",
description:"A terrifying supernatural horror."
},
{
id:12,
title:"Free Guy",
genre:"comedy",
rating:"7.9",
image:"https://picsum.photos/400/600?random=12",
description:"A bank teller discovers his world is a game."
}
];

// ================= ELEMENTS =================

const moviesContainer =
document.getElementById("moviesContainer");

const watchlistContainer =
document.getElementById("watchlistContainer");

const continueWatching =
document.getElementById("continueWatching");

// ================= WATCHLIST =================

let watchlist =
JSON.parse(localStorage.getItem("watchlist")) || [];

// ================= DISPLAY MOVIES =================

function displayMovies(movieArray){

if(!moviesContainer) return;

moviesContainer.innerHTML = "";

movieArray.forEach(movie => {

moviesContainer.innerHTML += `
<div class="movie-card">

<img src="${movie.image}">

<div class="movie-info">

<h3>${movie.title}</h3>

<p>${movie.genre.toUpperCase()}</p>

<p>⭐ ${movie.rating}</p>

<button
class="watch-btn"
onclick="openModal(${movie.id})">
Details
</button>

<button
class="watch-btn"
onclick="addToWatchlist(${movie.id})">
❤️ Watchlist
</button>

</div>

</div>
`;

});

}

displayMovies(movies);

// ================= SEARCH =================

const searchInput =
document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup", () => {

const value =
searchInput.value.toLowerCase();

const filtered =
movies.filter(movie =>
movie.title
.toLowerCase()
.includes(value)
);

displayMovies(filtered);

});

}

// ================= CATEGORY FILTER =================

const categoryBtns =
document.querySelectorAll(".category-btn");

categoryBtns.forEach(btn => {

btn.addEventListener("click", () => {

document
.querySelector(".active")
.classList
.remove("active");

btn.classList.add("active");

const category =
btn.dataset.category;

if(category === "all"){

displayMovies(movies);

}
else{

const filtered =
movies.filter(movie =>
movie.genre === category
);

displayMovies(filtered);

}

});

});

// ================= MODAL =================

const modal =
document.getElementById("movieModal");

function openModal(id){

const movie =
movies.find(m => m.id === id);

document.getElementById("modalImage").src =
movie.image;

document.getElementById("modalTitle").innerText =
movie.title;

document.getElementById("modalGenre").innerText =
"Genre : " + movie.genre;

document.getElementById("modalRating").innerText =
"Rating : ⭐ " + movie.rating;

document.getElementById("modalDescription").innerText =
movie.description;

modal.style.display = "flex";

}

const closeBtn =
document.querySelector(".close-btn");

if(closeBtn){

closeBtn.addEventListener("click", () => {

modal.style.display = "none";

});

}

// ================= WATCHLIST =================

function addToWatchlist(id){

const movie =
movies.find(m => m.id === id);

const exists =
watchlist.some(item =>
item.id === id
);

if(!exists){

watchlist.push(movie);

localStorage.setItem(
"watchlist",
JSON.stringify(watchlist)
);

renderWatchlist();

updateDashboard();

alert("Added To Watchlist");

}

}

function removeFromWatchlist(id){

watchlist =
watchlist.filter(movie =>
movie.id !== id
);

localStorage.setItem(
"watchlist",
JSON.stringify(watchlist)
);

renderWatchlist();

updateDashboard();

}

function renderWatchlist(){

if(!watchlistContainer) return;

watchlistContainer.innerHTML = "";

watchlist.forEach(movie => {

watchlistContainer.innerHTML += `
<div class="movie-card">

<img src="${movie.image}">

<div class="movie-info">

<h3>${movie.title}</h3>

<p>${movie.genre}</p>

<p>⭐ ${movie.rating}</p>

<button
class="watch-btn"
onclick="removeFromWatchlist(${movie.id})">
❌ Remove
</button>

</div>

</div>
`;

});

}

renderWatchlist();

// ================= CONTINUE WATCHING =================

function renderContinueWatching(){

if(!continueWatching) return;

continueWatching.innerHTML = "";

movies.slice(0,4).forEach(movie => {

continueWatching.innerHTML += `
<div class="movie-card">

<img src="${movie.image}">

<div class="movie-info">

<h3>${movie.title}</h3>

<p>${movie.genre}</p>

</div>

</div>
`;

});

}

renderContinueWatching();

// ================= DASHBOARD =================

function updateDashboard(){

const totalMovies =
document.getElementById("totalMovies");

const watchlistCount =
document.getElementById("watchlistCount");

if(totalMovies){
totalMovies.innerText =
movies.length;
}

if(watchlistCount){
watchlistCount.innerText =
watchlist.length;
}

}

updateDashboard();

// ================= DARK MODE =================

const themeToggle =
document.getElementById("themeToggle");

if(themeToggle){

themeToggle.addEventListener("click", () => {

document.body.classList.toggle("light");

});

}

// ================= LOGOUT =================

function logout(){

localStorage.removeItem("user");

window.location.href =
"login.html";

}