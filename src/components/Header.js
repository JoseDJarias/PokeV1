import React from 'react';
import {Link } from 'react-router-dom';

import '../styles/header.css'
import Banner from '../../src/assets/img/Banner.jpg'

function Header() {
    return (
            <>
                <div className='banner'>
                 
                    <img src={Banner} alt='pokeBanner'
                    />
                </div>
                <nav className='navigator'>
                    <ul>
                        <li><Link to="/">Home</Link> </li>
                        <li><Link to="/pokedex">Pokedex</Link> </li>
                        <li><Link to="/about">About Us</Link> </li>
                    </ul>
                </nav>
               
            </>
    );
}

export default Header;