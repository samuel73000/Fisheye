// Fonction asynchrone pour récupérer les données des photographes depuis un fichier JSON
async function getPhotographers() {
  try {
    // Effectue une requête fetch pour récupérer les données des photographes
    const response = await fetch("../../data/photographers.json");

    // Vérifie si la réponse est OK (statut 200)
    if (!response.ok) {
      throw new Error("Erreur HTTP " + response.status);
    }

    // Convertit la réponse en JSON et retourne un objet contenant les photographes
    const data = await response.json();
    return {
      photographers: data.photographers,
    };
  } catch (error) {
    // Attrape les erreurs et les affiche dans la console
    console.error(
      "Il y a eu un problème lors de la récupération du fichier JSON :",
      error
    );
  }
}

// Fonction asynchrone pour afficher les données des photographes dans le DOM
async function displayData(photographers) {
    // Sélectionne la section où afficher les photographes dans le DOM
    const photographersSection = document.querySelector(".photographer_section");
  
    // Boucle à travers les photographes
    photographers.forEach((photographer) => {
      // Créer un élément <a> pour chaque photographe
      const aForPagePhotographer = document.createElement("a");
      aForPagePhotographer.href = `../../photographer.html?id=${photographer.id}`; // Lien différent pour chaque photographe  
      // Utilise un modèle de photographe pour obtenir le DOM de la carte utilisateur
      const photographerModel = photographerTemplate(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
  
      // Attacher la carte utilisateur à l'élément <a>
      aForPagePhotographer.appendChild(userCardDOM);
  
      // Ajouter l'élément <a> à la section des photographes dans le DOM
      photographersSection.appendChild(aForPagePhotographer);
    });
  }

// Fonction d'initialisation de l'application
async function init() {
  // Récupère les données des photographes
  const { photographers } = await getPhotographers();

  // Affiche les données des photographes dans le DOM
  displayData(photographers);
}

// Appelle la fonction d'initialisation pour démarrer l'application
init();
