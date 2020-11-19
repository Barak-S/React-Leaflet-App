import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import SkateMap from './containers/SkateMap'
import NavBar from './containers/NavBar'
import SignUp from './containers/Signup'
import LogIn from './containers/Login'
import Footer from './components/Footer'
import Profile from './containers/Profile'
import NewSpot from './containers/NewSpot'
import PrivateRoute from "./private-route/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends React.Component{

  render(){
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar/>
              <Route exact path= "/" render={(routerProps) => <SkateMap {...routerProps} />}/>
              <Route exact path= "/signup" render={(routerProps) => <SignUp {...routerProps} />}/>
              <Route exact path= "/login" render={(routerProps) => <LogIn {...routerProps} />}/>
              <Switch>
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/new" component={NewSpot} />
                {/* <Route exact path= "/myspots" render={(routerProps) => <MySpots {...routerProps} />}/> */}
              </Switch>
          </div>
          <Footer/>
        </Router>
      </Provider>
    );
  }


}
  
export default App;
