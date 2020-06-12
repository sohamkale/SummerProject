import React, {useEffect, useState} from 'react'
import axios from "axios";
import Home from './Home/Home'
import {useLocation, useParams } from 'react-router-dom'
import './Home/Home.css'
import fire from "../config/Fire";
import Profile from "./Profile/Profile";
import ProfileV from "./Profile/ProfileV";
import NotificationIndex  from './Notifications/NotificationIndex';

function Door(props)
{
    const [postsArray, setPostsArray] = useState([]);
    const [profileUser, setProfileUser]= useState(null);
    var location = useLocation().pathname.toLocaleLowerCase();
    var paramId = useParams().id;
    


    useEffect(() => {

        fire.auth().onAuthStateChanged((user) => {
            if(!user){
                //alert("Please sign in or create an account to continue!!");
                 window.location.href = "/login";
            }
            else {
                //GET POSTS DEPENDING ON WHICH POST YOU ARE IN
                if(location == "/home"||location == "/")
                {
                    axios.get('/api/posts')
                        .then((res)=>{
                            if(res.data.length > 0){
                                setPostsArray(res.data);
                            }
                        });
                }
                else if ((location.includes("/profile")))
                {
                    if(!paramId){
                        axios.get('/api/postsByUser/'+user.uid)
                            .then((res)=>{
                                if(res.data.length > 0){
                                    setPostsArray(res.data);
                                }
                            });
                    }
                    else if (paramId)
                    {
                        axios.get('/api/users/' + paramId)
                            .then((res)=>{
                                setProfileUser(res.data)
                            });
                        axios.get('/api/postsByUser/'+paramId)
                            .then((res)=>{
                                if(res.data.length > 0){
                                    setPostsArray(res.data);
                                }
                            });
                    }

                }
                else if (location.includes("/posts"))
                {
                    axios.get('/api/posts/'+paramId)
                        .then((res)=>{
                            if(res.data.length > 0){
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

    if(location == "/home"||location=='/')
        return (props.user) ? (<Home user={props.user} postsArray={postsArray} setPostsArray={setPostsArray} socket={props.socket}/>): (<Loading/>)
    else if (location =="/profile")
        return (props.user) ? (<Profile user={props.user} postsArray={postsArray} setPostsArray={setPostsArray} socket={props.socket}/>): (<Loading/>)
    else if (location.includes("/profile"))
    {
        if(!profileUser)
            return (props.user) ? (<Profile user={props.user} postsArray={postsArray} setPostsArray={setPostsArray} socket={props.socket} />): (<Loading/>)
        else
            return (props.user) ? (<ProfileV user={props.user} userv={profileUser} postsArray={postsArray} setPostsArray={setPostsArray} socket={props.socket}/>): (<Loading/>)
        /*else
        {
            axios.get('/api/users/' + paramId)
                .then((res)=>{
                  setProfileUser(res.data)
                });

            return (profileUser) ? (<Profile user={profileUser} postsArray={postsArray} setPostsArray={setPostsArray} />): (<Loading/>)
        }*/

    }
    else if (location.includes("/posts"))
        return (props.user) ? (<Home postClass="d-none" user={props.user} postsArray={postsArray} setPostsArray={setPostsArray} socket={props.socket}/>): (<Loading/>)
    else if (location==("/notifications"))
        return (props.user) ? (<NotificationIndex postClass="d-none" user={props.user} postsArray={postsArray} setPostsArray={setPostsArray} socket={props.socket}/>): (<Loading/>)
    else //Not Found Page
    {
        console.log(location)
        return <Loading/>
    }
}

export default Door;