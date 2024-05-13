import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_roCXjGPUj4bHmW4ivPP3O0xht7PyPVCer4bQyVsopIWE24LZljYdUStNGItUJIEl';
const CAT_API_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios
    .get(`${CAT_API_URL}/breeds`)
    .then(response => response.data)
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log('Oops! Something went wrong! Try reloading the page!', err);
    });
}
export function fetchCatByBreed(breedId) {
  return axios
    .get(`${CAT_API_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log('Oops! Something went wrong! Try reloading the page!', err);
    });
}
