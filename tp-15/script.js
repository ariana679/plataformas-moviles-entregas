const pokemonList = document.getElementById('pokemon-list');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const spinner = document.getElementById('spinner');
let offset = 0;
const limit = 20;

document.addEventListener("DOMContentLoaded", loadPokemons);

loadMoreBtn.addEventListener('click', loadPokemons);

function loadPokemons() {
    spinner.style.display = 'block';
    loadMoreBtn.disabled = true;
    
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(pokemon => {
                fetchPokemonDetails(pokemon.url);
            });
            offset += limit;
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            spinner.style.display = 'none';
            loadMoreBtn.disabled = false;
        });
}

function fetchPokemonDetails(url) {
    fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            displayPokemon(pokemon);
        });
}

function displayPokemon(pokemon) {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

    const card = document.createElement('div');
    card.classList.add('col-md-3', 'col-sm-6');
    
    card.innerHTML = `
        <div class="card">
            <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
                <h5 class="card-title text-capitalize">${pokemon.name}</h5>
                <p class="card-text">Tipo: ${types}</p>
                <button class="btn btn-primary" onclick="showDetails('${pokemon.name}', '${pokemon.sprites.front_default}', '${types}', '${pokemon.abilities.map(ability => ability.ability.name).join(', ')}', '${pokemon.moves.slice(0, 4).map(move => move.move.name).join(', ')}')">Más Información</button>
            </div>
        </div>
    `;
    pokemonList.appendChild(card);
}

function showDetails(name, image, types, abilities, moves) {
    alert(`Nombre: ${name}\nTipos: ${types}\nHabilidades: ${abilities}\nMovimientos: ${moves}`);
}
