import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import ParkCard from './ParkCard'

class ParkContainer extends Component {



    render() {
        
        return (
            <Card style={{ marginBottom: 22, padding: 12, minHeight: "25vh" }} className="BoxShadow">
                <Form inline style={{marginBottom: 8.5}}>
                <Form.Control type="text" placeholder="Search Skate Spots!" className="mr-sm-2" />
                <Button style={{backgroundColor: "#ED5145", borderColor: "#000000" , borderWidth: 0.25, borderRadius: 6, fontWeight: "600"}}>Search</Button>
                </Form>
                <h4 style={{textAlign: "center", fontWeight: "600"}}>Skate Spots Nearby</h4>
                    <div className="ParkCol">
                        {this.props.parks.map(park=>{
                            return(
                                <ParkCard
                                    key={park._id}
                                    park={park}
                                />
                            )
                        })}
                    </div>
            </Card>
        );
    }
}

export default ParkContainer;