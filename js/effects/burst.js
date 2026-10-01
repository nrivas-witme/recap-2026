import { track, clamp } from "../core/progress.js";

const easeOutBack = (t) => {
  const c = 1.5;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};

export function initBurst() {
  const burst = document.getElementById("burst");
  if (!burst) return;

  const photos = [...burst.querySelectorAll(".burst__photo")];
  photos.forEach((photo, i) => photo.style.setProperty("--i", i));

  track(burst, "pin", (p) => {
    burst.style.setProperty("--title", clamp((p - 0.2) / 0.25).toFixed(3));
    burst.style.setProperty("--flash", clamp(1 - Math.abs(p - 0.12) / 0.08).toFixed(3));

    const drift = clamp((p - 0.6) / 0.4);
    photos.forEach((photo, i) => {
      const e = easeOutBack(clamp((p - 0.08 - i * 0.025) / 0.35));
      photo.style.setProperty("--e", e.toFixed(4));
      photo.style.setProperty("--t", (e + drift * 0.18).toFixed(4));
    });
  });
}
