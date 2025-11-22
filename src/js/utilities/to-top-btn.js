const toTopBtn = () => {
  const toTopBtn = document.querySelector('.to-top-btn');

  if (toTopBtn) toTopBtn.addEventListener('click', scrollToTop);

  window.addEventListener('scroll', showBtn);

  function scrollToTop() {
    document.body.scroll({ behavior: 'smooth', top: 0 });
    document.documentElement.scroll({ behavior: 'smooth', top: 0 });
  }

  function showBtn() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      toTopBtn.style.display = 'flex';
    } else {
      toTopBtn.style.display = 'none';
    }
  }
};

export default toTopBtn;
