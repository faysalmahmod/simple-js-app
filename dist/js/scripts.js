let pokemonRepository=function(){let e=[];function a(a){"object"==typeof a&&"name"in a&&"detailsUrl"in a?e.push(a):console.log("pokemon is not correct")}function b(){return e}function c(a){d(a).then(function(){f(a)})}function d(a){return fetch(a.detailsUrl).then(function(a){return a.json()}).then(function(b){a.imageUrl=b.sprites.front_default,a.height=b.height,a.types=b.types}).catch(function(a){console.error(a)})}function f(a){let b=document.querySelector("#poke-modal-body"),e=document.querySelector("#poke-modal-title");e.innerHTML="",b.innerHTML="";let f=document.createElement("h1");f.innerText=a.name;let c=document.createElement("img");c.src=a.imageUrl,c.classList.add("pokemon-sprite");let d=document.createElement("p");d.innerText="Height of "+a.name+" is "+a.height,d.classList.add("pokemon-Height"),e.appendChild(f),b.appendChild(c),b.appendChild(d)}return{add:a,getAll:b,addListItem:function(d){let e=document.querySelector(".list-group"),b=document.createElement("li"),a=document.createElement("button");b.classList.add("group-list-item"),a.innerText=d.name,a.classList.add("btn-pokemon"),a.classList.add("btn","col-xl-6","col-md-8","col-11","mx-auto"),a.classList.add("list-group-item","list-group-item-action"),a.setAttribute("data-target","#poke-modal"),a.setAttribute("data-toggle","modal"),b.appendChild(a),e.appendChild(b),function(a,b){a.addEventListener("click",function(){c(b)})}(a,d)},loadList:function(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=20").then(function(a){return a.json()}).then(function(b){b.results.forEach(function(b){let c={name:b.name,detailsUrl:b.url};a(c),console.log(c)})}).catch(function(a){console.error(a)})},loadDetails:d,showDetails:c}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(a){pokemonRepository.addListItem(a)})})
