const CHAPTERS = [
  { id: "hero", num: "00", title: "Intro" },
  { id: "chapter-01", num: "01", title: "Crecimiento" },
  { id: "chapter-02", num: "02", title: "Expansión" },
  { id: "chapter-03", num: "03", title: "Eventos" },
  { id: "chapter-04", num: "04", title: "Impacto" },
  { id: "chapter-05", num: "05", title: "Oportunidades" },
  { id: "chapter-06", num: "06", title: "Posicionamiento" },
  { id: "chapter-07", num: "07", title: "Reconocimiento" },
  { id: "chapter-08", num: "08", title: "Evolución" },
  { id: "chapter-09", num: "09", title: "Hall of Fame" },
  { id: "chapter-10", num: "10", title: "Momentos" },
  { id: "toast", num: "11", title: "Brindis" },
];

export function initNav() {
  const overlay = document.getElementById("nav-overlay");
  const menuBtn = document.querySelector(".site-header__menu");
  const logoBtn = document.querySelector(".site-header__logo");
  const chapterNum = document.querySelector(".site-header__chapter-num");
  const chapterTitle = document.querySelector(".site-header__chapter-title");

  if (menuBtn && overlay) {
    menuBtn.addEventListener("click", () => {
      overlay.classList.toggle("is-open");
      overlay.setAttribute(
        "aria-hidden",
        overlay.classList.contains("is-open") ? "false" : "true"
      );
    });

    overlay.querySelector(".nav-overlay__backdrop")?.addEventListener("click", () => {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
    });

    overlay.querySelectorAll(".nav-overlay__link").forEach((link) => {
      link.addEventListener("click", () => {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
      });
    });
  }

  logoBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean);

  function updateChapter() {
    const y = window.scrollY + window.innerHeight * 0.35;
    let active = CHAPTERS[0];

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = sections[i];
      if (el && el.offsetTop <= y) {
        active = CHAPTERS[i];
        break;
      }
    }

    if (chapterNum) chapterNum.textContent = active.num;
    if (chapterTitle) chapterTitle.textContent = active.title;
  }

  window.addEventListener("scroll", updateChapter, { passive: true });
  updateChapter();
}
