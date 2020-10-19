import { FETCH_SKATESPOTS, CREATE_SKATESPOT } from "../actions/types";

const initialState = {
    parks: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_SKATESPOTS:
      return {
          ...state, 
          parks: action.payload
        };
    case CREATE_SKATESPOT:
      return {
          ...state, 
          park: action.payload
        };
    default:
      return state;
  }
}