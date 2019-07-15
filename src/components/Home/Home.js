import React from 'react';
import { Link } from "react-router-dom";

import './Home.css'

import ModeCard from '../mode-card/ModeCard'

const Home = () => {
    return (
        <main className="home">
            <h1 className="home__heading text-light bg-dark py-4 shadow">CHOOSE A RECOGNITION MODE</h1>
            
            <div className="home__modes pt-5 px-5">
                <Link to="/demographics">
                    <ModeCard CardTitle="Demographics" CardText="Predict the age, gender, and cultural appearance of detected faces" CardImage="img/demographics.jpg" />
                </Link>
                
                <Link to="/colors">
                    <ModeCard CardTitle="Colors" CardText="Identify the dominant colors present in your photo in hex form" CardImage="img/colors.jpg" />
                </Link>

            </div> 
        </main>
    );
}

export default Home;