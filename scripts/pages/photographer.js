// Définition d'une fonction asynchrone pour récupérer les données des photographes depuis un fichier JSON
async function getPhotographers() {
  try {
    // Effectue une requête fetch pour récupérer les données des photographes depuis le fichier JSON
    const response = await fetch("../../data/photographers.json");

    // Vérifie si la réponse est OK (statut 200)
    if (!response.ok) {
      throw new Error("Erreur HTTP " + response.status);
    }

    // Convertit la réponse en JSON et retourne un objet contenant les photographes et les médias
    const data = await response.json();
    return {
      photographers: data.photographers, // Contient les données des photographes
      media: data.media, // Contient les données des médias associés aux photographes
    };
  } catch (error) {
    // Attrape les erreurs et les affiche dans la console en cas de problème lors de la récupération des données
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
  photographers.forEach((photographer) => {
    // Vérifie si l'ID du photographe correspond à l'ID spécifié dans le lien
    if (photographer.id === parseInt(photographerId)) {
      const picture = `../../assets/photographers/PhotographersIDPhotos/${photographer.portrait}`;
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
      pForCityCountry.textContent = `${photographer.city}, ${photographer.country}`;
      pForTagLine.textContent = `${photographer.tagline}`;
      h2ForName.textContent = photographer.name;
      imgPP.setAttribute("src", picture); // Attribution de la source de l'image
      imgPP.setAttribute("alt", `photo de ${photographer.name}`); // Attribution du alt de l'image
      imgPP.setAttribute("aria-label", `${photographer.name}'s portrait`); // Utilisation de aria-label pour décrire l'image

      // Insère les éléments dans le DOM
      headerMain.insertBefore(divForName, headerMain.firstChild);
      headerMain.appendChild(imgPP);
      divForName.appendChild(h2ForName);
      divForName.appendChild(pForCityCountry);
      divForName.appendChild(pForTagLine);
    }
  });

  // Boucle à travers les médias
  media.forEach((mediaItem) => {
    // Vérifie si le média appartient au photographe spécifié
    if (mediaItem.photographerId === parseInt(photographerId)) {
      const sectionPhoto = document.getElementById("photo");

      // Vérifie s'il s'agit d'une image
      if (mediaItem.image) {
        const divImage = document.createElement("div");
        const imgPhoto = document.createElement("img");
        const imgTitle = document.createElement("h3");
        const likeCount = document.createElement("p");
        const heartIcon = document.createElement("i");

        imgPhoto.setAttribute(
          "src",
          `../../assets/photographers/photo/${mediaItem.image}`
        );
        imgPhoto.setAttribute("alt", `photo de ${mediaItem.title}`); // Attribution du alt de l'image
        imgPhoto.setAttribute("aria-label", `${mediaItem.title}'s portrait`); // Utilisation de aria-label pour décrire l'image
        imgTitle.textContent = mediaItem.title;
        likeCount.textContent = mediaItem.likes;
        heartIcon.classList.add("fa-solid", "fa-heart", "coeur");
        divImage.classList.add("container-image-video");
        imgPhoto.classList.add("photographer_page_photo_video");
        imgTitle.classList.add("title-img");
        likeCount.classList.add("likes");

        // Ajoute les éléments au DOM
        divImage.appendChild(imgPhoto);
        sectionPhoto.appendChild(divImage);
        divImage.appendChild(imgTitle);
        divImage.appendChild(likeCount);
        divImage.appendChild(heartIcon);
      }

      // Vérifie s'il s'agit d'une vidéo
      if (mediaItem.video) {
        const divVideo = document.createElement("div");
        const video = document.createElement("video");
        const videoTitle = document.createElement("h3");
        const likeCount = document.createElement("p");
        const heartIcon = document.createElement("i");

        video.setAttribute(
          "src",
          `../../assets/photographers/photo/${mediaItem.video}`
        );
        video.setAttribute("controls", "controls"); // Ajoute des contrôles de lecture à la vidéo
        video.setAttribute("alt", `photo de ${mediaItem.title}`); // Attribution du alt de l'image
        video.setAttribute("aria-label", `${mediaItem.title}'s portrait`); // Utilisation de aria-label pour décrire l'image
        likeCount.textContent = mediaItem.likes;
        videoTitle.textContent = mediaItem.title;
        videoTitle.classList.add("title-img");
        divVideo.classList.add("container-image-video");
        video.classList.add("photographer_page_photo_video");
        likeCount.classList.add("likes");
        heartIcon.classList.add("fa-solid", "fa-heart", "coeur");

        // Ajoute les éléments au DOM
        divVideo.appendChild(video);
        sectionPhoto.appendChild(divVideo);
        divVideo.appendChild(videoTitle);
        divVideo.appendChild(likeCount);
        divVideo.appendChild(heartIcon);
      }
    }
  });
}

// Fonction asynchrone pour initialiser la Lightbox
async function LightBox() {
  // Sélectionne tous les conteneurs d'images et vidéos
  const videoImageContainers = document.querySelectorAll(
    ".container-image-video"
  );

  // Crée les éléments DOM pour les boutons de fermeture et de navigation dans la Lightbox
  const Close = document.createElement("i");
  Close.classList.add("fa-solid", "fa-xmark", "crossClose");
  const flecheGauche = document.createElement("i");
  flecheGauche.classList.add("fa-solid", "fa-chevron-left", "flecheGauche");
  const flecheDroite = document.createElement("i");
  flecheDroite.classList.add("fa-solid", "fa-chevron-right", "flecheDroite");

  // Convertit la NodeList en tableau pour pouvoir utiliser forEach
  const containersArray = Array.from(videoImageContainers);

  let currentIndex = 0; // Index de l'image ou de la vidéo actuellement affichée dans la Lightbox

  // Fonction pour mettre en évidence l'élément actuellement affiché dans la Lightbox
  function highlightCurrent() {
    containersArray.forEach((container) => {
      container.classList.remove("lightBox-container");
    });
    containersArray[currentIndex].classList.add("lightBox-container");
  }

  // Écoute les événements de clic sur chaque conteneur d'image ou de vidéo
  videoImageContainers.forEach((container, index) => {
    container.addEventListener("click", () => {
      currentIndex = index;
      highlightCurrent();
      // Ajoute les boutons de fermeture et de navigation à l'élément actuel
      container.appendChild(Close);
      container.appendChild(flecheGauche);
      container.appendChild(flecheDroite);
    });
  });

  // Gestionnaire de clic pour le bouton de fermeture
  Close.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche la propagation du clic pour éviter de fermer la Lightbox lors du clic sur le bouton de fermeture
    containersArray[currentIndex].classList.remove("lightBox-container"); // Cache la Lightbox
  });

  // Gestionnaire de clic pour le bouton de navigation vers la gauche
  flecheGauche.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche la propagation du clic pour éviter de changer d'image ou de vidéo lors du clic sur le bouton de navigation
    // Décrémente l'index tout en assurant qu'il reste dans la plage valide
    currentIndex =
      (currentIndex - 1 + containersArray.length) % containersArray.length;
    highlightCurrent(); // Met en évidence l'élément actuellement affiché
    // Ajoute à nouveau les boutons de fermeture et de navigation à l'élément actuel
    containersArray[currentIndex].appendChild(Close);
    containersArray[currentIndex].appendChild(flecheGauche);
    containersArray[currentIndex].appendChild(flecheDroite);
  });

  // Gestionnaire de clic pour le bouton de navigation vers la droite
  flecheDroite.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche la propagation du clic pour éviter de changer d'image ou de vidéo lors du clic sur le bouton de navigation
    // Incrémente l'index tout en assurant qu'il reste dans la plage valide
    currentIndex = (currentIndex + 1) % containersArray.length;
    highlightCurrent(); // Met en évidence l'élément actuellement affiché
    // Ajoute à nouveau les boutons de fermeture et de navigation à l'élément actuel
    containersArray[currentIndex].appendChild(Close);
    containersArray[currentIndex].appendChild(flecheGauche);
    containersArray[currentIndex].appendChild(flecheDroite);
  });
}


