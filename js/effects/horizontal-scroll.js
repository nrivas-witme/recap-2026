import { refreshProgress } from "../core/progress.js";

export function initHorizontalScroll() {
  document.querySelectorAll("[data-h-scroll]").forEach((wrap) => {
    const track = wrap.querySelector(".h-scroll__track");
    if (!track) return;
    const mobile = window.matchMedia("(max-width: 767px)");

    function size() {
      if (mobile.matches) {
        wrap.style.removeProperty("--h-dist");
        wrap.style.height = "auto";
        refreshProgress();
        return;
      }

      const dist = Math.max(0, track.scrollWidth - window.innerWidth);
      wrap.style.setProperty("--h-dist", `${dist}px`);
      wrap.style.height = `${dist + window.innerHeight}px`;
      refreshProgress();
    }

    size();
    window.addEventListener("resize", size);
    window.addEventListener("load", size);
    track.querySelectorAll("img").forEach((img) => img.addEventListener("load", size));
  });
}
