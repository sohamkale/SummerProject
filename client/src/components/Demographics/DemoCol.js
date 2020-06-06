import React, {useEffect, useState} from 'react'
import './DemoCol.css'
import fire from "../../config/Fire";
import axios from 'axios';

function DemoCol(props)
{
    useEffect(() => {

    }, []);

    
    return (
        <div className='DemoCol col-lg-2 col-md-2'>
            <br></br>
            <center className="blackburger-font">
                {props.message}

                <img width="90%" src={require('./dpholder.png')} className="rounded-circle" alt="Cinque Terre"/>
               {props.username}<br/>
               Score: {"YET"}
            </center>
        </div>
    );
}

export default DemoCol;