Let pokemonList=[ {name: `Bulbasur`, height: `0.7`, types: [`grass`, `poison`, `flying`, `electric`]},
    {name: `Jigglypuff`, height: `0.5`, types: [`steel`, `poison`]},
    {name: `Pikachu`, height: `0.4`, types: [`ground`, `flying`, `steel`]},
    {name: `Victreebel`, height: `1.7`, types: [`psychic`, `fire`, `ice`, `fairy`]},
    {name: `Starmie`, height: `1.1`, types: [`dragon`, `ghost`, `bug`, `fire`, `ice`]}
  ];

  for (var i = 0; i < pokemonList.length; i++) {
    document.write("The name of Pokemon is " + pokemonList[i].name + " "+"and height is " + pokemonList[i].height);

    if(pokemonList[i].height >= 1.7) {
        document.write(`Wow, that\`s big!`+ `<br>`);
    } else if(pokemonList[i].height >=0.5 && pokemonList[i].height <=1.1) {
        document.write(`     - I\`m of medium size. `+ `<br>`);
    } else {
        document.write(`     - I\`m small in size. ` + `<br>`);
    }
  }
