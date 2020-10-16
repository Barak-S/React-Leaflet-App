import { Popup } from 'react-leaflet';
import React, { Component } from 'react';

class SkatePopup extends Component {
    state = {
        userName: ""
    }

    componentDidMount(){
        if (this.props.park.postedBy){
            fetch(`/api/users/${this.props.park.postedBy}`)
            .then(resp=>resp.json())
            .then(userName=> 
                this.setState({ userName })
            )
        }
    }

    render() {
        return (
            <Popup
                position={this.props.position}
                onClose={()=>this.props.clearPark()}
            >
                <div>
                    <h3>{this.props.park.name}</h3>
                    <p>{this.props.park.description}</p>
                    <p style={{fontWeight: "600"}}><img src="../likeButton.png" style={{height: 22, width:22}}/>{' '}{`${this.props.park.likes !== undefined ? this.props.park.likes : 0} Likes`}</p>
                    {this.props.park.postedBy !== undefined && <div><p style={{display: "inline"}}>Added by: </p><p style={{fontWeight: "600", display: "inline", color: "#217AC9"}}> {this.state.userName}</p></div>}
                </div>
            </Popup>
        );
    }
}

export default SkatePopup;