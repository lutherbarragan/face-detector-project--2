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

import './Demographics.css';

const clarifaiApp = new Clarifai.App({
    apiKey: '9a8585cb625d4219b1acedf7c71116f4'
});

class Demographics extends Component {
    state = {
        inputValue: '',
        submitValue: '',
        resultData: [],
        resultBoxes: [],
        activeBox: {}
    }


    getActiveBoxData = e => {
        console.log(e.target.id)
    }

    getInputValue = e => {
        e.preventDefault()
        this.setState( {inputValue: e.target.value} )
    }

    submitInputValue = e => {
        e.preventDefault()
        this.setState( {submitValue: this.state.inputValue} )

        clarifaiApp.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", this.state.inputValue)
            .then( res => {
                return this.setState({resultData: res.outputs[0].data.regions})
            })
            .then(data => {
                let boxes = this.state.resultData.map(resData => {
                    return {
                        id: resData.id,
                        top: (resData.region_info.bounding_box.top_row * 100) + '%', 
                        right: 100 - (resData.region_info.bounding_box.right_col * 100) + '%', 
                        bottom: 100 - (resData.region_info.bounding_box.bottom_row * 100) + '%', 
                        left: (resData.region_info.bounding_box.left_col * 100) + '%'
                    }
                })
                this.setState({resultBoxes: [...boxes]});
            })
            .catch(err => console.log(err))
    }


    render() {
        let imageResult = '';
        let faceBoxes = [];


        
        if(this.state.resultBoxes) {
            faceBoxes = this.state.resultBoxes.map(box => {
                let boxSize = {
                    top: box.top, 
                    right: box.right, 
                    bottom: box.bottom, 
                    left: box.left
                }
                return <div className="demographics__face-box border-primary" id={box.id} key={box.id} style={boxSize} onClick={e => this.getActiveBoxData(e)}></div>
            })
        }
        
        
        if(this.state.submitValue) {
            imageResult = (
                <Container className="demographics__result-container rounded">
                    <Row>
                        <Col className="bg-dark p-2" xs={12} md={6}>
                            <div className="position-relative">
                                <Image fluid  src={this.state.submitValue} alt="Result" />
                                {faceBoxes}
                            </div>
                        </Col>
                        <Col className="bg-dark pt-0 pb-2 px-2 py-md-2 pl-md-0 pr-md-2" xs={12} md={6}>
                            <div className="h-100">
                                
                            </div>
                        </Col>
                    </Row>
                </Container>
            )
        }




        return (
            <div className="demographics">
                <h1 className="demographics__heading text-light bg-dark py-4 shadow">DEMOGRAPHICS</h1>
                
                <Link to="/">
                    <Button className="demographics__back-btn mt-2">HOME</Button>
                </Link>
                
                <form onSubmit={(e) => this.submitInputValue(e)}>
                    <InputGroup className="demographics__input my-3 mx-auto" size="md">
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

export default Demographics;