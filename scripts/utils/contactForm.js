// Fonction pour afficher la modal de contact
function displayModal() {
  const modal = document.getElementById("contact_modal");
  const titreModal = document.querySelector(".titre-modal");
  const titre = document.querySelector(".photographer_page_Name").innerHTML;
  modal.style.display = "block"; // Affiche la modal en définissant son style sur "block"
  titreModal.innerHTML = "Contactez-moi <br>" + titre;
}

// Fonction pour fermer la modal de contact
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none"; // Cache la modal en définissant son style sur "none"
}

// Gestionnaire d'événement pour le clic sur le bouton de soumission du formulaire dans la modal
const btnModal = document.getElementById("submit");
btnModal.addEventListener("click", (event) => {
  event.preventDefault(); // Empêche le comportement par défaut du bouton (soumission du formulaire)
  contact(); // Appelle la fonction contact pour valider le formulaire
});

// Fonction pour valider et soumettre le formulaire de contact
function contact() {
  // Récupère les données du formulaire
  const prenom = document.getElementById("Prenom");
  const nom = document.getElementById("Nom");
  const email = document.getElementById("Email");
  const message = document.getElementById("Message");
  const inputs = document.querySelectorAll("input");
  // Supprime la classe "error-input" de tous les champs de saisie
  inputs.forEach((input) => {
    input.classList.remove("error-input");
  });

  // Vérifie si le formulaire est valide
  const isFormValid =
    prenom.value.trim().length >= 2 &&
    nom.value.trim().length >= 2 &&
    isValidEmail(email.value.trim()) &&
    message.value.trim().length >= 15;

  // Si le formulaire est valide, affiche les données dans la console et ferme la modal
  if (isFormValid) {
    console.log(prenom.value.trim());
    console.log(nom.value.trim());
    console.log(email.value.trim());
    console.log(message.value.trim());
    closeModal();
  } else {
    // Sinon, ajoute la classe "error-input" aux champs de saisie invalides
    if (prenom.value.trim().length < 2) {
      prenom.classList.add("error-input");
    }
    if (nom.value.trim().length < 2) {
      nom.classList.add("error-input");
    }
    if (!isValidEmail(email.value.trim())) {
      email.classList.add("error-input");
    }
    if (message.value.trim().length < 15) {
      message.classList.add("error-input");
    }
  }
}

// Fonction pour valider une adresse email
function isValidEmail(email) {
  // Vérifie s'il y a une seule occurrence de "@" et au moins une occurrence de "."
  if (
    (email.match(/@/g) || []).length !== 1 ||
    (email.match(/\./g) || []).length < 1
  ) {
    return false;
  }
  // Vérifie si l'adresse email commence ou se termine par un "."
  if (email.startsWith(".") || email.endsWith(".")) {
    return false;
  }
  // Utilise une expression régulière pour valider l'adresse email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  return true; // Renvoie vrai si l'adresse email est valide
}
