import { api } from '../api/api.js';
import iconSprite from '/img/icons.svg';

const FAVORITES_KEY = 'favorites';

// sprite icon ids (check these exist in your icons.svg)
const HEART_ICON = `${iconSprite}#icon-heart`;
const HEART_TRASH = `${iconSprite}#icon-trash`;

/**
 * Save favorites array to localStorage
 * @param {Array} favorites
 */
function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites to localStorage:', error);
  }
}

/**
 * Load favorites array from localStorage
 * @returns {Array}
 */
function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse favorites from localStorage:', error);
    return [];
  }
}

/**
 * Check whether an exercise is in favorites
 * @param {Array} favorites
 * @param {string} id
 * @returns {boolean}
 */
function isFavorite(favorites, id) {
  return favorites.some(item => String(item._id) === String(id));
}

/**
 * Update favorite button text and icon in the modal
 * @param {HTMLButtonElement} button
 * @param {boolean} inFavorites
 */
function updateFavoriteButton(button, inFavorites) {
  if (!button) return;

  button.dataset.favorite = inFavorites ? 'true' : 'false';

  if (inFavorites) {
    button.innerHTML = `
      Remove from favorites
      <svg class="exercise-modal__btn-icon" width="20" height="20">
        <use href="${HEART_TRASH}"></use>
      </svg>
    `;
  } else {
    button.innerHTML = `
      Add to favorites
      <svg class="exercise-modal__btn-icon" width="20" height="20">
        <use href="${HEART_ICON}"></use>
      </svg>
    `;
  }
}

/**
 * Try to get the current exercise id from the modal
 * We expect that when the modal is opened this id is set in a data-attribute:
 *  - on the button #exerciseModalFavoriteBtn (data-id)
 *  - or on the modal container #exerciseModal (data-id)
 */
function getCurrentExerciseId() {
  const favoriteBtn = document.getElementById('exerciseModalFavoriteBtn');
  if (favoriteBtn && favoriteBtn.dataset.id) {
    return favoriteBtn.dataset.id;
  }

  const modal = document.getElementById('exerciseModal');
  if (modal && modal.dataset.id) {
    return modal.dataset.id;
  }

  // fallback: search any element inside the modal with data-id
  if (modal) {
    const withId = modal.querySelector('[data-id]');
    if (withId) {
      return withId.dataset.id;
    }
  }

  // console.warn('exercise-modal-favorites: exercise id not found.');
  return null;
}

/**
 * Click handler for the "Add to favorites / Remove from favorites" button
 * @param {MouseEvent} event
 */
async function onFavoriteButtonClick(event) {
  const button = event.currentTarget;
  const exerciseId = getCurrentExerciseId();

  if (!exerciseId) return;

  let favorites = loadFavorites();
  const alreadyFavorite = isFavorite(favorites, exerciseId);

  // disable button while performing request
  button.disabled = true;

  try {
    if (alreadyFavorite) {
      // remove from favorites
      favorites = favorites.filter(
        item => String(item._id) !== String(exerciseId)
      );
      saveFavorites(favorites);
      updateFavoriteButton(button, false);
    } else {
      // add to favorites: fetch full exercise data from backend
      const exercise = await api.getExercisesById(exerciseId);
      if (!exercise || !exercise._id) {
        console.error('Failed to load exercise data for favorites.');
      } else {
        favorites.push(exercise);
        saveFavorites(favorites);
        updateFavoriteButton(button, true);
      }
    }
  } catch (error) {
    console.error('Failed to toggle favorite exercise:', error);
  } finally {
    button.disabled = false;
  }
}

/**
 * Synchronize the button state with localStorage
 * (can be called when opening the modal)
 */
function syncButtonWithFavorites() {
  const button = document.getElementById('exerciseModalFavoriteBtn');
  if (!button) return;

  const exerciseId = getCurrentExerciseId();
  if (!exerciseId) return;

  const favorites = loadFavorites();
  const inFavorites = isFavorite(favorites, exerciseId);
  updateFavoriteButton(button, inFavorites);
}

/**
 * Initialize modal logic
 */
function initExerciseModalFavorites() {
  const button = document.getElementById('exerciseModalFavoriteBtn');
  if (!button) return;

  // on page/script load — synchronize the button
  syncButtonWithFavorites();

  // add click handler for the button
  button.addEventListener('click', onFavoriteButtonClick);
}

// Initialize immediately when the module is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExerciseModalFavorites);
} else {
  initExerciseModalFavorites();
}

// Also export function for external calls when opening the modal
export { syncButtonWithFavorites };
