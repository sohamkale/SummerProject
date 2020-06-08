import React, { useEffect, useLayoutEffect, useState } from "react"
import Nav from 'react-bootstrap/Nav';
import fire from "./../../config/Fire";
import $ from "jquery";
import './NavBar.css'


const Navbarcomp = (props) => {
    const [notifCount, setNotifCount] = useState(0);


    useEffect(() => {
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                props.setUserUid(user.uid);
                props.setUserEmail(user.email);
               /* axios.get(`/api/users/${user.uid}`).then((res) => {
                    props.setUserName(res.data)
                });*/
                $.ajax({
                    url: '/api/users/'+user.uid,
                    type: 'GET',
                    success: function (res) {
                        props.setUserName(res);
                    }
                });
            }
        })


    }, []);


    const logout = () => {
        window.location.href = "/login";
        fire.auth().signOut();

    }
    return (

<div>
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
       <img className="logo" src={require('./logo.png')} width="60px" height="auto" alt=""/>

        <img className="my-2 my-sm-0" src={require('./notification.png')} width="25px" height="auto" alt=""/>
        <span className="badge badge-light notif-count">4</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Den <span className="sr-only">(current)</span></a>
                </li>
            </ul>

            <LoginButton/>
        </div>
    </nav>
    <hr/>
    <br/>
</div>
    );

    function LoginButton()
    {
        return (props.userUid!=null)? (<div className="text-white">{props.username} &nbsp; <input onClick={ logout } className="btn btn-outline-info my-2 my-sm-0" type="button" value="Logout"></input></div>):
            (<Nav.Link className="btn btn-outline-info my-2 my-sm-0" href="/Login">Login</Nav.Link>);
    }
}

export default Navbarcomp;