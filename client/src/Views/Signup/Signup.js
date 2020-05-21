import './Signup.css'
import React , { Component, useEffect, useState } from "./node_modules/react";
import fire from "../../config/Fire";
// import SignupComp from "../../Components/Signup/SignupComp";
import axios from './node_modules/axios';
// import Footer from "../../components/Footer/Footer";

const Signup = (props) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phoneNum, setPhoneNum] = useState(null);
    const [validPhone, setValidPhone] = useState(null);

    const signup = (e) => {
        if(!validPhone)
        {
            return alert("Please make sure your phone number is only numbers and between 10 and 13 digits");
        }
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
                id: user.uid,
                name: firstName + " " + lastName,
                email: email,
                currLevel: "0",
                friends: []
            }
            axios.post('/users/add', newUser)
            .then((res)=>{
                console.log(res.data);
                // window.location.href='/Login';
            });
            console.log(u);
        }).catch((err)=>{
            if(err.message === "The email address is badly formatted."){
                alert("Please fill in a valid email");
            }else {
                alert(err.message);
            }
            console.log(err);
        })
    }

    const validatePhone = (phoneNumber) => {
        const regex = /^\d{10,13}$/;
        console.log(phoneNumber.target.value)
        console.log(typeof phoneNumber.target.value)
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

    const handlePhoneNumChange = (e) => {
        setPhoneNum(e.target.value);
    }

    return(     
        // <SignupComp
        // handleEmailChange={handleEmailChange}
        // handleFirstNameChange={handleFirstNameChange}
        // handleLastNameChange={handleLastNameChange}
        // handlePasswordChange={handlePasswordChange}
        // handlePhoneNumChange={handlePhoneNumChange}
        // email={email}
        // password={password}
        // firstName={firstName}
        // lastName={lastName}
        // phoneNum={phoneNum}
        // validatePhone={validatePhone}
        // validPhone={validPhone} 
        // signup={signup}/>
        <div></div>
    );

    




}
export default Signup;