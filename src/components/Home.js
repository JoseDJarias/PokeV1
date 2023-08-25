import React, { useEffect, useState } from 'react';
import { getRandomPokemonId } from "../api/PokeApi";
import defaultImage from '../assets/img/loadPoke.webp'

function Home() {
  const [randomPokemons, setRandomPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchRandomPokemons = async () => {
      try {
        const getRandomIds = () => Math.floor(Math.random() * 200) + 1;
        const pokemonIds = Array.from({ length: 5 }, getRandomIds);

        var fetchedPokemons = [];

        fetchedPokemons = await Promise.all(
          pokemonIds.map(async (id) => {
            const data = await getRandomPokemonId(id);
            return data;
          })
        );
        setRandomPokemons(fetchedPokemons);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching random Pokémon data:", error);
      }
    };

    fetchRandomPokemons();
  }, []);
  const handleImageLoad = (event) => {
    event.target.src = event.target.dataset.src;
  };

  return (
    <>
      <h1>Home</h1>
      <div className="pokemon-container">
        {randomPokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            {isLoading ? (
              <p>Cargando.....</p>
            ) : (
              <>
                <img
                  src={defaultImage}
                  alt={pokemon.name}
                  data-src={pokemon.sprites.other["official-artwork"]["front_default"]} // Almacenar la URL real en un atributo personalizado
                  onLoad={handleImageLoad} // Manejador de carga de imagen
                  loading="lazy" // Agregar atributo "loading" con valor "lazy"
                  style={{ maxWidth: "100px", maxHeight: "100px" }} // Define un tamaño máximo
                />
                <p>{pokemon.name}</p>
              </>
            )
            }
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;





