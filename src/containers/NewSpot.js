import React, { Component } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import LocationSearch from '../components/LocationSearch'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSkatespot } from '../actions/skatespotActions';
// import SkateMarker from '../components/SkateMarker'
import { Map, Marker, TileLayer } from 'react-leaflet';
import  { Icon } from 'leaflet';
import L from 'leaflet';

const skateboard = new Icon({
  iconUrl: '../skateboard.svg',
  iconSize: [25,25]
})

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


class NewSpot extends Component {

  defaultCenter = [40.7395 , -73.9027] 

  state={
    darkMode: false,
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
      {id: 9, value: "Bowl", isChecked: false},
      {id: 9, value: "Ramp", isChecked: false},
    ],
    coordinates: [],
  }

  handleAddressChange=(address)=> {
      this.setState({ address })
  }

  handleAddressSelect = (address) => {
      geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then( coords =>{
          this.setState({
            center: [coords.lat, coords.lng ],
            address
          })
      })
  }

  handleChange=(e)=>{
      this.setState({
          [e.target.name]: e.target.value
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
          coordinates: this.state.center
        },
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        features: trueFeatures,
        postedBy: this.props.auth.user.id,
        likes: 0,
        comments: []
      }
      this.props.createSkatespot(newSpot)
      this.props.history.push('/')
    } 
  }

  toggleDarkMode = () => {
    this.setState({
        darkMode: !this.state.darkMode
    })
  }

  render() {

      console.log(this.props.auth.isAuthenticated)

      return (
        <div style={{ padding: 25, color: "#fff"}}>
          <Col xs={12} sm={12} md={6} lg={6} className="AlignCenter">
            <Card style={{ padding:12, backgroundColor: "#343A40" }}>
              <Form >
                <div>
                  <h3 style={{textAlign: "center"}}>Add a skate spot to our map!</h3>
                  <hr/>
                  <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control name="name" value={this.state.name} placeholder="Name" onChange={(e)=>this.handleChange(e)}/>
                  </Form.Group>
                  <Form.Group>
                      <LocationSearch
                        currentLocation={this.state.currentLocation}
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
                      <Form.Control as="textarea" rows={3} name="description" value={this.state.description} placeholder="Desciption" onChange={(e)=>this.handleChange(e)}/>
                  </Form.Group>
                  <Form.Group>
                      <Form.File id="exampleFormControlFile1" label="Upload Image" />
                  </Form.Group>
                  <Button style={{backgroundColor: "#ED5145", border: "none"}} className="BoxShadow" onClick={()=>this.createSpot()}>Create Spot!</Button>
                </div>
              </Form>
              <hr/>
              <Form style={{padding: 8}}>
                <Form.Check
                  id="switch"
                  type="switch"
                  label="Dark Mode"
                  checked={this.state.darkMode}
                  onChange={this.toggleDarkMode}
                  style={{color: "#fff", fontWeight: "600", marginLeft: 8 }}
                />
              </Form>
              <Map center={ this.state.center } zoom={12} animate={true} dragging={false} style={{height: 400}}>
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
                {this.state.center !== this.defaultCenter ? 
                <Marker
                  position={ this.state.center }
                  icon={ skateboard }
                /> : null }
              </Map>
          </Card>
        </Col>
      </div>

      );
  }
}

NewSpot.propTypes = {
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
    { createSkatespot })(NewSpot);
  
