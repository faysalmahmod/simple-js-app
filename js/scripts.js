
    let pokemonRepository = (function () {
      let pokemonList = [
        {
          name: `Bulbasur`,
          height: `0.7`,
          types: [`grass`, `poison`, `flying`, `electric`],
        },
        { name: `Jigglypuff`, height: `0.2`, types: [`steel`, `poison`] },
        { name: `Pikachu`, height: `0.9`, types: [`ground`, `flying`, `steel`] },
        {
          name: `Victreebel`,
          height: `1.0`,
          types: [`psychic`, `fire`, `ice`, `fairy`],
        },
        {
          name: `Starmie`,
          height: `1.7`,
          types: [`dragon`, `ghost`, `bug`, `fire`, `ice`],
        },
      ];

      function add(pokemon){
        if(
            typeof pokemon === "object"
        ) {
        pokemonList.push(pokemon);
      	}
        else
         {
        console.log("pokemon is not correct");
          }
        }

      function getAll() {
        return pokemonList;
      }
      // The addListItem function uses the DOM methodology.
      // The DOM methodology uses html class links. In this case .pokemon-list
      //  A new class name was added to the <ol> list)  
      function addListItem(pokemon) {
        let ulList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("btn-pokemon");
        listItem.appendChild(button);
        ulList.appendChild(listItem);
        eventListener(button, pokemon);// The eventListener function
      }
      // The eventListener function holds two parameters.
      // The button paramerter executes the event listener by a click.
      // The function after the click written in the code block is a call of showDetails.
    function eventListener (button, pokemon){
        button.addEventListener("click", function(){
            showDetails(pokemon);
        });
    }
      function showDetails(pokemon)
      {
        console.log(pokemon.name);
      }

      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
      };
    })();

    pokemonRepository.add({
      name: "Butterfree",
      height: 3,
      types: ["bug", "flying"],
    });
    console.log(pokemonRepository.getAll());

    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });


    // document.write('The name of Pokemon is ' + pokemon.name + ' ' + 'and height is ' + pokemon.height);
    //
    // if(pokemon.height >= 1.7) {
    //     document.write(' '+ `Wow, that\`s big!`+ `<br>`);
    // } else if(pokemon.height >=0.5 && pokemon.height <=1.1) {
    //     document.write(' '+ `medium size. `+ `<br>`);
    // } else {
    //     document.write(' '+ `small in size. ` + `<br>`);
    // }
    // });
