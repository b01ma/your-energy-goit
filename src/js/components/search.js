import { api } from '../api/api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Элементы
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-btn');
const filtersGrid = document.getElementById('filtersGrid');
const selectedSubcategoryEl = document.getElementById('selectedSubcategory');

// Маппинг вкладки → параметра API
function getCurrentFilter() {
  const btn = document.querySelector('.filter-btn--active');
  return btn ? btn.dataset.filter : 'Muscles';
}

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


// Рендер карточек (как в filter-panel.js)
function renderExercises(exercises = []) {
  if (!exercises.length) {
    filtersGrid.innerHTML = '<p>Немає вправ для цієї категорії</p>';
    return;
  }

  filtersGrid.innerHTML = exercises
    .map(
      ex => `
      <article class="exercise-card">
        <h3 class="exercise-card-title">${ex.name}</h3>
        <p class="exercise-card-meta">
          ${ex.bodyPart || ''}${ex.bodyPart && ex.target ? ' · ' : ''}${
        ex.target || ''
      }
        </p>
      </article>
    `
    )
    .join('');
}

// Поиск по API
async function runApiSearch() {
  const keyword = searchInput.value.trim();
  const subcategory = selectedSubcategoryEl.textContent.trim().toLowerCase();
  const filterName = getCurrentFilter();
  const filterKey = mapFilterToKey(filterName);

  if (!subcategory) {
    iziToast.info({
      title: 'Select category',
      message: 'Спочатку виберіть підкатегорію',
      position: 'topRight',
    });
    return;
  }

  if (!keyword) {
    iziToast.info({
      title: 'Empty',
      message: 'Введіть keyword для пошуку',
      position: 'topRight',
    });
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
      filtersGrid.innerHTML =
        '<p>По цьому ключовому слову немає результатів.</p>';
      return;
    }

    renderExercises(items);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Не вдалося виконати пошук',
      position: 'topRight',
    });
    console.error(error);
  }
}

// === Навешиваем обработчики ===

// Перехватываем ENTER
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

// Клик по кнопке → поиск по API
searchBtn.addEventListener(
  'click',
  e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    runApiSearch();
  },
  true
);

// Блокируем local-search из filter-panel.js
searchInput.addEventListener(
  'input',
  e => {
    e.stopImmediatePropagation();
  },
  true
);
