import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import skatespotReducer from "./skatespotReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  spots : skatespotReducer
});