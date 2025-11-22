export function renderPagination({ container, currentPage, totalPages, onPageChange }) {
  if (!container) return;

  currentPage = Number(currentPage) || 1;
  totalPages = Number(totalPages) || 1;

  if (!totalPages || totalPages <= 1) {
    container.innerHTML = '';
    container.hidden = true;
    return;
  }

  container.hidden = false;

  const makeBtn = (label, page, extraClass = '', disabled = false, isActive = false) => {
    const disabledAttr = disabled ? 'disabled' : '';
    const activeClass = isActive ? ' ex-pagination__btn--active' : '';
    const pageAttr = page ? `data-page="${page}"` : '';
    return `<button type="button" class="ex-pagination__btn ${extraClass}${activeClass}" ${pageAttr} ${disabledAttr}>${label}</button>`;
  };

  let pages = [];
  let showLeftDots = false;
  let showRightDots = false;

  if (totalPages <= 3) {
    for (let p = 1; p <= totalPages; p += 1) {
      pages.push(p);
    }
  } else if (currentPage <= 2) {
    pages = [1, 2, 3];
    showRightDots = true;
  } else if (currentPage >= totalPages - 1) {
    pages = [totalPages - 2, totalPages - 1, totalPages];
    showLeftDots = true;
  } else {
    pages = [currentPage - 1, currentPage, currentPage + 1];
    showLeftDots = true;
    showRightDots = true;
  }

  let html = '';

  html += makeBtn('«', 1, 'ex-pagination__btn--arrow', currentPage === 1);
  html += makeBtn('‹', currentPage - 1, 'ex-pagination__btn--arrow', currentPage === 1);

  if (showLeftDots) {
    html += '<span class="ex-pagination__ellipsis">…</span>';
  }

  pages.forEach(page => {
    html += makeBtn(String(page), page, '', false, page === currentPage);
  });

  if (showRightDots) {
    html += '<span class="ex-pagination__ellipsis">…</span>';
  }

  html += makeBtn('›', currentPage + 1, 'ex-pagination__btn--arrow', currentPage === totalPages);
  html += makeBtn('»', totalPages, 'ex-pagination__btn--arrow', currentPage === totalPages);

  container.innerHTML = html;

  container.onclick = event => {
    const btn = event.target.closest('.ex-pagination__btn');
    if (!btn || btn.disabled) return;

    const page = Number(btn.dataset.page);
    if (!page || page === currentPage) return;

    onPageChange(page);
  };
}
