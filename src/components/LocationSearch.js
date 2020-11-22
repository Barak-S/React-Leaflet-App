import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { Form } from 'react-bootstrap';

 
export default class LocationSearch extends React.Component {
 
  render() {
    // console.log(this.props.currentLocation)

    return (
        <PlacesAutocomplete
          value={this.props.address}
          onChange={(e)=>this.props.handleAddressChange(e)}
          onSelect={(e)=>this.props.handleAddressSelect(e)}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <Form.Label style={{width: "100%", textAlign: "left"}}>Address</Form.Label>
                <Form.Control placeholder= "Address" style={{ height: 36 }} {...getInputProps({
                    autoComplete: "new-password"
                })}>
                </Form.Control>    
              <div style={{cursor: "pointer", fontSize: 15.5 }}>
                {loading && <div style={{backgroundColor: "#fff", color: "#333"}}>Loading...</div>}
                {/* {this.props.currentLocation.length ===  2 && <div style={{backgroundColor: "#fff", color: "#333"}}>Current Location</div>} */}
                {suggestions.map(suggestion => {
                  const style={
                      backgroundColor: suggestion.active ? "#FFE485" : "#ffffff",
                      color: "#333"
                  };
                  return(<div {...getSuggestionItemProps(suggestion, { style })} key={suggestion.description}>{suggestion.description }</div>)
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
    );
  }
}