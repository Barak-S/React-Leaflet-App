import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { Col, Form, Button, Card, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classnames from "classnames";
import axios from "axios";


class EditProfile extends Component {

    constructor(props){
        super(props)
        this.state={
            name: "",
            email: "",
            oldPassword: "",
            newPassword: "",
            errors: {
                newPassword: "",
                oldPassword: ""
            },
            alert: ""
        }
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
        axios.post("http://localhost:5000/api/users/verify", accountInfo)
        .then(data => {
            if (data.data.newPassword || data.data.oldPassword){
                this.setState({
                    errors: data.data
                })
            }else if (data.data._id) {
                this.setState({
                    errors: {
                        newPassword: "",
                        oldPassword: ""
                    },
                    alert: "Password successfully Updated!"
                })
            }
        })
        .catch(err=> console.log(err))
    }

    render() {
        const { errors } = this.state;
        return (
            <Col xs={12} sm={12} md={5} mg={5} style={{ textAlign: "center", marginTop:22, paddingBottom: 45 }} className="AlignCenter">  
                <h3 style={{margin: 10, color: "#ED5145"}}>Profile</h3>
                { this.state.alert.length > 1 && 
                <>
                <Toast>
                    <Toast.Header>
                    <strong className="mr-auto">Success!</strong>
                    <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>{this.state.alert}.</Toast.Body>
                </Toast>
                </>}
                <Card className="form">
                    <Form style={{padding: 15 }}>
                        <h3>Update Account Info</h3>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="name" 
                                name="name" 
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
                                    invalid: errors.oldPassword 
                                })}
                            />
                            <span className="red-text">
                                {errors.oldPassword}
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
                                    invalid: errors.newPassword 
                                })}
                            />
                            <span className="red-text">
                                {errors.newPassword }
                            </span>
                        </Form.Group>
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
    mapStateToProps,
)(EditProfile);
