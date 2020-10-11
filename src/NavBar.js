import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav, FormControl } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";


class NavBar extends React.Component {

    state={
        LOGGED_IN: false
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.setState({
                LOGGED_IN: true
            })
        } else {
            this.setState({
                LOGGED_IN: false
            })
        }
    }

    logOut=()=>{
        if(this.state.LOGGED_IN === true){
            this.setState({
                LOGGED_IN: false
            })
            this.props.logoutUser()
        }
    }

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
                    <Nav className="ml-auto">
                        { this.state.LOGGED_IN === true ?
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Nav.Link href="#link" style={{ color:"#000000", paddingTop: 12}} onClick={()=>this.logOut()}>Log Out</Nav.Link>   
                        </Link>
                        :
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Nav.Link href="#link" style={{ color:"#000000", paddingTop: 12}}>Log In</Nav.Link>   
                        </Link>
                        }
                    </Nav>
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