import { api } from '../api/api.js';
import { createCategoryCardMarkup } from './category-template.js';
import { renderExerciseCard } from './exercise-card.js';
import { renderPagination } from './pagination';
import { showLoader, hideLoader } from '../utilities/loader-cards.js';

function capitalize(str) {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
}

export function renderExercises(exercises) {
  const filtersGrid = document.getElementById('filtersGrid');
  if (!filtersGrid) return;

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
  const paginationContainer = document.getElementById('exercisesPagination');

  const CATEGORY_LIMIT_BACKEND = 12;
  const EXERCISE_LIMIT_BACKEND = 10;

  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
  const getCategoryPageSize = () => (isMobile() ? 9 : 12);
  const getExercisePageSize = () => (isMobile() ? 8 : 10);

  let currentFilter = 'Muscles';
  let currentExercises = [];
  let currentSubcategory = '';

  let currentPage = 1;
  let totalPages = 1;
  let lastIsMobile = isMobile();

  function setActiveButton(activeBtn) {
    document
      .querySelectorAll('.filter-btn')
      .forEach(btn => btn.classList.remove('filter-btn--active'));
    activeBtn.classList.add('filter-btn--active');
  }

  async function loadFilterCards(filterName, page = 1) {
    showLoader();
    try {
      const data = await api.getFiltersOfExercises({
        filter: filterName,
        page,
        limit: CATEGORY_LIMIT_BACKEND,
      });

      const rawItems = data.results || [];
      const pageSize = getCategoryPageSize();
      const items =
        pageSize < CATEGORY_LIMIT_BACKEND
          ? rawItems.slice(0, pageSize)
          : rawItems;

      renderFilterCards(items, filterName);

      const total = data.total ?? rawItems.length;
      currentPage = data.page ?? page;
      totalPages = data.totalPages ?? (total ? Math.ceil(total / pageSize) : 1);

      if (paginationContainer && totalPages > 1) {
        renderPagination({
          container: paginationContainer,
          currentPage,
          totalPages,
          onPageChange: newPage => {
            loadFilterCards(filterName, newPage);
            filtersBlock.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          },
        });
      } else if (paginationContainer) {
        paginationContainer.innerHTML = '';
        paginationContainer.hidden = true;
      }
    } catch (err) {
      console.error('Error loading filters:', err);
      filtersGrid.innerHTML = '<p>Не вдалося завантажити фільтри</p>';

      if (paginationContainer) {
        paginationContainer.innerHTML = '';
        paginationContainer.hidden = true;
      }
    } finally {
      hideLoader();
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
    showLoader();
    const payload = {
      page,
      limit: EXERCISE_LIMIT_BACKEND,
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
      const rawItems = data.results || [];
      const pageSize = getExercisePageSize();
      const items =
        pageSize < EXERCISE_LIMIT_BACKEND
          ? rawItems.slice(0, pageSize)
          : rawItems;

      const total = data.total ?? rawItems.length;

      currentExercises = items;
      currentPage = data.page ?? page;
      totalPages = data.totalPages ?? (total ? Math.ceil(total / pageSize) : 1);

      renderExercises(currentExercises);

      if (paginationContainer && totalPages > 1) {
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
      } else if (paginationContainer) {
        paginationContainer.innerHTML = '';
        paginationContainer.hidden = true;
      }
    } catch (error) {
      console.error('Error loading exercises:', error);
      filtersGrid.innerHTML = '<p>Не вдалося завантажити вправи</p>';
      if (paginationContainer) {
        paginationContainer.innerHTML = '';
        paginationContainer.hidden = true;
      }
    } finally {
      hideLoader();
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

    loadFilterCards(currentFilter, 1);
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
    loadFilterCards('Muscles', 1);
  });

  exercisesTitle.addEventListener('click', async () => {
    const activeBtn = document.querySelector('.filter-btn--active');
    const filter = activeBtn ? activeBtn.dataset.filter : currentFilter;

    currentFilter = filter;

    if (activeBtn) {
      setActiveButton(activeBtn);
    }

    currentSubcategory = '';
    selectedSubcategoryEl.textContent = '';

    searchInput.value = '';
    searchContainer.hidden = true;

    currentExercises = [];

    await loadFilterCards(filter, 1);
  });

  window.addEventListener('resize', () => {
    const nowIsMobile = isMobile();
    if (nowIsMobile === lastIsMobile) return;
    lastIsMobile = nowIsMobile;

    if (filtersGrid.dataset.exercises === 'true' && currentSubcategory) {
      loadExercisesForSubcategory(currentFilter, currentSubcategory, 1);
    } else {
      loadFilterCards(currentFilter, 1);
    }
  });
};

export default filterPanel;
