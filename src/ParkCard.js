import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

class ParkCard extends Component {

    mapFeatures(){
        let featureLength = this.props.park.features.length;
        return(
            this.props.park.features.map((feature, i)=>{
                if (featureLength === i+1){
                    return(<p style={{fontWeight: "600", display: "inline"}}>{'  '}{feature.value}</p>)
                } else {
                    return(<p style={{fontWeight: "600", display: "inline"}}>{'  '}{feature.value + ","}</p>)
                    }
                })
        ) 
    } 
    render() {
        return (
            <Card style={{marginTop:5, textAlign: "left"}} onClick={()=>this.props.setPark(this.props.park)}>
                <div style={{paddingLeft: 8}}>
                    <Card.Title style={{ textAlign: "center" }}>{this.props.park.name}</Card.Title>
                    { this.props.park.address && <h6>Address: {this.props.park.address}</h6>}
                    <p style={{ color: "green", marginBottom: 5}}>{this.props.park.description}</p>
                    { this.props.park.features.length !== 0 && 
                    <div style={{paddingBottom: 8}}>
                        <p style={{ color: "#217AC9", marginBottom: 3}}>Spot Features:</p>
                        { this.mapFeatures() } 
                    </div>}
                </div>
            </Card>
        );
    }
}

export default ParkCard;

