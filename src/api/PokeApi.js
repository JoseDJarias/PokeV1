//POKE-API

async function getRandomPokemonId(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return response.json();
    } catch (error) {
      console.error('Error fetching pokemon:', error);
      return [];
    }
  }

  export {getRandomPokemonId}