const pokemonName = document.querySelector('.name');
const pokemonNumber = document.querySelector('.number');
const pokemonGif = document.querySelector('.pokemom');
const form = document.querySelector('.form');
const search = document.querySelector('#search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}
    `);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonGif.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;
    } else {
        pokemonGif.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPokemon(search.value.toLowerCase());
    search.value = '';
});

prev.addEventListener('click', (e) => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

next.addEventListener('click', (e) => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
