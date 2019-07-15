import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

import Home from './components/Home/Home'
import Demographics from './components/Demographics/Demographics'
import Colors from './components/Colors/Colors'



const App = () => {
    return (
            <div className="App">

                <Router>
                    <Route exact path="/" component={Home} />
                    <Route path="/demographics" component={Demographics} />
                    <Route path="/colors" component={Colors} />
                </Router>  

            </div>
    );
}

export default App;
