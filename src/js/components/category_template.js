const BASE_URL = 'https://your-energy.b.goit.study/api'; //api працює, не прибираю, бо темплейт не підключений ні до чого
const categoriesContainer = document.getElementById('categories-container');

//!TEMPLATE
function createCategoryCardMarkup(category, filterType) {
  const { name, imgURL } = category;
  let ImgUrl = imgURL;
  const title = name.charAt(0).toUpperCase() + name.slice(1);

  if (typeof imgURL === 'string' && !imgURL.startsWith('http')) {
    const IMAGE_BASE_URL = 'https://ftp.goit.study';
    ImgUrl = IMAGE_BASE_URL + imgURL;
  }

  let filterDisplay = filterType === 'bodypart' ? 'Body parts' : filterType.charAt(0).toUpperCase() + filterType.slice(1);

  return `<li class="categories-item">
            <a href="#"
               class="category-card"
               data-name="${title}"
               data-filter="${filterType}"
               aria-label="Category ${title}">

                <div class="card-image-wrapper">
                    <img src="${ImgUrl}" alt="${title}">
                    <div class="card-overlay"></div>
                </div>

                <div class="card-content">
                    <h3 class="category-title">${title}</h3>
                    <p class="category-filter">${filterDisplay}</p>
                </div>
            </a>
        </li>`;
}
//!TEMPLATE
async function loadAndRenderCategories(filterType = 'muscles') {

  const apiFilterType = filterType.charAt(0).toUpperCase() + filterType.slice(1);
  const url = `${BASE_URL}/filters?filter=${apiFilterType}`;
  console.log(`[FETCH] Виконується запит за URL: ${url}`);

  try {
    if (categoriesContainer) {
      categoriesContainer.innerHTML = '<p class="loading-message">Loading...</p>';
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}. Can't load categories.`);
    }

    const data = await response.json();
    const categories = Array.isArray(data) ? data : data.results;

    if (categoriesContainer) {
      if (!Array.isArray(categories) || categories.length === 0) {
        categoriesContainer.innerHTML = '<p class="error-message">No Category found.</p>';
        return;
      }

      const markup = categories.map(category =>
        createCategoryCardMarkup(category, filterType)
      ).join('');

      categoriesContainer.innerHTML = markup;
      console.log(`[SUCCESS] Успішно відмальовано ${categories.length} категорій.`);
    }

  } catch (error) {
    const displayError = error instanceof Error ? error.message : "Невідома помилка";
    console.error('[ERROR] Виникла несподівана помилка:', displayError);
    if (categoriesContainer) {
      categoriesContainer.innerHTML = `<p class="error-message">Error in loading: ${displayError}</p>`;
    }
  }
}

//!TEMPLATE
document.addEventListener('DOMContentLoaded', () => {
  loadAndRenderCategories('muscles');
});
//!TEMPLATE
