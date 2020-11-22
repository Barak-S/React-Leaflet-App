import React, { Component } from 'react';
import { Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class Login extends React.Component{

    constructor(props){
        super(props)
        this.state={
            name: "",
            email: "",
            password: "",
            errors: {}
        }
        this.baseState = this.state 
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/"); // push user to dashboard when they login
        }
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

    resetForm = () => {
        this.setState(this.baseState)
    }

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData); 
        // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
      }

    render(){
        const { errors } = this.state;
        return (
            <div className="LogInSignUp">
                <Col xs={12} sm={12} md={4} lg={4} style={{paddingTop:22}} className="AlignCenter">
                    <Card className="form">
                        <Form style={{padding: 15 }}>
                            <h3>Log In</h3>
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
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
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
                                        invalid: errors.password || errors.passwordincorrect
                                    })}
                                />
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </Form.Group>
                            <Form.Text className="text-muted" style={{ paddingBottom: 15, fontWeight: "600" }}>Dont have an account? <Link to="/signup">Sign Up</Link></Form.Text>
                            <Button className="continue-button" onClick={(e)=>this.onSubmit(e)}>
                                Log In
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);