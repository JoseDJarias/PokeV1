import React, { useEffect, useState } from 'react';
import '../styles/pokedex.css'
import { getPokemonList } from '../api/PokeApi';
import defaultImage from '../assets/img/loadPoke.webp'
import ReactCardFlip from "react-card-flip";
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function Pokedex() {
    const [list, setList] = useState([]);
    // flip effect card
    const [flip, setFlip] = useState(false);
    // search bar and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [next, setNext] = useState('');
    const [previous, setPrevious] = useState('');
    // post and delete favs pokemons
    const [isAdded, setIsAdded] = useState(true)

    async function getData(url) {
        var response = await getPokemonList(url)
        var data = response.array;
        var previous = response.previous;
        var next = response.next;
        setList(data);
        setNext(next);
        setPrevious(previous);
    }

    useEffect(() => {
        const fetchedListPokemon = async (url) => {
            try {
                getData(url)
            }
            catch (error) {
                console.error('Error fetching data ', error);
            }
        }
        fetchedListPokemon("https://pokeapi.co/api/v2/pokemon?limit=20")
    }, []);

    const handleNextPage = async (next) => {
        if (next) {
            try {
                getData(next);
            } catch (error) {
                throw (error);
            }
        }
    };
    const handlePreviousPage = async (previous) => {
        if (previous) {
            try {
                getData(previous);
            } catch (error) {
                throw (error);
            }
        }
    };

    const handlePagination = async (e) => {
        var value = e.target.textContent;
        console.log(value);
        if (value == 1) {
            var newUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
            getData(newUrl);
        } else {
            var newUrl = `https://pokeapi.co/api/v2/pokemon?offset=${(value - 1) * 20}&limit=20`;
            getData(newUrl)
        }
    }

    const handleFilterSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    const filteredPokemon = list.filter(
        (pokemon) =>
            pokemon.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) || // Filtrar por nombre
            pokemon.id.toString().includes(searchTerm) // Filtrar por ID
    );

    const handleImageLoad = (event) => {
        event.target.src = event.target.dataset.src;
    };

    const handleAddPokemon = (id) => {
        console.log('added', id);
    }

    const handleDeletePokemon = (id) => {
        console.log(id);

    }


    return (
        <>
            <TextField
                label="Search Pokémon"
                value={searchTerm}
                onChange={handleFilterSearch}
                style={{ margin: '20px', width: '300px' }}
            />
            {filteredPokemon.map((item) => (
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
                        borderRadius: '20px'

                    }}>
                        <div className='number-box'>
                            <span>{`000${item.id}`}</span>
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
                        marginBottom: '40px',
                        background: 'transparent',
                        fontSize: '40px',
                        color: 'green',
                        margin: '20px',
                        borderRadius: '4px',
                        textAlign: 'center',
                        padding: '20px',
                        borderRadius: '20px'
                    }}>
                        <div key={item.id} >
                            <div className='img-box'>
                                <img
                                    src={defaultImage}
                                    alt={item.name}
                                    data-src={item.image} // Almacenar la URL real en un atributo personalizado
                                    onLoad={handleImageLoad} // Manejador de carga de imagen
                                    loading="lazy" // Agregar atributo "loading" con valor "lazy"
                                    style={{ maxHeight: '250px', maxWidth: '250px' }}
                                />
                            </div>
                            <div className=''>

                                <div className='poke-name' >{item.name}</div>
                                <div className='detail-btn'>
                                    <NavLink to={`/details/${item.id}`}><Button variant="outlined">Details</Button></NavLink>
                                    {/* <Button variant="outlined">Details</Button> */}
                                    {isAdded ? (
                                        <Button variant="outlined" onClick={() => handleAddPokemon(item.id)}>Add to favs Pokemons</Button>
                                    ) :
                                        <Button variant="outlined" onClick={() => handleDeletePokemon(item.id)}>Delete to favs Pokemons</Button>

                                    }
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
            <Button variant='outlined' onClick={() => handleNextPage(next)}>Next</Button>
            <Button variant='outlined' onClick={() => handlePreviousPage(previous)}>  Previous</Button>
            <Stack spacing={2}>
                <Pagination count={50} variant="outlined" color="primary" onClick={handlePagination} />
            </Stack>


        </>
    );
}

export default Pokedex;