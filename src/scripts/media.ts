export function isSmallScreen() {
  return window.matchMedia("(max-width: 767px), (max-height: 767px)").matches;
}