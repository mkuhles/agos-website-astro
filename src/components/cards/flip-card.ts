import { isSmallScreen } from "../../scripts/media";

function getCircleContainer(): HTMLElement | null {
  return document.getElementById("circle-container");
}

function getBack(card: HTMLElement): HTMLElement | null {
  return card.querySelector<HTMLElement>(".flip-card-back");
}

function getTranslateXY(el: HTMLElement) {
  const t = getComputedStyle(el).transform;
  if (!t || t === "none") return { x: 0, y: 0 };

  const m = new DOMMatrixReadOnly(t);
  return { x: m.m41, y: m.m42 };
}

function setBackOffset(back: HTMLElement, dx: number, dy: number) {
  back.style.setProperty("--dx", `${dx}px`);
  back.style.setProperty("--dy", `${dy}px`);
}

function clearBackOffset(back: HTMLElement) {
  back.style.removeProperty("--dx");
  back.style.removeProperty("--dy");
  back.style.removeProperty("--back-width");
  back.style.removeProperty("--back-height");
}

export function closeAllOpenCards() {
  const openCards = document.getElementsByClassName("flip-card is-open");
  Array.from(openCards).forEach((el) => {
    const card = el as HTMLElement;
    card.classList.remove("is-open");
    card.setAttribute("aria-pressed", "false");

    const back = getBack(card);
    if (back) clearBackOffset(back);
  });
}

function computeBackCenteringOffset(container: HTMLElement, card: HTMLElement, back: HTMLElement) {
  const c = container.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const backRect = back.getBoundingClientRect();

  // container center (relative to container top-left)
  const targetX = c.width / 2;
  const targetY = c.height / 2;

  // card center relative to container
  const cardCenterX = cardRect.left - c.left + cardRect.width / 2;
  const cardCenterY = cardRect.top - c.top + cardRect.height / 2;

  // desired back top-left so that back is centered in container
  const desiredBackTopLeftX = targetX - backRect.width / 2;
  const desiredBackTopLeftY = targetY - backRect.height / 2;

  // current back top-left (when top:50% left:50% and no transform) is at the card center
  const currentBackTopLeftX = cardCenterX;
  const currentBackTopLeftY = cardCenterY;

  const dx = desiredBackTopLeftX - currentBackTopLeftX;
  const dy = desiredBackTopLeftY - currentBackTopLeftY;

  return { dx, dy };
}

function openCardMobile(container: HTMLElement, card: HTMLElement, back: HTMLElement) {
  const { dx, dy } = computeBackCenteringOffset(container, card, back);

  // set back initial size to the card size to avoid overflow while moving
  back.style.setProperty("--back-width", `${card.offsetWidth}px`);
  back.style.setProperty("--back-height", `${card.offsetHeight}px`);

  // open and position
  card.classList.add("is-open");
  card.setAttribute("aria-pressed", "true");
  setBackOffset(back, dx, dy);

  // after layout, expand back to its intended final size (CSS var)
  requestAnimationFrame(() => {
    back.style.setProperty("--back-width", "var(--circle-element-back-diameter)");
    back.style.setProperty("--back-height", "var(--circle-element-back-diameter)");
  });
}

function closeCardMobile(card: HTMLElement, back: HTMLElement) {
  card.classList.remove("is-open");
  card.setAttribute("aria-pressed", "false");
  clearBackOffset(back);
}

export function toggleCardMobile(card: HTMLElement) {
  const container = getCircleContainer();
  const back = getBack(card);
  if (!container || !back) return;

  const isOpen = card.getAttribute("aria-pressed") === "true";

  if (!isOpen) {
    closeAllOpenCards();
    openCardMobile(container, card, back);
  } else {
    closeCardMobile(card, back);
  }
}

export function requestReflow() {
  if (!isSmallScreen()) return;

  const container = getCircleContainer();
  const card = document.querySelector<HTMLElement>(".flip-card.is-open");
  const back = card ? getBack(card) : null;
  if (!container || !card || !back) return;

  const { dx, dy } = computeBackCenteringOffset(container, card, back);
  setBackOffset(back, dx, dy);
}

function debugCross(x: string, y: string, color: string) {
  const container = getCircleContainer();
  if (!container) return;
  container.insertAdjacentHTML(
    "beforeend",
    '<div style="position:absolute; left:' + x + '; top:0; width:2px; height:100%; background-color:' + color + ';"></div>'
  );
  container.insertAdjacentHTML(
    "beforeend",
    '<div style="position:absolute; left:0; top:' + y + '; height:2px; width:100%; background-color:' + color + ';"></div>'
  );
}