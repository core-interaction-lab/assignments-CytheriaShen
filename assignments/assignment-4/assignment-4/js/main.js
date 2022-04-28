const db = {
    id: 'app8VA8Am4Oh4cf8b',
    table: 'dessert',
    apiKey: 'keyVawrwenMxA2qNx'
};


const airtableUrl = `https://api.airtable.com/v0/${db.id}/${db.table}?maxRecords=100&view=Grid%20view&api_key=${db.apiKey}`

const slideshowContainer = document.getElementById('slideshow-container');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const fetchMovies = async () => {
    // const response = await fetch(airtableUrl).then(data => data.json());
    const response = await fetch("https://interactionlab.space/data/assignment-4-1.json").then(data => data.json());
    buildSlideshow(response.items);
    return response.records;
};


const buildSlideshow = (movies) => {
    let leftI = 0;
    let rightI = 6;

    const articles = movies.slice(0, 9).map(buildSlide);
    slideshowContainer.append(...articles);

    prevButton.addEventListener('click', () => {
        leftI += 1;
        rightI += 1;
        if (rightI >= movies.length) {
            rightI = 0;
        }
        if (leftI >= movies.length) {
            leftI = 0;
        }
        slideshowContainer.removeChild(slideshowContainer.children[0]);
        slideshowContainer.append(buildSlide(movies[rightI]));
    });

    nextButton.addEventListener('click', () => {
        leftI -= 1;
        rightI -= 1;
        if (leftI < 0) {
            leftI = movies.length - 1;
        }
        if (rightI < 0) {
            rightI = movies.length - 1;
        }
        slideshowContainer.removeChild(slideshowContainer.querySelectorAll('article')[6]);
        slideshowContainer.prepend(buildSlide(movies[leftI]));
    });
};

const buildSlide = (movie) => {
    console.log(movie)
    const movieContainer = document.createElement('article');
    if (movie.images) {
        // console.log(movie.fields.poster[0].url);
        const posterImg = document.createElement('img');
        posterImg.src = movie.images[0].url;
        posterImg.classList.add('poster-img', 'dlkjfdl');
        posterImg.id = 'poster-img-id';
        movieContainer.append(posterImg);
    }


    if (movie.name) {
        const descriptionEl1 = document.createElement('p');
        descriptionEl1.innerHTML = movie.name;
        descriptionEl1.classList.add('movie-description1');
        movieContainer.append(descriptionEl1);
    }

    if (movie.release_date) {
        const descriptionEl = document.createElement('p');
        descriptionEl.innerHTML = movie.release_date;
        descriptionEl.classList.add('movie-description');
        movieContainer.append(descriptionEl);
    }
    return movieContainer;
};

fetchMovies();