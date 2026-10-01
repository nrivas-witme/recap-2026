import { track, clamp } from "../core/progress.js";

export function initWordHighlight() {
  document.querySelectorAll("[data-words]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = "";

    const spans = words.map((word, i) => {
      if (i > 0) el.appendChild(document.createTextNode(" "));
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = word;
      el.appendChild(span);
      return span;
    });

    const host = el.closest("[data-progress]") || el;
    const start = parseFloat(el.dataset.wordsStart || "0.2");
    const end = parseFloat(el.dataset.wordsEnd || "0.55");

    track(host, host.dataset.progress || "view", (p) => {
      const lit = Math.round(clamp((p - start) / (end - start)) * spans.length);
      spans.forEach((span, i) => span.classList.toggle("is-lit", i < lit));
    });
  });
}
