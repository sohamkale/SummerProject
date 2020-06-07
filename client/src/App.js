import React, {useEffect, useState} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import NotFound from "./components/Shared/NotFound";
import Door from './views/Home/Door'
import ProfileDoor from './views/Profile/ProfileDoor'
import NavBar from "./components/Header/NavBar";
import LoginApp from "./views/Login/LoginApp";
import Signup from "./views/Signup/Signup";
import AppModal from "./components/Shared/Modal"
import {Button} from "react-bootstrap";

const App = (props) => {
    const [username, setUserName] = useState(null);
    const [useremail, setUserEmail] = useState(null);
    const [userUid, setUserUid] = useState(null);
    const [userscore, setUserScore] = useState(0);
/*    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");*/

  return (
      <div>
          <NavBar setUserScore={setUserScore} username={username} setUserName={setUserName} userUid={userUid} setUserUid={setUserUid} setUserEmail={setUserEmail}/>
{/*

          <AppModal
              show={modalShow}
              onHide={() => {setModalShow(false)}}
              title={modalTitle}
              body={modalBody}
          />
*/}

        {/*  <Button variant="primary" onClick={() => {setModalShow(true); setModalTitle("Modal Title"); setModalBody('ModalBody')}}>
              Modal Test
          </Button>*/}

          {/*<Door/>*/}
          <Route exact path="/Login" component={LoginApp} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Home" render={(props) => <Door {...props} userscore={userscore} username={username} userUid={userUid} />}/>
          <Route exact path="/Profile" render={(props) => <ProfileDoor userscore={userscore} {...props} username={username} userUid={userUid} />}/>
          <Route exact path="/" render={(props) => <Door {...props} username={username} userUid={userUid} />}/>
          {/*<Route component={NotFound}/>*/}

      </div>
  );
}

export default App;
