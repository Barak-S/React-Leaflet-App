import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux"
import ParkCard from '../components/ParkCard'

class Profile extends Component {

    state={
        mySpots: [],
        deleteModal: false
    }

    componentDidMount(){
        fetch(`https://skate-spot-backend.herokuapp.com/api/users/${this.props.auth.user.id}/myspots`)
        .then(resp=>resp.json())
        .then(mySpots=>this.setState({ mySpots }))
    }

    removeSpotfromState=(parkID)=>{
        let newArray = this.state.mySpots.filter((park)=> park._id !== parkID)
        this.setState({
            mySpots: newArray
        })
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

    handleClose=()=>{
        this.setState({ deleteModal: !this.state.deleteModal })
    }

    deletePark=(park)=>{
        fetch(`https://skate-spot-backend.herokuapp.com/api/skatespots/${park._id}/delete`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: park._id })
        })
        .then(resp=>resp.json())
        .then(deletedSpot => this.removeSpotfromState(deletedSpot._id))
    }
    

    render() {
        return (
            <div style={{minHeight: "90vh", textAlign: "center", marginTop:22, paddingBottom: 20 }}>  
                <div style={{color: "#FFE485"}}>
                    <h3>{this.props.auth.user.name}</h3>
                    <h6 style={{marginTop: 10}}>My Spots</h6>
                </div> 
                    <Col xs={12} sm={12} md={10} lg={10} className="AlignCenter">
                        {this.state.mySpots.map(park=>{
                            return(
                                <ParkCard
                                    key={park._id}
                                    park={park}
                                    deletePark={this.deletePark}
                                    currentLocation={[]}
                                />
                            )
                        })}
                    </Col>
                {this.state.deleteModal === true && 
                    <>
                    <Modal
                        show={this.state.deleteModal}
                        onHide={this.handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Are you sure you want to delete?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>This Skate Spot will permanently be removed.</Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger" onClick={()=>this.deleteLoan()}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                    }
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