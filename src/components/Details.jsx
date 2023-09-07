import React, { useEffect, useState } from 'react';
import defaultImage from '../assets/img/loadPoke.webp'
import { getPokemonList, getRandomPokemonId } from '../api/PokeApi';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from '@mui/material';




function PokedexDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState([])
    const [isLoading, setLoading] = useState(true)

    console.log(id);
    useEffect(() => {
        const fetchedListPokemon = async () => {
            try {
                const response = await getRandomPokemonId(id);
                console.log('Prueba', response);
                setDetails(response)
                setLoading(false)
                return response;
            }
            catch (error) {
                console.error('Error fetching data ', error);
            }

        }
        fetchedListPokemon()
    }, [])
    const handleImageLoad = (event) => {
        event.target.src = event.target.dataset.src;
    };
    // por aqui va el prototipo de la solucion al problema


    return (
        <>
        <NavLink to='/pokedex'><Button variant="outlined">Pokemon List</Button></NavLink>
            {isLoading ? <p>Cargando.....</p> : (

                <div key={details.id} className='poke-card'>
                    <div className='header-img'>
                        <img
                            src={defaultImage}
                            alt={details.name}
                              data-src={details.sprites.other['dream_world']['front_default']} // Almacenar la URL real en un atributo personalizado
                            onLoad={handleImageLoad} // Manejador de carga de imagen
                            loading="lazy" // Agregar atributo "loading" con valor "lazy"
                        />
                    </div>
                    <div className='second-row'>
                        <div className='weight-box'>
                            <span style={{ display: 'block', paddingBottom: '10%' }}>Weight</span>
                            <span>{details.weight}</span>
                        </div>
                        <div className='center-column'>
                            <span style={{ height: '40%' }}>{details.name}</span>
                            <span style={{ paddingBottom: '2%' }}>Height</span>
                            <span> {details.height}</span>
                        </div>
                        <div className='generation-box'>
                            {/* <span style={{display:'block',paddingBottom:'10%'}}>Generation</span>
                        <span>{response.weight}</span> */}
                        </div>

                    </div>

                </div>


            )}



        </>
    );
}

export default PokedexDetails;