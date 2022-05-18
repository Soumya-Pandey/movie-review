const KEY = "f99863799ad7ef176d76f0757a2756bd";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getClassByRate = (vote) => {
  if (vote >= 7.5) return "green";
  else if (vote >= 7) return "orange";
  else return "red";
};

const getClassByOverview = (vote, overview) => {
    if (vote >= 7.5) return "greeni";
    else if (vote >= 7) return "orangi";
    else return "redi";
  };


const showMovies = (movies) => {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
    <img
      src="${IMG_PATH + poster_path}"
      alt="${title}"
    />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      <span class="${getClassByOverview(vote_average, overview)}">${vote_average, overview}</span>
     
    </div>
  `;
    main.appendChild(movieElement);
  });
};

const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
};

getMovies(API_URL);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else history.go(0);
});


//dark light mode
const moon = document.getElementById('moon').addEventListener('click', ()=>{
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')){
    document.getElementById('moon').src = "/Users/soumyapandey/Desktop/myprojgit/images/sun-3337.svg";
  }
  else{
    document.getElementById('moon').src = "/Users/soumyapandey/Desktop/myprojgit/images/dark-mode-6682 (1).svg";
  }
});
