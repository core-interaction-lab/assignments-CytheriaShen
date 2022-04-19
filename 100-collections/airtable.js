const db = {
  id: 'app8VA8Am4Oh4cf8b',
  table: 'dessert',
  apiKey: 'keyVawrwenMxA2qNx'
};


const airtableUrl = `https://api.airtable.com/v0/${db.id}/${db.table}?maxRecords=100&view=Grid%20view&api_key=${db.apiKey}`

const slideshowContainer1 = document.getElementById('slideshow-container1');
const slideshowContainer2 = document.getElementById('slideshow-container2');
const slideshow = document.getElementById('slideshow');
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

  const articles = movies.slice(0, 3).map(buildSlide);
  slideshow.append(...articles);

  prevButton.addEventListener('click', () => {
      leftI += 1;
      rightI += 1;
      if (rightI >= movies.length) {
          rightI = 0;
      }
      if (leftI >= movies.length) {
          leftI = 0;
      }
      slideshow.removeChild(slideshow.children[0]);
      slideshow.append(buildSlide(movies[rightI]));
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
      slideshow.removeChild(slideshow.querySelectorAll('article')[2]);
      slideshow.prepend(buildSlide(movies[leftI]));
  });
};

const buildSlide = (movie) => {
  const movieContainer = document.createElement('article');
  if (movie.fields.photo) {
      const plantsImg = document.createElement('img');
      plantsImg.src = "./images/plates-" + Math.floor(Math.random() * 6) + ".png";
      plantsImg.classList.add('plants-img');
      movieContainer.append(plantsImg);
      const photoImg = document.createElement('img');
      photoImg.src = movie.fields.photo[0].url;
      photoImg.classList.add('photo-img');
      movieContainer.append(photoImg);
  }

  if (movie.fields.Name) {
      const dessertDesc = document.createElement('div');
      dessertDesc.classList.add('dessert-desc');
      const p1 = document.createElement('p');
      p1.innerHTML = movie.fields.Name;
      const p2 = document.createElement('p');
      p2.innerHTML = "speciality:" + movie.fields.speciality;
      const p3 = document.createElement('p');
      p3.innerHTML = "location:" + movie.fields.location;
      dessertDesc.append(p1);
      dessertDesc.append(p2);
      dessertDesc.append(p3);
      movieContainer.append(dessertDesc);
  }
  return movieContainer;
};

window.onload = function () {
  let hei = document.documentElement.clientHeight;
  slideshowContainer1.style.height = hei + "px";
  slideshowContainer2.style.height = hei + "px";
  fetchMovies();
}

window.addEventListener('resize', function () {
  location.reload();
})
