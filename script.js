const poke_container = document.getElementById('poke-container')
const info_container = document.getElementById('info-container')
const pokemon_count = 1
const buttonNext = document.getElementById('btnNext')
const buttonPrev = document.getElementById('btnPrev')
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
  let i = 1
  buttonNext.addEventListener('click', async function () {
    i = i + 1
    console.log(i)
    poke_container.innerHTML = ''
    await getPokemon(i)
  })
  buttonPrev.addEventListener('click', async function () {
    i = i - 1
    console.log(i)
    poke_container.innerHTML = ''
    await getPokemon(i)
  })
}

const getPokemon = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  const data = await res.json()
  createPokemonCard(data)
}
const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div')
  pokemonEl.classList.add('pokemon')
  const infoEl = document.createElement('div')
  infoEl.classList.add('info-container')

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  const id = pokemon.id.toString().padStart(3, '0')

  const poke_types = pokemon.types.map(type => type.type.name)
  const type = main_types.find(type => poke_types.indexOf(type) > -1)
  const color = colors[type]

  pokemonEl.style.backgroundColor = color

  const pokemonInnerHTML = `
    <div class="img-container">
      <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">
    </div>
  `
  const infoInnerHTML = `
  <div div class="info" >
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
  </div>
  `
  pokemonEl.innerHTML = pokemonInnerHTML
  infoEl.innerHTML = infoInnerHTML
  poke_container.appendChild(pokemonEl)
  document.body.appendChild(infoEl)
}

fetchPokemons()
