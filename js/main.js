document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) {
        nav.querySelectorAll(".has-sub.is-open").forEach((item) => {
          item.classList.remove("is-open");
          item.querySelector(".sub-toggle")?.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  document.querySelectorAll(".sub-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".has-sub");
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      document.querySelectorAll(".has-sub.is-open").forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".sub-toggle")?.setAttribute("aria-expanded", "false");
        }
      });
    });
  });

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
