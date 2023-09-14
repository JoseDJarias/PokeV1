import React, { useEffect, useState } from 'react';
import '../styles/pokedex.css'
import { getPokemonList } from '../api/PokeApi';
import { getAll } from '../api/PokeApi';
import defaultImage from '../assets/img/loadPoke.webp'
import ReactCardFlip from "react-card-flip";
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { addFavorite, deleteFavorite, getAllFavs, getPokemonIdByName } from '../api/Mockapi'


function Pokedex() {
    const [list, setList] = useState([]);
    // filter list
    const [isFilterList, setIsFilterList] = useState([]);
    // flip effect card
    const [flip, setFlip] = useState(false);
    // search bar and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [next, setNext] = useState('');
    const [previous, setPrevious] = useState('');
    // post and delete favs pokemons
    const [buttonState, setButtonState] = useState([]);
    const [isData, SetData] = useState(true)



    // update: next,previous,list and button(mockapi) states and fetch by url
    async function getData(url) {
        var response = await getPokemonList(url)
        var data = response.array;
        var previous = response.previous;
        var next = response.next;
        setList(data);
        setNext(next);
        setPrevious(previous);
        setButtonState(data.map(() => ({ isAdded: true }))); // Inicializar buttonState aquí
    };
    // fetch favorites from mockapi
    async function setFavsButtonState(url) {
        try {
            var favsResponse = await getAllFavs();
            console.log(favsResponse);
            var vectorFavs = favsResponse.map((favs) => favs.name); // Utilizar map directamente para crear el vectorFavs

            var response = await getPokemonList(url);
            const data = response.array;

            if (vectorFavs.length < 1) {
                console.log('Entre aqui');
                return null;
            }

            const updatedButtonStates = data.map((pokemon) => {
                if (vectorFavs.includes(pokemon.name)) {
                    return { isAdded: false };
                } else {
                    return { isAdded: true };
                }
            });

            setButtonState(updatedButtonStates);
        } catch (error) {
            console.error('Error fetching favs pokemon from mockapi: ', error);
        }

        //     var vectorFavs = [];
        //     favsResponse.map((favs) => {
        //         vectorFavs.push(favs.name)
        //     });
        //     // console.log(vectorFavs);
        //     var response = await getPokemonList(url)
        //     const data = response.array;
        //     if (vectorFavs.length <1) {
        //         console.log('Entre aqui');
        //         return null
        //     }
        //     console.log('looala');
        //     for (let index = 0; index < vectorFavs.length; index++) {
        //         const array = data.map((pokemon, i) => {
        //             if (vectorFavs[index] == pokemon.name) {
        //                 const updatedButtonStates = [...buttonState];
        //                 updatedButtonStates[i].isAdded = false;
        //                 console.log('encontrado en la posicion:', i);
        //                  return setButtonState(updatedButtonStates);
        //             }

        //         })
        //         console.log(buttonState);

        //     }

    }

    // OnInit, when the page load
    useEffect(() => {
        const fetchedListPokemon = async (url) => {
            try {
                getData(url)
                setFavsButtonState(url);
                var response = await getAll()
                var data = response.array
                setFavsButtonState('https://pokeapi.co/api/v2/pokemon/?limit=1000')

                setIsFilterList(data)
            }
            catch (error) {
                console.error('Error fetching data ', error);
            }
        }
        fetchedListPokemon("https://pokeapi.co/api/v2/pokemon?limit=20")
    }, []); // OnInit, when the page load


    // Pagination, btn next and previous page
    const handleNextPage = async () => {
        if (next) {
            try {
                getData(next);
            } catch (error) {
                throw (error);
            }
        }
    };
    const handlePreviousPage = async () => {
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
        if (value == 1) {
            var newUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
            getData(newUrl);
        } else {
            var newUrl = `https://pokeapi.co/api/v2/pokemon?offset=${(value - 1) * 20}&limit=20`;
            getData(newUrl)

        }
    }// Pagination, btn next and previous page

    // filter search
    const handleFilterSearch = (e) => {
        // onChange we catch the input value
        var event = e.target.value;
        console.log(isFilterList);
        if (event) {
            setSearchTerm(e.target.value);
            SetData(false)
        } else SetData(true)
    }; //this value if it's included in the id or poke name 
    // it will render the page with the filter list
    const filteredPokemon = isFilterList.filter(

        (pokemon) =>
            pokemon.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) || // Filtrar por nombre
            pokemon.id.toString().includes(searchTerm) // Filtrar por ID
    );// filter search

    // take out the default image when it's already load;
    const handleImageLoad = (event) => {
        event.target.src = event.target.dataset.src;
    };

    // Mockapi
    const handleAddPokemon = async (name, index) => {
        try {
            // make a fetch with the name to get the id 
            const id = await getPokemonIdByName(name)
            //if there is not an id; it'll be added
            if (!id) {
                await addFavorite({ name: name })
                const updateButtonState = [...buttonState];
                updateButtonState[index].isAdded = false;
                setButtonState(updateButtonState);
                console.log('añadido');

            } else {
                const updateButtonState = [...buttonState];
                updateButtonState[index].isAdded = false;
                setButtonState(updateButtonState);
                console.log(buttonState);
            }
        } catch (error) {
            throw error
        }
    }

    const handleDeletePokemon = async (name, index) => {
        try {
            // make a fetch with the name to get the id 
            const id = await getPokemonIdByName(name);
            // if there is it, it'll be delete it
            console.log(name);
            console.log(id);
            if (id) {
                await deleteFavorite(id);
                const updatedButtonStates = [...buttonState];
                updatedButtonStates[index].isAdded = true;
                setButtonState(updatedButtonStates);

            }

        } catch (error) {
            throw error
        }
    }// Mockapi

    return (
        <>


            <TextField
                label="Search Pokémon"
                value={searchTerm}
                onChange={handleFilterSearch}
                style={{ margin: '20px', width: '300px' }}
            />
            {isData ? (
                <>
                    {list.map((item, index) => (
                        <ReactCardFlip isFlipped={flip}
                            flipDirection="vertical">
                            {/* number box */}
                            <>
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
                            </>{/* number box */}
                            <>
                                {/* poke info */}
                                <div style={{
                                    width: '270px',
                                    height: '280px',
                                    background: 'transparent',
                                    fontSize: '40px',
                                    color: 'green',
                                    margin: '20px',
                                    borderRadius: '4px',
                                    textAlign: 'center',
                                    padding: '20px',
                                    borderRadius: '20px',
                                    marginBottom: '100px'
                                }}>
                                    <div key={item.id} >
                                        <div className='img-box'>
                                            <img
                                                src={defaultImage}
                                                alt={item.name}
                                                data-src={item.image1} // Almacenar la URL real en un atributo personalizado
                                                onLoad={handleImageLoad} // Manejador de carga de imagen
                                                loading="lazy" // Agregar atributo "loading" con valor "lazy"
                                                style={{ maxHeight: '100px', maxWidth: '100px' }}
                                            />
                                            <img
                                                src={defaultImage}
                                                alt={item.name}
                                                data-src={item.image2} // Almacenar la URL real en un atributo personalizado
                                                onLoad={handleImageLoad} // Manejador de carga de imagen
                                                loading="lazy" // Agregar atributo "loading" con valor "lazy"
                                                style={{ maxHeight: '150px', maxWidth: '150px' }}
                                            />
                                        </div>
                                        <div className='info-box' style={{}}>

                                            <div className='poke-name' >{item.name}</div>
                                            <div className='detail-btn'>
                                                <NavLink to={`/details/${item.id}`}><Button variant="outlined">Details</Button></NavLink>
                                                {buttonState[index].isAdded ? (
                                                    <Button variant="outlined" onClick={() => handleAddPokemon(item.name, index)}>Add to favs Pokemon</Button>
                                                ) :
                                                    <Button variant="outlined" onClick={() => handleDeletePokemon(item.name, index)}>Delete to favs Pokemons</Button>

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
                                        borderRadius: '5px',
                                        marginBottom: '100px'
                                    }} onClick={() => setFlip(!flip)}>
                                        Flip</button>
                                </div>
                            </>{/* poke info */}
                        </ReactCardFlip>
                    ))}
                </>

            ) : (
                <> {filteredPokemon.map((item, index) => (
                    <ReactCardFlip isFlipped={flip}
                        flipDirection="vertical">
                        {/* number box */}
                        <>
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
                        </>{/* number box */}
                        <>
                            {/* poke info */}
                            <div style={{
                                width: '270px',
                                height: '280px',
                                background: 'transparent',
                                fontSize: '40px',
                                color: 'green',
                                margin: '20px',
                                borderRadius: '4px',
                                textAlign: 'center',
                                padding: '20px',
                                borderRadius: '20px',
                                marginBottom: '100px'
                            }}>
                                <div key={item.id} >
                                    <div className='img-box'>
                                        <img
                                            src={defaultImage}
                                            alt={item.name}
                                            data-src={item.image1} // Almacenar la URL real en un atributo personalizado
                                            onLoad={handleImageLoad} // Manejador de carga de imagen
                                            loading="lazy" // Agregar atributo "loading" con valor "lazy"
                                            style={{ maxHeight: '100px', maxWidth: '100px' }}
                                        />
                                        <img
                                            src={defaultImage}
                                            alt={item.name}
                                            data-src={item.image2} // Almacenar la URL real en un atributo personalizado
                                            onLoad={handleImageLoad} // Manejador de carga de imagen
                                            loading="lazy" // Agregar atributo "loading" con valor "lazy"
                                            style={{ maxHeight: '150px', maxWidth: '150px' }}
                                        />
                                    </div>
                                    <div className='info-box' style={{}}>

                                        <div className='poke-name' >{item.name}</div>
                                        <div className='detail-btn'>
                                            <NavLink to={`/details/${item.id}`}><Button variant="outlined">Details</Button></NavLink>
                                            {buttonState[index].isAdded ? (
                                                <Button variant="outlined" onClick={() => handleAddPokemon(item.name, index)}>Add to favs Pokemon</Button>
                                            ) :
                                                <Button variant="outlined" onClick={() => handleDeletePokemon(item.name, index)}>Delete to favs Pokemons</Button>

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
                                    borderRadius: '5px',
                                    marginBottom: '100px'
                                }} onClick={() => setFlip(!flip)}>
                                    Flip</button>
                            </div>
                        </>{/* poke info */}
                    </ReactCardFlip>
                ))}</>
            )
            }

            {/* next and previous btn and paginator */}
            {next === null ? (
                <Button variant='outlined' disabled onClick={() => handleNextPage()}>Next</Button>
            ) :
                <Button variant='outlined' onClick={() => handleNextPage()}>Next</Button>
            }
            {previous === null ? (
                <Button variant='outlined' disabled onClick={() => handlePreviousPage()}>  Previous</Button>

            ) :
                <Button variant='outlined' onClick={() => handlePreviousPage()}>Previous</Button>
            }
            <Stack spacing={2}>
                <Pagination count={65} variant="outlined" hidePrevButton hideNextButton onClick={handlePagination} />
            </Stack>
            {/* next and previous btn and paginator */}








        </>
    );
}

export default Pokedex;