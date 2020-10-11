import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav, FormControl } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";


class NavBar extends React.Component {

    render(){

        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{ marginBottom: 19 }} className="BoxShadow">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Nav.Link href="#link" style={{ color:"#000000", fontSize: 22}}>NYC Skatepark Directory</Nav.Link>
                        </Link>
                    </Nav>
                        { this.props.auth.isAuthenticated ? 
                    <Nav className="ml-auto">
                        <Navbar.Text style={{ color:"#000000", paddingTop: 8}}>
                            Signed in as: {this.props.auth.user.name} |
                        </Navbar.Text>
                        <Link to="/">
                            <Nav.Link href="#link" style={{ color:"#000000", paddingTop: 8}} onClick={()=>this.props.logoutUser()}>Log Out</Nav.Link>   
                        </Link>
                    </Nav>
                        :
                    <Nav className="ml-auto">
                        <Link to="/login">
                            <Nav.Link href="#link" style={{ color:"#000000", paddingTop: 8}}>Log In</Nav.Link>   
                        </Link>
                    </Nav>
                        }
                </Navbar.Collapse>
            </Navbar>
        );

    }
}

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(NavBar);