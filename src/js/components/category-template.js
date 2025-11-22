const BASE_URL = 'https://your-energy.b.goit.study/api';

export function createCategoryCardMarkup(item, filterName) {
  const { name, imgURL } = item;
  // let ImgUrl = imgURL;
  // const title = name.charAt(0).toUpperCase() + name.slice(1);

  // if (typeof imgURL === 'string' && !imgURL.startsWith('http')) {
  //   const IMAGE_BASE_URL = 'https://ftp.goit.study';
  //   ImgUrl = IMAGE_BASE_URL + imgURL;
  // }

  // let filterDisplay =
  //   filterType === 'bodypart'
  //     ? 'Body parts'
  //     : filterType.charAt(0).toUpperCase() + filterType.slice(1);

  return `<li class="categories-item">
            <button
               class="category-card"
               data-name="${name}"
               aria-label="Category ${name}">

                <div class="card-image-wrapper">
                    <img src="${imgURL}" alt="${name}">
                    <div class="card-overlay"></div>
                </div>

                <div class="card-content">
                    <h3 class="category-title">${name}</h3>
                    <p class='category-filter'>${filterName}</p>
                </div>
            </button>
        </li>`;
}





export async function loadAndRenderCategories(
  filterType = 'muscles',
  categoriesContainer
) {
  const page = 1;
  const limit = 12;
  const url = `${BASE_URL}/filters?page=${page}&limit=${limit}`;
  console.log(`[FETCH] Виконується запит за URL: ${url}`);

  try {
    if (!categoriesContainer) {
      console.error(
        '[ERROR] categoriesContainer is undefined. Rendering stopped.'
      );
      return;
    }

    categoriesContainer.innerHTML = '<p class="loading-message">Loading...</p>';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}. Can't load categories.`);
    }

    const data = await response.json();
    const categories = Array.isArray(data) ? data : data.results;

    if (!Array.isArray(categories) || categories.length === 0) {
      categoriesContainer.innerHTML =
        '<p class="error-message">No Category found.</p>';
      return;
    }

    const markup = categories
      .map(category => createCategoryCardMarkup(category, filterType))
      .join('');

    categoriesContainer.innerHTML = markup;
    console.log(
      `[SUCCESS] Успішно відмальовано ${categories.length} категорій.`
    );
  } catch (error) {
    const displayError =
      error instanceof Error ? error.message : 'Невідома помилка';
    console.error('[ERROR] Виникла несподівана помилка:', displayError);
    if (categoriesContainer) {
      categoriesContainer.innerHTML = `<p class="error-message">Error in loading: ${displayError}</p>`;
    }
  }
}

// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.getElementById('categories-container');
//   if (container) {
//     loadAndRenderCategories('muscles', container);
//   }
// });
