// Fonction pour afficher la modal de contact
function displayModal(event) {
  const modal = document.getElementById("contact_modal");
  const titreModal = document.querySelector(".titre-modal");
  const titre = document.querySelector(".photographer_page_Name").innerHTML;
  modal.style.display = "block"; // Affiche la modal en définissant son style sur "block"
  titreModal.innerHTML = "Contactez-moi <br>" + titre;

  // Ajoute un gestionnaire d'événements pour le clic en dehors de la modal
  window.addEventListener("click", outsideModalClick);

  // Arrête la propagation de l'événement de clic pour éviter la fermeture immédiate de la modal
  event.stopPropagation();
}
// Fonction pour gérer le clic en dehors de la modal
function outsideModalClick(event) {
  const modal = document.getElementById("contact_modal");
  const btnModal = document.getElementById("submit");

  // Vérifie si l'événement de clic s'est produit en dehors de la modal et du bouton de fermeture
  if (!modal.contains(event.target) && event.target !== btnModal) {
    closeModal(); // Ferme la modal
    // Supprime l'écouteur d'événements une fois la modal fermée
    window.removeEventListener("click", outsideModalClick);
  }
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
  const formData = document.querySelectorAll(".formData");
  const input = document.querySelectorAll(".formData input");


  // Supprime la classe "error-input" de tous les champs de saisie
  formData.forEach((formData) => {
    formData.setAttribute("data-error-visible", "false");
  });

  // Vérifie si le formulaire est valide
  const isFormValid =
  input[0].value.trim().length >= 2 &&
  input[1].value.trim().length >= 2 &&
    isValidEmail(input[2].value.trim()) &&
    input[3].value.trim().length >= 15;

  // Si le formulaire est valide, affiche les données dans la console et ferme la modal
  if (isFormValid) {
    console.log("Prenom : "+input[0].value.trim());
    console.log("Nom : "+input[1].value.trim());
    console.log("Email : "+input[2].value.trim());
    console.log("Message : "+input[3].value.trim());
    closeModal();
  } else {
    // Sinon, ajoute la classe "error-input" aux champs de saisie invalides
    if (input[0].value.trim().length < 2) {
      formData[0].setAttribute("data-error-visible", "true");
    }
    if (input[1].value.trim().length < 2) {
      formData[1].setAttribute("data-error-visible", "true");
    }
    if (!isValidEmail(input[2].value.trim())) {
      formData[2].setAttribute("data-error-visible", "true");
    }
    if (input[3].value.trim().length < 15) {
      formData[3].setAttribute("data-error-visible", "true");
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
