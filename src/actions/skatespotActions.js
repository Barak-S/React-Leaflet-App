import { FETCH_SKATESPOTS, CREATE_SKATESPOT } from "./types";

export const fetchSkatespots = () => dispatch => {
    fetch("/api/skatespots")
    .then(resp=>resp.json())
    .then(parks=>
        dispatch({
            type: FETCH_SKATESPOTS,
            payload: parks
        })
    )
        // navigator.geolocation.getCurrentPosition(location => {
        //     this.setState({
        //     currentLocation: [location.coords.latitude, location.coords.longitude],
        //     center: [location.coords.latitude, location.coords.longitude]
        //     })
        // });
    
}

export const createSkatespot = (skateSpot) => dispatch => {
    let trueFeatures = [] 
      skateSpot.features.forEach(feature=>{
        if(feature.isChecked){
          trueFeatures.push(feature)
        }
      }) 
      let newSpot = {
        location: {
          coordinates: skateSpot.coordinates
        },
        name: skateSpot.name,
        address: skateSpot.address,
        description: skateSpot.description,
        features: trueFeatures,
        postedBy: this.props.auth.user.id,
        likes: 0,
        comments: []
      }
      fetch('/api/skatespots/create',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newSpot })
      }).then(resp=>resp.json())
      .then(newPark=>this.addNewSpotToMap(newPark))
}