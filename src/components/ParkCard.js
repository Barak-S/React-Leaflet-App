import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { getDistance } from 'geolib';

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
            <Card style={{marginTop:8, textAlign: "left", cursor: "pointer"}} onClick={()=>{ this.props.setPark && this.props.setPark(this.props.park)}}>
                <div style={{paddingLeft: 8}}>
                    <Card.Title style={{ textAlign: "center" }}>{this.props.park.name}</Card.Title>
                    { this.props.park.address && <h6>Address: {this.props.park.address}</h6>}
                    <p style={{ color: "green", marginBottom: 5}}>{this.props.park.description.length > 100 ? this.props.park.description.slice(0, 99) + "..." : this.props.park.description }</p>
                    { this.props.park.features.length !== 0 &&
                    <div style={{paddingBottom: 8}}>
                        <p style={{ color: "#217AC9", fontWeight: '600'}}>Spot Features:</p>
                        { this.mapFeatures() } 
                        { this.props.currentLocation.length === 2 && <p style={{marginBottom: 3, color: "green", fontWeight: "600"}}>Distance: {(getDistance({ latitude: this.props.currentLocation[0], longitude: this.props.currentLocation[1]}, { latitude:this.props.park.location.coordinates[0], longitude: this.props.park.location.coordinates[1]}) *0.000621371192).toFixed(1) } miles away</p>}
                    </div>}
                </div>
                { this.props.deletePark && 
                    <Col style={{textAlign: "center", paddingBottom: 8}}>
                        <Button style={{backgroundColor: "#ED5145", border: 'none'}} onClick={()=>this.props.deletePark(this.props.park._id)}>Delete</Button>
                    </Col>
                    
                    
                }
            </Card>
        );
    }
}

export default ParkCard;

