import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
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
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <Nav.Link href="#link" style={{ color:"#000000", paddingTop: 12}}>Sign Up</Nav.Link>   
                    </Link>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Nav.Link href="#link" style={{ color:"#000000", paddingTop: 12}}>Log In</Nav.Link>   
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;