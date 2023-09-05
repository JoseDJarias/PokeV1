import React, { useEffect, useState } from 'react';
import '../styles/pokedex.css'
import { getPokemonList } from '../api/PokeApi';
import { Height } from '@mui/icons-material';
function Pokedex() {
    const [list, setList] = useState([]);
    useEffect(() => {

        const fetchedListPokemon = async () => {

            try {
                const url = "https://pokeapi.co/api/v2/pokemon?limit=20"
                var response = await getPokemonList(url)
                var data = response.array;
                console.log(data);
                setList(data);
            }

            catch (error) {

            }

        }
        fetchedListPokemon()
    },[])

    return (
        <>
                {list.map((item)=>(
                <div key={item.id} className='poke-card' style={{width:'300px', height:'300px', backgroundColor:'beige'}}>
                    <p>{item.name}</p>
                </div>
                  
                ))
                
                }

           holaaaaaaaa
        </>
    );
}

export default Pokedex;