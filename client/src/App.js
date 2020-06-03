import React, {useEffect, useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch, Redirect  } from 'react-router-dom';
import NotFound from "./components/Shared/NotFound";
// import NavBar from "./Components/Shared/NavBar";

import LoggedInTest from './views/Home/LoggedInTest'
import Home from "./views/Home/Home"
import Door from './views/Home/Door'
import NavBar from "./components/Header/NavBar";
import LoginApp from "./views/Login/LoginApp";

import Signup from "./views/Signup/Signup";
import usersFront from "./components/UsersFront";
import fire from './config/Fire'
import io from 'socket.io-client';
const App = (props) => {
    const [username, setUserName] = useState(null);
    const [useremail, setUserEmail] = useState(null);
    const [userUid, setUserUid] = useState(null);

  return (
      <div>
          <NavBar username={username} setUserName={setUserName} userUid={userUid} setUserUid={setUserUid} setUserEmail={setUserEmail}/>
          {/*<Door/>*/}
          <Route exact path="/Login" component={LoginApp} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Home" render={(props) => <Door {...props} username={username} userUid={userUid} />}/>
          <Route exact path="/" render={(props) => <Door {...props} username={username} userUid={userUid} />}/>

      </div>
  );
}

export default App;
