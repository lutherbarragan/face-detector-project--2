import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import { Link } from "react-router-dom";


import './Colors.css';

class Colors extends Component {
    state = {
        inputValue: '',
        submitValue: ''
    }


    getInputValue = e => {
        e.preventDefault()

        this.setState( {inputValue: e.target.value} )
    }

    submitInputValue = e => {
        e.preventDefault()

        this.setState( {submitValue: this.state.inputValue} )
        console.log(this.state.inputValue);       
    }


    render() {
        return (
            <div className="colors">
                <h1 className="colors__heading text-light bg-dark py-4 shadow">COLORS</h1>
                
                <Link to="/">
                    <Button className="colors__back-btn mt-2">HOME</Button>
                </Link>
                
                <form onSubmit={(e) => this.submitInputValue(e)}>
                    <InputGroup className="my-3 mx-auto w-50" size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"><i className="fas fa-link"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Please Enter an Image URL"
                            aria-label="Image URL"
                            aria-describedby="basic-addon1"
                            onChange={(e) => this.getInputValue(e)}
                            />
                        <InputGroup.Append>
                            <Button className="btn-dark" type="submit">SUBMIT</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </form>



            </div>
        )
    }
}

export default Colors;