import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux"

class Profile extends Component {
    render() {
        return (
            <div style={{minHeight: "90vh", textAlign: "center", color: "#FFE485", marginTop: 25, marginBottom: 35}}>
                <h6>Profile</h6>
                <h3>{this.props.auth.user.name}</h3>
                <Row>
                    <Col xs={12} sm={12} md={4} lg={4} className="AlignCenter">
                    <Card className="form" style={{color: "#000000"}}>
                        <Form style={{padding: 15}}>
                            <h3>Update Acount Info</h3>
                            <Form.Group>
                                <Form.Label>Edit Name</Form.Label>
                                <Form.Control 
                                    name="name" 
                                    placeholder="Name" 
                                    value={this.props.auth.user.name}
                                    // error={errors.name} 
                                    // value={this.state.name} 
                                    // onChange={(e)=>this.handleChange(e)} 
                                    // type="text"
                                    // className={classnames("", {
                                    //     invalid: errors.name
                                    // })}
                                />
                                {/* <span className="red-text">{errors.name}</span> */}
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    name="password" 
                                    placeholder="Password" 
                                    // error={errors.password} 
                                    // value={this.state.password} 
                                    // onChange={(e)=>this.handleChange(e)} 
                                    // className={classnames("", {
                                    //     invalid: errors.password
                                    // })}
                                />
                                {/* <span className="red-text">{errors.password}</span> */}
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    name="password2" 
                                    placeholder="Password" 
                                    // error={errors.password2} 
                                    // value={this.state.password2} 
                                    // onChange={(e)=>this.handleChange(e)} 
                                    // className={classnames("", {
                                    //     invalid: errors.password2
                                    // })}
                                />
                                {/* <span className="red-text">{errors.password2}</span> */}
                            </Form.Group>
                            <Button style={{backgroundColor: "#FE5F55", borderColor: "#000000"}} className="BoxShadow" onClick={(e)=>this.onSubmit(e)}>
                                Save
                            </Button>
                        </Form>
                    </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(Profile);