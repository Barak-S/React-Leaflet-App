import { FETCH_SKATESPOTS, CREATE_SKATESPOT, FILTER_SKATESPOTS, DELETE_SKATESPOT } from "./types";

export const fetchSkatespots = () => dispatch => {
    fetch("https://skate-spot-backend.herokuapp.com/api/skatespots")
    .then(resp=>resp.json())
    .then(parks=>
        dispatch({
            type: FETCH_SKATESPOTS,
            payload: parks
        })
    )    
}

export const createSkatespot = newSpot => dispatch => {
    fetch('https://skate-spot-backend.herokuapp.com/api/skatespots/create',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({newSpot})
      }).then(resp=>resp.json())
    .then(park=> 
        dispatch({
            type: CREATE_SKATESPOT,
            payload: park
        })
    )
}

export const deleteSkatespot = parkID => dispatch => {
    fetch(`https://skate-spot-backend.herokuapp.com/api/skatespots/${parkID}/delete`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parkID })
    })
}
