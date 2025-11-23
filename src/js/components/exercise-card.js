export function renderExerciseCard(payload) {
  const {
    id,
    isHomePage,
    rating,
    name,
    burnedCalories,
    time,
    bodyPart,
    target,
  } = payload;
  return `
  <li class="exercise-card" data-id="${id}">
    <div class="exercise-card__header">
      <div class="exercise-card__workout-and-rating">
        <div class="exercise-card__workout">
          <span class="exercise-card__workout__text">WORKOUT</span>
        </div>
        ${getRatingOrTrashIcon(isHomePage, rating)}
      </div>
      <button class="exercise-card__start">
        <span class="exercise-card__start__text">Start</span>
        <svg class="exercise-card__start__icon" width="16" height="16">
          <use href="/img/icons.svg#icon-arrow-black"></use>
        </svg>
      </button>
    </div>
    <div class="exercise-card__body">
      <div class="exercise-card__icon-runner__container">
        <svg class="exercise-card__icon-runner" width="16" height="16">
          <use href="/img/icons.svg#icon-runner"></use>
        </svg>
      </div>
      <p class="exercise-card__title">
        ${name}
      </p>
    </div>
    <ul class="exercise-card__footer__list">
      <li class="exercise-card__footer__item">
        <span
          class="exercise-card__footer__text exercise-card__footer__text__key"
          >Burned calories:</span
        ><span
          class="exercise-card__footer__text exercise-card__footer__text__value"
          >${burnedCalories} / ${time} min</span
        >
      </li>
      <li class="exercise-card__footer__item">
        <span
          class="exercise-card__footer__text exercise-card__footer__text__key"
          >Body part:</span
        ><span
          class="exercise-card__footer__text exercise-card__footer__text__value"
          >${bodyPart}</span
        >
      </li>
      <li class="exercise-card__footer__item">
        <span
          class="exercise-card__footer__text exercise-card__footer__text__key"
          >Target:</span
        ><span
          class="exercise-card__footer__text exercise-card__footer__text__value"
          >${target}</span
        >
      </li>
    </ul>
  </li>
  `;
}

function getRatingOrTrashIcon(isHomePage, rating) {
  return isHomePage
    ? `<div class="exercise-card__rating">
          <span class="exercise-card__rating__number">${rating}</span>
          <svg width="13" height="13">
            <use fill="#EEA10C" href="/img/icons.svg#icon-star"></use>
          </svg>
        </div>`
    : `<svg class="exercise-card__trash-icon" width="16" height="16">
          <use href="/img/icons.svg#icon-trash"></use>
        </svg>`;
}
