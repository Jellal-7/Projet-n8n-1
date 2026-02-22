// ============================================
// URLS N8N — NE PAS MODIFIER
// ============================================
const URLS = {
  parcours: "https://persia-esgi.app.n8n.cloud/form/d161a006-b268-4576-bea1-19197cbae31c",
  fiche:    "https://persia-esgi.app.n8n.cloud/form/d2f47747-6ebb-4f1b-986b-73eeb96e2470"
};

let urlCourante = "";

// ============================================
// MODAL
// ============================================
const modalConfig = {
  parcours: {
    title: "Obtenir mon parcours personnalisé",
    desc: "Vous allez être redirigé vers le formulaire de création de votre parcours IT sur mesure.",
    icon: "fas fa-map-signs"
  },
  fiche: {
    title: "Obtenir une fiche de préparation",
    desc: "Vous allez être redirigé vers le formulaire de demande de fiche de préparation détaillée.",
    icon: "fas fa-file-alt"
  }
};

function ouvrirFormulaire(type) {
  urlCourante = URLS[type];
  const cfg = modalConfig[type];
  document.getElementById("modal-title").textContent = cfg.title;
  document.getElementById("modal-desc").textContent = cfg.desc;
  document.querySelector(".modal-icon i").className = cfg.icon;
  document.getElementById("modal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function confirmerRedirection() {
  if (urlCourante) {
    window.open(urlCourante, "_blank");
    fermerModal();
    showToast("Formulaire ouvert dans un nouvel onglet !");
  }
}

function fermerModal(event) {
  const modal = document.getElementById("modal");
  if (!event || event.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    urlCourante = "";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fermerModal();
});

// ============================================
// TOAST
// ============================================
function showToast(msg, duration = 3000) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-msg").textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), duration);
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById("scrollProgress").style.width = progress + "%";

  // Navbar scrolled state
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", scrollTop > 50);

  // Back to top
  const backToTop = document.getElementById("backToTop");
  backToTop.classList.toggle("visible", scrollTop > 400);

  // Active nav link
  updateActiveNavLink();
}, { passive: true });

// ============================================
// BACK TO TOP
// ============================================
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
  document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
});

// Fermer le menu sur clic d'un lien
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link && scrollY >= top && scrollY < top + height) {
      document.querySelectorAll(".nav-links a.nav-link").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}

// ============================================
// INTERSECTION OBSERVER — REVEAL
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ============================================
// COMPTEURS ANIMÉS
// ============================================
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const update = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current < target) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = "true";
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".counter").forEach(el => counterObserver.observe(el));

// ============================================
// TYPING EFFECT
// ============================================
const phrases = [
  "parcours de certifications IT",
  "chemin vers AWS Architect",
  "itinéraire SAP idéal",
  "programme ITIL adapté",
  "plan de certifications IA"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

// Création du curseur
const cursor = document.createElement("span");
cursor.className = "typing-cursor";
typingEl.parentNode.insertBefore(cursor, typingEl.nextSibling);

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingEl.textContent = current.substring(0, charIndex);

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

// Démarrer après un court délai
setTimeout(type, 1000);

// ============================================
// FILTRES CERTIFICATIONS
// ============================================
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    document.querySelectorAll(".domain-card").forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ============================================
// SLIDER TÉMOIGNAGES
// ============================================
const track = document.getElementById("testimonialsTrack");
const cards = document.querySelectorAll(".testimonial-card");
const dotsContainer = document.getElementById("tDots");
const prevBtn = document.getElementById("tPrev");
const nextBtn = document.getElementById("tNext");

let currentSlide = 0;
let autoSlideInterval;

// Calculer le nombre de slides visibles
function getSlidesVisible() {
  return window.innerWidth <= 768 ? 1 : 3;
}

function getTotalSlides() {
  return cards.length - getSlidesVisible() + 1;
}

// Forcer la largeur des cartes en JS pour éviter tout écart avec les % CSS
function updateCardWidths() {
  const wrapperWidth = track.parentElement.offsetWidth;
  const visible = getSlidesVisible();
  const gap = 24;
  const cardWidth = (wrapperWidth - (visible - 1) * gap) / visible;
  cards.forEach(card => {
    card.style.width = cardWidth + 'px';
  });
}

// Créer les dots
function buildDots() {
  dotsContainer.innerHTML = "";
  const total = getTotalSlides();
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.className = "t-dot" + (i === currentSlide ? " active" : "");
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function goToSlide(index) {
  const total = getTotalSlides();
  currentSlide = (index + total) % total;

  const visible = getSlidesVisible();
  const gap = 24;
  const wrapperWidth = track.parentElement.offsetWidth;
  const cardWidth = (wrapperWidth - (visible - 1) * gap) / visible;
  const offset = currentSlide * (cardWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;

  // Update dots
  document.querySelectorAll(".t-dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentSlide);
  });

  // Update active card
  cards.forEach((c, i) => {
    c.classList.toggle("active-card", i >= currentSlide && i < currentSlide + visible);
  });
}

prevBtn.addEventListener("click", () => {
  goToSlide(currentSlide - 1);
  resetAutoSlide();
});

nextBtn.addEventListener("click", () => {
  goToSlide(currentSlide + 1);
  resetAutoSlide();
});

function startAutoSlide() {
  autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Init slider
updateCardWidths();
buildDots();
goToSlide(0);
startAutoSlide();

window.addEventListener("resize", () => {
  updateCardWidths();
  buildDots();
  goToSlide(0);
});

// Touch/Swipe sur mobile
let touchStartX = 0;
track.addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

track.addEventListener("touchend", e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1);
    resetAutoSlide();
  }
}, { passive: true });

// ============================================
// FAQ ACCORDION
// ============================================
document.querySelectorAll(".faq-item").forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    // Fermer tous
    document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));

    // Ouvrir si était fermé
    if (!isOpen) item.classList.add("open");
  });
});

// ============================================
// RIPPLE EFFECT
// ============================================
document.querySelectorAll(".ripple").forEach(btn => {
  btn.addEventListener("click", function(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// ============================================
// CANVAS PARTICLES
// ============================================
(function initParticles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  let particles = [];
  const COUNT = 50;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.color = ["#4A90D9", "#764ba2", "#2ECC71"][Math.floor(Math.random() * 3)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function init() {
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = "#4A90D9";
          ctx.globalAlpha = (1 - dist / 120) * 0.08;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  resize();
  init();
  animate();

  window.addEventListener("resize", () => { resize(); init(); }, { passive: true });
})();
