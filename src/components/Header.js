import React from 'react';

import '../styles/header.css'
import Banner from '../../src/assets/img/Banner.jpg'
import { Link } from 'react-router-dom';

function Header() {
    return (
   
            <>
                <div className='banner'>
                    <img src={Banner} alt='pokeBanner'
                    />
                </div>
                <nav className='navigator'>
                    <ul>
                        <li><Link to="/">Inicio</Link> </li>
                        <li><Link to="/about">About</Link> </li>
                    </ul>
                </nav>
                <h2>Poke Page</h2>
               
            </>
    );
}

export default Header;