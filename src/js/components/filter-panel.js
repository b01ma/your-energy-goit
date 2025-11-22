import { api } from '../api/api.js';
import { loadAndRenderCategories } from './category-template.js';

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

  function capitalize(str) {
    if (!str) return '';
    return str[0].toUpperCase() + str.slice(1);
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

      allFilterItems = data.results || [];
      renderFilterCards(allFilterItems);
    } catch (err) {
      console.error('Error loading filters:', err);
      filtersGrid.innerHTML = '<p>Не вдалося завантажити фільтри</p>';
    }
  }

  function renderFilterCards(items) {
    if (!items.length) {
      filtersGrid.innerHTML = '<p>Немає категорій</p>';
      return;
    }

    filtersGrid.innerHTML = items
      .map(
        item => `
      <article class="filter-card" data-name="${item.name}">
        <div class="filter-card-name">${item.name}</div>
      </article>
    `
      )
      .join('');
  }

  async function loadExercisesForSubcategory(filterType, subcategoryName) {
    const payload = {
      page: 1,
      limit: 12,
    };

    if (filterType === 'Body parts') {
      payload.bodyPart = subcategoryName;
    } else if (filterType === 'Muscles') {
      payload.target = subcategoryName;
    } else if (filterType === 'Equipment') {
      payload.equipment = subcategoryName;
    }

    try {
      const data = await api.getExercisesByFilters(payload);
      currentExercises = data.results || [];
      renderExercises(currentExercises);
    } catch (error) {
      console.error('Error loading exercises:', error);
      filtersGrid.innerHTML = '<p>Не вдалося завантажити вправи</p>';
    }
  }

  function renderExercises(exercises) {
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

    // await loadFilterCards(currentFilter);
    console.log(currentFilter.toLowerCase());
    await loadAndRenderCategories(currentFilter.toLowerCase(), filtersGrid);
  });

  filtersGrid.addEventListener('click', async event => {
    const card = event.target.closest('.filter-card');
    if (!card) return;

    const name = card.dataset.name; // "waist"
    const prettyName = capitalize(name); // "Waist"

    currentSubcategory = name;

    selectedSubcategoryEl.textContent = prettyName;

    searchContainer.hidden = false;
    searchInput.value = '';

    await loadExercisesForSubcategory(currentFilter, currentSubcategory);
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
    loadFilterCards(currentFilter);
  });

  exercisesTitle.addEventListener('click', async () => {
    currentFilter = 'Muscles';

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

    await loadFilterCards('Muscles');
  });
};

export default filterPanel;
