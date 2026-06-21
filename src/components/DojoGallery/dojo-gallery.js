// per-instance dojo gallery initializer
function initGallery(container) {
  const slider = container.querySelector('.gallery-slider');
  if (!slider) return;

  const track = slider.querySelector('.slider-track');
  const items = Array.from(slider.querySelectorAll('.slider-item'));
  const btnPrev = slider.querySelector('.prev');
  const btnNext = slider.querySelector('.next');

  const lightbox = container.querySelector('.lightbox');
  const lbImg = lightbox?.querySelector('.lightbox-img');
  const lbClose = lightbox?.querySelector('.lightbox-close');
  const lbPrev = lightbox?.querySelector('.lightbox-prev');
  const lbNext = lightbox?.querySelector('.lightbox-next');

  let current = 0;

  function scrollToIndex(i) {
    const item = items[i];
    if (!item || !track) return;
    const left = item.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    track.scrollTo({ left, behavior: 'smooth' });
  }

  btnPrev?.addEventListener('click', function () {
    current = Math.max(0, current - 1);
    scrollToIndex(current);
  });
  btnNext?.addEventListener('click', function () {
    current = Math.min(items.length - 1, current + 1);
    scrollToIndex(current);
  });

  // Attach click handlers directly to slider items to avoid delegation issues
  items.forEach((item, idx) => {
    item.addEventListener('click', function (e) {
      current = idx;
      const img = item.querySelector('img');
      if (lightbox && lbImg && img) {
        lbImg.src = img.src;
        lbImg.alt = img.alt || '';
        // make lightbox focusable and focus it so keyboard events work
        lightbox.tabIndex = -1;
        lightbox.removeAttribute('hidden');
        try { lightbox.focus(); } catch (e) { /* ignore */ }
      }
      scrollToIndex(current);
    });
  });

  lbClose?.addEventListener('click', function () { if (lightbox) lightbox.setAttribute('hidden', ''); });
  lbPrev?.addEventListener('click', function () {
    if (items.length === 0) return;
    current = (current - 1 + items.length) % items.length;
    const img = items[current].querySelector('img');
    if (lbImg && img) lbImg.src = img.src;
  });
  lbNext?.addEventListener('click', function () {
    if (items.length === 0) return;
    current = (current + 1) % items.length;
    const img = items[current].querySelector('img');
    if (lbImg && img) lbImg.src = img.src;
  });

  // keyboard navigation while lightbox is open
  window.addEventListener('keydown', function (e) {
    if (!lightbox || lightbox.hasAttribute('hidden')) return;
    if (e.key === 'Escape') lightbox.setAttribute('hidden', '');
    if (e.key === 'ArrowLeft') lbPrev?.click();
    if (e.key === 'ArrowRight') lbNext?.click();
  });

  // Utility: check if container is (partially) in the viewport
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  // Global gallery navigation events (dispatched from external buttons)
  function onGlobalPrev() {
    if (!isInViewport(container)) return;
    if (lightbox && !lightbox.hasAttribute('hidden')) {
      lbPrev?.click();
      return;
    }
    if (items.length === 0) return;
    current = Math.max(0, current - 1);
    scrollToIndex(current);
  }

  function onGlobalNext() {
    if (!isInViewport(container)) return;
    if (lightbox && !lightbox.hasAttribute('hidden')) {
      lbNext?.click();
      return;
    }
    if (items.length === 0) return;
    current = Math.min(items.length - 1, current + 1);
    scrollToIndex(current);
  }

  window.addEventListener('gallery-prev', onGlobalPrev);
  window.addEventListener('gallery-next', onGlobalNext);

}

function runInit() {
  document.querySelectorAll('[data-dojo-gallery]').forEach(initGallery);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInit);
} else {
  runInit();
}

export { initGallery };
