const API_KEY = 'api_key=dd369299a40856c6021f36b9ed7356ca'
const IMG_URL = 'https://image.tmdb.org/t/p/w500/'
const BASE_URL = 'https://api.themoviedb.org/3/'
const API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&' + API_KEY
const SEARCH_URL = BASE_URL + 'search/movie?' + API_KEY


const submitBtn = document.querySelector('#form-submit');
const input = document.querySelector(".search_text")

submitBtn.addEventListener("submit",function(e){
    e.preventDefault();
    const search = input.value;

    if(search){
        const url = SEARCH_URL + '&query=' + search
        fetch(url).then(res => res.json())
        .then(data => {
            addMoviesToContainer(data)
        })
    }else{
        fetch(API_URL)
            .then(res => res.json())
            .then(jsonData => {
                // console.log(jsonData.results)
                addMoviesToContainer(jsonData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
    }
})

fetch(API_URL)
    .then(res => res.json())
    .then(jsonData => {
        // console.log(jsonData.results)
        addMoviesToContainer(jsonData);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })

const container = document.getElementById("moviesContainer");
function addMoviesToContainer(data) {
    container.innerHTML = ''
    data.results.forEach(movie => {
        // <div class="movie_container"></div>
        const {title,poster_path,vote_average} = movie
        const movie_container = document.createElement("div")
        movie_container.classList.add('movie_container')

        movie_container.innerHTML = `
        
            <div class="img-section">
                <img src="${IMG_URL+poster_path}" alt="${title}">
            </div>

            <div class="content-section">
                <div class="title-bar">
                    <h3>${title}</h3>
                </div>

                <div class="rating-bar">
                    <span><i>Rating</i> - ${vote_average}</span>
                </div>
            </div>
        `
        container.appendChild(movie_container)
        // const movieDiv = document.createElement("div");
        // movieDiv.classList.add("display_movies");

        // const posterImg = document.createElement("img");
        // posterImg.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        // posterImg.alt = movie.title;

        // const movieInfoDiv = document.createElement("div");
        // movieInfoDiv.classList.add("movie-info");

        // const movieTitleDiv = document.createElement("div");
        // movieTitleDiv.classList.add("movie-title");
        // const movieTitleP = document.createElement("p");
        // movieTitleP.textContent = movie.title;
        // movieTitleDiv.appendChild(movieTitleP);

        // const movieRatingDiv = document.createElement("div");
        // movieRatingDiv.classList.add("movie-rating");
        // const movieRatingSpan = document.createElement("span");
        // movieRatingSpan.textContent = `Rating - ${movie.vote_average}`;
        // movieRatingDiv.appendChild(movieRatingSpan);

        // movieInfoDiv.appendChild(movieTitleDiv);
        // movieInfoDiv.appendChild(movieRatingDiv);

        // movieDiv.appendChild(posterImg);
        // movieDiv.appendChild(movieInfoDiv);

        // container.appendChild(movieDiv);
    });
}