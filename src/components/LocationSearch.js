import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { FormControl, InputGroup, Form } from 'react-bootstrap';

 
export default class LocationSearch extends React.Component {
 
  render() {

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
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const style={
                      backgroundColor: suggestion.active ? "#FFE485" : "#ffffff"
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