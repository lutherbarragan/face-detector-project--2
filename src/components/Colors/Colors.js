import React from 'react';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import { Link } from "react-router-dom";


import './Colors.css';

const Colors = () => {

    let url = '';

    const getInputValue = e => {
        url = e.target.value;
    }

    const submitInputValue = e => {
        console.log(url)
    }


    return (
        <div className="colors">
            <h1 className="colors__heading text-light bg-dark py-4 shadow">COLORS</h1>
            <Link to="/">
                <Button className="colors__back-btn mt-2">HOME</Button>
            </Link>
            <InputGroup className="my-3 mx-auto w-50" size="lg">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"><i className="fas fa-link"></i></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="Please Enter an Image URL"
                    aria-label="Image URL"
                    aria-describedby="basic-addon1"
                    onChange={(e) => getInputValue(e)}
                />
                <InputGroup.Append>
                    <Button onClick={(e) => submitInputValue(e)}>SUBMIT</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    )
}

export default Colors;