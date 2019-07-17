import React, { Component } from 'react';
import Clarifai from 'clarifai';

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

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
        const id = e.target.id
        const data = this.state.resultData.find(el => el.id === id);
        
        let age = [...data.data.face.age_appearance.concepts]
        
        age = age.splice(0, 5).map(c => {
            return { name: c.name, value: Math.round(c.value * 100) }
        })

        const gender = data.data.face.gender_appearance.concepts.map(c => {
            return { name: c.name, value: Math.round(c.value * 100) }
        })
        
        const multicultural = data.data.face.multicultural_appearance.concepts.map(c => {
            return { name: c.name, value: Math.round(c.value * 100) }
        })

        const activeBox = {age, gender, multicultural}
           
        this.setState( {activeBox: activeBox} )

        window.document.querySelectorAll('.demographics__face-box').forEach(box => {
            box.classList.remove('active')
        })
        e.target.classList.add("active")

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

        let age = <p className="font-weight-bold p-0 m-0">CLICK ON A FACE</p>;
        let gender = <p className="font-weight-bold p-0 m-0">CLICK ON A FACE</p>;
        let multicultural = <p className="font-weight-bold p-0 m-0">CLICK ON A FACE</p>;


        
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
         
        if(this.state.activeBox.age) {
            console.log(this.state.activeBox)
            age = this.state.activeBox.age.map((c, i) => {
                if(i % 2 === 0) {
                    return <p className="d-flex justify-content-between py-1 px-2 m-0 text-light even" key={i}><span>{c.name} years old</span> <span>{c.value}%</span></p>
                } else {
                    return <p className="d-flex justify-content-between py-1 px-2 m-0 text-light odd" key={i}><span>{c.name} years old</span> <span>{c.value}%</span></p>
                }
            })

            gender = this.state.activeBox.gender.map((c, i) => {
                if(i % 2 === 0) {
                    return <p className="d-flex justify-content-between py-1 px-2 m-0 text-light even" key={i}><span>{c.name}</span> <span>{c.value}%</span></p>
                } else {
                    return <p className="d-flex justify-content-between py-1 px-2 m-0 text-light odd" key={i}><span>{c.name}</span> <span>{c.value}%</span></p>
                }
            })

            multicultural = this.state.activeBox.multicultural.map((c, i) => {
                if(i % 2 === 0) {
                    return <p className="d-flex justify-content-between py-1 px-2 m-0 text-light even" key={i}><span>{c.name}</span> <span>{c.value}%</span></p>
                } else {
                    return <p className="d-flex justify-content-between py-1 px-2 m-0 text-light odd" key={i}><span>{c.name}</span> <span>{c.value}%</span></p>
                }
            })
        }
         
        if(this.state.submitValue) {
            imageResult = (
                <Container className="demographics__result-container rounded">
                    <Row>
                        <Col className="bg-dark p-3 p-lg-5" xs={12} lg={8}>
                            <div className="demographics__image-box position-relative">
                                <Image fluid  src={this.state.submitValue} alt="Result" />
                                {faceBoxes}
                            </div>
                        </Col>
                        <Col className="bg-light p-2" xs={12} lg={4}>
                            <div className="h-100">
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle className="demographics__accordion-heading bg-dark text-light font-weight-bold" as={Card.Header} eventKey="0">
                                        AGE
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body className="p-0">{age}</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle className="demographics__accordion-heading bg-dark text-light font-weight-bold" as={Card.Header} eventKey="1">
                                        GENDER
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body className="p-0">{gender}</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle className="demographics__accordion-heading bg-dark text-light font-weight-bold" as={Card.Header} eventKey="2">
                                        MULTICULTURAL APPEARANCE
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="2">
                                        <Card.Body className="p-0">{multicultural}</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
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