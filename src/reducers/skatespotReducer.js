import { FETCH_SKATESPOTS } from "../actions/types";

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
    default:
      return state;
  }
}