import React, { Component } from 'react';
import { Card, Form } from 'react-bootstrap';
import ParkCard from './ParkCard'

class ParkContainer extends Component {

    render() {
        
        return (
            <Card style={{ marginBottom: 22, padding: 12, minHeight: "25vh" }} className="BoxShadow">
                <Form inline style={{marginBottom: 8.5}}>
                <Form.Control type="text" value={this.props.search} placeholder="Search Skate Spots!" onChange={(e)=>this.props.handleSearch(e)} />
                </Form>
                <h4 style={{textAlign: "center", fontWeight: "600"}}>Skate Spots Nearby</h4>
                    <div className="ParkCol">
                        {this.props.parks.map(park=>{
                            return(
                                <ParkCard
                                    key={park._id}
                                    park={park}
                                    setPark={this.props.setPark}
                                />
                            )
                        })}
                    </div>
            </Card>
        );
    }
}

export default ParkContainer;