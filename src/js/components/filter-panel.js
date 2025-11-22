import { api } from '../api/api.js';
import { createCategoryCardMarkup } from './category-template.js';
import { renderExerciseCard } from './exercise-card.js';
import { renderPagination } from './pagination';

function capitalize(str) {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
}

export function renderExercises(exercises) {
  if (!exercises.length) {
    filtersGrid.innerHTML = '<p>Немає вправ для цієї категорії</p>';
    return;
  }

  filtersGrid.dataset.exercises = 'true';
  filtersGrid.innerHTML = exercises
    .map(ex => renderExerciseCard({ isHomePage: true, id: ex._id, ...ex }))
    .join('');
}

const filterPanel = () => {
  const filtersBlock = document.getElementById('filters');
  const filtersGrid = document.getElementById('filtersGrid');
  const selectedSubcategoryEl = document.getElementById('selectedSubcategory');
  const searchContainer = document.getElementById('searchContainer');
  const searchInput = document.getElementById('searchInput');
  const searchIcon = document.querySelector('.search-icon');
  const exercisesTitle = document.querySelector('.exercises-title');

  let currentFilter = 'Muscles';
  let allFilterItems = [];
  let currentExercises = [];
  let currentSubcategory = '';

  let currentPage = 1;
  let totalPages = 1;
  let paginationContainer = null;

  if (filtersGrid) {
    paginationContainer = document.createElement('div');
    paginationContainer.id = 'exercisesPagination';
    paginationContainer.className = 'exercises-pagination';
    filtersGrid.insertAdjacentElement('afterend', paginationContainer);
  }

  function setActiveButton(activeBtn) {
    document
      .querySelectorAll('.filter-btn')
      .forEach(btn => btn.classList.remove('filter-btn--active'));
    activeBtn.classList.add('filter-btn--active');
  }

  async function loadFilterCards(filterName) {
    try {
      const data = await api.getFiltersOfExercises({
        filter: filterName,
        page: 1,
        limit: 12,
      });

      allFilterItems = (await data.results) || [];

      renderFilterCards(await allFilterItems, filterName);
    } catch (err) {
      console.error('Error loading filters:', err);
      filtersGrid.innerHTML = '<p>Не вдалося завантажити фільтри</p>';
      if (paginationContainer) {
        paginationContainer.innerHTML = '';
        paginationContainer.hidden = true;
      }
    }
  }

  function renderFilterCards(items, filterName) {
    if (paginationContainer) {
      paginationContainer.innerHTML = '';
      paginationContainer.hidden = true;
    }

    if (!items.length) {
      filtersGrid.innerHTML = '<p>Немає категорій</p>';
      return;
    }

    filtersGrid.dataset.exercises = 'false';
    filtersGrid.innerHTML = items
      .map(item => createCategoryCardMarkup(item, filterName))
      .join('');
  }

  async function loadExercisesForSubcategory(
    filterType,
    subcategoryName,
    page = 1
  ) {
    const payload = {
      page,
      limit: 12,
    };

    if (filterType === 'Body parts') {
      payload.bodypart = subcategoryName;
    } else if (filterType === 'Muscles') {
      payload.target = subcategoryName;
    } else if (filterType === 'Equipment') {
      payload.equipment = subcategoryName;
    }

    try {
      const data = await api.getExercisesByFilters(payload);
      const items = (await data.results) || [];
      const total = data.total ?? items.length;

      currentExercises = items;
      currentPage = data.page ?? page;
      totalPages =
        data.totalPages ?? (total ? Math.ceil(total / payload.limit) : 1);

      renderExercises(currentExercises);

      if (paginationContainer) {
        renderPagination({
          container: paginationContainer,
          currentPage,
          totalPages,
          onPageChange: newPage => {
            loadExercisesForSubcategory(
              currentFilter,
              currentSubcategory,
              newPage
            );
            filtersBlock.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          },
        });
      }
    } catch (error) {
      console.error('Error loading exercises:', error);
      filtersGrid.innerHTML = '<p>Не вдалося завантажити вправи</p>';
      if (paginationContainer) {
        paginationContainer.innerHTML = '';
        paginationContainer.hidden = true;
      }
    }
  }

  function runExercisesSearch() {
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
      renderExercises(currentExercises);
      return;
    }

    const filtered = currentExercises.filter(ex =>
      (ex.name || '').toLowerCase().includes(query)
    );

    renderExercises(filtered);
  }

  filtersBlock.addEventListener('click', async event => {
    const btn = event.target.closest('.filter-btn');
    if (!btn) return;

    const newFilter = btn.dataset.filter;
    if (!newFilter || newFilter === currentFilter) return;

    currentFilter = newFilter;
    setActiveButton(btn);

    selectedSubcategoryEl.textContent = '';
    currentSubcategory = '';
    searchContainer.hidden = true;
    searchInput.value = '';
    currentExercises = [];

    loadFilterCards(currentFilter);
  });

  filtersGrid.addEventListener('click', async event => {
    const card = event.target.closest('.category-card');
    if (!card) return;

    const name = card.dataset.name;
    const prettyName = capitalize(name);

    currentSubcategory = name;

    selectedSubcategoryEl.textContent = prettyName;

    searchContainer.hidden = false;
    searchInput.value = '';

    await loadExercisesForSubcategory(currentFilter, currentSubcategory, 1);
  });

  searchInput.addEventListener('input', runExercisesSearch);

  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      runExercisesSearch();
    }
  });

  if (searchIcon) {
    searchIcon.addEventListener('click', runExercisesSearch);
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadFilterCards('Muscles');
  });

  exercisesTitle.addEventListener('click', async () => {
    currentFilter = 'muscles';

    document
      .querySelectorAll('.filter-btn')
      .forEach(btn => btn.classList.remove('filter-btn--active'));

    const musclesBtn = document.querySelector('[data-filter="Muscles"]');
    if (musclesBtn) musclesBtn.classList.add('filter-btn--active');

    currentSubcategory = '';
    selectedSubcategoryEl.textContent = '';

    searchInput.value = '';
    searchContainer.hidden = true;

    currentExercises = [];

    await loadFilterCards('muscles');
  });
};

export default filterPanel;
