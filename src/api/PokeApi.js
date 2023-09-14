//POKE-API

// get all?
async function getAll(url) {
  try {
    var pokemonData = [];
    var result = {};
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1000');
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
  } catch (error) {
    console.error('Error fetching all pokemon', error);
  }
}
export { getAll }

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
    const image1 = data.sprites.other["official-artwork"]["front_default"];
    const image2 = data.sprites.other.home["front_default"]
    const name = data.name;
    const weight = data.weight
    const height = data.height;
    // const generation = data.past_types['generation']['name'];
    // console.log(generation);
    const types = data.types;
    const stats = data.stats;
    return {
      id,
      name,
      image1,
      image2,
      weight,
      height,
      // generation,
    }

  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
}