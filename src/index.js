import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
const selectCat = document.querySelector('.breed-select');
selectCat.setAttribute('id', 'catBreeds');
const loader = document.querySelector('.loader');
const catDetails = document.querySelector('.cat-info');
const errP = document.querySelector('.error');
errP.style.display = 'none';
loader.style.display = 'none';
catDetails.style.display = 'none';

const catFinder = () => {
  loader.style.display = 'block';
  fetchBreeds()
    .then(breeds => {
      const options = breeds.map(breed => ({
        text: breed.name,
        value: breed.id,
      }));
      new SlimSelect({
        select: '#catBreeds',
        data: options,
      });
    })
    .catch(err => {
      selectCat.style.display = 'none';
      console.log('Oops! Something went wrong! Try reloading the page!', err);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
};

const displayMitzi = breedId => {
  loader.style.display = 'block';
  Promise.all([fetchBreeds(), fetchCatByBreed(breedId)])
    .then(([breeds, catData]) => {
      const pickedBreed = breeds.find(breed => breed.id === breedId);
      const catPicture = catData[0].url;
      catDetails.innerHTML = `<h2>${pickedBreed.name}</h2>
        <p><strong>Description:</strong> ${pickedBreed.description}</p>
        <img src="${catPicture}" alt="Cat" />
      `;
      catDetails.style.display = 'block';
    })
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log('Oops! Something went wrong! Try reloading the page!', err);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
};

selectCat.addEventListener('change', e => {
  const selectedId = e.target.value;
  displayMitzi(selectedId);
});
window.addEventListener('DOMContentLoaded', handler);
function handler() {
  catFinder();
}
