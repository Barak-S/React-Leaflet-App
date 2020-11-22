import React, { Component } from 'react';
import { Tabs, Tab, Col, Button, Modal } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux"
import ParkCard from '../components/ParkCard'
import MySpots from './MySpots'

class Profile extends Component {    

    render() {
        return (
            <div style={{ textAlign: "center", marginTop:22, paddingBottom: 45 }}>  
                <div style={{color: "#ED5145"}}>
                    <h3>{this.props.auth.user.name}</h3>
                </div> 
                <Tabs defaultActiveKey="myspots" >
                    <Tab eventKey="myspots" title="My Spots">
                       <MySpots/> 
                    </Tab>
                    <Tab eventKey="account" title="Account">
                        <p>edit profile</p>
                    </Tab>
                </Tabs>
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