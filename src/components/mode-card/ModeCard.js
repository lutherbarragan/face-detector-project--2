import React from 'react';
import Card from 'react-bootstrap/Card'

import './ModeCard.css'

const ModeCard = props => {
    return (
        <Card className="ModeCard rounded d-inline-block m-4">
            <Card.Img variant="top" src={props.CardImage} />
            <Card.Body>
                <Card.Title>{props.CardTitle}</Card.Title>
                <Card.Text>
                    {props.CardText}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ModeCard;