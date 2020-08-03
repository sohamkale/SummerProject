import './SignupComp.css';
import React , { Component, useEffect, useState } from "react";

// import Footer from "../Footer/Footer";
import {Container, Row, Col, Button, Image} from 'react-bootstrap';
const SignupComp = (props) => {
    return(     
        <div>
        <div className="SignupClassFullDiv">
        <Container fluid className=" SignupClassMainDiv">
            <Row fluid className="bg-dark text-white SignupClassMainDiv SignupCardBorder">
                <Col sm={12}>
                <div className="SignupButtonMargin" align="center"><h2>Sign Up</h2></div>
                </Col>
                <Col mb={6}>
                <input name="firstName" onChange={props.handleFirstNameChange} value={props.firstName} id="firstName" type="text" placeholder="First Name" className="input"/>
                </Col>
                <Col mb={6}>
                <input name="lastName" onChange={props.handleLastNameChange} value={props.lastName} id="lastName" type="text" placeholder="Last Name" className="input"/>
                </Col>
                <Col sm={12}>
                <input name="email" id="email" type="email" onChange={props.handleEmailChange} value={props.email} placeholder="Email" className="input" />
                </Col>
                <Col sm={12}>
                <input name="password" id="password" type="password" onChange={props.handlePasswordChange} value={props.password} placeholder="Password" className="input"/>
                </Col>
                <Col mb={6} className="text-center SignupButtonMargin">
                <Button onClick={props.signup} name="submit">Sign Up</Button>
                </Col>
                <Col mb={6} className="text-center SignupButtonMargin">
                <Button  onClick={event =>  window.location.href='/Login'} name="submit">Login</Button>
                </Col>
            </Row>
            
        </Container>
        </div>
</div>
    );
}
export default SignupComp;