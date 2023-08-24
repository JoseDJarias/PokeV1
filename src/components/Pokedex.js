import React, { useEffect, useState } from 'react';
import '../styles/pokedex.css'
function Pokedex() {
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        //Realiza una solicitud al API
        fetch('https://pokeapi.co/api/v2/pokemon/pikachu/')
            .then(response => response.json())
            .then(data => setPokemonData(data))
            .catch(error => console.error('Error fetching data:', error))
    }, []);
    return (
        <div className='poke-card'>
            <h2>Pikachu</h2>
            {pokemonData ? (
                <div>
                    <p>Nombre: {pokemonData.name}</p>
                    <p>Altura: {pokemonData.height} </p>
                    <p>Peso: {pokemonData.weight} </p>
                    <img src={pokemonData.sprites.front_default} alt='Pikachu' />
                </div>
            ) : (
                <p> Cargando información ...</p>
            )
            }
        </div>
    );
}

export default Pokedex;