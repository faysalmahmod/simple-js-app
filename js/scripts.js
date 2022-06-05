

let pokemonRepository = (function(){
  let pokemonList=[
      {name: `Bulbasur`, height: `0.7`, types: [`grass`, `poison`, `flying`, `electric`]},
      {name: `Jigglypuff`, height: `0.2`, types: [`steel`, `poison`]},
      {name: `Pikachu`, height: `0.9`, types: [`ground`, `flying`, `steel`]},
      {name: `Victreebel`, height: `1.0`, types: [`psychic`, `fire`, `ice`, `fairy`]},
      {name: `Starmie`, height: `1.7`, types: [`dragon`, `ghost`, `bug`, `fire`, `ice`]}
    ];

    function add (pokemon) {
        pokemonList.push(pokemon)
      }
    function getAll () {
        return pokemonList
      }
      return {
        add: add,
        getAll: getAll
      }

})();

pokemonRepository.add({ name: 'Butterfree', height: 3, types: ['bug', 'flying']});
console.log(pokemonRepository.getAll());

  pokemonRepository.getAll().forEach(function(pokemon) {
      document.write('The name of Pokemon is ' + pokemon.name + ' ' + 'and height is ' + pokemon.height);

      if(pokemon.height >= 1.7) {
          document.write(`Wow, that\`s big!`+ `<br>`);
      } else if(pokemon.height >=0.5 && pokemon.height <=1.1) {
          document.write(`medium size. `+ `<br>`);
      } else {
          document.write(`small in size. ` + `<br>`);
      }
    });
  };
