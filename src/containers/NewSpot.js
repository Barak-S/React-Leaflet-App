import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import LocationSearch from '../components/LocationSearch'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


class NewSpot extends Component {
    state={
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
              coordinates: [coords.lat, coords.lng ],
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
              coordinates: this.state.coordinates
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
        } else {
          console.log("Please Log In")
        }
    
      }

    render() {
        return (
            <Col xs={12} sm={12} md={4} lg={4} className="AlignCenter">
            <Card style={{ margin:22, padding: 12, color: "#FFE485", backgroundColor: "#343A40" }}>
              <Form >
                  <div>
                    <h3 style={{textAlign: "center"}}>Add a skate spot to our map!</h3>
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
            </Card>
        </Col>

        );
    }
}

export default NewSpot;
