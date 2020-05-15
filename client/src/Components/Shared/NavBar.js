import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">SoHigh</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Den</Nav.Link>
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
          </Nav>
            <Nav.Link href="#account" className="justify-self-end">Welcome! @Name</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    )
};

export default NavBar;
