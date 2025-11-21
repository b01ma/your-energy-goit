const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
const mobileMenu = document.querySelector('#header-mobile-menu');

const navDesktop = document.querySelector('.header-nav');
const headerSocialDesktop = document.querySelector('.header-socials');

const menuLinks = mobileMenu.querySelectorAll('.header-socials-link');

const mobileBreakpoint = globalThis.matchMedia('(max-width: 768px)');

function openMenu() {
  mobileMenuBtn.setAttribute('aria-expanded', 'true');
   mobileMenu.dataset.expanded = 'true';
}

function closeMenu() {
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
   mobileMenu.dataset.expanded = 'false';
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

function handleBreakpointChange(e) {
  e.matches ? showMobileMenu() : hideMobileMenu();
}

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
  updateActiveNav();
});

handleBreakpointChange(mobileBreakpoint);
mobileBreakpoint.addEventListener('change', handleBreakpointChange);
