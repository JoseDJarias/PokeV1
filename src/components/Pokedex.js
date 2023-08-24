import React, { useEffect, useState } from 'react';
import '../styles/pokedex.css'
function Pokedex() {
    return (
        <div className='poke-card'>
            <h2>Pikachu</h2>
            {/* {pokemonData ? (
                <div>
                    <p>Nombre: {pokemonData.name}</p>
                    <p>Altura: {pokemonData.height} </p>
                    <p>Peso: {pokemonData.weight} </p>
                    <img src={pokemonData.sprites.front_default} alt='Pikachu' />
                </div>
            ) : (
                <p> Cargando información ...</p>
            )
            } */}
        </div>
    );
}

export default Pokedex;