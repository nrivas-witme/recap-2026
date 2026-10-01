import { track, clamp } from "../core/progress.js";

const CONFETTI_COLORS = ["#e4c88a", "#f3e8d4", "#b8945a", "#8e1630", "#ffffff"];
const CONFETTI_COUNT = 48;
const PINNED_QUERY = "(min-width: 1024px) and (min-height: 700px)";

function buildConfetti(container) {
  for (let i = 0; i < CONFETTI_COUNT; i++) {
    const piece = document.createElement("span");
    piece.style.setProperty("--x", `${Math.random() * 100}%`);
    piece.style.setProperty("--c", CONFETTI_COLORS[i % CONFETTI_COLORS.length]);
    piece.style.setProperty("--d", `${2.4 + Math.random() * 2}s`);
    piece.style.setProperty("--delay", `${Math.random() * 0.8}s`);
    piece.style.setProperty("--spin", `${Math.random() > 0.5 ? 1 : -1}`);
    container.appendChild(piece);
  }
}

export function initHallOfFame() {
  const stage = document.getElementById("hof-stage");
  if (!stage) return;

  const confetti = stage.querySelector(".hof-stage__confetti");
  if (confetti) buildConfetti(confetti);

  const pinned = window.matchMedia(PINNED_QUERY).matches;

  track(stage, pinned ? "pin" : "view", (p) => {
    const open = pinned ? clamp(p / 0.5) : clamp((p - 0.1) / 0.4);
    stage.style.setProperty("--open", open.toFixed(4));
    if (open >= 1) stage.classList.add("is-revealed");
  });
}
