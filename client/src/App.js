import React, {useEffect, useState} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import NotFound from "./components/Shared/NotFound";
import Door from './views/Home/Door'
import NavBar from "./components/Header/NavBar";
import LoginApp from "./views/Login/LoginApp";
import Signup from "./views/Signup/Signup";

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
          {/*<Route component={NotFound}/>*/}

      </div>
  );
}

export default App;
