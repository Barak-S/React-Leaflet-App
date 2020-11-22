import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { Col, Button, Modal } from 'react-bootstrap';
import ParkCard from '../components/ParkCard'



class MySpots extends Component {

    state={
        mySpots: [],
        deleteModal: false,
        setPark: {}
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

    setPark=(park)=>{
        this.setState({
            deleteModal: true,
            setPark: park
        })
    }

    deletePark=(parkID)=>{
        fetch(`https://skate-spot-backend.herokuapp.com/api/skatespots/${parkID}/delete`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parkID })
        })
        .then(resp=>resp.json())
        .then(deletedSpot => {
            this.removeSpotfromState(deletedSpot._id) 
            this.setState({deleteModal: false}) 
        })
    }
    

    render() {
        return (
                <Col xs={12} sm={12} md={10} lg={10} className="AlignCenter" >
                    <h3 style={{margin: 10, color: "#ED5145"}}>My Spots</h3>
                    {this.state.mySpots.map(park=>{
                        return(
                            <ParkCard
                                key={park._id}
                                park={park}
                                deletePark={this.setPark}
                                currentLocation={[]}
                            />
                        )
                    })}
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
                        <Button style={{backgroundColor: "#ED5145", border: 'none'}} onClick={()=>this.deletePark(this.state.setPark)}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                    }
                </Col>
        );
    }
}

MySpots.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(MySpots);