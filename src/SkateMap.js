import React from 'react';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav, FormControl } from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import  { Icon } from 'leaflet';
import { render } from '@testing-library/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import PropTypes from "prop-types";
import { connect } from "react-redux";

import LocationSearch from './LocationSearch'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';  


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

class SkateMap extends React.Component {

  state={
    parks: [],
    selectedPark: {},
    zoom: 10.5,
    center: [40.7395 , -73.9027],
    address: ""
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

  handleAddressChange= (address) => {
    this.setState({ address })
  }

  handleAddressSelect = (address) => {
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    this.setState({ address})
  }

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
          <Container fluid style={{marginTop: 19}}>
            <Row>
              <Col className="AlignCenter" xs={12} sm={12} md={9} lg={9}>
                <Card style={{marginBottom: 22}}>
                  <Map center={this.state.center} zoom={this.state.zoom} className="BoxShadow">
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
              {/* <Form inline>
                <FormControl type="text" placeholder="Search Skate Spots!" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
              </Form> */}
                  <Card style={{ marginBottom: 22, padding: 12 }} className="BoxShadow">
                    <Form >
                        <div>
                          <h3 style={{textAlign: "center"}}>Add a skate spot to our map!</h3>
                          <Form.Group>
                              {/* <Form.Label>Address</Form.Label>
                              <Form.Control placeholder="Address"></Form.Control> */}
                              <LocationSearch
                                address={this.state.address}
                                handleAddressChange={this.handleAddressChange}
                                handleAddressSelect={this.handleAddressSelect}
                              />
                          </Form.Group>
                          <Form.Group>
                              <Form.Label>Description</Form.Label>
                              <Form.Control as="textarea" rows={3} placeholder="Desciption"/>
                          </Form.Group>
                          <Form.Group>
                              <Form.File id="exampleFormControlFile1" label="Upload Image" />
                          </Form.Group>
                          <Button variant="primary" className="BoxShadow" onClick={()=>this.handleSubmit(this.state)}>Create Spot!</Button>
                        </div>
                    </Form>
                  </Card>
                  <Card style={{ marginBottom: 22, padding: 12, minHeight: "25vh" }} className="BoxShadow">
                    <h4 style={{textAlign: "center"}}>Park Details</h4>
                    { this.state.selectedPark.name && <div>
                      <h5>{this.state.selectedPark.name}</h5>
                      <p>{this.state.selectedPark.status}</p>
                    </div>}
                  </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

  }
  


SkateMap.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
)(SkateMap);
