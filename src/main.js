// ...
import header from './js/components/header.js';
import quote from './js/components/quote.js';
import filterPanel from './js/components/filter-panel.js';
import subscribe from './js/components/subscribe';
import toTopBtn from './js/utilities/to-top-btn.js';
import favorites from './js/components/favorites.js';
import { initPageLoader } from './js/utilities/page-loader.js';
import { initExerciseModal } from './js/components/exercise-modal.js';
import './js/components/search.js';
import './js/components/exercise-modal-favorites.js';

// make a switch for the pages: home and favorties

const init = () => {
  // INIT PAGE LOADER
  initPageLoader();

  // INIT PAGE-SPECIFIC COMPONENTS
  const page = document.body.dataset.page;
  if (page === 'home') {
    filterPanel(); // filter panel on home page
  } else if (page === 'favorites') {
    console.log('PAGE FAVORITES');
  }

  // INIT COMMON COMPONENTS
  header();
  quote();
  toTopBtn();
  subscribe();
  favorites();
  initExerciseModal();
};

init();
