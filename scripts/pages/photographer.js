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
      // divForName.setAttribute("tabindex", 2);
      const pForCityCountry = document.createElement("p");
      pForCityCountry.classList.add("photographer_page_country");
      pForCityCountry.setAttribute("tabindex", 2);
      const pForTagLine = document.createElement("p");
      pForTagLine.classList.add("photographer_page_tagline");
      pForTagLine.setAttribute("tabindex", 2);
      const h2ForName = document.createElement("h1");
      h2ForName.classList.add("photographer_page_Name");
      h2ForName.setAttribute("tabindex", 2);
      const imgPP = document.createElement("img");
      imgPP.classList.add("photographer_page_PP");
      imgPP.setAttribute("tabindex", 5);

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
        const imgTitle = document.createElement("h2");
        const likeCount = document.createElement("p");
        const heartIcon = document.createElement("i");

        imgPhoto.setAttribute(
          "src",
          `../../assets/photographers/photo/${mediaItem.image}`
        ); // Chemin vers l'image
        imgPhoto.setAttribute("alt", `photo de ${mediaItem.title}`); // Attribution du alt de l'image
        imgTitle.textContent = mediaItem.title; // Titre de l'image
        likeCount.textContent = mediaItem.likes; // Nombre de likes
        divImage.setAttribute("data-photo-id", mediaItem.id); // Attribution de l'ID du média au conteneur pour le trie
        divImage.setAttribute("data-date", mediaItem.date); // pour le trie
        heartIcon.classList.add("fa-solid", "fa-heart", "coeur"); // Ajout des classes pour l'icône "cœur"
        heartIcon.setAttribute(
          "aria-label",
          `coeur pour liker ${mediaItem.title}`
        );
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
        const videoTitle = document.createElement("h2");
        const likeCount = document.createElement("p");
        const heartIcon = document.createElement("i");

        video.setAttribute(
          "src",
          `../../assets/photographers/photo/${mediaItem.video}`
        ); // Chemin vers la vidéo
        video.setAttribute("controls", "controls"); // Ajoute des contrôles de lecture à la vidéo
        video.setAttribute("alt", `photo de ${mediaItem.title}`); // Attribution du alt de l'image
        video.setAttribute("aria-label", `${mediaItem.title}`); // Utilisation de aria-label pour décrire l'image
        likeCount.textContent = mediaItem.likes; // Nombre de likes
        videoTitle.textContent = mediaItem.title; // Titre de la vidéo
        divVideo.setAttribute("data-photo-id", mediaItem.id); // Attribution de l'ID du média au conteneur
        divVideo.setAttribute("data-date", mediaItem.date);
        videoTitle.classList.add("title-img"); // Ajout de la classe pour le titre de la vidéo
        divVideo.classList.add("container-image-video"); // Ajout de la classe pour le conteneur de vidéo
        video.classList.add("photographer_page_photo_video"); // Ajout de la classe pour la vidéo
        likeCount.classList.add("likes"); // Ajout de la classe pour le nombre de likes
        heartIcon.classList.add("fa-solid", "fa-heart", "coeur"); // Ajout des classes pour l'icône "cœur"
        heartIcon.setAttribute(
          "aria-label",
          `coeur pour liker ${mediaItem.title}`
        );
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

