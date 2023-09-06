import React, { useEffect, useState } from 'react';
import '../styles/pokedex.css'
import { getPokemonList } from '../api/PokeApi';
import defaultImage from '../assets/img/loadPoke.webp'
import ReactCardFlip from "react-card-flip";
import { Button } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';


function Pokedex() {
    const [list, setList] = useState([]);
    // flip effect card
    const [flip, setFlip] = useState(false);

    useEffect(() => {

        const fetchedListPokemon = async () => {

            try {
                const url = "https://pokeapi.co/api/v2/pokemon?limit=20"
                var response = await getPokemonList(url)
                var data = response.array;
                // console.log(data);
                setList(data);
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
            {list.map((item) => (
                <ReactCardFlip isFlipped={flip}
                    flipDirection="vertical">
                    <div style={{
                        width: '270px',
                        height: '250px',
                        background: 'transparent',
                        fontSize: '40px',
                        color: 'green',
                        margin: '20px',
                        borderRadius: '4px',
                        textAlign: 'center',
                        padding: '20px',
                        borderRadius:'20px'
                        
                    }}>
                        <div className='number-box'>
                            <span>{ `000${item.id}`}</span>
                        </div>

                        <button style={{
                            width: '150px',
                            padding: '10px',
                            fontSize: '20px',
                            background: '#f5d9fa',
                            fontWeight: 'bold',
                            borderRadius: '5px'
                        }} onClick={() => setFlip(!flip)}>
                            Flip</button>
                    </div>
                    <div style={{
                       width: '270px',
                       height: '280px',
                       marginBottom:'40px',
                       background: 'transparent',
                       fontSize: '40px',
                       color: 'green',
                       margin: '20px',
                       borderRadius: '4px',
                       textAlign: 'center',
                       padding: '20px',
                       borderRadius:'20px'
                    }}>
                         <div key={item.id} >
                                <div className='img-box'>
                                    <img
                                        src={defaultImage}
                                        alt={item.name}
                                        data-src={item.image} // Almacenar la URL real en un atributo personalizado
                                        onLoad={handleImageLoad} // Manejador de carga de imagen
                                        loading="lazy" // Agregar atributo "loading" con valor "lazy"
                                        style={{maxHeight:'250px', maxWidth:'250px'}}
                                    />
                                </div>
                                <div className=''>

                                <div className='poke-name' >{item.name}</div>
                                <div className='detail-btn'>
                                <NavLink to={ `/details/${item.id}`}><Button variant="outlined">Details</Button></NavLink>
                                {/* <Button variant="outlined">Details</Button> */}
                                <Button variant="outlined">Add to favs Pokemons</Button>
                                </div>

                                </div>
                        </div>
                        <button style={{
                            width: '150px',
                            padding: '10px',
                            fontSize: '20px',
                            background: '#f5d9fa',
                            fontWeight: 'bold',
                            borderRadius: '5px'
                        }} onClick={() => setFlip(!flip)}>
                            Flip</button>
                    </div>
                </ReactCardFlip>
            ))}                


        </>
    );
}

export default Pokedex;