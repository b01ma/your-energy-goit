const BASE_URL = 'api тут, або імпорт';
const categoriesContainer = document.getElementById('categories-container');
const paginationContainer = document.getElementById('pagination-container');

//!TEMPLATE

let currentPage = 1;
const limit = 12;

// 1 Картка
function createCategoryCardMarkup(category, filterType) {
  const { name, imgUrl } = category;

  let filterDisplay =
    filterType === 'bodypart'
      ? 'Body parts'
      : filterType.charAt(0).toUpperCase() + filterType.slice(1);

  return `
        <li class="categories-item">
            <a href="#"
              class="category-card"
              data-name="${name}"
              data-filter="${filterType}"
              aria-label="Категорія ${name}">

                <div class="card-image-wrapper">
                    <img src="${imgUrl}" alt="${name} вправи">
                    <div class="card-overlay"></div>
                </div>

                <div class="card-content">
                    <h3 class="category-title">${name}</h3>
                    <p class="category-filter">${filterDisplay}</p>
                </div>
            </a>
        </li>
    `;
}

//!TEMPLATE
// Пагінація
function renderPagination(totalPages) {
  if (!paginationContainer) return;
  let paginationMarkup = '';

  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage ? 'active-page' : '';
    paginationMarkup += `<button type="button" class="pagination-btn ${isActive}" data-page="${i}">${i}</button>`;
  }

  paginationContainer.innerHTML = paginationMarkup;
}

//!TEMPLATE
// Завантаження категорій
async function loadAndRenderCategories(filterType = 'muscles', page = 1) {
  currentPage = page;
  const apiFilterType =
    filterType.charAt(0).toUpperCase() + filterType.slice(1);

  const url = `${BASE_URL}/filters?filter=${apiFilterType}&page=${currentPage}&limit=${limit}`;
  console.log(`Виконується запит за URL: ${url}`);

  try {
    if (categoriesContainer) {
      categoriesContainer.innerHTML =
        '<p class="loading-message">Завантаження...</p>';
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Помилка: ${response.status}. Не вдалося завантажити категорії.`
      );
    }

    const data = await response.json();
    const categories = data.results;
    const totalPages = data.totalPages;

    if (categoriesContainer) {
      if (!Array.isArray(categories) || categories.length === 0) {
        categoriesContainer.innerHTML =
          '<p class="error-message">Категорій не знайдено.</p>';
        renderPagination(0);
        return;
      }

      const markup = categories
        .map(category => createCategoryCardMarkup(category, filterType))
        .join('');

      categoriesContainer.innerHTML = markup;

      renderPagination(totalPages);
      console.log(
        `[SUCCESS] Успішно відмальовано ${categories.length} категорій. Сторінок: ${totalPages}`
      );
    }
  } catch (error) {
    console.log('[ERROR] Виникла несподівана помилка:', error.message);
    if (categoriesContainer) {
      categoriesContainer.innerHTML = `<p class="error-message">Помилка завантаження: ${error.message}</p>`;
    }
  }
}

//!TEMPLATE
function handlePaginationClick(event) {
  const targetButton = event.target.closest('.pagination-btn');
  if (!targetButton) return;

  const newPage = parseInt(targetButton.dataset.page, 10);
  if (newPage !== currentPage) {
    loadAndRenderCategories('muscles', newPage);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (paginationContainer) {
    paginationContainer.addEventListener('click', handlePaginationClick);
  }

  loadAndRenderCategories('muscles', 1);
});

//!TEMPLATE
