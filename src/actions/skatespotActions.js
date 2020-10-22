import { FETCH_SKATESPOTS, CREATE_SKATESPOT, FILTER_SKATESPOTS } from "./types";

export const fetchSkatespots = () => dispatch => {
    fetch("/api/skatespots")
    .then(resp=>resp.json())
    .then(parks=>
        dispatch({
            type: FETCH_SKATESPOTS,
            payload: parks
        })
    )    
}

export const createSkatespot = newSpot => dispatch => {
    fetch('/api/skatespots/create',{
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

