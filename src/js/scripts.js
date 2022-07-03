// IIFE function; variable pokemonList holding the pokemon array.
// This array will be filled through the function add.
// The add function owns specific parameter which only accept the right data.
// The variable apiUrl holds the API link to the pokemon list.
// The API link will later be use as a promise in the function loadList by using the function fetch.
let pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl ="https://pokeapi.co/api/v2/pokemon/?limit=20";

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
        let pokemonList = document.querySelector(".list-group"); // this is a class in HTML
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        listItem.classList.add('group-list-item');
        button.innerText = pokemon.name;
        button.classList.add('btn-pokemon');   // this is a class in CSS
        // Bootsrap classes added to butoon and linked with modal
        button.classList.add("btn", "col-xl-6","col-md-8","col-11","mx-auto");
        button.classList.add('list-group-item', 'list-group-item-action');
        button.setAttribute('data-target', '#poke-modal');
        button.setAttribute('data-toggle', 'modal');
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
        
        function findPokemonByName(name) {
            let result = getAll().filter((pokemon) => pokemon.name === name);
            // filter returns an array, so we need to get the pokemon by index
            return result[0];
          }

          //modal

        function showModal(pokemon){
              let modalBody = document.querySelector('#poke-modal-body');
              let modalTitle = document.querySelector('#poke-modal-title');

              // Clear any existing modal content
              modalTitle.innerHTML = '';
              modalBody.innerHTML = '';

              let pokemonName = document.createElement('h1');
              pokemonName.innerText = pokemon.name;


              let pokemonSprite = document.createElement('img');
              pokemonSprite.src = pokemon.imageUrl;
              pokemonSprite.classList.add('pokemon-sprite');

              let pokemonHeight = document.createElement('p');
              pokemonHeight.innerText = 'Height of ' + pokemon.name +' is ' + pokemon.height;
              pokemonHeight.classList.add('pokemon-Height');


              modalTitle.appendChild(pokemonName);
              modalBody.appendChild(pokemonSprite);
              modalBody.appendChild(pokemonHeight);

          }



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
