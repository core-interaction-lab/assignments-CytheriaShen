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
    const response = await fetch(airtableUrl).then(data => data.json());
    buildSlideshow(response.records);
    return response.records;
};

const buildSlideshow = (movies) => {
    let leftI = 0;
    let rightI = 6;

    const articles = movies.slice(0, 7).map(buildSlide);
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

const articleDom = document.getElementsByTagName("article");
    for (let i = 0; i < articleDom.length; i++) {
        articleDom[i].addEventListener("mouseenter", ()=> {
            articleDom[i].children[0].style.transform = "scale(1.2)";
            articleDom[i].children[0].style.transition = "all 0.5s";
        })

        articleDom[i].addEventListener("mouseleave", ()=> {
            articleDom[i].children[0].style.transform = "scale(1)";
            articleDom[i].children[0].style.transition = "all 0.5s";
        })
    }

const buildSlide = (movie) => {
    const movieContainer = document.createElement('article');
    if (movie.fields.photo) {
        const posterImg = document.createElement('img');
        posterImg.src = movie.fields.photo[0].url;
        posterImg.classList.add('poster-img', 'dlkjfdl');
        posterImg.id = 'poster-img-id';
        movieContainer.append(posterImg);
    }

    if (movie.fields.Name) {
        const descriptionEl = document.createElement('p');
        descriptionEl.innerHTML = movie.fields.Name;
        descriptionEl.classList.add('name');
        movieContainer.append(descriptionEl);
    }

    if (movie.fields.speciality) {
        const descriptionEl = document.createElement('p');
        descriptionEl.innerHTML = movie.fields.speciality;
        descriptionEl.classList.add('speciality');
        movieContainer.append(descriptionEl);
    }

    if (movie.fields.location) {
        const descriptionEl = document.createElement('p');
        descriptionEl.innerHTML = movie.fields.location;
        descriptionEl.classList.add('location');
        movieContainer.append(descriptionEl);
    }

    if (movie.fields.style) {
        const descriptionEl = document.createElement('p');
        descriptionEl.innerHTML = movie.fields.style;
        descriptionEl.classList.add('style');
        movieContainer.append(descriptionEl);
    }

    if (movie.fields["cost (average)"]) {
        const descriptionEl = document.createElement('p');
        descriptionEl.innerHTML = movie.fields["cost (average)"];
        descriptionEl.classList.add('cost');
        movieContainer.append(descriptionEl);
    }
    return movieContainer;
};

fetchMovies();