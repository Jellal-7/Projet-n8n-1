// ============================================
// COLLEZ ICI VOS VRAIES URLs DE FORMULAIRES N8N
// ============================================
const URLS = {
  parcours: "https://persia-esgi.app.n8n.cloud/form/d161a006-b268-4576-bea1-19197cbae31c",
  fiche:    "https://persia-esgi.app.n8n.cloud/form/d2f47747-6ebb-4f1b-986b-73eeb96e2470"
};

// URL courante sélectionnée
let urlCourante = "";

// Ouvre la modal de confirmation
function ouvrirFormulaire(type) {
  urlCourante = URLS[type];
  document.getElementById("modal").classList.add("active");
}

// Redirige vers le formulaire N8N
function confirmerRedirection() {
  if (urlCourante) {
    window.open(urlCourante, "_blank");
    fermerModal();
  }
}

// Ferme la modal
function fermerModal(event) {
  if (!event || event.target === document.getElementById("modal")) {
    document.getElementById("modal").classList.remove("active");
    urlCourante = "";
  }
}

// Fermeture avec Échap
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fermerModal();
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(13, 17, 23, 0.98)";
  } else {
    navbar.style.background = "rgba(13, 17, 23, 0.85)";
  }
});