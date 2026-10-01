function unit(text, index) {
  const mask = document.createElement("span");
  mask.className = "split__mask";
  mask.setAttribute("aria-hidden", "true");

  const inner = document.createElement("span");
  inner.className = "split__unit";
  inner.style.setProperty("--i", index);
  inner.textContent = text;

  mask.appendChild(inner);
  return mask;
}

export function initSplitText() {
  document.querySelectorAll("[data-split]").forEach((el) => {
    const text = el.textContent.trim();
    const byChars = el.dataset.split === "chars";
    el.setAttribute("aria-label", text);
    el.textContent = "";

    let i = 0;
    text.split(" ").forEach((word, w) => {
      if (w > 0) el.appendChild(document.createTextNode(" "));
      if (byChars) {
        const wordWrap = document.createElement("span");
        wordWrap.className = "split__word";
        [...word].forEach((char) => wordWrap.appendChild(unit(char, i++)));
        el.appendChild(wordWrap);
      } else {
        el.appendChild(unit(word, i++));
      }
    });
  });
}
