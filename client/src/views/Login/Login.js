import React , { Component, useState, useEffect } from "react";
import fire from "../../config/Fire";
import * as firebase from 'firebase';
 import "./Login.css";
import Signin from "../../components/SignIn/Signin";
// import Footer from "../../components/Footer/Footer";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logout = () => {
        alert("In logout");
        fire.auth().signOut();
    }

    const login = (e) => {
        e.preventDefault();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
        }).catch(function(error){
            console.log(error);
        })
    
        fire.auth().signInWithEmailAndPassword(email,password).then((u)=>{
        }).catch((err)=>{
            if(err.message === "The email address is badly formatted."){
                alert("Please Enter Your E-mail and Password to Sign In");
            }else {
                alert(err.message);
            }
        })  
    }

    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) =>{
        setPassword(e.target.value);
    }

    return (
        <div>
            <Signin
            email={email}
            password={password}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            login={login}
            logout={logout}/>
        </div>
    );


}

export default Login;