import './Signup.css'
import React , { Component, useEffect, useState } from "react";
import fire from "../../config/Fire";
import SignupComp from "../../components/Signup/SignupComp";
import axios from 'axios';
import io from 'socket.io-client';

const API_BASE = process.env.REACT_APP_PRODUCTION ? '' : 'http://localhost:5000';
const Signup = (props) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phoneNum, setPhoneNum] = useState(null);
    const [validPhone, setValidPhone] = useState(null);
    const ENDPOINT = "http://localhost:5000";
   
   /* useEffect(() => {

    }, [ENDPOINT]);*/

    const signup = (e) => {
        if(!firstName)
        {
            return alert("Please fill out your First Name");
        }
        if(!lastName)
        {
            return alert("Please fill out your Last Name");
        }
        if(!email)
        {
            return alert("Please fill out your Email");
        }
        if(!password)
        {
            return alert("Please fill out your Password");
        }
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(email, password).then((u)=>{
            var user = fire.auth().currentUser;
            const newUser = {
                userId: user.uid,
                name: firstName + " " + lastName,
                email: email,
                currLevel: "0",
                friends: []
            }
            axios.post(API_BASE + "/api/users/add", newUser)
            .then((res)=>{
                window.location.href='/FAQ';
            });
           
        }).catch((err)=>{
            if(err.message === "The email address is badly formatted."){
                alert("Please fill in a valid email");
            }else {
                alert(err.message);
            }
        })
    }

    const validatePhone = (phoneNumber) => {
        const regex = /^\d{10,13}$/;
        setPhoneNum(phoneNumber.target.value)
        return regex.test(phoneNumber.target.value)
          ? setValidPhone(true)
          : setValidPhone(false);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }


    return(     
        <SignupComp
        handleEmailChange={handleEmailChange}
        handleFirstNameChange={handleFirstNameChange}
        handleLastNameChange={handleLastNameChange}
        handlePasswordChange={handlePasswordChange}
        email={email}
        password={password}
        firstName={firstName}
        lastName={lastName}
        validatePhone={validatePhone}
        validPhone={validPhone} 
        signup={signup}/>
    );

    




}
export default Signup;