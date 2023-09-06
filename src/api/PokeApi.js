//POKE-API

// By ID     
async function getRandomPokemonId(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching pokemon:', error);
    return [];
  }
}

export { getRandomPokemonId }

// List
async function getPokemonList(url) {
  var pokemonData = [];
  var result = {};
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length !== 0) {
      for (const pokemon of data.results) {
        const url = pokemon.url;
        const detailPokemon = await getPokemonDetailByUrl(url);
        //push al arrelo de pokemons
        pokemonData.push(detailPokemon);
      }
    }
    result = { count: data.count, next: data.next, previous: data.previous, array: pokemonData }
  } catch (error) {
    console.error('Error fetching data', error);
    return null;
  }
  return result;
}

export { getPokemonList }

// Details
async function getPokemonDetailByUrl(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // data that gonna appear in the pokedex
    const id = data.id;
    const image = data.sprites.front_default;
    const name = data.name;
    return {
      id,
      name,
      image
    }

  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
}