let pokemonRepository=function(){let e=[];function a(a){"object"==typeof a&&"name"in a&&"detailsUrl"in a?e.push(a):console.log("pokemon is not correct")}function b(){return e}function c(a){d(a).then(function(){f(a)})}function d(a){return fetch(a.detailsUrl).then(function(a){return a.json()}).then(function(b){a.imageUrl=b.sprites.front_default,a.height=b.height,a.types=b.types}).catch(function(a){console.error(a)})}function f(b){let d=document.querySelector("#poke-modal-body"),f=document.querySelector("#poke-modal-title");f.innerHTML="",d.innerHTML="";let e=document.createElement("h1");e.innerText=b.name,e.classList.add("text-uppercase");let a=document.createElement("img");a.src=b.imageUrl,a.classList.add("pokemon-sprite"),a.classList.add("mx-auto"),a.classList.add("d-block");let c=document.createElement("p");c.innerText="Height of "+b.name+" is "+b.height,c.classList.add("pokemon-Height"),c.classList.add("text-center"),f.appendChild(e),d.appendChild(a),d.appendChild(c)}return $("input").on("input",function(){let a=$("input").val();$("li").each(function(){let b=$(this);b.text().startsWith(a)?b.show():b.hide()})}),{add:a,getAll:b,addListItem:function(d){let e=document.querySelector(".list-group"),b=document.createElement("li"),a=document.createElement("button");b.classList.add("group-list-item"),a.innerText=d.name,a.classList.add("btn-pokemon"),a.classList.add("btn","col-xl-3","col-md-6","col-11","mx-auto"),a.classList.add("list-group-item","list-group-item-action"),a.setAttribute("data-target","#poke-modal"),a.setAttribute("data-toggle","modal"),b.appendChild(a),e.appendChild(b),function(a,b){a.addEventListener("click",function(){c(b)})}(a,d)},loadList:function(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=25").then(function(a){return a.json()}).then(function(b){b.results.forEach(function(b){let c={name:b.name,detailsUrl:b.url};a(c),console.log(c)})}).catch(function(a){console.error(a)})},loadDetails:d,showDetails:c}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(a){pokemonRepository.addListItem(a)})})