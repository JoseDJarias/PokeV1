import React, { useEffect, useState } from 'react';
import { getRandomPokemonId } from "../api/PokeApi";
import defaultImage from '../assets/img/loadPoke.webp'
import '../styles/home.css'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { styled } from '@mui/material/styles';
import CustomizedRating from './RatingHome';



function SwiperHome() {
  const [randomPokemons, setRandomPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchRandomPokemons = async () => {
      try {
        const getRandomIds = () => Math.floor(Math.random() * 200) + 1;
        const pokemonIds = Array.from({ length: 5 }, getRandomIds);

        var fetchedPokemons = [];

        fetchedPokemons = await Promise.all(
          pokemonIds.map(async (id) => {
            const data = await getRandomPokemonId(id);
            return data;
          })
        );
        setRandomPokemons(fetchedPokemons);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching random Pokémon data:", error);
      }
    };

    fetchRandomPokemons();
  }, []);
  const handleImageLoad = (event) => {
    event.target.src = event.target.dataset.src;
  };

  return (
    <>

      <h2 className='someOfThem-title' >Some of them....</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      //   onSwiper={(swiper) => console.log(swiper)}
      //   onSlideChange={() => console.log('slide change')}
      >
        {randomPokemons.map((pokemon) => (
          <SwiperSlide>
            <div key={pokemon.id} className="pokemon-card">
              {isLoading ? (
                <p style={{ paddingTop: '130px' }}>Cargando.....</p>
              ) : (
                <>
                  <p style={{ margin: 0, color: 'black', paddingTop: '25px', fontSize: 'larger', fontFamily: 'sans-serif' }}>{pokemon.name.toUpperCase()}</p>
                  <img
                    src={defaultImage}
                    alt={pokemon.name}
                    data-src={pokemon.sprites.other["official-artwork"]["front_default"]} // Almacenar la URL real en un atributo personalizado
                    onLoad={handleImageLoad} // Manejador de carga de imagen
                    loading="lazy" // Agregar atributo "loading" con valor "lazy"
                    style={{ maxWidth: "200px", maxHeight: "200px" }} // Define un tamaño máximo
                  />
                  <CustomizedRating />
                </>
              )

              }
            </div>

          </SwiperSlide>
        ))}



      </Swiper>
    </>
  );
}

export default SwiperHome;



