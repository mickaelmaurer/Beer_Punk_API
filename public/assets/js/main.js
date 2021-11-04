document.addEventListener("DOMContentLoaded", event => {
  displayBeersList();
  document
    .getElementById("close_modal_beer")
    .addEventListener("click", closeModalBeer);
});

// Get some beers from Punk API
function displayBeersList() {
  fetch("https://api.punkapi.com/v2/beers?page=1&per_page=60")
    .then(response => response.json())
    .then(beers => {
      // Create a list of beers
      document.getElementById("main_content").innerHTML +=
        "<h2 class='background_title'>Beers</h2>" + "<ul id='beers_list'></ul>";

      var isLeftBeer = true;
      // Fill the list with all beers
      beers.forEach((beer, beerKey) => {
        let beerElementId = "beer_" + beerKey;
        // Create a beer container
        document.getElementById("beers_list").innerHTML +=
          "<ul class='beer_container' id='" +
          beerElementId +
          "'>" +
          "</li></ul>";

        let beerContainer = document.getElementById(beerElementId);
        // Add left or right identifier 1/2
        if (isLeftBeer) {
          beerContainer.classList.add("beer_container_left");
          isLeftBeer = false;
        } else {
          beerContainer.classList.add("beer_container_right");
          isLeftBeer = true;
        }

        // Add the beer content from the API
        beerContainer.innerHTML +=
          "<ul class='beer_infos'>" +
          // Beer name
          "<li class='beer_name'><h3>" +
          beer.name +
          "</h3></li>" +
          // Beer tagline
          "<li class='beer_tagline'>" +
          beer.tagline +
          "</li>" +
          // Beer button open modal
          "<li class='beer_button'><button data-beer-id='" +
          beer.id +
          "'onclick='displayModalBeer(this.dataset.beerId)'>See more</button></li>" +
          "</ul>" +
          // Beer img
          "<li class='beer_img'><img src='" +
          beer.image_url +
          "'/></li>";
      });
    });
}

// Display a modal with beer information on click
function displayModalBeer(beerId) {
  let modalBeerLeftElement = document.getElementById("modal_left_content");
  let modalBeerRightElement = document.getElementById("modal_right_content");
  let modalBeerDescriptionElement = modalBeerRightElement.getElementsByClassName(
    "description_container"
  )[0];
  let modalBeerSpecificationsListElement = modalBeerRightElement.getElementsByClassName(
    "specifications_list"
  )[0];
  let modalBeerIngredientsListElement = modalBeerRightElement.getElementsByClassName(
    "ingredients_list"
  )[0];

  // Get a beer from Punk API with id
  fetch("https://api.punkapi.com/v2/beers/" + beerId)
    .then(response => response.json())
    .then(beer => {
      beer = beer[0];

      // Fill the left content of the modal
      modalBeerLeftElement.getElementsByClassName("beer_name")[0].innerHTML =
        beer.name;
      modalBeerLeftElement.getElementsByClassName("beer_img")[0].src =
        beer.image_url;

      // Fill the right content of the modal (description container)
      modalBeerDescriptionElement.getElementsByClassName(
        "beer_name"
      )[0].innerHTML = beer.name;
      modalBeerDescriptionElement.getElementsByClassName(
        "beer_tagline"
      )[0].innerHTML = beer.tagline;
      modalBeerDescriptionElement.getElementsByClassName(
        "beer_description"
      )[0].innerHTML = beer.description;

      // Fill the right content of the modal (specifications list)
      //
      // @TODO: Remplir les valeurs dans un tableau et faire un foreach pour
      // éviter les copier coller de balise
      modalBeerSpecificationsListElement.innerHTML =
        "<li class='list_element'><span class='list_element_name'>First brewed</span><span class='list_element_value'>" +
        beer.first_brewed +
        "</span></li>" +
        "<li class='list_element'><span class='list_element_name'>ABV</span><span class='list_element_value'>" +
        beer.abv +
        "</span></li>" +
        "<li class='list_element'><span class='list_element_name'>IBU</span><span class='list_element_value'>" +
        beer.ibu +
        "</span></li>" +
        "<li class='list_element'><span class='list_element_name'>EBC / SRM</span><span class='list_element_value'>" +
        beer.ebc +
        " / " +
        beer.srm +
        "</span></li>";

      // Fill the right content of the modal (ingredients list)
      // @TODO: Insérer dynamiquement chaque ingrédient

      // Display the modal
      document.getElementById("close_modal_beer").style.display = "block";
      document.getElementById("modal_beer").style.display = "block";
      // Animation slide in
      document
        .getElementById("modal_beer")
        .getElementsByClassName("modal_content")[0]
        .classList.add("slide_in");
    });
}

// Hide the modal beer
function closeModalBeer() {
  let modalBeerContentElement = document
    .getElementById("modal_beer")
    .getElementsByClassName("modal_content")[0];

  // Animation slide out
  document.getElementById("close_modal_beer").style.display = "none";
  modalBeerContentElement.classList.add("slide_out");
  setTimeout(() => {
    // Reset the modal status and animation
    document.getElementById("modal_beer").style.display = "none";
    modalBeerContentElement.classList.remove("slide_in");
    modalBeerContentElement.classList.remove("slide_out");
  }, 700);
}
