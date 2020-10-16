import React from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import ParkContainer from './ParkContainer' 
import  { Icon } from 'leaflet';
import { render } from '@testing-library/react';
import { getDistance } from 'geolib';
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
const currentLocation = new Icon({
  iconUrl: '../currentLocation.svg',
  iconSize: [37,37]
})

class SkateMap extends React.Component {

  defaultCenter = [40.7395 , -73.9027] 

  state={
    search: "",
    distance: "",
    parks: [],
    filteredParks: [],
    selectedPark: {},
    zoom: 10,
    center: this.defaultCenter,
    name: "",
    address: "",
    description: "",
    features: [
      {id: 1, value: "Park", isChecked: false},
      {id: 2, value: "Hand Rail", isChecked: false},
      {id: 3, value: "Stairs", isChecked: false},
      {id: 4, value: "Box", isChecked: false},
      {id: 5, value: "Ledge", isChecked: false},
      {id: 6, value: "Rail", isChecked: false},
      {id: 7, value: "Quarter Pipe", isChecked: false},
      {id: 8, value: "Half Pipe", isChecked: false},
    ],
    coordinates: [],
    currentLocation: []
    
  }

  componentDidMount(){
    // fetch("https://data.cityofnewyork.us/resource/pvvr-75zk.json")
    fetch("/api/skatespots")
    .then(resp=>resp.json())
    .then(data=>this.setState({
      parks: data,
      filteredParks: data
    }))
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        currentLocation: [location.coords.latitude, location.coords.longitude],
        center: [location.coords.latitude, location.coords.longitude]
      })
    });
  }

  setPark=(park)=>{
    this.setState({
      selectedPark: park,
      center: [park.location.coordinates[0] , park.location.coordinates[1]],
      zoom: 15
    })
  }

  handleAddressChange=(address)=> {
    this.setState({ address })
  }

  handleDescriptionChange=(e)=>{
    this.setState({
      description: e.target.value
    })
  }

  handleNameChange=(e)=>{
    this.setState({
      name: e.target.value
    })
  }

  handleDistanceFilter=(e)=>{
    let filteredParks = [];
    this.setState({
      distance: parseInt(e.target.value)
    },()=>{
      this.state.parks.map(park=>{
        let distance = (getDistance({ latitude: this.state.currentLocation[0], longitude: this.state.currentLocation[1]}, { latitude: park.location.coordinates[0], longitude: park.location.coordinates[1]}) *0.000621371192).toFixed(1)
        if (parseInt(distance) <= this.state.distance){
          filteredParks.push(park)
        }
      })
      this.setState({
        filteredParks
      })
    })
  }

  handleCheckbox=(key, status)=>{
    let features = [...this.state.features]
    let selected = features.find(park=>park.value === key)
    selected.isChecked = !status
    this.setState({
      features
    })
  }

  handleAddressSelect = (address) => {
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then( coords =>{
        this.setState({
          coordinates: [coords.lat, coords.lng ],
          address
        })
    })
  }

  clearPark(){
    let center = [];
    if (this.state.currentLocation.length === 2){
      center = this.state.currentLocation
    } else {
      center = this.defaultCenter
    }
    this.setState({ 
      selectedPark: {}, 
      center: center,
      zoom: 10
    })
  }

  createSpot=()=>{
    if (this.props.auth.isAuthenticated === true ){
      let trueFeatures = []
  
      this.state.features.forEach(feature=>{
        if(feature.isChecked){
          trueFeatures.push(feature)
        }
      })
      
      let newSpot = {
        location: {
          coordinates: this.state.coordinates
        },
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        features: trueFeatures
      }
      fetch('/api/skatespots/create',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newSpot })
      }).then(resp=>resp.json())
      .then(newPark=>this.addNewSpotToMap(newPark))

    } else {
      console.log("Please Log In")
    }

  }

  addNewSpotToMap=(newSpot)=>{
    let parks = [...this.state.parks]
    parks.push(newSpot)
    this.setState({
      parks: parks,
      filteredParks: parks,
      center: [newSpot.location.coordinates[0] , newSpot.location.coordinates[1]],
      zoom: 15,
      selectedPark: newSpot,
      name: "",
      address: "",
      description: "",
      features: [
        {id: 1, value: "Park", isChecked: false},
        {id: 2, value: "Hand Rail", isChecked: false},
        {id: 3, value: "Stairs", isChecked: false},
        {id: 4, value: "Box", isChecked: false},
        {id: 5, value: "Ledge", isChecked: false},
        {id: 6, value: "Rail", isChecked: false},
        {id: 7, value: "Quarter Pipe", isChecked: false},
        {id: 8, value: "Half Pipe", isChecked: false},
      ]
    })
  }

  handleSearch=(e)=>{
    this.setState({
        search: e.target.value
    },()=>this.filterParks())
  } 

  filterParks(){
    this.setState({
      filteredParks: this.state.parks.filter(c=>c.name.toLowerCase().includes(this.state.search.toLowerCase()))
    })
  }


  render(){

      return (
        <div style={{minHeight: "100vh", marginLeft: 12.5, marginRight:12.5}}>
          <Container fluid style={{marginTop: 19}}>
            <Row>

              <Col xs={12} sm={12} md={9} lg={9}>
                <Card style={{marginBottom: 22}}>
                  <Map center={ this.state.center } zoom={this.state.zoom} className="BoxShadow">
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {this.state.parks.map(park=>{
                      return(
                        <Marker
                          key={park.name}
                          position={[park.location.coordinates[0] , park.location.coordinates[1]]}
                          onClick={()=>this.setPark(park)}
                          icon={ skateboard }
                        />
                      )
                    })}
                    { this.state.currentLocation[1] &&
                      <Marker
                        key="currentLocation"
                        position={[this.state.currentLocation[0], this.state.currentLocation[1]]}
                      /> 
                    }
                    { this.state.selectedPark.name && (
                      <Popup
                        position={[this.state.selectedPark.location.coordinates[0] , this.state.selectedPark.location.coordinates[1]]}
                        onClose={()=>this.clearPark()}
                      >
                        <div>
                          <h3>{this.state.selectedPark.name}</h3>
                          <p>{this.state.selectedPark.description}</p>
                        </div>

                      </Popup>
                    )}
                  </Map>
                </Card>
              </Col>
              <Col xs={12} sm={12} md={3} lg={3}>
                <ParkContainer
                  parks={this.state.filteredParks}
                  search={this.state.search}
                  handleSearch={this.handleSearch}
                  setPark={this.setPark}
                  currentLocation={this.state.currentLocation}
                  distance={this.state.distance}
                  handleDistanceFilter={this.handleDistanceFilter}
                />
                <Card style={{ marginBottom: 22, padding: 12 }} className="BoxShadow">
                  <Form >
                      <div>
                        <h3 style={{textAlign: "center"}}>Add a skate spot to our map!</h3>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" value={this.state.name} placeholder="Name" onChange={(e)=>this.handleNameChange(e)}/>
                        </Form.Group>
                        <Form.Group>
                            <LocationSearch
                              address={this.state.address}
                              handleAddressChange={this.handleAddressChange}
                              handleAddressSelect={this.handleAddressSelect}
                            />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Features</Form.Label>
                          <br/>
                          { this.state.features.map((check)=><Form.Check inline label={check.value} type={'checkbox'} isChecked={check.isChecked} onChange={()=>this.handleCheckbox(check.value, check.isChecked)}/>)}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={this.state.description} placeholder="Desciption" onChange={(e)=>this.handleDescriptionChange(e)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.File id="exampleFormControlFile1" label="Upload Image" />
                        </Form.Group>
                        <Button variant="dark" className="BoxShadow" onClick={()=>this.createSpot()}>Create Spot!</Button>
                      </div>
                  </Form>
                </Card>
              </Col>
            </Row>
              <Col className="AlignCenter" xs={12} sm={12} md={9} lg={9}>
                <div style={{ color: "#ffffff"}}>
                  <p>Disclaimer: None of these spots are authorized places to skate. NYC Skatepark Directory is not responsible for your actions or what happens to you at any of these locations. If you are trespassing on someone else’s property, always be aware that you can be confronted. Follow the rules and leave to avoid further conflict. Skate at your own risk.</p>
                  <p>Things to consider:</p>
                  <p>1. Spot names may be different than what you know them as</p>
                  <p>2. Some places may not count as a “spot” to you but remember, kids just starting to skate might want to hit up that 5 stair or little ledge</p>
                  <p>3. Double check pin locations before heading out</p>
                </div>
              </Col>
            
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
