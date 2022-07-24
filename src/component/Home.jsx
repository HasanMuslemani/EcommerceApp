import React from 'react';
import Products from './Products';

const Home = () => {
    return (
        <div className="hero">
            <img src="./assets/logo.png" class="card-img" alt="Logo" height="550px"/>
            <Products/>
        </div>
    );
}

export default Home;
