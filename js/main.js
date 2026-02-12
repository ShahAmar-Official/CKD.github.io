const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.1 });

revealItems.forEach((el) => observer.observe(el));

const counters = document.querySelectorAll("[data-count]");
const countObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute("data-count"), 10);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = target;
        } else {
          el.textContent = current;
          requestAnimationFrame(tick);
        }
      };
      tick();
      obs.unobserve(el);
    }
  });
}, { threshold: 0.4 });

counters.forEach((el) => countObserver.observe(el));