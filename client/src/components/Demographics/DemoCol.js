import React, {useEffect, useState} from 'react'
import './DemoCol.css'
import fire from "../../config/Fire";
import axios from 'axios';

function DemoCol(props)
{

    useEffect(() => {

    }, []);

    
    return (
        <div>
            <br></br>
            <center> 
              <img className='dp' src={require('./dpholder.png')}></img>
                {props.username}
            </center>
        </div>
    );
}

export default DemoCol;