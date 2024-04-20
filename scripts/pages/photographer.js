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
      media: data.media,
    };
  } catch (error) {
    // Attrape les erreurs et les affiche dans la console
    console.error(
      "Il y a eu un problème lors de la récupération du fichier JSON :",
      error
    );
  }
}

// Fonction asynchrone pour afficher les données d'un photographe dans le DOM
async function displayData(photographers, media) {
  // Récupère l'ID du photographe depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get("id");
  // Sélectionne l'élément du DOM où afficher les données du photographe
  const headerMain = document.querySelector(".photograph-header");
  // Boucle à travers les photographes
  console.log(media[29].photographerId);
  console.log(photographerId);
  photographers.forEach((photographers) => {
    // Vérifie si l'ID du photographe correspond à l'ID spécifié dans le lien
    if (photographers.id === parseInt(photographerId)) {
      const picture = `../../assets/photographers/PhotographersIDPhotos/${photographers.portrait}`;
      // Crée des éléments DOM pour afficher les données du photographe
      const divForName = document.createElement("div");
      const pForCityCountry = document.createElement("p");
      pForCityCountry.classList.add("photographer_page_country");
      const pForTagLine = document.createElement("p");
      pForTagLine.classList.add("photographer_page_tagline");
      const h2ForName = document.createElement("h2");
      h2ForName.classList.add("photographer_page_Name");
      const img = document.createElement("img");
      img.classList.add("photographer_page_PP");

      // Remplit les éléments avec les données du photographe
      pForCityCountry.textContent = `${photographers.city}, ${photographers.country}`;
      pForTagLine.textContent = `${photographers.tagline}`;
      h2ForName.textContent = photographers.name;
      img.setAttribute("src", picture); // Attribution de la source de l'image
      img.setAttribute("alt", `photo de ${photographers.name}`); // Attribution du alt de l'image
      img.setAttribute("aria-label", `${photographers.name}'s portrait`); // Utilisation de aria-label pour décrire l'image

      // Insère les éléments dans le DOM
      headerMain.insertBefore(divForName, headerMain.firstChild);
      headerMain.appendChild(img);
      divForName.appendChild(h2ForName);
      divForName.appendChild(pForCityCountry);
      divForName.appendChild(pForTagLine);
    }
  });
  media.forEach((media) => {
    if (media.photographerId === parseInt(photographerId)) {
      console.log(media);
      
    }
  });
}
// Fonction d'initialisation de l'application
async function init() {
  // Récupère les données des photographes
  const { photographers, media } = await getPhotographers();

  // Affiche les données du photographe dans le DOM
  displayData(photographers, media);
}

// Appelle la fonction d'initialisation pour démarrer l'application
init();
