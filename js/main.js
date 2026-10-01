import { initLoader } from "./loader.js";
import { initNav } from "./nav.js";
import { initProgress } from "./core/progress.js";
import { initSplitText } from "./effects/split-text.js";
import { initReveal } from "./effects/reveal.js";
import { initCounters } from "./effects/counters.js";
import { initMarquee } from "./effects/marquee.js";
import { initHorizontalScroll } from "./effects/horizontal-scroll.js";
import { initWordHighlight } from "./effects/word-highlight.js";
import { initHallOfFame } from "./effects/hall-of-fame.js";
import { initToast } from "./effects/toast.js";
import { initBurst } from "./effects/burst.js";

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

initSplitText();
initMarquee();

initLoader(() => {
  initHorizontalScroll();
  initWordHighlight();
  initHallOfFame();
  initBurst();
  initToast();
  initProgress();
  initReveal();
  initCounters();
  initNav();
});
