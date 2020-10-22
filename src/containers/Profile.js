import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux"

class Profile extends Component {

    state={
        mySpots: []
    }

    componentDidMount(){
        fetch(`/api/users/${this.props.auth.user.id}/myspots`)
        .then(resp=>resp.json())
        .then(mySpots=>this.setState({ mySpots }))
    }

    mapFeatures(park){
        let featureLength = park.features.length;
        return(
            park.features.map((feature, i)=>{
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
            <div style={{minHeight: "90vh", textAlign: "center", color: "#FFE485", marginTop:22 }}>   
                <h3>{this.props.auth.user.name}</h3>
                <h6 style={{marginTop: 10}}>My Spots</h6>
                <Row>
                    <Col xs={12} sm={12} md={10} lg={10} className="AlignCenter">
                        {this.state.mySpots.map(park=>{
                            return(
                                <Card style={{marginTop:12, marginBottom: 25, textAlign: "left", backgroundColor: "#343A40", padding:18}}>
                                    <div style={{paddingLeft: 8}}>
                                        <Card.Title style={{ textAlign: "center" }}>{park.name}</Card.Title>
                                        { park.address && <h6>Address: {park.address}</h6>}
                                        <p style={{ color: "green", marginBottom: 10}}>{park.description}</p>
                                        { park.features.length !== 0 &&
                                        <div style={{paddingBottom: 3}}>
                                            <p style={{ color: "#217AC9"}}>Spot Features:</p>
                                            { this.mapFeatures(park) } 
                                        </div>}
                                    </div>
                                </Card>
                            )
                        })}
                    </Col>
                </Row>
            </div>
        );
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(Profile);