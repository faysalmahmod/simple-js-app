// IIFE function; variable pokemonList holding the pokemon array.
// This array will be filled through the function add.
// The add function owns specific parameter which only accept the right data.
// The variable apiUrl holds the API link to the pokemon list.
// The API link will later be use as a promise in the function loadList by using the function fetch.
let pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl ="https://pokeapi.co/api/v2/pokemon/?limit=20";
    let modalContainer = document.querySelector('#modal-container');

// The loadList function holds the promise.
// The then function holds the (result =) json parameter holds a conditional forEach and calls
// The catch function shows the error in any case and a call
// The function does use the promise chaining methodology
    function loadList(){
        return fetch(apiUrl).then(function(response){ //---> the promise is the API link, the result is a response
            return response.json(); // --> here we convert the response to a json
        }).then(function(json){ //--> then we take the json
            json.results.forEach(function(item){  // ---> create a loop forEach; json holds info for 20 pokemons; result is the key in the object
                let pokemon = {
                    name: item.name, // ---> create a pokemon object with two keys holding a property
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function(e){
            console.error(e);
        });
    }

// The add function holds the information that are the acceptance spefifications for the array access
      function add(pokemon){
          if(
              typeof pokemon === "object" &&
              "name" in pokemon &&
              "detailsUrl" in pokemon
          ) {
          pokemonList.push(pokemon);
      } else {
          console.log("pokemon is not correct");
      }
      }

// The function getAll gets all pokemon that are asked for, in this case 20
// The return function adds the pokemon into the array
      function getAll(){
          return pokemonList;
      }

// The addListItem function uses the DOM methodology.
// The DOM methodology uses html class links. In this case .pokemon-list
// After the connection (via class name) is implemented new elements were created.
// A new class name was added to the <ol> list (Question: for what?)
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list"); // this is a class in HTML
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("btn-pokemon"); // this is a class in CSS
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        eventListener(button, pokemon);
    }

// The button paramerter executes the event listener by a click.

    function eventListener (button, pokemon){
        button.addEventListener("click", function(){
            showDetails(pokemon);
        });
    }

// The function showDetails calls the functin loadDetails.
// The function loadDetails holds the item information for each pokemon
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
      showModal(pokemon);
      });

    }

    //This function expect a parameter with a Pokémon object as a parameter.
    // loadDetails() GET the Pokémon details using the URL from the Pokémon object in the parameter.
        function loadDetails(item) {
            let url = item.detailsUrl; // --> this is the bridge to the API link which holds the individual character of the pokemon
            return fetch(url).then(function (response) {
              return response.json();
            }).then(function (details) {
              // Now we add the details to the item
              item.imageUrl = details.sprites.front_default;
              item.height = details.height;
              item.types = details.types;
            }).catch(function (e) {
              console.error(e);
            });
          }
          //modal

              function showModal(pokemon){
                 modalContainer.innerHTML = '';
                 let modal=document.createElement('div');
                 modal.classList.add('modal');
          //button to close modal
                 let closeButton=document.createElement('button');
                 closeButton.innerText='Close';
                 closeButton.classList.add('modal-close');
                 closeButton.addEventListener('click',hideModal);
          //Heading ot title of Modal
                 let titleElement=document.createElement('h1');
                 titleElement.innerText='Name of Pokemon is '+ pokemon.name;
          //Content in modal
                  let contentElement=document.createElement('p');
                  contentElement.innerText='Height of Pokemon is '+pokemon.height;
         //Image of pokemon
                  let imgElement = document.createElement('img');
		              imgElement.src = pokemon.imageUrl;
		              imgElement.classList.add('pokemon-front-image');
		              imgElement.setAttribute('alt', 'image of ' + pokemon.name);

          //All elements appended into Modal div
                  modal.appendChild(closeButton);
                  modal.appendChild(imgElement);

                  modal.appendChild(titleElement);
                  modal.appendChild(contentElement);
          //Modal Div appended into modalContainer
                  modalContainer.appendChild(modal);

                  modalContainer.classList.add('is-visible');
              }


          // This function represents to hide the modal after clicking on x, space or using the key ESC
           // Now the three options need to be wired up
              function hideModal() {
                modalContainer.classList.remove('is-visible');
              }

          // The Close button function is added to the showDetails using the hideModal variable
          // The Esc scenario is shown in the function right abobe the return statement of the IIFE


          // Clicking outside the modal to close it belongs to the function below
              modalContainer.addEventListener("click", (e) => {
                  // Since this is also triggered when clicking inside the modal
                  // we only want to close if the user clicks directly on the overlay
                  let target = e.target;
                  if(target === modalContainer) {
                      hideModal();
                  }
                  });
              // Function to close the modal via the Esc keyboard key
                window.addEventListener("keydown", (e) => {
                    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
                        hideModal();
                    }
                });

          // call & add event listener



      return {
           add,
           getAll,
           addListItem,
           loadList,
           loadDetails,
           showDetails
       }

})();
// These are the programm calls.
// First loadList of pokemon from API
// Then execute to get all pokemons

       pokemonRepository.loadList().then(function(){
           pokemonRepository.getAll().forEach(function(pokemon){
               pokemonRepository.addListItem(pokemon);
       });
   });
