import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Signup extends React.Component{

    constructor(props){
        super(props)
        this.state={
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
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
        fetch('/api/users/register',{
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
        //   .then(this.resetForm())
    }

    render(){
        const { errors } = this.state;
        return (
            <Row className="LogInSignUp" style={{height: "100vh"}}>
                <Col xs={12} sm={12} md={4} lg={4} className="AlignCenter">
                    <Card className="form">
                        <Form style={{padding: 15}}>
                            <h3>Sign Up</h3>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" placeholder="Enter Name" error={errors.name} value={this.state.name} onChange={(e)=>this.handleChange(e)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" error={errors.email} placeholder="Enter email" value={this.state.email} onChange={(e)=>this.handleChange(e)} />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" error={errors.password} placeholder="Password" value={this.state.password} onChange={(e)=>this.handleChange(e)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="password2" error={errors.password2} placeholder="Password" value={this.state.password2} onChange={(e)=>this.handleChange(e)} />
                            </Form.Group>
                            <Form.Text className="text-muted" style={{paddingBottom: 15}}>Already have an account? <Link to="/login">Log In</Link></Form.Text>
                            <Button variant="primary" className="BoxShadow" onClick={()=>this.handleSubmit(this.state)}>
                                Register
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Signup;