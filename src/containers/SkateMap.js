import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link } from "react-router-dom";
import ParkContainer from './ParkContainer' 
import SkateMarker from '../components/SkateMarker'
import SkatePopup from '../components/SkatePopup'
import  { Icon } from 'leaflet';
import { render } from '@testing-library/react';
import { getDistance } from 'geolib';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSkatespots, createSkatespot } from '../actions/skatespotActions';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const currentLocation = new Icon({
  iconUrl: '../currentLocation.svg',
  iconSize: [37,37]
})
const likeButton = new Icon({
  iconUrl: '../likeButton.png',
  iconSize: [37,37]
})

class SkateMap extends React.Component {

  defaultCenter = [40.7395 , -73.9027] 

  state={
    darkMode: false,
    search: "",
    distance: "",
    filteredParks: [],
    selectedPark: {},
    zoom: 10.5,
    center: this.defaultCenter,
    currentLocation: []
  }

  toggleDarkMode = () => {
    this.setState({
        darkMode: !this.state.darkMode
    })
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        currentLocation: [location.coords.latitude, location.coords.longitude],
        center: [location.coords.latitude, location.coords.longitude]
      })
    });
    this.props.fetchSkatespots()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.park){
      this.props.parks.unshift(nextProps.park)
      this.setState({
        center: [nextProps.park.location.coordinates[0] , nextProps.park.location.coordinates[1]],
        zoom: 15,
        selectedPark: nextProps.park,
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
          {id: 9, value: "Bowl", isChecked: false},
          {id: 9, value: "Ramp", isChecked: false},  
        ]
      })
    }
  }

  setPark=(park)=>{
    this.setState({
      selectedPark: park,
      center: [park.location.coordinates[0] , park.location.coordinates[1]],
      zoom: 15
    })
  }

  handleDistanceFilter=(e)=>{
    let num = parseInt(e.target.value)
    if (this.state.currentLocation.length === 2){
      let filteredParks = [];
      let zoom;
      if (num === 5){
        zoom = 12.5
      } else if (num === 10){
        zoom = 11.5
      } else if (num === 25){
        zoom = 10.5
      }
      this.setState({
        distance: num,
        zoom: zoom
      },()=>{
        this.props.parks.map(park=>{
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
  }

  clearPark=()=>{
    let center = [];
    if (this.state.currentLocation.length === 2){
      center = this.state.currentLocation
    } else {
      center = this.defaultCenter
    }
    this.setState({ 
      selectedPark: {}, 
      center: center,
      zoom: 10.5
    })
  }

  handleSearch=(e)=>{
    this.setState({
        search: e.target.value
    },()=>this.filterParks())
  } 

  filterParks(){
    this.setState({
      filteredParks: this.props.parks.filter(c=>c.name.toLowerCase().includes(this.state.search.toLowerCase()))
    })
  }

  render(){
      return (
        <div>
          <Container fluid style={{marginTop: 19, padding: 0}}>
            <Row style={{padding: 0, margin: 0}}>
              <Col xs={12} sm={12} md={9} lg={9}>
                <Card style={{marginBottom: 22}} style={{backgroundColor: "#343A40", padding: 8, marginBottom: 12}}>
                <Form inline style={{marginBottom: 8.5}}>
                  <Form.Control style={{ margin:3}} type="text" placeholder="Search Skate Spots!" onChange={(e)=>this.handleSearch(e)} />
                  <Form.Control
                      style={{ backgroundColor: "#ED5145", border: "none", margin:3, fontWeight: "600", color: "#fff"}}
                      as="select"
                      onChange={(e)=>this.handleDistanceFilter(e)}
                      custom
                  >
                      <option value="100">Distance</option>
                      <option value="5">5 miles</option>
                      <option value="10">10 miles</option>
                      <option value="25">25 miles</option>
                  </Form.Control>
                  <Form.Check
                      id="switch"
                      type="switch"
                      label="Dark Mode"
                      checked={this.state.darkMode}
                      onChange={this.toggleDarkMode}
                      style={{color: "#fff", fontWeight: "600", marginLeft: 8 }}
                  />
                </Form>
                  <Map center={ this.state.center } zoom={this.state.zoom} animate={true}>
                    { this.state.darkMode ?
                    <TileLayer
                      attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                      url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
                    />  
                    :
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                    />
                    }
                    { this.state.currentLocation.length === 2 &&
                      <Marker
                        key="currentLocation"
                        position={[this.state.currentLocation[0], this.state.currentLocation[1]]}
                      /> 
                    }
                    { (this.state.filteredParks.length > 0 ? this.state.filteredParks : this.props.parks).map(park=>{
                      return(
                        <SkateMarker
                          park={park}
                          key={park._id}
                          position={[park.location.coordinates[0] , park.location.coordinates[1]]}
                          setPark={this.setPark}
                        />
                      )
                    })}
                    { this.state.selectedPark.name && (
                      <SkatePopup
                        park={this.state.selectedPark}
                        position={[this.state.selectedPark.location.coordinates[0] , this.state.selectedPark.location.coordinates[1]]}
                        clearPark={this.clearPark}
                      />
                    )}
                  </Map>
                </Card>
              </Col>
              <Col xs={{ order: 'last' }} sm={{ order: 'last' }} md={9} lg={9}>
                <div style={{ color: "#ffffff", margin: 8, paddingBottom: 22}}>
                  <p><strong>Disclaimer: </strong>None of these spots are authorized places to skate. NYC Skatepark Directory is not responsible for your actions or what happens to you at any of these locations. If you are trespassing on someone else’s property, always be aware that you can be confronted. Follow the rules and leave to avoid further conflict. Skate at your own risk.</p>
                  <p><strong>Things to consider:</strong></p>
                  <p><strong>1. </strong>Spot names may be different than what you know them as</p>
                  <p><strong>2. </strong>Some places may not count as a “spot” to you but remember, kids just starting to skate might want to hit up that 5 stair or little ledge</p>
                  <p><strong>3. </strong><strong></strong>Double check pin locations before heading out</p>
                </div>
              </Col>
              <Col xs={12} sm={12} md={3} lg={3}>
                <ParkContainer
                  parks={ this.state.filteredParks.length > 0 ? this.state.filteredParks : this.props.parks }
                  search={this.state.search}
                  handleSearch={this.handleSearch}
                  setPark={this.setPark}
                  currentLocation={this.state.currentLocation}
                  distance={this.state.distance}
                  handleDistanceFilter={this.handleDistanceFilter}
                  darkMode={this.state.darkMode}
                  toggleDarkMode={this.toggleDarkMode}
                />
                <div style={{textAlign: "center"}}>
                  <Link to="/new">
                    <Button style={{ backgroundColor: "#ED5145", border: "none", fontWeight: "600", color: "#fff" }}>ADD A SPOT TO OUR MAP!</Button>
                  </Link>
                </div>
              </Col>
            </Row>         
          </Container>
        </div>
      );
    }

  }
  


SkateMap.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchSkatespots: PropTypes.func.isRequired,
  createSkatespot: PropTypes.func.isRequired,
  parks: PropTypes.array.isRequired,
  newPark: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  parks: state.spots.parks,
  park: state.spots.park,
});
export default connect(
  mapStateToProps,
  { fetchSkatespots, createSkatespot })(SkateMap);