// Fonction de tri
async function trier() {
  // Sélectionne les éléments DOM nécessaires
  const containerTrierSelect = document.querySelectorAll(
    ".container-trier .select-trier"
  );
  const containerTrier = document.querySelector(".container-trier");
  const flecheTrier = document.querySelector(".fleche-trier");

  let activeOption = "popularité"; // Déclare une variable  pour stocker le critère de tri actuel

  // Fonction pour ouvrir/fermer les options de tri
  function toggleModal(event) {
    // Vérifie si l'événement est déclenché par la touche Entrée (code 13) ou la barre d'espace (code 32)
    if (
      (event.type === "keydown" &&
        (event.key === "Enter" ||
          event.keyCode === 13 ||
          event.key === " " ||
          event.keyCode === 32)) ||
      event.type === "click"
    ) {
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
  }

  // Associe les événements de clic au container de trie pour ouvrir/fermer la modal
  containerTrier.addEventListener("click", toggleModal);

  // Associe l'événement keydown au container de trie pour ouvrir/fermer la modal
  containerTrier.addEventListener("keydown", toggleModal);

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

  // // Appelle la fonction de réorganisation une seule fois au chargement de la page
  reorderTriOptions();

  // Associe les événements de clic et de touche Entrée/Espace aux éléments de tri
  containerTrierSelect.forEach((element) => {
    element.addEventListener("click", handleTriSelection);
    element.addEventListener("keydown", handleTriSelection);
  });

  // Définit la fonction de gestion de la sélection d'option de tri
  function handleTriSelection(event) {
    // Si l'événement est déclenché par la touche Entrée (code 13) ou la barre d'espace (code 32)
    if (
      (event.type === "keydown" &&
        (event.key === "Enter" ||
          event.keyCode === 13 ||
          event.key === " " ||
          event.keyCode === 32)) ||
      event.type === "click"
    ) {
      const selectedOption = event.target.id;
      if (selectedOption !== activeOption) {
        // Met à jour le critère de tri actuel
        activeOption = selectedOption;
        reorderTriOptions();
      }
    }
  }

  // Fonctions de tri par popularité
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

    // on mais les tab index au img et le btn des like !
    for (let i = 0; i < sortedDivs.length; i++) {
      // Définir l'attribut tabindex pour le premier enfant
      sortedDivs[i].children[0].setAttribute("tabindex", 7);
      // Définir l'attribut tabindex pour le quatrième enfant
      sortedDivs[i].children[3].setAttribute("tabindex", 7);
    }
    // Mettre à jour LightBox après le tri
    LightBox();
  }

  // Appeler la fonction de tri par popularité au chargement de la page
  sortByPopularity();

  // Associer les événements de clic et de clavier aux éléments de tri
  containerTrierSelect.forEach((element) => {
    element.addEventListener("click", sortByPopularity);
    element.addEventListener("keydown", (event) => {
      // Vérifier si la touche Entrée ou la barre d'espace est pressée
      if (
        event.key === "Enter" ||
        event.keyCode === 13 ||
        event.key === " " ||
        event.keyCode === 32
      ) {
        sortByPopularity();
      }
    });
  });

  // Fonctions de tri par date
  function sortByDate(event) {
    // on mais des condition pour que le addeventlistner ce declence avec entrer
    if (
      (event.type === "keydown" &&
        (event.key === "Enter" ||
          event.keyCode === 13 ||
          event.key === " " ||
          event.keyCode === 32)) ||
      event.type === "click"
    ) {
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
      // on mais les tab index au img et le btn des like !
      for (let i = 0; i < sortedDivs.length; i++) {
        // Définir l'attribut tabindex pour le premier enfant
        sortedDivs[i].children[0].setAttribute("tabindex", 7);
        // Définir l'attribut tabindex pour le quatrième enfant
        sortedDivs[i].children[3].setAttribute("tabindex", 7);
      }
    }
    // Mettre à jour LightBox après le tri
    LightBox();
  }

  // Fonctions de tri par titre
  function sortByTitle(event) {
    // on mais des condition pour que le addeventlistner ce declence avec entrer
    if (
      (event.type === "keydown" &&
        (event.key === "Enter" ||
          event.keyCode === 13 ||
          event.key === " " ||
          event.keyCode === 32)) ||
      event.type === "click"
    ) {
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
      // on mais les tab index au img et le btn des like !
      for (let i = 0; i < sortedDivs.length; i++) {
        // Définir l'attribut tabindex pour le premier enfant
        sortedDivs[i].children[0].setAttribute("tabindex", 7);
        // Définir l'attribut tabindex pour le quatrième enfant
        sortedDivs[i].children[3].setAttribute("tabindex", 7);
      }
    }
    // Mettre à jour LightBox après le tri
    LightBox();
  }
  // Associer les événements de clic aux éléments de tri
  containerTrierSelect[1].addEventListener("click", sortByDate);
  containerTrierSelect[2].addEventListener("click", sortByTitle);

  // Associer les événements keydown aux éléments de tri pour la touche Entrée et la barre d'espace
  containerTrierSelect[1].addEventListener("keydown", sortByDate);
  containerTrierSelect[2].addEventListener("keydown", sortByTitle);
}

