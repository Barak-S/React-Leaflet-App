import React from 'react';
import './App.css';

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

class App extends React.Component {

  state={
    parks: [],
    selectedPark: {}
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
      selectedPark: park
    })
  }

  render(){

      return (
        <div className="App">
          <p>React-Leaflet App</p>
          <Map center={[40.7580 , -73.9855]} zoom={11}>
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
                />
              )
            })}
            { this.state.selectedPark.name && (
              <Popup
                position={[this.state.selectedPark.polygon.coordinates[0][0][1] , this.state.selectedPark.polygon.coordinates[0][0][0]]}
                onClose={()=>this.setState({ selectedPark: {} })}
              >
                <div>
                  <h3>{this.state.selectedPark.name}</h3>
                  <p>{this.state.selectedPark.status}</p>
                </div>

              </Popup>
            )}
          </Map>
        </div>
      );
    }

  }
  

export default App;
