import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SkateMap from './SkateMap'
import NavBar from './NavBar'
import SignUp from './Signup'
import LogIn from './Login'

function App(){

  return (
      <Router>
        <NavBar/>
        <div className="App">
          <Switch>
            <Route exact path= "/" render={(routerProps) => <SkateMap {...routerProps} />}/>
            <Route exact path= "/signup" render={(routerProps) => <SignUp {...routerProps} />}/>
            <Route exact path= "/login" render={(routerProps) => <LogIn {...routerProps} />}/>
          </Switch>
        </div>
      </Router>
  );

}
  
export default App;
