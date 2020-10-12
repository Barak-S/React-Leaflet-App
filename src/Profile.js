import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux"

class Profile extends Component {
    render() {
        return (
            <div style={{minHeight: "90vh", textAlign: "center", color: "#FFE485" }}>
                <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                            <>
                        <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                        activeKey="/home"
                        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                        >
                            <div className="sidebar-sticky"></div>
                            <Nav.Item>
                                <Nav.Link href="/home">Edit Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-1">Favorites</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2">Link</Nav.Link>
                            </Nav.Item>
                        </Nav>

                    </>
                      
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
                        <h6>Profile</h6>
                        <h3>{this.props.auth.user.name}</h3>

                    </Col> 
                </Row>

            </Container>

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