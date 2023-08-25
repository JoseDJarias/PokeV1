import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../components/Home';
import About from '../components/About';
function AppRouter() {
    return (
        <>
        <Header/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/about' element={<About/>}></Route>
            </Routes>
        </>
      );
}

export default AppRouter;