import MicroModal from 'micromodal';
import { api } from '../api/api.js';
import { syncButtonWithFavorites } from './exercise-modal-favorites.js';

export function initExerciseModal() {
  // Initialize MicroModal with config
  MicroModal.init({
    onShow: modal => console.info(`${modal.id} is shown`),
    onClose: modal => console.info(`${modal.id} is hidden`),
    openTrigger: 'data-micromodal-trigger',
    closeTrigger: 'data-micromodal-close',
    openClass: 'is-open',
    disableScroll: true,
    disableFocus: false,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
    debugMode: true,
  });

  // Set up event delegation for all "Start" buttons
  document.addEventListener('click', async event => {
    const startButton = event.target.closest('.exercise-card__start');

    if (!startButton) return;

    // Get the exercise card and its ID
    const exerciseCard = startButton.closest('.exercise-card');

    if (!exerciseCard) return;

    const exerciseId = exerciseCard.dataset.id;

    if (!exerciseId) {
      console.error('Exercise ID not found');
      return;
    }

    try {
      // Fetch exercise data by ID
      const exerciseData = await api.getExercisesById(exerciseId);

      // Update modal with real data
      // 👉 Передаём id в модалку и кнопку "Add to favorites"
      const modal = document.getElementById('exerciseModal');
      modal.dataset.id = exerciseId;

      const favoriteBtn = document.getElementById('exerciseModalFavoriteBtn');
      favoriteBtn.dataset.id = exerciseId;

      // Обновляем содержимое модалки
      updateModalContent(exerciseData);

      // 👉 Синхронизируем состояние кнопки с localStorage
      syncButtonWithFavorites();

      // Open the modal
      MicroModal.show('exerciseModal');
    } catch (error) {
      console.error('Error loading exercise details:', error);
    }
  });

  // Set up event handler for "Give a rating" button
  document.addEventListener('click', event => {
    const ratingButton = event.target.closest('#exerciseModalRatingBtn');

    if (!ratingButton) return;

    // Get current exercise rating from the modal
    const ratingValue =
      document.getElementById('exerciseModalRating')?.textContent || '0.0';

    // Close exercise modal and open rating modal
    MicroModal.close('exerciseModal');

    // Small delay to ensure smooth transition
    setTimeout(() => {
      // Initialize rating modal with empty stars
      initRatingModalStars(parseFloat(ratingValue));
      MicroModal.show('ratingModal');
    }, 300);
  });
}

// Helper function to initialize rating modal with empty interactive stars
function initRatingModalStars(currentRating) {
  const ratingValueEl = document.getElementById('ratingModalCurrentValue');
  if (ratingValueEl) {
    ratingValueEl.textContent = '0.0';
  }

  const starsContainer = document.getElementById('ratingModalCurrentStars');
  if (!starsContainer) return;

  // Store selected rating
  let selectedRating = 0;

  // Clear and rebuild stars as empty and interactive
  starsContainer.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const starIndex = i + 1;

    const starButton = document.createElement('button');
    starButton.type = 'button';
    starButton.className = 'rating-modal__star-btn';
    starButton.setAttribute('data-rating', starIndex);
    starButton.setAttribute('aria-label', `Rate ${starIndex} stars`);

    const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    star.setAttribute('width', '18');
    star.setAttribute('height', '18');
    star.classList.add('exercise-modal__star', 'exercise-modal__star--empty');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      '/img/icons.svg#icon-star'
    );
    star.appendChild(use);
    starButton.appendChild(star);

    // Click handler for rating
    starButton.addEventListener('click', () => {
      selectedRating = starIndex;
      updateStarsFill(selectedRating);

      // Update the rating value display
      const ratingValueElement = document.querySelector(
        '.rating-modal__rating-value'
      );
      if (ratingValueElement) {
        ratingValueElement.textContent = selectedRating.toFixed(1);
      }

      // Store rating in a hidden field or data attribute for form submission
      starsContainer.setAttribute('data-selected-rating', selectedRating);
    });

    starsContainer.appendChild(starButton);
  }

  // Helper to update star fills
  function updateStarsFill(rating) {
    const starButtons = starsContainer.querySelectorAll(
      '.rating-modal__star-btn'
    );
    starButtons.forEach((btn, index) => {
      const star = btn.querySelector('svg');
      if (index < rating) {
        star.classList.remove('exercise-modal__star--empty');
        star.classList.add('exercise-modal__star--filled');
      } else {
        star.classList.add('exercise-modal__star--empty');
        star.classList.remove('exercise-modal__star--filled');
      }
    });
  }
}

