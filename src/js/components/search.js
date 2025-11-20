import { api } from '../api/api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const section = document.querySelector('[data-exercises-section]');

if (section) {
  const refs = {
    list: section.querySelector('[data-exercises-list]'),
    empty: section.querySelector('[data-exercises-empty]'),
    searchForm: section.querySelector('[data-exercises-search-form]'),
    searchInput: section.querySelector('[data-exercises-search-input]'),
    searchClear: section.querySelector('[data-search-clear]'),
    tabs: section.querySelector('[data-exercises-tabs]'),
    pagination: section.querySelector('[data-exercises-pagination]'),
    categoryTitle: section.querySelector('[data-exercises-category-title]'),
  };


  const state = {
    category:
      section.dataset.category ||
      new URLSearchParams(location.search).get('category') ||
      '',
    filter:
      section.dataset.filter ||
      new URLSearchParams(location.search).get('filter') ||
      'bodypart',
    keyword: '',
    page: 1,
    limit: 12,
    totalPages: 1,
  };

  if (refs.categoryTitle && state.category) {
    refs.categoryTitle.textContent = state.category;
  }

  init();

  function init() {
    loadExercises();

    if (refs.searchForm && refs.searchInput) {
      refs.searchForm.addEventListener('submit', onSearchSubmit);
    }

    if (refs.tabs) {
      refs.tabs.addEventListener('click', onTabsClick);
    }

    if (refs.pagination) {
      refs.pagination.addEventListener('click', onPaginationClick);
    }

    if (refs.searchInput && refs.searchClear) {
      refs.searchInput.addEventListener('input', () => {
        if (refs.searchInput.value.trim().length > 0) {
          refs.searchInput.classList.add('not-empty');
          refs.searchClear.style.display = 'block';
        } else {
          refs.searchInput.classList.remove('not-empty');
          refs.searchClear.style.display = 'none';
        }
      });

      refs.searchClear.addEventListener('click', () => {
        refs.searchInput.value = '';
        refs.searchInput.classList.remove('not-empty');
        refs.searchClear.style.display = 'none';

        state.keyword = '';
        state.page = 1;
        loadExercises();
      });
    }

    highlightActiveTab();
  }



  async function loadExercises() {
    if (!refs.list) return;

    refs.list.innerHTML = '<li class="exercises-loader">Loading...</li>';
    refs.empty?.classList.add('is-hidden');

    try {
      const filterKey = state.filter; 
      const categoryForApi = state.category
        ? state.category.toLowerCase()
        : undefined;

      const data = await api.getExercisesByFilters({
        [filterKey]: categoryForApi,
        keyword: state.keyword || undefined,
        page: state.page,
        limit: state.limit,
      });

      console.log('EXERCISES DATA:', data); 

      const items = Array.isArray(data.results) ? data.results : [];
      state.totalPages = Number(data.totalPages) || 1;

      if (!items.length) {
        refs.list.innerHTML = '';
        refs.empty?.classList.remove('is-hidden');
        renderPagination();

        iziToast.info({
          title: 'No results',
          message: 'No exercises found for these filters. Try changing category or keyword.',
          position: 'topRight',
          timeout: 3000,
          closeOnClick: true,
        });
        return;
      }

      renderExercisesList(items);
      refs.empty?.classList.add('is-hidden');
      renderPagination();
    } catch (error) {
      console.error('Failed to load exercises:', error);

      iziToast.error({
        title: 'Error',
        message: error?.message || 'Failed to load exercises. Try again later.',
        position: 'topRight',
        timeout: 4000,
        closeOnClick: true,
      });

      refs.list.innerHTML =
        '<li class="exercises-error">Error loading exercises. Try again later.</li>';
      refs.pagination.innerHTML = '';
    }
  }

  function onSearchSubmit(event) {
    event.preventDefault();

    const value = refs.searchInput.value.trim();
    state.keyword = value;
    state.page = 1;

    loadExercises();
  }

  function onTabsClick(event) {
    const btn = event.target.closest('[data-filter-value]');
    if (!btn) return;

    const newFilter = btn.dataset.filterValue; 
    if (!newFilter || newFilter === state.filter) return;

    state.filter = newFilter;
    state.page = 1;

    highlightActiveTab();
    loadExercises();
  }

  function onPaginationClick(event) {
    const btn = event.target.closest('[data-page]');
    if (!btn) return;

    const newPage = Number(btn.dataset.page);
    if (!Number.isFinite(newPage) || newPage === state.page) return;

    state.page = newPage;
    loadExercises();
  }

  function renderExercisesList(items = []) {
    if (!refs.list) return;

    const markup = items.map(createExerciseCardMarkup).join('');
    refs.list.innerHTML = markup;
  }

  function createExerciseCardMarkup(exercise) {
    const {
      _id,
      name,
      burnedCalories,
      bodyPart,
      target,
      rating,
      time,
    } = exercise;

    return `
      <li class="exercise-card" data-id="${_id}">
        <div class="exercise-card__top">
          <span class="exercise-card__label">Workout</span>
          <span class="exercise-card__rating">
            ${rating ?? '0.0'} <span class="exercise-card__star">★</span>
          </span>
          <button type="button" class="exercise-card__start-btn">
            Start →
          </button>
        </div>

        <h3 class="exercise-card__title">${name}</h3>

        <ul class="exercise-card__meta">
          <li>Burned calories: <span>${burnedCalories ?? '-'}</span></li>
          <li>Body part: <span>${bodyPart ?? '-'}</span></li>
          <li>Target: <span>${target ?? '-'}</span></li>
          <li>Time: <span>${time ?? '-'}</span></li>
        </ul>
      </li>
    `;
  }

  function renderPagination() {
    if (!refs.pagination) return;

    const { page, totalPages } = state;

    if (totalPages <= 1) {
      refs.pagination.innerHTML = '';
      return;
    }

    let markup = '';

    if (page > 1) {
      markup += `<button type="button" class="pagination-btn prev" data-page="${
        page - 1
      }">Prev</button>`;
    }

    for (let p = 1; p <= totalPages; p += 1) {
      markup += `
        <button
          type="button"
          class="pagination-btn ${p === page ? 'is-active' : ''}"
          data-page="${p}"
        >${p}</button>
      `;
    }

    if (page < totalPages) {
      markup += `<button type="button" class="pagination-btn next" data-page="${
        page + 1
      }">Next</button>`;
    }

    refs.pagination.innerHTML = markup;
  }

  function highlightActiveTab() {
    if (!refs.tabs) return;

    const buttons = refs.tabs.querySelectorAll('[data-filter-value]');
    buttons.forEach(btn => {
      btn.classList.toggle(
        'is-active',
        btn.dataset.filterValue === state.filter
      );
    });
  }
}