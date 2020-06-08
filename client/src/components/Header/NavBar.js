import React, { useEffect, useLayoutEffect, useState } from "react"
import Nav from 'react-bootstrap/Nav';
import fire from "./../../config/Fire";
import Notification from './Notification'
import $ from "jquery";
import './NavBar.css'


const Navbarcomp = (props) => {
    const [notifCounts, setNotifCounts] = useState(0);


    useEffect(() => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                /* axios.get(`/api/users/${user.uid}`).then((res) => {
                     props.setUserName(res.data)
                 });*/
                $.ajax({
                    url: '/api/users/' + user.uid,
                    type: 'GET',
                    success: function (res) {
                        props.setUser(res);
                    }
                });
            }
        })


    }, []);

    const logout = () => {
        window.location.href = "/login";
        fire.auth().signOut();

    }





    function LoginButton()
    { return (props.user)? (<div className="text-white"><a className="btn btn-link" href="/Profile">{props.user.name}&nbsp;<span className="badge badge-primary">Score: {props.user.totScore}</span></a>
            &nbsp; <input onClick={ logout } className="btn btn-outline-info my-2 my-sm-0" type="button" value="Logout"></input></div>):
        (<Nav.Link className="btn btn-outline-info my-2 my-sm-0" href="/Login">Login</Nav.Link>);
    }

    return (

<div>
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
       <img className="logo" src={require('./logo.png')} width="60px" height="auto" alt=""/>

       {/*<div className="my-4 my-sm-0 ml-lg-3">
            <img src={require('./notification.png')} width="25px" height="auto" alt=""/>
            <NotifBadge/>
        </div>*/}

        <Notification/>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/Home">Den <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="/Feedback">Feedback <span className="sr-only">(current)</span></a>
                </li>
            </ul>

            <LoginButton/>
        </div>
    </nav>
    <hr/>
    <br/>
</div>
    );


}

export default Navbarcomp;