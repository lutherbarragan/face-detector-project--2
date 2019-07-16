import React, { Component } from 'react';
import Clarifai from 'clarifai';

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { Link } from "react-router-dom";


import './Colors.css';

const clarifaiApp = new Clarifai.App({
    apiKey: '9a8585cb625d4219b1acedf7c71116f4'
});

class Colors extends Component {
    state = {
        inputValue: '',
        submitValue: '',
        resultColors: []
    }


    getInputValue = e => {
        e.preventDefault()

        this.setState( {inputValue: e.target.value} )
    }

    submitInputValue = e => {
        e.preventDefault()
        this.setState( {submitValue: this.state.inputValue} )

        clarifaiApp.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", this.state.inputValue)
            .then( res => {
                console.log(res.outputs[0].data.colors)
                this.setState( {resultColors: res.outputs[0].data.colors} )
            })
            .catch(err => console.log(err))
    
        
    }


    render() {

        let imageResult = '';

        let height = `${100 / this.state.resultColors.length}%`
        let colors = this.state.resultColors.map((c, i) => {
            return <p className="colors__color m-0 px-2" key={i} style={{backgroundColor: c.w3c.hex, height: height }} >
                <span>{c.w3c.hex}</span>
                <span>{c.w3c.name}</span>
                <span>{Math.round(c.value * 100)}%</span>
            </p>
        })

        if(this.state.submitValue) {
            imageResult = (
                <Container className="colors__result-container rounded">
                    <Row>
                        <Col className="bg-dark p-2" xs={12} md={6}>
                            <Image fluid  src={this.state.submitValue} alt="Result" />
                        </Col>
                        <Col className="bg-dark pt-0 pb-2 px-2 py-md-2 pl-md-0 pr-md-2" xs={12} md={6}>
                            <div className="h-100">
                                {colors}
                            </div>
                        </Col>
                    </Row>
                </Container>
            )
        }

        return (
            <div className="colors">
                <h1 className="colors__heading text-light bg-dark py-4 shadow">COLORS</h1>
                
                <Link to="/">
                    <Button className="colors__back-btn mt-2">HOME</Button>
                </Link>
                
                <form onSubmit={(e) => this.submitInputValue(e)}>
                    <InputGroup className="colors__input my-3 mx-auto" size="md">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"><i className="fas fa-link"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Enter an Image URL"
                            aria-label="Image URL"
                            aria-describedby="basic-addon1"
                            onChange={(e) => this.getInputValue(e)}
                            />
                        <InputGroup.Append>
                            <Button className="btn-dark" type="submit">SUBMIT</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </form>

                {imageResult}

            </div>
        )
    }
}

export default Colors;