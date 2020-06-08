import React, {useEffect, useState} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import NotFound from "./components/Shared/NotFound";
import Door from './views/Home/Door'
import NavBar from "./components/Header/NavBar";
import LoginApp from "./views/Login/LoginApp";
import Signup from "./views/Signup/Signup";
import Feedback from './views/Feedback/Feedback'
import './font.css'
import Users from "./views/Users/Users";
const App = (props) => {
    const [user, setUser] = useState(null);

/*  const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");*/

  return (
      <div>
          <NavBar user={user} setUser={setUser}/>
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
          <Route exact path="/Feedback" component={Feedback} />
          <Route exact path="/Home" render={(props) => <Door {...props} user={user} />}/>
          <Route exact path="/Profile" render={(props) => <Door user={user} />}/>
          <Route exact path="/Posts/:id" render={(props) => <Door user={user} />}/>
          <Route exact path="/Users" render={(props) => <Users user={user} />}/>
          <Route exact path="/" render={(props) => <Door {...props} user={user} />}/>
          {/*<Route component={NotFound}/>*/}

      </div>
  );
}

export default App;
