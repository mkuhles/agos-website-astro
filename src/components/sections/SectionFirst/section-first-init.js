import useCircleAnimation from '/src/scripts/useCircleAnimation.js';

function initIfNeeded() {
  const container = document.getElementById('circle-container');
  if (!container) return;

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.documentElement.classList.toggle('reduced-motion', mq.matches);
  mq.addEventListener?.('change', (e) =>
    document.documentElement.classList.toggle('reduced-motion', e.matches)
  );

  useCircleAnimation(mq.matches);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initIfNeeded);
} else {
  initIfNeeded();
}
