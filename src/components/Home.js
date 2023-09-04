import React, { useEffect, useState } from 'react';
import '../styles/home.css'
import SwiperHome from './SwiperHome';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';


function Home() {

  return (
    <>

      
      <div className="pokemon-container">
      <SwiperHome/>
      <h2 className='someOfThem-title' >We know that you wanna go further....</h2>
      <Stack direction="row" spacing={2}>
      <NavLink to="/pokedex" className='btn-home'><Button variant="outlined">Press here to see them all..</Button></NavLink>
   
     
    </Stack>

      </div>
    
    </>
  );
}

export default Home;





