const DURATION = 1800;

function format(value, decimals) {
  return value.toLocaleString("es-ES", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function render(el, value) {
  const { prefix = "", suffix = "" } = el.dataset;
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  el.textContent = `${prefix}${format(value, decimals)}${suffix}`;
}

function animate(el) {
  const target = parseFloat(el.dataset.count);
  const start = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / DURATION, 1);
    const eased = 1 - Math.pow(2, -10 * t);
    render(el, t < 1 ? target * eased : target);
    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export function initCounters() {
  const els = document.querySelectorAll("[data-count]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  els.forEach((el) => {
    render(el, 0);
    observer.observe(el);
  });
}
