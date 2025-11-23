import { api } from '../api/api.js';
import iziToast from 'izitoast';
import { renderExercises } from './filter-panel.js';
import 'izitoast/dist/css/iziToast.min.css';
import { renderPagination } from './pagination.js';

console.log('iziToast >>>', iziToast);

// Элементы
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-btn');
const clearSearchBtn = document.querySelector('.search-clear-btn');
const filtersGrid = document.getElementById('filtersGrid');
const selectedSubcategoryEl = document.getElementById('selectedSubcategory');
const paginationContainer = document.getElementById('exercisesPagination');

// ==================== ВСПОМОГАТЕЛЬНОЕ ====================

// Активная вкладка (Muscles / Body parts / Equipment)
function getCurrentFilter() {
  const btn = document.querySelector('.filter-btn--active');
  return btn ? btn.dataset.filter : 'Muscles';
}

// Маппинг вкладки → имени параметра API
// Пример запроса, который нам нужен:
// /api/exercises?muscles=abductors&keyword=3&page=1&limit=10
function mapFilterToKey(filterName) {
  switch (filterName) {
    case 'Muscles':
      return 'muscles';
    case 'Body parts':
      return 'bodypart';
    case 'Equipment':
      return 'equipment';
    default:
      return 'muscles';
  }
}

// Рендер карточек упражнений
// function renderExercises(exercises = []) {
//   if (!exercises.length) {
//     filtersGrid.innerHTML = '<p>Немає вправ для цієї категорії</p>';
//     return;
//   }

//   filtersGrid.innerHTML = exercises
//     .map(
//       ex => `
//       <article class="exercise-card">
//         <h3 class="exercise-card-title">${ex.name}</h3>
//         <p class="exercise-card-meta">
//           ${ex.bodyPart || ''}${ex.bodyPart && ex.target ? ' · ' : ''}${
//         ex.target || ''
//       }
//         </p>
//       </article>
//     `
//     )
//     .join('');
// }

// ближайший .search-wrapper для класса has-text
function getSearchWrapper() {
  return searchInput ? searchInput.closest('.search-wrapper') : null;
}

// показать / скрыть крестик через класс .has-text
function updateClearBtnState() {
  const wrapper = getSearchWrapper();
  if (!wrapper) return;

  if (searchInput.value.trim()) {
    wrapper.classList.add('has-text');
  } else {
    wrapper.classList.remove('has-text');
  }
}

// ==================== ЗАГРУЗКА БЕЗ KEYWORD ====================

// грузим все упражнения по текущей подкатегории (без keyword)
async function loadExercisesForCurrentCategory() {
  const subcategory = selectedSubcategoryEl.textContent.trim().toLowerCase();
  if (!subcategory) {
    // подкатегория не выбрана — просто ничего не делаем
    return;
  }

  const filterName = getCurrentFilter();
  const filterKey = mapFilterToKey(filterName);

  filtersGrid.innerHTML = '<p>Loading...</p>';

  try {
    const payload = {
      page: 1,
      limit: 12,
    };
    payload[filterKey] = subcategory;

    const data = await api.getExercisesByFilters(payload);
    const items = Array.isArray(data.results) ? data.results : [];

    if (!items.length) {
      renderExercises(items);
      renderPagination({
        container: paginationContainer,
        currentPage: 1,
        totalPages: 0,
        onPageChange: () => {}
      })
    }

    renderExercises(items);
  } catch (error) {
    console.error(error);
    filtersGrid.innerHTML = '<p>Failed to load exercises</p>';
    iziToast.error({
      title: 'Error',
      message: 'Failed to load exercises',
      position: 'topRight',
    });
  }
}

// ==================== ПОИСК ПО API С KEYWORD ====================

async function runApiSearch() {
  const keyword = searchInput.value.trim();
  const subcategory = selectedSubcategoryEl.textContent.trim().toLowerCase();
  const filterName = getCurrentFilter();
  const filterKey = mapFilterToKey(filterName);

  updateClearBtnState();

  if (!subcategory) {
    iziToast.info({
      title: 'Select category',
      message: 'Choose the category first',
      position: 'topRight',
    });
    return;
  }

  // Пустая строка → просто показываем все упражнения категории
  if (!keyword) {
    await loadExercisesForCurrentCategory();
    return;
  }

  filtersGrid.innerHTML = '<p>Loading...</p>';

  try {
    const payload = {
      page: 1,
      limit: 12,
      keyword,
    };
    payload[filterKey] = subcategory;

    const data = await api.getExercisesByFilters(payload);
    const items = Array.isArray(data.results) ? data.results : [];

    if (!items.length) {
      filtersGrid.innerHTML = '<p>There are no results for your query</p>';

      renderPagination({
        container: paginationContainer,
        currentPage: 1,
        totalPages: 0,
        onPageChange: () => {},
      });
      return;
    }

    renderExercises(items);
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Search failed',
      position: 'topRight',
    });
  }
}

// ==================== ОБРАБОТЧИКИ ====================

if (searchInput) {
  // input: нужен и для Backspace, и для Ctrl+X и т.п.
  searchInput.addEventListener(
    'input',
    async e => {
      e.stopImmediatePropagation();
      updateClearBtnState();

      // если строка стала пустой → сразу показываем все упражнения
      if (!searchInput.value.trim()) {
        await loadExercisesForCurrentCategory();
      }
    },
    true
  );

  // Enter → поиск по API
  searchInput.addEventListener(
    'keydown',
    e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopImmediatePropagation();
        runApiSearch();
      }
    },
    true
  );
}

if (searchBtn) {
  // Клик по лупе → поиск по API
  searchBtn.addEventListener(
    'click',
    e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      runApiSearch();
    },
    true
  );
}

if (clearSearchBtn && searchInput) {
  // Клик по крестику → очистка + все упражнения
  clearSearchBtn.addEventListener(
    'click',
    async e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      searchInput.value = '';
      updateClearBtnState();
      await loadExercisesForCurrentCategory();
      searchInput.focus();
    },
    true
  );
}
