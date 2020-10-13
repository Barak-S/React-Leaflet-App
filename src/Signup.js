import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav, FormControl } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "./actions/authActions";

import classnames from "classnames";

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

    componentDidMount() {
        // If logged in and user navigates to Signup page, it should redirect them to dashboard.
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    // resetForm = () => {
    //     this.setState(this.baseState)
    // }

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history); 
    };

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
                                <Form.Control 
                                    name="name" 
                                    placeholder="Enter Name" 
                                    error={errors.name} 
                                    value={this.state.name} 
                                    onChange={(e)=>this.handleChange(e)} 
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                                <span className="red-text">{errors.name}</span>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name="email" 
                                    error={errors.email} 
                                    placeholder="Enter email" 
                                    value={this.state.email} 
                                    onChange={(e)=>this.handleChange(e)}
                                    className={classnames("", {
                                        invalid: errors.email
                                    })} 
                                />
                                <span className="red-text">{errors.email}</span>
                                <Form.Text style={{ fontWeight: "600" }}className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    name="password" 
                                    error={errors.password} 
                                    placeholder="Password" 
                                    value={this.state.password} 
                                    onChange={(e)=>this.handleChange(e)} 
                                    className={classnames("", {
                                        invalid: errors.password
                                    })}
                                />
                                <span className="red-text">{errors.password}</span>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    name="password2" 
                                    error={errors.password2} 
                                    placeholder="Password" 
                                    value={this.state.password2} 
                                    onChange={(e)=>this.handleChange(e)} 
                                    className={classnames("", {
                                        invalid: errors.password2
                                    })}
                                />
                                <span className="red-text">{errors.password2}</span>
                            </Form.Group>
                            <Form.Text className="text-muted" style={{paddingBottom: 15, fontWeight: "600" }}>Already have an account? <Link to="/login">Log In</Link></Form.Text>
                            <Button style={{ backgroundColor: "#ED5145", borderColor: "#000000" , borderWidth: 0.25 }} className="BoxShadow" onClick={(e)=>this.onSubmit(e)}>
                                Register
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        );
    }
}

Signup.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Signup));