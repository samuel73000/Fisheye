function photographerTemplate(data) {
  // Extraction des données du photographe
  const { name, portrait } = data;

  // Chemin de l'image du photographe
  const picture = `../../assets/photographers/PhotographersIDPhotos/${data.portrait}`;

  // Fonction pour générer le DOM de la carte utilisateur
  function getUserCardDOM() {
    // Création d'un élément <article> pour la carte utilisateur
    const article = document.createElement("article");
    // donne id a l'article
    article.setAttribute("id", data.id);
    // Création d'un élément <img> pour afficher la photo du photographe
    const img = document.createElement("img");
    img.setAttribute("src", picture); // Attribution de la source de l'image
    img.setAttribute("alt", `photo de ${data.name}`); // Attribution du alt de l'image
    article.setAttribute("aria-label", `${name}'s portrait`); // Utilisation de aria-label pour décrire l'image
    // Création d'un élément <h2> pour afficher le nom du photographe
    const h2 = document.createElement("h2");
    h2.textContent = name;

    // Création d'un paragraphe pour afficher la ville et le pays du photographe
    const pForCityCountry = document.createElement("p");
    pForCityCountry.textContent = `${data.city}, ${data.country}`;
    pForCityCountry.classList.add("photographer_home_country");

    // Création d'un paragraphe pour afficher la tagline du photographe
    const pForTagLine = document.createElement("p");
    pForTagLine.textContent = `${data.tagline}`;
    pForTagLine.classList.add("photographer_home_tagline");

    // Création d'un paragraphe pour afficher le prix par jour du photographe
    const pForPrice = document.createElement("p");
    pForPrice.textContent = `${data.price}€/jour`;
    pForPrice.classList.add("photographer_home_Price");

    // Ajout des éléments à la carte utilisateur
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(pForCityCountry);
    article.appendChild(pForTagLine);
    article.appendChild(pForPrice);

    return article; // Retourne la carte utilisateur sous forme d'élément DOM
  }

  // Retourne un objet contenant la fonction getUserCardDOM
  return { getUserCardDOM };
}
