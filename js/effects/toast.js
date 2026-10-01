import { track, clamp } from "../core/progress.js";

export function initToast() {
  const toast = document.getElementById("toast");
  if (!toast) return;

  track(toast, "pin", (p) => {
    const g = clamp((p - 0.45) / 0.25);
    toast.style.setProperty("--g", g.toFixed(4));
    toast.classList.toggle("is-clinked", g >= 1);
    toast.classList.toggle("is-cheers", p > 0.75);
  });
}
