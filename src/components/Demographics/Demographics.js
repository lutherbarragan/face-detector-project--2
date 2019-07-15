import React from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";


import './Demographics.css';

const Demographics = () => {
    return (
        <div className="demographics">
            <h1 className="demographics__heading text-light bg-dark py-4 shadow">DEMOGRAPHICS</h1>
            <Link to="/">
                <Button className="demographics__back-btn">HOME</Button>
            </Link>
        </div>
    )
}

export default Demographics;