// Function to update modal content dynamically
export function updateModalContent(data) {
  if (!data) return;

  // Update image (GIF)
  const image = document.getElementById('exerciseModalImage');
  if (image && data.gifUrl) {
    image.src = data.gifUrl;
    image.alt = data.name || 'Exercise';
  }

  // Update title
  const title = document.getElementById('exerciseModal-title');
  if (title && data.name) {
    title.textContent = data.name;
  }

  // Update rating
  const ratingValue = document.getElementById('exerciseModalRating');
  if (ratingValue && data.rating) {
    ratingValue.textContent = data.rating.toFixed(1);
  }

  // Update stars based on rating
  updateStars(data.rating);

  // Update badges
  const target = document.getElementById('exerciseModalTarget');
  if (target && data.target) {
    target.textContent = capitalize(data.target);
  }

  const bodyPart = document.getElementById('exerciseModalBodyPart');
  if (bodyPart && data.bodyPart) {
    bodyPart.textContent = capitalize(data.bodyPart);
  }

  const equipment = document.getElementById('exerciseModalEquipment');
  if (equipment && data.equipment) {
    equipment.textContent = capitalize(data.equipment);
  }

  const popular = document.getElementById('exerciseModalPopular');
  if (popular && data.popularity) {
    popular.textContent = data.popularity;
  }

  const calories = document.getElementById('exerciseModalCalories');
  if (calories && data.burnedCalories && data.time) {
    calories.textContent = `${data.burnedCalories}/${data.time} min`;
  }

  // Update description
  const description = document.getElementById('exerciseModalDescription');
  if (description && data.description) {
    description.textContent = data.description;
  }
}

// Helper function to capitalize text
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function to update star ratings with partial fills
function updateStars(rating) {
  const starsContainer = document.getElementById('exerciseModalStars');
  if (!starsContainer || !rating) return;

  // Clear existing stars and rebuild
  starsContainer.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const starWrapper = document.createElement('span');
    starWrapper.className = 'exercise-modal__star-wrapper';
    starWrapper.style.position = 'relative';
    starWrapper.style.display = 'inline-block';
    starWrapper.style.width = '18px';
    starWrapper.style.height = '18px';

    // Background star (dimmed)
    const bgStar = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    bgStar.setAttribute('width', '18');
    bgStar.setAttribute('height', '18');
    bgStar.classList.add('exercise-modal__star', 'exercise-modal__star--empty');

    const bgUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    bgUse.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      '/img/icons.svg#icon-star'
    );
    bgStar.appendChild(bgUse);

    starWrapper.appendChild(bgStar);

    // Calculate fill percentage for this star
    const fillPercentage = Math.max(0, Math.min(100, (rating - i) * 100));

    if (fillPercentage > 0) {
      // Foreground star (yellow, clipped)
      const fgStar = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      fgStar.setAttribute('width', '18');
      fgStar.setAttribute('height', '18');
      fgStar.classList.add(
        'exercise-modal__star',
        'exercise-modal__star--filled'
      );
      fgStar.style.position = 'absolute';
      fgStar.style.top = '0';
      fgStar.style.left = '0';
      fgStar.style.clipPath = `inset(0 ${100 - fillPercentage}% 0 0)`;

      const fgUse = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'use'
      );
      fgUse.setAttributeNS(
        'http://www.w3.org/1999/xlink',
        'xlink:href',
        '/img/icons.svg#icon-star'
      );
      fgStar.appendChild(fgUse);

      starWrapper.appendChild(fgStar);
    }

    starsContainer.appendChild(starWrapper);
  }
}
