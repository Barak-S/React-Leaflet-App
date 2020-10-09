import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

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
    zoom: 11,
    center: [40.7580 , -73.9855]
  }

  componentDidMount(){
    fetch("https://data.cityofnewyork.us/resource/pvvr-75zk.json")
    // .then(data=>data.JSON())
    .then(resp=>resp.json())
    .then(data=>this.setState({
      parks: data
    }))
  }

  setPark=(park)=>{
    this.setState({
      selectedPark: park,
      zoom: 15,
      center: [park.polygon.coordinates[0][0][1] , park.polygon.coordinates[0][0][0]]
    })
  }

  render(){

      return (
        <div>
          <h2 style={{textAlign:"center"}}>NYC Skatepak Directory</h2>
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={9} lg={9}>
                <Card>
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
                        onClose={()=>this.setState({ selectedPark: {}, zoom: 11, center: [40.7580 , -73.9855] })}
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
                  <Card style={{height: "100vh", textAlign: "center"}}>
                  </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

  }
  

export default App;
