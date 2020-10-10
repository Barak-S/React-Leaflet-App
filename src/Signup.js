import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav, FormControl } from 'react-bootstrap';

function Signup(){
        return (
            <Row>
                <Col xs={12} sm={12} md={4} lg={4} className="AlignCenter">
                    <Card>
                        <Form style={{padding: 15}}>
                            <h3>Sign Up</h3>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Lets Go!
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        );
}

export default Signup;