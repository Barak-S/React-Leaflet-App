import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

class ParkCard extends Component {
    render() {
        return (
            <Card style={{textAlign: "center", marginTop:5}}>
                <Card.Title>{this.props.park.name}</Card.Title>
                <p style={{ color: "green"}}>{this.props.park.description}</p>
                { this.props.park.features.length > 1 && this.props.park.features.map(feature=>{
                    return(<p>{feature.value}</p>)
                }) }
            </Card>
        );
    }
}

export default ParkCard;