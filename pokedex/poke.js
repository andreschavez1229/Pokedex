//   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//  Aquí el js del buscador
//   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    // Sin importar si el usuario ingresa el nombre en mayusculas o con una mayuscula en otro lugar se pueda hacer la peticion
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))

}
// Función que nos renderizará la información del pokemon(sprite, stats y su tipo)
const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const {stats, types} = data;
    // console.log(data) este lo use para probar si sí se obtenia la información
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}
// Para mostar un color acorde al color del pokemon
const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 40% )`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}
// Esta función recibe como parametro el valor types
const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    /* Por cada uno de los tipos que el pokemon tenga vamos a iterarlos con un for each y se va crear un elemento con typeTextElement, 
    a su vez al elemento le daremos un color acorde al tipo*/
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}
// Función para recibir los valores stats de la api
const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    // Primero vamos a iterar cada una de las stats del pokemon
    stats.forEach(stat => {
        // Creamos un elemento stats element y dos más (ya que cada stat tendrá nombre y cantidad de esa stat)
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name; //así viene guardado en la api
        statElementAmount.textContent = stat.base_stat; //así viene guardado en la api
        statElement.appendChild(statElementName); //aquí se agregan los dos elementos que creamos anteriormente
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement); // y aquí ya agregamos elemento entero (stats en nombre con su cantidad númerica)

    });
}







// Tarjetas de los pokemons

const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let offset = 1; //por default queremos traer el pokemon #1 que es bulbasaur
let limit = 8; // y el limite 8, ya que contando el primero traeriamos los primeros 9

// Función para traer un pokémon
function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        createPokemon(data);
        // Cada vez que llamemos esta funcion esconderemos el spinner
        spinner.style.display = "none";
      });
  }
/* Traer los primeros 9 pokemons, el offset determina desde donde 
traeremos pokemones, y el limite hasta donde traeremos los pokemons*/
function fetchPokemons(offset, limit) {
    // Aquí ya mostramos el spinner que habiamos ocultado
    spinner.style.display = "block";
        for (let i = offset; i <= offset + limit; i++) {
        fetchPokemon(i);
    }
  }
// Función para mostrar las tarjetas de los pokemons, creadas desde el dom
function createPokemon(pokemon) {
    // Aquí cremamos el contenedor principal
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");
  
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
  
    flipCard.appendChild(cardContainer);
    // Aquí creamos la tarjeta con un div
    const card = document.createElement("div");
    card.classList.add("pokemon-block");
    // Y de la api obtenemos el valor "sprite" de cada pokemon
    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");
  
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;
  
    spriteContainer.appendChild(sprite);
    // Obtenemos el número del pokémon;
    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`; //padStart añade ceros al principio ya que hay pokes con números de hasta 3 digitos
    // Creamos el elemento que contendrá el nombre, obteniendo el nombre de la api;
    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;
    // Aqu+i ya juntamos todo lo anterior
    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    // Aquí creamos el div de la parte de atrás donde se muestran las stats y demáas
    const cardBack = document.createElement("div");
    cardBack.textContent = "Stats";
    cardBack.classList.add("pokemon-block-back");
    // Aqui llamamos la funcion progressbars que nos regresará las stats del pokemon en la barrita
    cardBack.appendChild(progressBars(pokemon.stats));
  
    // Aquí ya juntamos el contenedor, la parte de atrás y la flipcard
    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
  }
//  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Aquí los botones para cambiar de pagina 
previous.addEventListener("click", () => {
  if (offset != 1) { //esto revisa que el offset no sea igual a 1 (o sea que estamos en la primera pagina)
    offset -= 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 9;
  removeChildNodes(pokemonContainer);
  fetchPokemons(offset, limit);
});

// Esta funcion va eliminar los elementos de la página anterior
function removeChildNodes(parent) { //mientras ese elemento tenga un hijo, lo vamos a quitar 
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Funcion para las barras de las stats
function progressBars(stats) {
  // Este es el contenedor padre de las barras
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");
  // Solo mostraremos las primeras 3 stats, por eso el menor a 3
  for (let i = 0; i < 3; i++) {
    const stat = stats[i];
    // Aquí le pedimos a la api las stats
    const statPercent = stat.base_stat / 2 + "%"; //Este signo de porcentaje determina el máximo que se puede abarcar en la barra de porcentaje
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");
    
    // Esta variable contiene el nombre de la stat
    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;
    // Aquí creamos la barrita
    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0); //Aquí establecemos el valor minimo de una stat
    progressBar.setAttribute("aria-valuemax", 250); //Aquí el valor máximo, aunque hay algunos con un valor mayor
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat; // Aquí definimos el número que irá dentro de cada barrita

    // Aquí ya juntamos la barra, con su nombre y el valor 
    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);
    statsContainer.appendChild(statContainer);
  }
  // Muy importante regresar el contenedor
  return statsContainer;
}


fetchPokemons(offset, limit);


