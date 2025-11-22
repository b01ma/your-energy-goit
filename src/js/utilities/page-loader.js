// Page loader functionality

export function initPageLoader() {
  const loader = document.querySelector('.loader-page');

  if (!loader) return;

  // Hide loader when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');

      // Remove from DOM after animation completes
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 500); // Show loader for at least 500ms
  });
}
