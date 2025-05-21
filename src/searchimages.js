import { fetchImages } from './fetchimages.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreContainer = document.getElementById('load-more-container');
const loadMoreBtn = document.getElementById('load-more');
const loader = document.getElementById('loader');

let searchQuery = '';
let currentPage = 1;
let totalHits = 0;

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
      showLoader(false);
      return;
    }

    renderImages(data.hits);
    toggleLoadMore(data.totalHits > 40);
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
        message: "We're sorry, but you've reached the end of search results.",
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
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
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
}

function toggleLoadMore(show) {
  loadMoreContainer.classList.toggle('hidden', !show);
}

function showLoader(show) {
  loader.classList.toggle('hidden', !show);
}

function smoothScroll() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
