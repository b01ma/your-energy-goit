export function showLoader() {
  const wrapper = document.querySelector('.exercises-list-wrapper');
  const filtersGrid = wrapper.querySelector('#filtersGrid');
  const pagination = wrapper.querySelector('#exercisesPagination');

  if (!wrapper) return;

  // видаляємо картки та пагінацію
  if (filtersGrid) filtersGrid.innerHTML = '';
  if (pagination) pagination.innerHTML = '';

  // додаємо лоадер, якщо його ще немає
  let loader = wrapper.querySelector('.loader-cards');
  if (!loader) {
    loader = document.createElement('div');
    loader.classList.add('loader-cards');
    wrapper.appendChild(loader);
  }
};

export function hideLoader() {
  const loader = document.querySelector('.exercises-list-wrapper .loader-cards');
  if (loader) loader.remove();
};
