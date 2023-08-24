import React, {useState, useEffect} from 'react';
import '../styles/pokedex.css'

function Header() {
    // randomPokemons almacenar los Pokemon
    const [randomPokemons, setRandomPokemons ] = useState ([]);
    useEffect ( () =>{
        const fetchRandomPokemon = async () => {
            try {
                const getRandomPokemonId = () => Math.floor(Math.random() * 200) + 1; // funcion que trae aleatorios
                //[100, 4,30,25]
                const pokemonIds = Array.from({length: 4},getRandomPokemonId ); // Array .from(tamañ, contenido o como llenar el contenido) 

                // [ { name : Pikachu, img:""}, { name : Charmander, img:""}]
                const fetchedPokemons = [];

                for (const id of pokemonIds ){
                    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const data = await response.json();
                    fetchedPokemons.push(data);
                }

                setRandomPokemons(fetchedPokemons);

            } catch (error) {
                console.error("Error capturando Pokemon data", error);
            }

        };
    fetchRandomPokemon();
    }, [])
    return (
        <header>
      <h1>Random Pokémon Header</h1>
      <div className="pokemon-container">
        {randomPokemons.map((pokemon) => (
          <div className='poke-card' key={pokemon.id}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name}  />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </header>
      );
};

export default Header;