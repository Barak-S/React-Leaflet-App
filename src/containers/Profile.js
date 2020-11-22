import React from 'react';
import { Tabs, Tab, Col } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux"
import MySpots from './MySpots'

function Profile(props){    

    return (
        <Col xs={12} sm={12} md={10} mg={10} style={{ textAlign: "center", marginTop:22, paddingBottom: 45 }} className="AlignCenter">  
            <div style={{color: "#ED5145"}}>
                <h3>{props.auth.user.name}</h3>
            </div> 
            <Tabs defaultActiveKey="myspots" >
                <Tab eventKey="myspots" title="My Spots">
                    <MySpots/> 
                </Tab>
                <Tab eventKey="account" title="Account">
                    <p>edit profile</p>
                </Tab>
            </Tabs>
        </Col>
    );
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