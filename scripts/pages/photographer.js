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
      const imgPP = document.createElement("img");
      imgPP.classList.add("photographer_page_PP");

      // Remplit les éléments avec les données du photographe
      pForCityCountry.textContent = `${photographers.city}, ${photographers.country}`;
      pForTagLine.textContent = `${photographers.tagline}`;
      h2ForName.textContent = photographers.name;
      imgPP.setAttribute("src", picture); // Attribution de la source de l'image
      imgPP.setAttribute("alt", `photo de ${photographers.name}`); // Attribution du alt de l'image
      imgPP.setAttribute("aria-label", `${photographers.name}'s portrait`); // Utilisation de aria-label pour décrire l'image

      // Insère les éléments dans le DOM
      headerMain.insertBefore(divForName, headerMain.firstChild);
      headerMain.appendChild(imgPP);
      divForName.appendChild(h2ForName);
      divForName.appendChild(pForCityCountry);
      divForName.appendChild(pForTagLine);
    }
  });
  media.forEach((media) => {
    if (media.photographerId === parseInt(photographerId)) {
      console.log(media);
      const sectionPhoto = document.getElementById("photo");

      // Vérifie s'il y a une image
      if (media.image) {
        const divimage = document.createElement("div");
        const imgPhoto = document.createElement("img");
        const imgTitle = document.createElement("h3");
        const likeimg = document.createElement("p");
        const coeur = document.createElement("i");
        imgPhoto.setAttribute(
          "src",
          `../../assets/photographers/photo/${media.image}`
        );
        imgPhoto.setAttribute("alt", `photo de ${media.title}`); // Attribution du alt de l'image
        imgPhoto.setAttribute("aria-label", `${media.title}'s portrait`); // Utilisation de aria-label pour décrire l'image
        imgTitle.textContent = media.title;
        likeimg.textContent = media.likes;
        coeur.classList.add("fa-solid", "fa-heart", "coeur");
        divimage.classList.add("container-image");
        imgPhoto.classList.add("photographer_page_photo");
        imgTitle.classList.add("title-img");
        likeimg.classList.add("likes");
        divimage.appendChild(imgPhoto);
        sectionPhoto.appendChild(divimage);
        divimage.appendChild(imgTitle);
        divimage.appendChild(likeimg);
        divimage.appendChild(coeur);
      }

      // Vérifie s'il y a une vidéo
      if (media.video) {
        const divvideo = document.createElement("div");
        const video = document.createElement("video");
        const videoTitle = document.createElement("h3");
        const likeimg = document.createElement("p");
        const coeur = document.createElement("i");
        video.setAttribute(
          "src",
          `../../assets/photographers/photo/${media.video}`
        );
        video.setAttribute("controls", "controls"); // Ajoute des contrôles de lecture à la vidéo
        video.setAttribute("alt", `photo de ${media.title}`); // Attribution du alt de l'image
        video.setAttribute("aria-label", `${media.title}'s portrait`); // Utilisation de aria-label pour décrire l'image
        likeimg.textContent = media.likes;
        videoTitle.textContent = media.title;
        videoTitle.classList.add("title-img");
        divvideo.classList.add("container-video");
        video.classList.add("photographer_page_video");
        likeimg.classList.add("likes");
        coeur.classList.add("fa-solid", "fa-heart", "coeur");
        divvideo.appendChild(video);
        sectionPhoto.appendChild(divvideo);
        divvideo.appendChild(videoTitle);
        divvideo.appendChild(likeimg);
        divvideo.appendChild(coeur);
      }
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
