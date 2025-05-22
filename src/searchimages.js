import { fetchImages } from './fetchimages.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.getElementById('load-more');
const loader = document.getElementById('loader');

let searchQuery = '';
let currentPage = 1;
let totalHits = 0;

const PER_PAGE = 40;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = event.target.searchQuery.value.trim();

  if (!searchQuery) {
    iziToast.warning({
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  gallery.innerHTML = '';
  toggleLoadMore(false);
  showLoader(true);

  try {
    const data = await fetchImages(searchQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({ message: 'No images found.', position: 'topRight' });
      return;
    }

    renderImages(data.hits);

    if (totalHits > PER_PAGE) {
      toggleLoadMore(true);
    } else {
      toggleLoadMore(false);
    }
  } catch (error) {
    iziToast.error({ message: 'Failed to load images.', position: 'topRight' });
  } finally {
    showLoader(false);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader(true);

  try {
    const data = await fetchImages(searchQuery, currentPage);
    renderImages(data.hits);
    smoothScroll();

    const loadedItems = gallery.querySelectorAll('.photo-card').length;

    if (loadedItems >= totalHits) {
      toggleLoadMore(false);
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to load more images.',
      position: 'topRight',
    });
  } finally {
    showLoader(false);
  }
});

function renderImages(images) {
  const markup = images
    .map(
      image => `
      <div class="photo-card">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}"/>
        </a>
        <div class="info">
          <span>Likes: ${image.likes}</span>
          <span>Views: ${image.views}</span>
          <span>Comments: ${image.comments}</span>
          <span>Downloads: ${image.downloads}</span>
        </div>
      </div>
    `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function toggleLoadMore(show) {
  loadMoreBtn.classList.toggle('hidden', !show);
}

function showLoader(show) {
  loader.classList.toggle('hidden', !show);
}

function smoothScroll() {
  const { height: cardHeight } =
    gallery.firstElementChild?.getBoundingClientRect() || { height: 0 };
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
