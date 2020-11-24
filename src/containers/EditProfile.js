import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classnames from "classnames";
import { verifyPassword } from "../actions/authActions";
import axios from "axios";


class EditProfile extends Component {

    constructor(props){
        super(props)
        this.state={
            name: "",
            email: "",
            oldPassword: "",
            newPassword: "",
            errors: { alert: ""}
        }
        // this.baseState = this.state 
    }

    handleChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount(){
        fetch(`https://skate-spot-backend.herokuapp.com/api/users/${this.props.auth.user.id}`)
        .then(res=>res.json())
        .then(user => this.setState({
            name: user.name,
            email: user.email,
        }))
    }

    onSubmit(){
        let accountInfo = { 
            email: this.state.email, 
            newPassword: this.state.newPassword, 
            oldPassword: this.state.oldPassword, 
            id: this.props.auth.user.id 
        }
        axios.post("https://skate-spot-backend.herokuapp.com/api/users/verify", accountInfo)
        .then(data => {
            if (data.data.errors){
                console.log(data.data.errors)
                this.state.errors.alert = data.data.errors
            } else {
                console.log(data)
                this.state.errors.alert = "success"
            }
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <Col xs={12} sm={12} md={5} mg={5} style={{ textAlign: "center", marginTop:22, paddingBottom: 45 }} className="AlignCenter">  
                <h3 style={{margin: 10, color: "#ED5145"}}>Profile</h3>
                <Card className="form">
                    <Form style={{padding: 15 }}>
                        { errors.alert !== "" && <Alert key={'success'} variant={'success'}>
                            { errors.alert }
                        </Alert>}
                        <h3>Update Account Info</h3>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="name" 
                                name="name" 
                                error={errors.name} 
                                placeholder="name" 
                                value={this.state.name} 
                                onChange={(e)=>this.handleChange(e)} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="oldPassword" 
                                error={errors.oldPassword} 
                                placeholder="Old Password" 
                                value={this.state.oldPassword} 
                                onChange={(e)=>this.handleChange(e)} 
                                className={classnames("", {
                                    invalid: errors.oldPassword || errors.passwordincorrect
                                })}
                            />
                            <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="newPassword" 
                                error={errors.newPassword} 
                                placeholder="New Password" 
                                value={this.state.newPassword} 
                                onChange={(e)=>this.handleChange(e)} 
                                className={classnames("", {
                                    invalid: errors.newPassword || errors.passwordincorrect
                                })}
                            />
                            <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>
                        </Form.Group>
                        <Form.Text className="text-muted" style={{ paddingBottom: 15, fontWeight: "600" }}>Dont have an account? <Link to="/signup">Sign Up</Link></Form.Text>
                        <Button className="continue-button" onClick={()=>this.onSubmit()}>
                            Save Info
                        </Button>
                    </Form>
                </Card>
            </Col>
        );
    }
}

EditProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps, { verifyPassword }
)(EditProfile);
