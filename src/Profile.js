import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux"

class Profile extends Component {
    render() {
        return (
            <div style={{minHeight: "90vh", textAlign: "center", color: "#FFE485" }}>   
                <h6>Profile</h6>
                <h3>{this.props.auth.user.name}</h3>
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