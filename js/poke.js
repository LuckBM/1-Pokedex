const pokemonName = document.querySelector('.pokename');
const pokemonNumber = document.querySelector('.numberpoke');
const pokeImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.searchinput');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPoken = 1;

const fetchPoke = async (pokemon) => {
  const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIresponse.status === 200){
    const data = await APIresponse.json();
    return data;
  }
};
 

const renderPoke = async (pokemon) => {
    
  pokemonName.innerHTML = 'carregando...';

  const data = await fetchPoke(pokemon);

  if (data){
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokeImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'] || ['sprites']['versions']['generation-viii']['icons']['front_default'];
    input.value = '';
    searchPoken = data.id
  } else {
    pokeImage.style.display = 'none';
    pokemonName.innerHTML = 'Pokémon não encontrado ;-;';
    pokemonNumber.innerHTML = '';
  }
};

renderPoke(searchPoken);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPoke(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPoken > 1) {
        searchPoken -= 1;
        renderPoke(searchPoken);
    }
});

buttonNext.addEventListener('click', () => {
    if (searchPoken < 899){ 
      searchPoken += 1;
      renderPoke(searchPoken);
    }
  });