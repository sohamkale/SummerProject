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
import io from 'socket.io-client';
let socket;
const App = (props) => {
    const [user, setUser] = useState(null);
    const ENDPOINT = "/";
    const [socketIO, setsocketIO] = useState(null);
    
/*  const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");*/
    useEffect(() => {
        if(user){
            let room = "commonRoom";
            socket = io(ENDPOINT);
            setsocketIO(socket);
            let currUser = user.name;
            let currUserUid = user.userId;
            socket.emit('join', {currUser, room, currUserUid});
            socket.on('joinedRoom', message => {
                console.log(message);
                // alert(message.text);
            });
    }
    }, [ENDPOINT, user]);
  return (
      <div>
          <NavBar user={user} setUser={setUser} socket={socket}/>
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
          <Route exact path="/Home" render={(props) => <Door {...props} user={user} socket={socket} />}/>
          <Route exact path="/Profile" render={(props) => <Door user={user} />}/>
          <Route exact path="/Profile/:id" render={(props) => <Door user={user} />}/>
          <Route exact path="/Posts/:id" render={(props) => <Door user={user} />}/>
          <Route exact path="/Users" render={(props) => <Users user={user} />}/>
          <Route exact path="/Notifications" render={(props) => <Door user={user} />}/>
          <Route exact path="/" render={(props) => <Door {...props} user={user} />}/>
          {/*<Route component={NotFound}/>*/}

      </div>
  );
}

export default App;
