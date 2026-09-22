document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  const slides = [...gallery.querySelectorAll("[data-slide]")];
  const thumbs = [...gallery.querySelectorAll("[data-thumb]")];
  const caption = gallery.querySelector("[data-caption]");
  const counter = gallery.querySelector("[data-counter]");
  const prev = gallery.querySelector("[data-prev]");
  const next = gallery.querySelector("[data-next]");
  let index = 0;

  const show = (i) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, n) => slide.classList.toggle("is-active", n === index));
    thumbs.forEach((thumb, n) => thumb.classList.toggle("is-active", n === index));
    if (caption) caption.textContent = slides[index].dataset.alt || "";
    if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
  };

  prev?.addEventListener("click", () => show(index - 1));
  next?.addEventListener("click", () => show(index + 1));
  thumbs.forEach((thumb, n) => thumb.addEventListener("click", () => show(n)));

  show(0);
});