// FUNCTION TRIER//////////////////////////
async function trier() {
  const containerTrierSelect = document.querySelectorAll(".container-trier .select-trier");
  const containerTrierBorder = document.querySelectorAll(".container-trier .border");
  const flecheTrier = document.querySelector(".fleche-trier");
  const containerPhoto = document.querySelectorAll(".container-image-video");
 
  

  containerTrierSelect.forEach((element, index ) => {
    element.addEventListener("click", () => {
      // Réorganiser les éléments de sélection pour placer celui sur lequel on a cliqué en premier
      const clickedText = element.textContent;
      const firstText = containerTrierSelect[0].textContent;
      containerTrierSelect[0].textContent = clickedText;
      element.textContent = firstText;

      // Maintenir la logique existante pour la gestion des classes CSS
      if (containerTrierSelect[1].classList.contains("off-trier")) {
        containerTrierSelect[1].classList.remove("off-trier");
        containerTrierSelect[2].classList.remove("off-trier");
        containerTrierBorder[0].classList.remove("off-trier");
        containerTrierBorder[1].classList.remove("off-trier");
        flecheTrier.classList.replace("fa-chevron-up", "fa-chevron-down");
      } else {
        containerTrierSelect[1].classList.add("off-trier");
        containerTrierSelect[2].classList.add("off-trier");
        containerTrierBorder[0].classList.add("off-trier");
        containerTrierBorder[1].classList.add("off-trier");
        flecheTrier.classList.replace("fa-chevron-down", "fa-chevron-up");
      }

      containerPhoto.forEach((containerPhoto) => {
      
        console.log(containerPhoto)
         if (clickedText === "Popularité") {
        


        } else if (clickedText === "Date") {
          // Logique de tri pour la date
          // ...
        } else if (clickedText === "Titre") {
          // Logique de tri pour le titre
          // ...
        }
      
      })
      
    });
  });
}



// Fonction d'initialisation de l'application
async function init() {
  // Récupère les données des photographes
  const { photographers, media } = await getPhotographers();

  // Affiche les données du photographe dans le DOM
  displayData(photographers, media);

  // Initialise la Lightbox pour les médias
  LightBox();
  trier();
}

// Appelle la fonction d'initialisation pour démarrer l'application
init();
