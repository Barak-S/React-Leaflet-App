import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav, FormControl } from 'react-bootstrap';

class Signup extends React.Component{

    constructor(props){
        super(props)
        this.state={
            name: "",
            email: "",
            password: "",
            password2: "",
        }
        this.baseState = this.state 
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    resetForm = () => {
        this.setState(this.baseState)
    }

    handleSubmit(user){
        fetch('http://localhost:5000/api/users/register',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password,
                password2: user.password2
            })
          })
          .then(resp=>resp.json())
          .then(data=>console.log(data))
          .then(this.resetForm())
    }

    render(){

        return (
            <Row>
                <Col xs={12} sm={12} md={4} lg={4} className="AlignCenter">
                    <Card>
                        <Form style={{padding: 15}}>
                            <h3>Sign Up</h3>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" placeholder="Enter Name" onChange={(e)=>this.handleChange(e)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" onChange={(e)=>this.handleChange(e)} />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" onChange={(e)=>this.handleChange(e)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="password2" placeholder="Password" onChange={(e)=>this.handleChange(e)} />
                            </Form.Group>
                            <Button variant="primary" onClick={()=>this.handleSubmit(this.state)}>
                                Lets Go!
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Signup;