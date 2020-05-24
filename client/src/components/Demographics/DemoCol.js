import React, {useEffect, useState} from 'react'
import './DemoCol.css'
import fire from "../../config/Fire";
import axios from 'axios';

function DemoCol()
{
    const [name, setName] = useState("anonymous");
    const [displayName, setDisplayName] = useState("anonymous");
    
    useEffect(() => {
        let mounted =true;
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                if(mounted)
                    {
                        setName(user.email);
                        GetUserName(user.uid)
                    }
            }
        });
        return () => mounted = false;
    }, []);

    function GetUserName(userId)
    {
         axios.get('/api/users/'+userId)
        .then((res)=>{
          if(res.data){
              //console.log("data is "+res.data)
            setDisplayName(res.data);
          }
          else{
              //console.log(res)
              setDisplayName ("Not Found");
          }
      });
    }
    
    return (
        <div>
            <br></br>
            <center> 
              <img className='dp' src={require('./dpholder.png')}></img>
                {name}<br></br>
                {displayName}
            </center>
        </div>
    );
}

export default DemoCol;