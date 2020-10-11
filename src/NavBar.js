import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";


class NavBar extends React.Component {

    render(){

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ marginBottom: 19 }} className="BoxShadow">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Nav.Link href="#link" style={{ color: "#FFE485", fontSize: 22, fontWeight: "600"}}>NYC Skatepark Directory</Nav.Link>
                        </Link>
                    </Nav>
                        { this.props.auth.isAuthenticated ? 
                    <Nav className="ml-auto">
                        <Navbar.Text style={{ color:"#FFE485", fontWeight: "600" }}>
                            Signed in as:
                        </Navbar.Text>
                        <NavDropdown title={<span style={{ color:"#FFE485", fontWeight: "600" }}>{this.props.auth.user.name}</span>} id="collasible-nav-dropdown">
                            <NavDropdown.Item>My Spots</NavDropdown.Item>
                            <NavDropdown.Item>Activity</NavDropdown.Item>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <Nav.Link className="NavLinks" style={{ color:"#000000", paddingTop: 8}} onClick={()=>this.props.logoutUser()}>Log Out</Nav.Link>   
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                        :
                    <Nav className="ml-auto">
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Nav.Link href="#link" className="NavLinks" style={{ color:"#000000", paddingTop: 8  }}>Log In</Nav.Link>   
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