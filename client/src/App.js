import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import NotFound from "./components/Shared/NotFound";
import Door from './views/Door'
import NavBar from "./components/Shared/Header/NavBar";
import LoginApp from "./views/Login/LoginApp";
import Signup from "./views/Signup/Signup";
import Feedback from './views/Feedback/Feedback'
import ResetPassword from './views/ResetPassword/ResetPassword'
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
        if (user) {
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
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Login" component={LoginApp}/>
                    <Route exact path="/Signup" component={Signup}/>
                    <Route exact path="/Feedback" component={Feedback}/>
                    <Route exact path="/Home" render={(props) => <Door {...props} user={user} socket={socket}/>}/>
                    <Route exact path="/Profile" render={(props) => <Door user={user}  socket={socket}/>}/>
                    <Route exact path="/Profile/:id" render={(props) => <Door user={user}  socket={socket}/>}/>
                    <Route exact path="/Posts/:id" render={(props) => <Door user={user}  socket={socket}/>}/>
                    <Route exact path="/Users" render={(props) => <Users user={user}  socket={socket}/>} />
                    <Route exact path="/Notifications" render={(props) => <Door user={user}  socket={socket}/>}/>
                    <Route exact path="/ResetPass" render={(props) => <ResetPassword user={user}  socket={socket}/>}/>
                    <Route exact path="/" render={(props) => <Door {...props} user={user} socket={socket}/>}/>
                    <Route path="/404" component={NotFound}/>
                    <Redirect to="/404"/>
                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
