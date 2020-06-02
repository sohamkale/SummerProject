import React, { useEffect, useLayoutEffect, useState } from "react"
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import fire from "./../../config/Fire";
import {Button} from "react-bootstrap";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";


const Navbarcomp = (props) => {

    useEffect(() => {
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                props.setUserUid(user.uid);
                props.setUserEmail(user.email);
                axios.get(`/api/users/${user.uid}`).then((res) => {
                    props.setUserName(res.data)
                });
            }
        })


    }, []);

    /*useLayoutEffect (() => {
        if(userUid != null){
        var db = fire.database();
        var ref = db.ref(`${userUid}/Navbar`);
        ref.on("value", function(userSnapshot) {
            userSnapshot.forEach(function(snapshot) {
                if(snapshot.key === "initials"){
                   
                    setInitials(snapshot.val());
                }
            });
        });
    }
    }, [userUid])*/

    const logout = () => {
        window.location.href = "/login";
        fire.auth().signOut();

    }
    return (
/*<ReactBootStrap.Navbar collapseOnSelect expand="sm" bg="light" variant="light">
<ReactBootStrap.Navbar.Brand href="/home">{initials}</ReactBootStrap.Navbar.Brand>
<ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
<ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
<ReactBootStrap.Nav className="mr-auto">
            <Nav.Link href="/LoggedIn">LoggedInTest</Nav.Link>
            {/!* {isUser ? <Nav.Link href="/true/Login">Dashboard</Nav.Link> : <Nav.Link href="/true/Login">Login</Nav.Link>}
            {isUser ? null : <Nav.Link href="/true/Signup">Signup</Nav.Link>} *!/}
            <Nav.Link href="/Login">Login</Nav.Link>
            {/!* <Nav.Link href="/Signup">Signup</Nav.Link> *!/}
            {isUser ? <Button onClick={logout}>logout</Button> : <Nav.Link href="/Signup">Signup</Nav.Link>}
</ReactBootStrap.Nav>
</ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>*/
<div>
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">FACETWEETIT</a>
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