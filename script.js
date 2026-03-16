document.documentElement.classList.add("js");

const typedEl = document.getElementById("typed");
const lines = [
  "I enjoy projects that start with a real problem.",
  "I care about clear systems, good UX, and practical AI.",
  "I like software that earns trust by being simple and useful."
];

if (typedEl) {
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = lines[lineIndex];

    if (!deleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1200);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
      }
    }

    setTimeout(tick, deleting ? 26 : 20);
  }

  tick();
}

const copyBtn = document.getElementById("copyEmail");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      const old = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = old), 1000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
}

const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add("show");
    }
  },
  { threshold: 0.12 }
);

reveals.forEach((el) => io.observe(el));

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
