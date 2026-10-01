const items = new Map();
let ticking = false;

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

function measure(el, mode, vh) {
  const rect = el.getBoundingClientRect();
  if (mode === "pin") {
    const range = rect.height - vh;
    if (range > 0) return clamp(-rect.top / range);
  }
  return clamp((vh - rect.top) / (vh + rect.height));
}

function update() {
  const vh = window.innerHeight;
  const root = document.documentElement;
  const max = root.scrollHeight - vh;
  root.style.setProperty("--page-p", max > 0 ? (window.scrollY / max).toFixed(4) : "0");

  items.forEach((item, el) => {
    const p = measure(el, item.mode, vh);
    if (p === item.p) return;
    item.p = p;
    el.style.setProperty("--p", p.toFixed(4));
    item.callbacks.forEach((cb) => cb(p));
  });

  ticking = false;
}

function requestUpdate() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(update);
}

export function track(el, mode = "view", callback) {
  if (!items.has(el)) items.set(el, { mode, p: -1, callbacks: [] });
  if (callback) items.get(el).callbacks.push(callback);
}

export function refreshProgress() {
  items.forEach((item) => (item.p = -1));
  requestUpdate();
}

export function initProgress() {
  document.querySelectorAll("[data-progress]").forEach((el) => {
    track(el, el.dataset.progress || "view");
  });

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", refreshProgress);
  window.addEventListener("load", refreshProgress);
  update();
}
