import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import '../styles/header.css'
import Banner from '../../src/assets/img/Banner.jpg'

function Header() {
    return (
        <Router>
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
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/about' element={<About />}></Route>
                </Routes>
            </>
        </Router>
    );
}

export default Header;