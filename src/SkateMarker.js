import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';
import  { Icon } from 'leaflet';

const skateboard = new Icon({
    iconUrl: '../skateboard.svg',
    iconSize: [25,25]
  })

class SkateMarker extends Component {
    render() {
        return (
            <Marker
                key={this.props.park.name}
                position={this.props.position}
                onClick={()=>this.props.setPark(this.props.park)}
                icon={ skateboard }
            />
        );
    }
}

export default SkateMarker;