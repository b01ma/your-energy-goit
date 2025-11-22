import { renderExerciseCard } from './exercise-card.js';

function favorites() {
  const favorites = localStorage.getItem('favorites');

  if (!favorites) {
    return;
  }

  let parsedFavorites = JSON.parse(favorites);

  const favoritesClearMessage = document.querySelector('.favorites-list-clear');
  const favoritesList = document.querySelector('.favorites-list');
  const paginationContainer = document.querySelector('.favorites-pagination-block');

  let currentPage = 1;
  const itemsPerPage = 10;

  const renderList = () => {
    if (parsedFavorites.length === 0) {
      favoritesList.innerHTML = '';
      paginationContainer.innerHTML = '';
      if (favoritesClearMessage) favoritesClearMessage.style.display = 'block';
      return;
    } else {
      if (favoritesClearMessage) favoritesClearMessage.style.display = 'none';
    }

    let pageData;

    if (window.innerWidth >= 1440) {
      pageData = parsedFavorites;
      paginationContainer.innerHTML = '';
    }
    else {
      const totalPages = Math.ceil(parsedFavorites.length / itemsPerPage);

      if (currentPage > totalPages) currentPage = totalPages || 1;

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      pageData = parsedFavorites.slice(startIndex, endIndex);

      renderPagination(totalPages);
    }

    const layout = pageData.map((favorite) => {
      favorite.isHomePage = false;
      favorite.id = favorite._id;
      return renderExerciseCard(favorite);
    });
    favoritesList.innerHTML = layout.join('');
  };

  const renderPagination = (totalPages) => {
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage ? 'active' : '';
      paginationHTML += `<button class="favorites-pagination-btn ${isActive}" type="button" data-page="${i}">${i}</button>`;
    }
    paginationContainer.innerHTML = paginationHTML;
  };

  paginationContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('favorites-pagination-btn')) {
      const clickedPage = Number(event.target.dataset.page);
      if (clickedPage !== currentPage) {
        currentPage = clickedPage;
        renderList();
        favoritesList.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  favoritesList.addEventListener('click', (event) => {
    const trashIcon = event.target.closest('.exercise-card__trash-icon');

    if (trashIcon) {
      const cardItem = trashIcon.closest('.exercise-card');
      const cardId = cardItem.dataset.id;

      parsedFavorites = parsedFavorites.filter((item) => String(item._id) !== String(cardId));
      localStorage.setItem('favorites', JSON.stringify(parsedFavorites));

      renderList();
    }
  });

  window.addEventListener('resize', renderList);

  renderList();
}

export default favorites;