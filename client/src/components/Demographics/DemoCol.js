import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import './DemoCol.css'
import fire from "../../config/Fire";
import axios from 'axios';
import $ from 'jquery'

function DemoCol(props)
{
    useEffect(() => {

    }, []);

    function ProfileImage()
    {
        var location =useLocation().pathname;
        return (location=="/home"||location=="/Home")?
            (<div className='DemoCol col-lg-2 col-md-2'>
                <br></br>
                <center className="blackburger-font">
                    {props.message}

                    <img width="90%" src={require('./dpholder.png')} className="rounded-circle" alt="Cinque Terre"/>
                    {props.user.name}<br/>
                    Score: {props.user.userscore}
                </center>
            </div>):
            (<div className='DemoCol col-lg-2 col-md-2'>
                <br></br>
                <center className="blackburger-font">
                    {props.message}
                    <form>
                    <div onClick={trig} className="container">
                        <input type="file" id="imgupload" style={{display:"none"}}/>
                        <img width="100%" src={require('./dpholder.png')} className="rounded-circle dp" />
                            <div  className="overlay rounded-circle">CHANGE</div>
                    </div>
                    {props.user.name}<br/>
                    Score: {props.user.totScore}
                    </form>
                </center>
            </div>)
    }

    return (
        <ProfileImage/>
    );
    function trig()
    {
        { $('#imgupload').trigger('click'); };
    }

}

export default DemoCol;