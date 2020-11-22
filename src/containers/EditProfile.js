import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { Col, Form, Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classnames from "classnames";


class EditProfile extends Component {

    constructor(props){
        super(props)
        this.state={
            name: "",
            email: "",
            oldPassword: "",
            newPassword: "",
            errors: {}
        }
        // this.baseState = this.state 
    }

    componentDidMount(){
        fetch(`https://skate-spot-backend.herokuapp.com/api/users/${this.props.auth.user.id}`)
        .then(res=>res.json())
        .then(user => this.setState({
            name: user.name,
            email: user.email,
            password: user.password
        }))
    }

    onSubmit(e){
        console.log("saving")
    }

    // STEPS:
    // email - verify email
    // verify old password
    // bcrypt new password 

    render() {
        const { errors } = this.state;
        return (
            <Col xs={12} sm={12} md={5} mg={5} style={{ textAlign: "center", marginTop:22, paddingBottom: 45 }} className="AlignCenter">  
                <h3 style={{margin: 10, color: "#ED5145"}}>Profile</h3>
                <Card className="form">
                    <Form style={{padding: 15 }}>
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
                                className={classnames("", {
                                    invalid: errors.email || errors.emailnotfound
                                })}
                            />
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
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control 
                                type="oldPassword" 
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
                                type="newPassword" 
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
                        <Button className="continue-button" onClick={(e)=>this.onSubmit(e)}>
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