// Fonction asynchrone pour initialiser la Lightbox
async function LightBox() {
  // Sélectionne tous les conteneurs d'images et vidéos
  const videoImageContainers = document.querySelectorAll(
    ".container-image-video"
  );

  // Crée les éléments DOM pour les boutons de fermeture et de navigation dans la Lightbox

  const flecheGauche = document.createElement("i");
  flecheGauche.classList.add("fa-solid", "fa-chevron-left", "flecheGauche");
  flecheGauche.setAttribute("tabindex", 7); // Ajouter tabindex à flecheGauche
  flecheGauche.setAttribute("aria-label", "bouton passer a l'image précédent");

  const flecheDroite = document.createElement("i");
  flecheDroite.classList.add("fa-solid", "fa-chevron-right", "flecheDroite");
  flecheDroite.setAttribute("tabindex", 7); // Ajouter tabindex à flecheDroite
  flecheDroite.setAttribute("aria-label", "bouton passer a l'image suivante");

  const Close = document.createElement("i");
  Close.classList.add("fa-solid", "fa-xmark", "crossClose");
  Close.setAttribute("tabindex", 7); // Ajouter tabindex à Close
  Close.setAttribute("aria-label", "bouton pour fermer la lightBox");
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

  function handleContainerAction(index) {
    currentIndex = index;
    highlightCurrent();
    // Ajoute les boutons de fermeture et de navigation à l'élément actuel
    videoImageContainers[currentIndex].appendChild(Close);
    videoImageContainers[currentIndex].appendChild(flecheGauche);
    videoImageContainers[currentIndex].appendChild(flecheDroite);
  }

  videoImageContainers.forEach((container, index) => {
    container.addEventListener("click", () => {
      handleContainerAction(index);
    });

    container.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" ||
        event.key === " " ||
        event.keyCode === 13 ||
        event.keyCode === 32
      ) {
        handleContainerAction(index);
        flecheGauche.focus();
        flecheDroite.focus();
        Close.focus();
      }
    });
  });

  // Gestionnaire de clic pour le bouton de fermeture
  Close.addEventListener("click", (event) => {
    closeLightbox(event);
  });

  // Gestionnaire de clic pour le bouton de navigation vers la gauche
  flecheGauche.addEventListener("click", (event) => {
    navigateLeft(event);
  });

  // Gestionnaire de clic pour le bouton de navigation vers la droite
  flecheDroite.addEventListener("click", (event) => {
    navigateRight(event);
  });

  // Ajoutez la gestion de l'événement keydown pour le bouton de fermeture
  Close.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.keyCode === 13 ||
      event.keyCode === 32
    ) {
      closeLightbox(event);
    }
  });

  // Ajoutez la gestion de l'événement keydown pour le bouton de navigation vers la gauche
  flecheGauche.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.keyCode === 13 ||
      event.keyCode === 32
    ) {
      navigateLeft(event);
    }
  });

  // Ajoutez la gestion de l'événement keydown pour le bouton de navigation vers la droite
  flecheDroite.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.keyCode === 13 ||
      event.keyCode === 32
    ) {
      navigateRight(event);
    }
  });

  // Fonction pour fermer la Lightbox
  function closeLightbox(event) {
    event.stopPropagation(); // Empêche la propagation du clic pour éviter de fermer la Lightbox lors du clic sur le bouton de fermeture
    setTimeout(() => {
      // Cache la Lightbox
      // Nettoyer la Lightbox en supprimant les éléments existants
      document.querySelectorAll(".fa-chevron-left").forEach(element => element.remove());
  document.querySelectorAll(".fa-chevron-right").forEach(element => element.remove());
  document.querySelectorAll(".crossClose").forEach(element => element.remove());
      containersArray[currentIndex].classList.remove("lightBox-container");
 
    }, 0);
  }

  // Fonction pour naviguer vers la gauche
  function navigateLeft(event) {
    event.stopPropagation(); // Empêche la propagation du clic pour éviter de changer d'image ou de vidéo lors du clic sur le bouton de navigation
    // Décrémente l'index tout en assurant qu'il reste dans la plage valide
    currentIndex =
      (currentIndex - 1 + containersArray.length) % containersArray.length;
    highlightCurrent(); // Met en évidence l'élément actuellement affiché
    // Ajoute à nouveau les boutons de fermeture et de navigation à l'élément actuel
    containersArray[currentIndex].appendChild(Close);
    containersArray[currentIndex].appendChild(flecheGauche);
    containersArray[currentIndex].appendChild(flecheDroite);
  }

  // Fonction pour naviguer vers la droite
  function navigateRight(event) {
    event.stopPropagation(); // Empêche la propagation du clic pour éviter de changer d'image ou de vidéo lors du clic sur le bouton de navigation
    // Incrémente l'index tout en assurant qu'il reste dans la plage valide
    currentIndex = (currentIndex + 1) % containersArray.length;
    highlightCurrent(); // Met en évidence l'élément actuellement affiché
    // Ajoute à nouveau les boutons de fermeture et de navigation à l'élément actuel
    containersArray[currentIndex].appendChild(Close);
    containersArray[currentIndex].appendChild(flecheGauche);
    containersArray[currentIndex].appendChild(flecheDroite);
  }
}

