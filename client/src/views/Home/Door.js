import React, {useEffect, useState} from 'react'
import axios from "axios";
import Home from './Home'
import './Home.css'
import LoginApp from '../Login/LoginApp'
import fire from "../../config/Fire";

function Door(props)
{
    const [postsArray, setPostsArray] = useState([]);

    useEffect(() => {

        fire.auth().onAuthStateChanged((user) => {
            if(!user){
                //alert("Please sign in or create an account to continue!!");
                 window.location.href = "/login";
            }
            else {
                axios.get('/api/posts')
                    .then((res)=>{
                        if(res.data.length > 0){
                           setPostsArray(res.data);
                        }
                    });
            }
        })

    }, []);

    function Loading()
    {
        return(<center><br/><div className="loader"></div></center>)
    }

    return (props.userUid!=null) ? (<Home postsArray={postsArray} setPostsArray={setPostsArray} username={props.username} userUid={props.userUid}/>): (<Loading/>)

}

export default Door;