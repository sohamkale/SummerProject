import React, { useEffect, useLayoutEffect, useState } from "react"
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import fire from "./../../config/Fire";
import {Button} from "react-bootstrap";
import * as ReactBootStrap from "react-bootstrap";
import './NavBar.css'


const Navbarcomp = () => {
    const [initials, setInitials] = useState("");
    const [userUid, setUserUid] = useState(null);
    const [isUser, setIsUser] = useState(false);

    useEffect (() => {
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUserUid(user.uid);
                setIsUser(true);
            } else {
            }
          });
    }, [])

    useLayoutEffect (() => {
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
    }, [userUid])

    const logout = () => {
        // window.location.href = "/login";
        fire.auth().signOut();
        
    }
    return (
/*<ReactBootStrap.Navbar collapseOnSelect className="bg-dark navbar-dark justify-content-between" expand="md" variant="light">
<ReactBootStrap.Navbar.Brand href="/home">{initials}</ReactBootStrap.Navbar.Brand>
<ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
<ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
<ReactBootStrap.Nav>
            <Nav.Link href="/home">Home</Nav.Link>
            {/!* {isUser ? <Nav.Link href="/true/Login">Dashboard</Nav.Link> : <Nav.Link href="/true/Login">Login</Nav.Link>}
            {isUser ? null : <Nav.Link href="/true/Signup">Signup</Nav.Link>} *!/}
            <Nav.Link href="/Login">Login</Nav.Link>

            <form className="form-check-inline">
                {isUser ? <Button className="my-2 my-sm-0" onClick={logout}>logout</Button> : <Nav.Link className="my-2 my-sm-0" href="/Signup">Signup</Nav.Link>}
            </form>

</ReactBootStrap.Nav>
</ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>*/
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" href="#">Hidden brand</a>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
}

export default Navbarcomp;