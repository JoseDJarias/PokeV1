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

    useEffect(() => {

        const fetchedListPokemon = async (url) => {

            try {
                // const url = "https://pokeapi.co/api/v2/pokemon?limit=20"
                var response = await getPokemonList(url)
                var data = response.array;
                var previous = response.previous;
                var next = response.next;
                setList(data);
                setNext(next);
                setPrevious(previous);

            }

            catch (error) {
                console.error('Error fetching data ', error);
            }

        }

        console.log('Prueba', previous);
        fetchedListPokemon("https://pokeapi.co/api/v2/pokemon?limit=20")
    }, []);

    const handleNextPage = async (next) => {
        if (next) {
            try {


                console.log('Next', next);
                const response = await getPokemonList(next);
                const data = response.array
                setList(data);
                setNext(response.next);
                setPrevious(response.previous);
            } catch (error) {
                throw (error);
            }
        }
    };
    const handlePreviousPage = async (previous) => {
        if (previous) {
            try {

                console.log('Previo', previous)
                const response = await getPokemonList(previous);
                const data = response.array
                setList(data);
                setNext(response.next);
                setPrevious(response.previous);
            } catch (error) {
                throw (error);
            }
        }
    };


    const handleSearch = (e) => {
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



    const handlePagination = async (e) => {
        var value = e.target.textContent;
        console.log(value);
        if (value == 1) {
            var newUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
            var response = await getPokemonList(newUrl);
            console.log(response);
            var data = response.array;
            var previous = response.previous;
            var next = response.next;
            setList(data);
            setNext(next);
            setPrevious(previous);
        } else {
            var newUrl = `https://pokeapi.co/api/v2/pokemon?offset=${(value - 1) * 20}&limit=20`;
            var response = await getPokemonList(newUrl)
            var data = response.array;
            var previous = response.previous;
            var next = response.next;
            setList(data);
            setNext(next);
            setPrevious(previous);
        }
    }


    return (
        <>
            <TextField
                label="Search Pokémon"
                value={searchTerm}
                onChange={handleSearch}
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
            <Button variant='outlined' onClick={() => handleNextPage(next)}>Next</Button>
            <Button variant='outlined' onClick={() => handlePreviousPage(previous)}>  Previous</Button>
            <Stack spacing={2}>
                <Pagination count={50} variant="outlined" color="primary" onClick={handlePagination} />
            </Stack>


        </>
    );
}

export default Pokedex;