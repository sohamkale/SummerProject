import React, { useEffect, useLayoutEffect, useState } from "react"
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import fire from "./../../config/Fire";
import {Button} from "react-bootstrap";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import './NavBar.css'


const Navbarcomp = (props) => {
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
                    success: function (user) {
                        props.setUserScore(user.totScore);
                        props.setUserName(user.name);
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
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/Home">Den <span className="sr-only">(current)</span></a>
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
        return (props.userUid!=null)? (<div className="text-white"><a className="btn btn-link" href="/Profile">{props.username}&nbsp;<span className="badge badge-primary">Score: {props.userscore}</span></a>
                 &nbsp; <input onClick={ logout } className="btn btn-outline-info my-2 my-sm-0" type="button" value="Logout"></input></div>):
            (<Nav.Link className="btn btn-outline-info my-2 my-sm-0" href="/Login">Login</Nav.Link>);
    }
}

export default Navbarcomp;