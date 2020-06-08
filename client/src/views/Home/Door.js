import React, {useEffect, useState} from 'react'
import axios from "axios";
import Home from './Home'
import {useLocation} from 'react-router-dom'
import './Home.css'
import fire from "../../config/Fire";
import Profile from "../Profile/Profile";
import NotFound from "../../components/Shared/NotFound";

function Door(props)
{
    const [postsArray, setPostsArray] = useState([]);
    var location = useLocation().pathname;

    useEffect(() => {

        fire.auth().onAuthStateChanged((user) => {
            if(!user){
                //alert("Please sign in or create an account to continue!!");
                 window.location.href = "/login";
            }
            else {
                //GET POSTS DEPENDING ON WHICH POST YOU ARE IN
                if(location == "/Home"|| location =="/home")
                {
                    axios.get('/api/posts')
                        .then((res)=>{
                            if(res.data.length > 0){
                                setPostsArray(res.data);
                            }
                        });
                }
                else if ((location =="/Profile"||location=="/profile"))
                {
                    axios.get('/api/postsByUser/'+user.uid)
                        .then((res)=>{
                            if(res.data.length > 0){
                                console.log(res)
                                setPostsArray(res.data);
                            }
                        });
                }

            }
        })

    }, []);

    function Loading()
    {
        return(<center><br/><div className="loader"></div></center>)
    }
    if(location == "/Home"|| location =="/home" || location=='')
        return (props.user) ? (<Home user={props.user} postsArray={postsArray} setPostsArray={setPostsArray} />): (<Loading/>)
    else if (location =="/Profile"||location=="/profile")
        return (props.user) ? (<Profile user={props.user} postsArray={postsArray} setPostsArray={setPostsArray} />): (<Loading/>)
    else //Not Found Page
        return <Loading/>
}

export default Door;