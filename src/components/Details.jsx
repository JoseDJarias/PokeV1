import React, { useEffect, useState } from 'react';
import defaultImage from '../assets/img/loadPoke.webp'
import pokeball from '../assets/img/pokeball.jpg'
import { getRandomPokemonId } from '../api/PokeApi';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';




function PokedexDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)



    console.log(id);
    useEffect(() => {
        const fetchedListPokemon = async () => {
            try {
                const response = await getRandomPokemonId(id);
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

    const handleOpening = () => {
        setIsOpen(true);

    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                {!isOpen ? (
                    <Grid container spacing={2} justifyContent={'center'} >
                        <Grid item xs={12} md={8}>
                            <button className='poke-ball' onClick={handleOpening}></button>
                            <p>Press the pokeball</p>

                        </Grid>
                    </Grid>

                ) : (

                    <Grid container spacing={2} justifyContent={'center'}>
                        <Grid item xs={12} md={8}>
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
                        </Grid>
                    </Grid>

                )
                }
            </Box>




        </>
    );
}

export default PokedexDetails;