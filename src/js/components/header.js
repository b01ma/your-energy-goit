// const menuBtn = document.getElementById('mobile-menu-btn');
// const menuClose = document.getElementById('mobile-menu-close');
// const menu = document.getElementById('mobile-menu');
// const body = document.body;

// function openMenu() {
//   menu.classList.add('is-open');
//   body.classList.add('menu-open');
//   menuBtn.setAttribute('aria-expanded', 'true');
// }

// function closeMenu() {
//   menu.classList.remove('is-open');
//   body.classList.remove('menu-open');
//   menuBtn.setAttribute('aria-expanded', 'false');
// }

// menuBtn.addEventListener('click', openMenu);
// menuClose.addEventListener('click', closeMenu);

// // Close menu when clicking on a link
// const menuLinks = menu.querySelectorAll('.mobile-menu-link');
// menuLinks.forEach(link => {
//   link.addEventListener('click', closeMenu);
// });

// // Close menu on escape key
// document.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape' && menu.classList.contains('is-open')) {
//     closeMenu();
//   }
// });

const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
const mobileMenu = document.querySelector('#header-mobile-menu');

const navDesktop = document.querySelector('.header-nav');
const headerSocialDesktop = document.querySelector('.header-socials');

const menuLinks = mobileMenu.querySelectorAll('.header-socials-link');

const mobileBreakPoint = 768;

function openMenu() {
  mobileMenuBtn.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-expanded', 'false');
}

function showMobileMenu() {
  mobileMenuBtn.classList.remove('visually-hidden');

  navDesktop.classList.add('visually-hidden');
  headerSocialDesktop.classList.add('visually-hidden');
}

function hideMobileMenu() {
  mobileMenuBtn.classList.add('visually-hidden');

  navDesktop.classList.remove('visually-hidden');
  headerSocialDesktop.classList.remove('visually-hidden');

  closeMenu();
}

function updateActiveNav() {
  const isOnFavorites = globalThis.location.pathname.includes('favorites');

  document
    .querySelector('#nav-desktop-home')
    ?.classList.toggle('nav-active', !isOnFavorites);
  document
    .querySelector('#nav-desktop-favorites')
    ?.classList.toggle('nav-active', isOnFavorites);

  document
    .querySelector('#nav-mobile-home')
    ?.classList.toggle('nav-active', !isOnFavorites);
  document
    .querySelector('#nav-mobile-favorites')
    ?.classList.toggle('nav-active', isOnFavorites);
}

globalThis.addEventListener('resize', () => {
  window.innerWidth <= mobileBreakPoint ? showMobileMenu() : hideMobileMenu();
});

mobileMenuBtn.addEventListener('click', () => {
  const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
  isExpanded ? closeMenu() : openMenu();
});

menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', e => {
  if (
    e.key === 'Escape' &&
    mobileMenu.getAttribute('aria-expanded') === 'true'
  ) {
    closeMenu();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  window.innerWidth <= mobileBreakPoint ? showMobileMenu() : hideMobileMenu();

  updateActiveNav();
});
