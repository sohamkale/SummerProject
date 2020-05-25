import React, {useEffect, useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch, Redirect  } from 'react-router-dom';
import NotFound from "./components/Shared/NotFound";
// import NavBar from "./Components/Shared/NavBar";

import Home from "./views/Home/Home"
import NavBar from "./components/Header/NavBar";
import LoginApp from "./views/Login/LoginApp";
import Signup from "./views/Signup/Signup";
import usersFront from "./components/UsersFront";
import fire from './config/Fire'
import io from 'socket.io-client';
const App = () => {
  useEffect(() => {
    let socket = io();
    // alert(socket);
    {
      socket.on('message', data => {
        alert(data)
    })}
  }, []);

  
  return (
    //Imported public NavBar
    <div>
    
      <NavBar />
      <Switch>
      <Route exact path="/Home" render={(props) => <Home {...props} isLoggedIn={false} />}/>
      {/* <Route exact path="/contact" component={ContactMe} /> */}
      <Route exact path="/Login" component={LoginApp} />
      <Route exact path="/Signup" component={Signup} />
      <Route exact path="/usersFront" component={usersFront} />
      {/* <Route exact path="/delete" component={DeleteImage}/> */}
      {/* remove this above line */}
      <Route exact path="/">
        <Redirect to="/Login" />
      </Route>
        <Route component={NotFound}/>
      </Switch>
      {/* <div className="container-fluid">
        <Body/>
      </div> */}
    </div>
  );
}

export default App;
