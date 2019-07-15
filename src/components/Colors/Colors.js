import React from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";


import './Colors.css';

const Colors = () => {
    return (
        <div>
            <h1 className="text-light bg-dark py-4 shadow">COLORS</h1>
            <Link to="/">
                <Button>HOME</Button>
            </Link>
        </div>
    )
}

export default Colors;