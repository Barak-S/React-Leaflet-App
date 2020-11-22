import React, { Component } from 'react';
import { Marker } from 'react-leaflet';
import  { Icon } from 'leaflet';

const skateboard = new Icon({
    iconUrl: '../skateboard.svg',
    iconSize: [25,25]
})

function SkateMarker(props) {
        return (
            <Marker
                key={props.park.name}
                position={props.position}
                onClick={()=>props.setPark(props.park)}
                icon={ skateboard }
            />
        );
}

export default SkateMarker;