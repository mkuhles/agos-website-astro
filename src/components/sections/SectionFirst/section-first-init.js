// Inlined arrangeCircleElements and useCircleAnimation to avoid runtime import/url resolution issues after build
function arrangeCircleElements(globalAngle, globalRadius, globalOpacity) {
  const elements = document.querySelectorAll('.circle-element');
  const container = document.getElementById('circle-container');
  if (!container) return;

  let radius = container.offsetHeight / 2;
  const centerX = container.offsetWidth / 2;
  const centerY = container.offsetHeight / 2;
  const angleStep = (2 * Math.PI) / (elements.length || 1);

  if (globalRadius < radius) {
    radius = globalRadius;
  }

  elements.forEach((element, index) => {
    const angle = index * angleStep + globalAngle - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle) - element.offsetWidth / 2;
    const y = centerY + radius * Math.sin(angle) - element.offsetHeight / 2;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.opacity = globalOpacity;
  });
}

function useCircleAnimation(skipInitialAnimation = false) {
  const STEP_NUMBER = 50;
  const MAX_ANGLE = 2 * Math.PI;
  const ANGLE_STEP = (2 * Math.PI) / STEP_NUMBER;
  const MAX_OPACITY = 1;
  const OPACITY_STEP = 1 / STEP_NUMBER;

  let angle = 0, radius = 0, opacity = 0;
  let width, height, vmin, maxRadius, radiusStep;

  function recomputeSizes() {
    width = window.innerWidth;
    height = window.innerHeight;
    vmin = Math.min(width, height);
    maxRadius = vmin * 0.3;
    radiusStep = maxRadius / STEP_NUMBER;

    if (radius > maxRadius) radius = maxRadius;
  }

  function handleResize() {
    recomputeSizes();
    arrangeCircleElements(angle, radius, opacity);
  }
  recomputeSizes();
  window.addEventListener('resize', handleResize);

  if (skipInitialAnimation) {
    arrangeCircleElements(MAX_ANGLE, maxRadius, MAX_OPACITY);
    return function stopNoop() {};
  }

  const interval = setInterval(() => {
    angle = calculateNextState(angle, MAX_ANGLE, ANGLE_STEP);
    radius = calculateNextState(radius, maxRadius, radiusStep);
    opacity = calculateNextState(opacity, MAX_OPACITY, OPACITY_STEP);

    arrangeCircleElements(angle, radius, opacity);
  }, 25);

  return function stop() {
    clearInterval(interval);
    window.removeEventListener('resize', handleResize);
  };

  function calculateNextState(previous, max, step) {
    if (previous >= max - step) {
      return max;
    }
    return previous + step;
  }
}

async function initIfNeeded() {
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