// function qui gere les like et le prix
function Like(photographers, media) {
  const prix = document.querySelector(".p-prix");
  prix.setAttribute("tabindex", 8);
  const likeTotal = document.querySelector(".p-like");
  likeTotal.setAttribute("tabindex", 8);
  const like = document.querySelectorAll(".likes");
  const coeur = document.querySelectorAll(".coeur");
  const urlParams = new URLSearchParams(window.location.search); // Obtient les paramètres de l'URL
  const photographerId = urlParams.get("id"); // Récupère l'ID du photographe depuis les paramètres de l'URL

  // Boucle à travers les photographes
  photographers.forEach((photographer) => {
    // Vérifie si l'ID du photographe correspond à l'ID spécifié dans le lien
    if (photographer.id === parseInt(photographerId)) {
      prix.textContent = photographer.price + "€ / jour";
      prix.setAttribute(
        "aria-label",
        `prix de la photographe par jour ${photographer.price} euros`
      );
    }
  });

  totalPage = 0;
  // Boucle à travers les médias pour calculer le total de likes pour la page
  media.forEach((media) => {
    if (media.photographerId === parseInt(photographerId)) {
      totalPage += media.likes;
      likeTotal.textContent = totalPage;
      likeTotal.setAttribute(
        "aria-label",
        `nombre total de like de la page ${totalPage}`
      );
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
    coeur.addEventListener("click", (event) => {
      event.stopPropagation(); // empêche l'ouverture de la lightbox au clic sur le coeur
      toggleLike(index);
    });

    coeur.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" ||
        event.key === " " ||
        event.keyCode === 13 ||
        event.keyCode === 32
      ) {
        event.stopPropagation(); // empêche l'ouverture de la lightbox lors de la pression de la touche "Enter" ou de la barre d'espace sur le coeur
        toggleLike(index);
      }
    });
  });

  // Fonction pour basculer l'état du bouton "J'aime"
  function toggleLike(index) {
    if (likesCounts[index] === initialLikesCounts[index]) {
      likesCounts[index] += 1; // Ajouter 1 au compteur de likes
      coeur[index].style.color = "green";
    } else {
      likesCounts[index] -= 1; // Soustraire 1 du compteur de likes
      coeur[index].style.color = "#901c1c";
    }
    like[index].textContent = likesCounts[index]; // Mettre à jour le nombre de likes individuel
    updateTotal(); // Mettre à jour le total après chaque clic sur un cœur
  }
}

// Fonction d'initialisation de l'application
async function init() {
  // Récupère les données des photographes
  const { photographers, media } = await getPhotographers();

  // Affiche les données du photographe dans le DOM
  displayData(photographers, media);

  // Initialise la fonction de tri pour les médias
  trier();

  // Initialise la like pour les médias
  Like(photographers, media);
}

// Appelle la fonction d'initialisation pour démarrer l'application
init();
