import iziToast from 'izitoast'; // Описаний у документації
import 'izitoast/dist/css/iziToast.min.css'; // Додатковий імпорт стилів
import SimpleLightbox from 'simplelightbox'; // Описаний в документації
import 'simplelightbox/dist/simple-lightbox.min.css';

import { creatingRequestPhoto } from './js/pixabay';
import { creatGalleryCard } from './js/render-functions';

const inputFormEl = document.querySelector('.form');
const galleryCardList = document.querySelector('.search');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

const galleryModal = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const searchingFoto = event => {
  event.preventDefault();

  let quest = event.target.elements.query.value.trim();
  console.dir(quest);

  galleryCardList.innerHTML = '';

  if (!quest) {
    iziToast.show({
      backgroundColor: '#EF4040',
      message: `Enter the data for the search!`,
      messageColor: '#FFFFFF',
      position: 'topRight',
    });
    return;
  }

  loader.style.display = 'flex';

  creatingRequestPhoto(quest)
    .then(data => {
      console.log(data);
      console.log(data.hits.length);
      console.log(data.hits);

      if (data.hits.length === 0) {
        iziToast.show({
          title: '',
          backgroundColor: '#EF4040',
          messageColor: '#FFFFFF',
          message: `Sorry, there are no images matching your search query. Please try again!`,
          position: 'topCenter',
        });
      }
      galleryCardList.insertAdjacentHTML(
        'beforeend',
        creatGalleryCard(data.hits)
      );
      galleryModal.refresh();
      loader.style.display = 'none';
    })
    .catch(error => {
      console.log(error.message);
    })
    .finally(() => event.target.reset());
};

inputFormEl.addEventListener('submit', searchingFoto);
