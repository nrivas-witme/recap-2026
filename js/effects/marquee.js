export function initMarquee() {
  document.querySelectorAll(".marquee").forEach((marquee) => {
    const trackEl = marquee.querySelector(".marquee__track");
    const group = marquee.querySelector(".marquee__group");
    if (!trackEl || !group) return;

    while (trackEl.scrollWidth < window.innerWidth * 3) {
      const clone = group.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      trackEl.appendChild(clone);
    }
  });
}
