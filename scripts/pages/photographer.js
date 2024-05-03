// Définition d'une fonction asynchrone pour récupérer les données des photographes depuis un fichier JSON
async function getPhotographers() {
  try {
    // Effectue une requête fetch pour récupérer les données des photographes depuis le fichier JSON
    const response = await fetch("../../data/photographers.json");

    // Vérifie si la réponse est OK (statut 200)
    if (!response.ok) {
      throw new Error("Erreur HTTP " + response.status); // Si la réponse n'est pas OK, une erreur est levée
    }

    // Convertit la réponse en JSON et retourne un objet contenant les photographes et les médias
    const data = await response.json(); // Conversion de la réponse en format JSON
    return {
      photographers: data.photographers, // Retourne les données des photographes
      media: data.media, // Retourne les données des médias associés aux photographes
    };
  } catch (error) {
    // Attrape les erreurs et les affiche dans la console en cas de problème lors de la récupération des données
    console.error(
      "Il y a eu un problème lors de la récupération du fichier JSON :", // Affichage de l'erreur dans la console
      error
    );
  }
}

// Fonction asynchrone pour afficher les données d'un photographe dans le DOM
async function displayData(photographers, media) {
  // Récupère l'ID du photographe depuis l'URL
  const urlParams = new URLSearchParams(window.location.search); // Obtient les paramètres de l'URL
  const photographerId = urlParams.get("id"); // Récupère l'ID du photographe depuis les paramètres de l'URL

  // Sélectionne l'élément du DOM où afficher les données du photographe
  const headerMain = document.querySelector(".photograph-header");

  // Boucle à travers les photographes
  photographers.forEach((photographer) => {
    // Vérifie si l'ID du photographe correspond à l'ID spécifié dans le lien
    if (photographer.id === parseInt(photographerId)) {
      // Vérification de correspondance d'ID
      const picture = `../../assets/photographers/PhotographersIDPhotos/${photographer.portrait}`;
      // Chemin vers l'image du photographe

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
      pForCityCountry.textContent = `${photographer.city}, ${photographer.country}`; // Ville et pays du photographe
      pForTagLine.textContent = `${photographer.tagline}`; // Tagline du photographe
      h2ForName.textContent = photographer.name; // Nom du photographe
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
      // Vérification de correspondance d'ID
      const sectionPhoto = document.getElementById("photo");

      // Vérifie s'il s'agit d'une image
      if (mediaItem.image) {
        // Si le média est une image
        const divImage = document.createElement("div");
        const imgPhoto = document.createElement("img");
        const imgTitle = document.createElement("h3");
        const likeCount = document.createElement("p");
        const heartIcon = document.createElement("i");

        imgPhoto.setAttribute(
          "src",
          `../../assets/photographers/photo/${mediaItem.image}`
        ); // Chemin vers l'image
        imgPhoto.setAttribute("alt", `photo de ${mediaItem.title}`); // Attribution du alt de l'image
        imgPhoto.setAttribute("aria-label", `${mediaItem.title}'s portrait`); // Utilisation de aria-label pour décrire l'image
        imgTitle.textContent = mediaItem.title; // Titre de l'image
        likeCount.textContent = mediaItem.likes; // Nombre de likes
        divImage.setAttribute("data-photo-id", mediaItem.id); // Attribution de l'ID du média au conteneur pour le trie
        divImage.setAttribute("data-date", mediaItem.date); // pour le trie
        heartIcon.classList.add("fa-solid", "fa-heart", "coeur"); // Ajout des classes pour l'icône "cœur"
        divImage.classList.add("container-image-video"); // Ajout de la classe pour le conteneur d'image
        imgPhoto.classList.add("photographer_page_photo_video"); // Ajout de la classe pour l'image
        imgTitle.classList.add("title-img"); // Ajout de la classe pour le titre de l'image
        likeCount.classList.add("likes"); // Ajout de la classe pour le nombre de likes

        // Ajoute les éléments au DOM
        divImage.appendChild(imgPhoto);
        sectionPhoto.appendChild(divImage);
        divImage.appendChild(imgTitle);
        divImage.appendChild(likeCount);
        divImage.appendChild(heartIcon);
      }

      // Vérifie s'il s'agit d'une vidéo
      if (mediaItem.video) {
        // Si le média est une vidéo
        const divVideo = document.createElement("div");
        const video = document.createElement("video");
        const videoTitle = document.createElement("h3");
        const likeCount = document.createElement("p");
        const heartIcon = document.createElement("i");

        video.setAttribute(
          "src",
          `../../assets/photographers/photo/${mediaItem.video}`
        ); // Chemin vers la vidéo
        video.setAttribute("controls", "controls"); // Ajoute des contrôles de lecture à la vidéo
        video.setAttribute("alt", `photo de ${mediaItem.title}`); // Attribution du alt de l'image
        video.setAttribute("aria-label", `${mediaItem.title}'s portrait`); // Utilisation de aria-label pour décrire l'image
        likeCount.textContent = mediaItem.likes; // Nombre de likes
        videoTitle.textContent = mediaItem.title; // Titre de la vidéo
        divVideo.setAttribute("data-photo-id", mediaItem.id); // Attribution de l'ID du média au conteneur
        divVideo.setAttribute("data-date", mediaItem.date);
        videoTitle.classList.add("title-img"); // Ajout de la classe pour le titre de la vidéo
        divVideo.classList.add("container-image-video"); // Ajout de la classe pour le conteneur de vidéo
        video.classList.add("photographer_page_photo_video"); // Ajout de la classe pour la vidéo
        likeCount.classList.add("likes"); // Ajout de la classe pour le nombre de likes
        heartIcon.classList.add("fa-solid", "fa-heart", "coeur"); // Ajout des classes pour l'icône "cœur"

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
  const videoImageContainersIMG = document.querySelectorAll(
    ".container-image-video img"
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
  videoImageContainersIMG.forEach((container, index) => {
    container.addEventListener("click", () => {
      currentIndex = index;
      highlightCurrent();
      // Ajoute les boutons de fermeture et de navigation à l'élément actuel
      container.parentNode.appendChild(Close);
      container.parentNode.appendChild(flecheGauche);
      container.parentNode.appendChild(flecheDroite);
    });
  });

  // Gestionnaire de clic pour le bouton de fermeture
  Close.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche la propagation du clic pour éviter de fermer la Lightbox lors du clic sur le bouton de fermeture
    setTimeout(() => {
      containersArray[currentIndex].removeChild(Close);
      containersArray[currentIndex].removeChild(flecheGauche);
      containersArray[currentIndex].removeChild(flecheDroite);
      containersArray[currentIndex].classList.remove("lightBox-container"); // Cache la Lightbox
    }, 0);
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

// Fonction de tri
async function trier() {
  // Sélectionne les éléments DOM nécessaires
  const containerTrierSelect = document.querySelectorAll(
    ".container-trier .select-trier"
  );

  const flecheTrier = document.querySelector(".fleche-trier");
  let activeOption = "popularité"; // Déclare une variable  pour stocker le critère de tri actuel
  // Fonction pour ouvrir/fermer les options de tri
  function toggleModal() {
    containerTrierSelect.forEach((element) => {
      // Vérifie si l'élément n'est pas actuellement sélectionné avant d'appliquer la classe off-trier
      if (!element.classList.contains("isactive")) {
        element.classList.toggle("off-trier");
      }
    });
    flecheTrier.classList.toggle("fa-chevron-up");
    flecheTrier.classList.toggle("fa-chevron-down");

    // Ajoute un appel à reorderTriOptions() lors de la fermeture de la modal
    if (!flecheTrier.classList.contains("fa-chevron-up")) {
      reorderTriOptions();
    }
  }

  // Associe les événements de clic à la flèche de tri pour ouvrir/fermer la modal
  flecheTrier.addEventListener("click", toggleModal);

  // Fonction pour réorganiser les options de tri en fonction de l'option active
  function reorderTriOptions() {
    const containerTrier = document.querySelector(".container-trier");
    if (activeOption) {
      containerTrierSelect.forEach((element) => {
        if (element.id === activeOption) {
          element.classList.add("isactive");
          containerTrier.insertBefore(element, containerTrier.firstChild);
        } else {
          element.classList.remove("isactive");
        }
      });
    }
  }

  // Appelle la fonction de réorganisation une seule fois au chargement de la page
  reorderTriOptions();

  // Associe les événements de clic aux éléments de tri
  containerTrierSelect.forEach((element) => {
    element.addEventListener("click", (event) => {
      const selectedOption = event.target.id;
      if (selectedOption !== activeOption) {
        // Met à jour le critère de tri actuel
        activeOption = selectedOption;
        reorderTriOptions();
      }
    });
  });

  // Fonctions de tri par popularité, date et titre (à implémenter)
  function sortByPopularity() {
    const sectionPhoto = document.getElementById("photo");
    const divs = Array.from(sectionPhoto.children);
    const sortedDivs = divs.sort((a, b) => {
      const likesA = parseInt(a.querySelector(".likes").textContent);
      const likesB = parseInt(b.querySelector(".likes").textContent);
      return likesB - likesA;
    });

    // Vider la sectionPhoto
    sectionPhoto.innerHTML = "";

    // Ajouter les divs triés dans le DOM dans le bon ordre
    sortedDivs.forEach((div) => {
      sectionPhoto.appendChild(div);
    });
  }

  function sortByDate() {
    const sectionPhoto = document.getElementById("photo");
    const divs = Array.from(sectionPhoto.children);
    const sortedDivs = divs.sort((a, b) => {
      const dateA = new Date(a.dataset.date);
      const dateB = new Date(b.dataset.date);
      return dateB.getTime() - dateA.getTime();
    });

    // Vider la sectionPhoto
    sectionPhoto.innerHTML = "";

    // Ajouter les divs triés dans le DOM dans le bon ordre
    sortedDivs.forEach((div) => {
      sectionPhoto.appendChild(div);
    });
  }

  function sortByTitle() {
    const sectionPhoto = document.getElementById("photo");
    const divs = Array.from(sectionPhoto.children);
    const sortedDivs = divs.sort((a, b) => {
      const titleA = a.querySelector(".title-img").textContent;
      const titleB = b.querySelector(".title-img").textContent;
      return titleA.localeCompare(titleB);
    });

    // Vider la sectionPhoto
    sectionPhoto.innerHTML = "";

    // Ajouter les divs triés dans le DOM dans le bon ordre
    sortedDivs.forEach((div) => {
      sectionPhoto.appendChild(div);
    });
  }
  // Associer les événements de clic aux éléments de tri
  containerTrierSelect[0].addEventListener("click", sortByPopularity);
  containerTrierSelect[1].addEventListener("click", sortByDate);
  containerTrierSelect[2].addEventListener("click", sortByTitle);
  // Appelle la fonction de tri par défaut au chargement de la page
  sortByPopularity();
}

// function qui gere les like et le prix
function Like(photographers, media) {
  const prix = document.querySelector(".p-prix");
  const likeTotal = document.querySelector(".p-like");
  const like = document.querySelectorAll(".likes");
  const coeur = document.querySelectorAll(".coeur");
  const urlParams = new URLSearchParams(window.location.search); // Obtient les paramètres de l'URL
  const photographerId = urlParams.get("id"); // Récupère l'ID du photographe depuis les paramètres de l'URL
  // Boucle à travers les photographes
  photographers.forEach((photographer) => {
    // Vérifie si l'ID du photographe correspond à l'ID spécifié dans le lien
    if (photographer.id === parseInt(photographerId)) {
      prix.textContent = photographer.price + "€ / jour";
    }
  });

  totalPage = 0;
  // Boucle à travers les médias pour calculer le total de likes pour la page
  media.forEach((media) => {
    if (media.photographerId === parseInt(photographerId)) {
      totalPage += media.likes;
      likeTotal.textContent = totalPage;
    }
  });

  // Initialisation des compteurs de likes pour chaque média à partir du contenu initial des éléments like
  let likesCounts = [];
  like.forEach((likeItem) => {
    likesCounts.push(parseInt(likeItem.textContent));
  });

  // Stocker les valeurs initiales des compteurs de likes dans un tableau séparé
  let initialLikesCounts = likesCounts.slice();

  // Mettre à jour le total en fonction des compteurs de likes
  const updateTotal = () => {
    totalPage = likesCounts.reduce((acc, cur) => acc + cur, 0);
    likeTotal.textContent = totalPage;
  };

  // Afficher le total initial
  updateTotal();

  // Ajouter un gestionnaire d'événements à chaque coeur
  coeur.forEach((coeur, index) => {
    coeur.addEventListener("click", () => {
      if (likesCounts[index] === initialLikesCounts[index]) {
        likesCounts[index] += 1; // Ajouter 1 au compteur de likes
        coeur.style.color = "green";
      } else {
        likesCounts[index] -= 1; // Soustraire 1 du compteur de likes
        coeur.style.color = "#901c1c";
      }
      like[index].textContent = likesCounts[index]; // Mettre à jour le nombre de likes individuel
      updateTotal(); // Mettre à jour le total après chaque clic sur un cœur
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

  // Initialise la fonction de tri pour les médias
  trier();

  Like(photographers, media);
}

// Appelle la fonction d'initialisation pour démarrer l'application
init();
