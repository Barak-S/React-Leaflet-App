import React from 'react'
import { Col, Row, Container } from 'react-bootstrap';

export default function Footer() {
    return (
        // <div id="footer" style={{ textAlign: "center", fontSize: 17, fontWeight: "600", color: "#ED5145", backgroundColor: "#343A40" }}>
        //     <p style={{margin: 0, padding: 7}}>© 2020, Sk8 Park Finder <br/> <a alt="Barak Saidoff Developer Potfolio" target="_blank" href="https://baraksaidoff.com/" style={{color: "#ED5145" }}>Barak Web Development</a></p>
        // </div>
        <div style={{color: "#ED5145", backgroundColor: '#343A40'}}>
        <Container style={{paddingTop: 12}}>
            <Row>
                <Col>
                    <h4>Sk8 Park Finder</h4>
                    <h3 className="list-unstyled">
                    <li>New York, NY</li>
                    </h3>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <p>© 2020, <a alt="Barak Saidoff Developer Potfolio" target="_blank" href="https://baraksaidoff.com/" style={{color: "#ED5145" }}>Barak Web Development</a></p>
                </Col>
            </Row>
        </Container>
    </div>

    )
}
