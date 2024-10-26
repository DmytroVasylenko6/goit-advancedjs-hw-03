import PicturesApiService from './js/pixabay-api';
import { renderCard } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  galleryItem: document.querySelector('.photo-card'),
};


refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onImageClick);

function onImageClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
}

const picturesApiService = new PicturesApiService();

function onSearch(e) {
  e.preventDefault();
  clearPictureGallery();
  picturesApiService.query = e.currentTarget.elements.query.value.trim();

  console.log('picturesApiService.query : ', picturesApiService.query)

  if (picturesApiService.query === '') {
    iziToast.show({
      title: 'Error',
      message: 'Please enter text!',
      position: 'topCenter',
      color: 'red',
    });

    return
  }

  fetchPictures();
}

function appendPicturesMarkup(pictures) {
  const html = pictures.map(picture => {
    return renderCard(picture);
  });
  refs.gallery.insertAdjacentHTML('beforeend', html.join(''));

  new SimpleLightbox('.gallery a', {
    caption: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
}

function clearPictureGallery() {
  refs.gallery.innerHTML = '';
}

async function fetchPictures() {

  try {
    const pictures = await picturesApiService.fetchPictures();
    appendPicturesMarkup(pictures);
  } catch (er) {
    errors(er);
  }
}

function errors(er) {
  if (er === 'Images not found') {
    iziToast.show({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query. Please try again!',
      position: 'topCenter',
      color: 'red',
    });

    return;
  }

  iziToast.show({
      title: 'Error',
      message: 'Error! Failed to upload images',
      position: 'topCenter',
      color: 'red',
  });
}
