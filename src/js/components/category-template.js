const BASE_URL = 'https://your-energy.b.goit.study/api';

export function createCategoryCardMarkup(item, filterName) {
  const { name, imgURL } = item;

  return `<li class="categories-item">
            <a
              href="javascript:void(0);"
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
            </a>
        </li>`;
}
