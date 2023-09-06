import React, { useEffect, useState } from 'react';
import defaultImage from '../assets/img/loadPoke.webp'
import { getPokemonList, getRandomPokemonId } from '../api/PokeApi';
import { useParams } from 'react-router-dom';



function PokedexDetails() {
    const { id } = useParams();
        console.log(id);
        useEffect(() => {
        const fetchedListPokemon = async () => {
            try {
                const response = await getRandomPokemonId(id);
                return response;
                console.log('Prueba',response);
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

   
    return ( 
        <>
        
                {/* <div key={response.id} className='poke-card'>
                   <div className='header-img'>
                   <img
                  src={defaultImage}
                  alt={response.name}
                  data-src={response.image} // Almacenar la URL real en un atributo personalizado
                  onLoad={handleImageLoad} // Manejador de carga de imagen
                  loading="lazy" // Agregar atributo "loading" con valor "lazy"
                  />
                   </div>
                   <div className='second-row'>
                   <div className='weight-box'>
                    <span style={{display:'block',paddingBottom:'10%'}}>Weight</span>
                    <span>{response.weight}</span>
                   </div>
                   <div className='center-column'>
                    <span style={{height:'40%'}}>{item.name}</span>
                    <span style={{paddingBottom:'2%'}}>Height</span>
                    <span> {response.height}</span>
                   </div>
                   <div className='generation-box'>
                    <span style={{display:'block',paddingBottom:'10%'}}>Generation</span>
                    <span>{response.weight}</span>
                   </div>

                   </div> 

                </div> */}
            

        
        </> 
    );
}

export default PokedexDetails;