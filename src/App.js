import React from 'react';
import './App.css';

import ModeCard from './components/mode-card/ModeCard'

const App = () => {
    return (
            <main className="main App">
                <h1 className="main__heading text-light bg-dark py-4 shadow">CHOOSE A RECOGNITION MODE</h1>

                <div className="main__modes pt-5 px-5">

                    <ModeCard CardTitle="Demographics" CardText="Predict the age, gender, and cultural appearance of detected faces" CardImage="img/demographics.jpg" />
                    <ModeCard CardTitle="Colors" CardText="Identify the dominant colors present in your photo in hex form" CardImage="img/colors.jpg" />

                </div>      

            </main>
    );
}

export default App;
