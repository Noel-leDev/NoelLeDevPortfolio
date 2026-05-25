/* ============================================================
   app.js — Portfolio Noël Beaugare
   ============================================================ */

// ── Navigation active link on scroll ────────────────────────
const navLinks = document.querySelectorAll(".navlist");
const sections = document.querySelectorAll("section[id]");

function setActiveLink() {
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", setActiveLink);

// ── Smooth scroll on nav click ───────────────────────────────
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: "smooth" });

    // Close mobile menu if open
    const nav = document.querySelector(".navbar");
    const ham = document.getElementById("hamburger");
    nav.classList.remove("open");
    ham.classList.remove("open");
  });
});

// ── Hamburger menu toggle ────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navbar.classList.toggle("open");
});

// ── Header shadow on scroll ──────────────────────────────────
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.style.boxShadow =
    window.scrollY > 20 ? "0 4px 30px rgba(0,0,0,0.5)" : "none";
});

// ── Skill bars animation on scroll ──────────────────────────
const skillFills = document.querySelectorAll(".skill-fill");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = el.dataset.w + "%";
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.3 },
);

skillFills.forEach((fill) => observer.observe(fill));

// ── Contact form submit ──────────────────────────────────────
const form = document.getElementById("formid");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type='submit']");
    btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
    btn.style.background = "#22c55e";
    btn.style.borderColor = "#22c55e";
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
      btn.style.background = "";
      btn.style.borderColor = "";
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}

// ── Fade-in on scroll (sections) ────────────────────────────
const fadeEls = document.querySelectorAll(
  ".project-card, .skills-card, .info-card",
);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${i * 0.08}s`;
        entry.target.classList.add("fade-in");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

fadeEls.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  fadeObserver.observe(el);
});

// Helper: add fade-in class
document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>
    .fade-in { opacity: 1 !important; transform: translateY(0) !important; }
  </style>
`,
);
