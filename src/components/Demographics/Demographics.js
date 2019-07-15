import React from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";


import './Demographics.css';

const Demographics = () => {
    return (
        <div>
            <h1 className="home__heading text-light bg-dark py-4 shadow">DEMOGRAPHICS</h1>
            <Link to="/">
                <Button>HOME</Button>
            </Link>
        </div>
    )
}

export default Demographics;