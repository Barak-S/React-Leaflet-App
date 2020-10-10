import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav, FormControl } from 'react-bootstrap';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import  { Icon } from 'leaflet';
import { render } from '@testing-library/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const skateboard = new Icon({
  iconUrl: '../skateboard.svg',
  iconSize: [25,25]
})

class App extends React.Component {

  state={
    parks: [],
    selectedPark: {},
    zoom: 10.5,
    center: [40.7395 , -73.9027]
  }

  componentDidMount(){
    fetch("https://data.cityofnewyork.us/resource/pvvr-75zk.json")
    .then(resp=>resp.json())
    .then(data=>this.setState({
      parks: data
    }))
  }

  setPark=(park)=>{
    this.setState({
      selectedPark: park,
      center: [park.polygon.coordinates[0][0][1] , park.polygon.coordinates[0][0][0]],
      zoom: 15
    })
  }

  // determineZoom(){
  //   if(this.state.selectedPark.name){
  //     this.setState({
  //       zoom: 15
  //     })
  //   } else {
  //     this.setState({
  //       zoom: 10.5
  //     })
  //   }
  // }

  clearPark(){
    this.setState({ 
      selectedPark: {}, 
      center: [40.7395 , -73.9027],
      zoom: 10.5
    })
  }

  render(){

      return (
        <div>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{marginBottom: 19}}>
            <Navbar.Brand href="#home">NYC Skatepark Directory</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search Skate Spots!" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
            </Form>
            </Navbar.Collapse>
          </Navbar>
          <Container fluid>
            <Row>
              <Col className="Map" xs={12} sm={12} md={9} lg={9}>
                <Card style={{marginBottom: 22}}>
                  <Map center={this.state.center} zoom={this.state.zoom}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {this.state.parks.map(park=>{
                      return(
                        <Marker
                          key={park.name}
                          position={[park.polygon.coordinates[0][0][1] , park.polygon.coordinates[0][0][0]]}
                          onClick={()=>this.setPark(park)}
                          icon={ skateboard }
                        />
                      )
                    })}
                    { this.state.selectedPark.name && (
                      <Popup
                        position={[this.state.selectedPark.polygon.coordinates[0][0][1] , this.state.selectedPark.polygon.coordinates[0][0][0]]}
                        onClose={()=>this.clearPark()}
                      >
                        <div>
                          <h3>{this.state.selectedPark.name}</h3>
                          <p>{this.state.selectedPark.status}</p>
                        </div>

                      </Popup>
                    )}
                  </Map>
                </Card>
              </Col>
              <Col>
                  <Card style={{ padding: 15}}>
                    <h3>Sign Up</h3>
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                      </Form.Group> */}
                      <Button variant="primary" type="submit">
                        Lets Go!
                      </Button>
                    </Form>
                  </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

  }
  

export default App;
