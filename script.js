document.documentElement.classList.add("js");
const typedEl = document.getElementById("typed");
const lines = [
  "FastAPI • Flutter • Node.js • React",
  "LLM integrations with structured JSON + guardrails",
  "Cybersecurity-minded, product-focused engineering"
];

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
      setTimeout(tick, 1100);
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

  const speed = deleting ? 28 : 22;
  setTimeout(tick, speed);
}
tick();

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
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) e.target.classList.add("show");
}, { threshold: 0.12 });

reveals.forEach((el) => io.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();