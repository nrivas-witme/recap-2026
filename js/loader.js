export function initLoader(onComplete) {
  const overlay = document.getElementById("loader");
  const counterEl = document.getElementById("loader-counter");
  if (!overlay || !counterEl) {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    onComplete?.();
    return;
  }

  const duration = 2200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * 99);
    counterEl.textContent = String(value).padStart(2, "0");

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counterEl.textContent = "99";
      finish();
    }
  }

  function finish() {
    overlay.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    window.setTimeout(() => {
      overlay.remove();
      onComplete?.();
    }, 900);
  }

  requestAnimationFrame(tick);
}
