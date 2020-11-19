import { Popup } from 'react-leaflet';
import React, { Component } from 'react';

class SkatePopup extends Component {
    state = {
        userName: "",
        likes: this.props.park.likes
    }

    componentDidMount(){
        fetch(`https://skate-spot-backend.herokuapp.com/api/skatespots/${this.props.park._id}`)
        .then(resp=>resp.json())
        .then(park=>this.setState({
            likes: park.likes
        }))
        if (this.props.park.postedBy){
            fetch(`https://skate-spot-backend.herokuapp.com/api/users/${this.props.park.postedBy}`)
            .then(resp=>resp.json())
            .then(userName=> 
                this.setState({ userName },()=>console.log(userName))
            )
        }
    }

    increaseLike(id){
        fetch(`https://skate-spot-backend.herokuapp.com/api/skatespots/${id}/like`,{
            method: 'PUT',
            headers: {
            "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(likes => this.setState({ likes: likes.likes + 1}))
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
                    <p style={{fontWeight: "600"}}><img src="../likeButton.png" style={{height: 22, width:22, cursor: "pointer"}} onClick={()=>this.increaseLike(this.props.park._id)}/>{' '}{`${this.state.likes !== undefined ? this.state.likes : 0} Likes`}</p>
                    {this.props.park.postedBy !== undefined && <div><p style={{display: "inline"}}>Added by: </p><p style={{fontWeight: "600", display: "inline", color: "#217AC9"}}> {this.state.userName}</p></div>}
                </div>
            </Popup>
        );
    }
}

export default SkatePopup;