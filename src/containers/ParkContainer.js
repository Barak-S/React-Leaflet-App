import React, { Component } from 'react';
import { Card, Form } from 'react-bootstrap';
import ParkCard from '../components/ParkCard'
import { getDistance } from 'geolib';


class ParkContainer extends Component {

    sortLowtoHigh(parks){
        if (this.props.currentLocation.length === 2){
            parks.sort((a,b)=>{
                return getDistance({ latitude: this.props.currentLocation[0], longitude: this.props.currentLocation[1]}, { latitude: a.location.coordinates[0], longitude: a.location.coordinates[1]}) - getDistance({ latitude: this.props.currentLocation[0], longitude: this.props.currentLocation[1]}, { latitude: b.location.coordinates[0], longitude: b.location.coordinates[1]})
            })
        }
    }

    render() {
        this.sortLowtoHigh(this.props.parks)
        return (
            <Card style={{ marginBottom: 22, padding: 12, minHeight: "25vh", backgroundColor: "#343A40" }} className="BoxShadow">
                <Form inline style={{marginBottom: 8.5}}>
                    <Form.Control style={{marginRight: 8, marginTop: 5}} type="text" value={this.props.search} placeholder="Search Skate Spots!" onChange={(e)=>this.props.handleSearch(e)} />
                    <Form.Control
                        style={{marginRight: 8, marginTop: 5, backgroundColor: "#ED5145",border: "none"}}
                        as="select"
                        onChange={(e)=>this.props.handleDistanceFilter(e)}
                        className="mr-sm-2"
                        id="inlineFormCustomSelect"
                        custom
                    >
                        <option value="100">Distance</option>
                        <option value="5">5 miles</option>
                        <option value="10">10 miles</option>
                        <option value="25">25 miles</option>
                    </Form.Control>
                    <Form.Check
                        id="switch-1"
                        type="switch"
                        label="Dark Mode"
                        checked={this.props.darkMode}
                        onChange={this.props.toggleDarkMode}
                        style={{color: "#fff"}}
                    />
                </Form>
                <h4 style={{textAlign: "center", fontWeight: "600", color: "#FFE485"}}>Skate Spots Nearby</h4>
                    <div className="ParkCol">
                        {this.props.parks.map(park=>{
                            return(
                                <ParkCard
                                    key={park._id}
                                    park={park}
                                    setPark={this.props.setPark}
                                    currentLocation={this.props.currentLocation}
                                />
                            )
                        })}
                    </div>
            </Card>
        );
    }
}

export default ParkContainer;