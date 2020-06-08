import React, {useEffect, useState} from 'react'
import axios from "axios";
import Profile from './Profile'
import fire from "../../config/Fire";

function ProfileDoor(props)
{
    const [postsArray, setPostsArray] = useState([]);

    useEffect(() => {

        fire.auth().onAuthStateChanged((user) => {
            if(!user){
                //alert("Please sign in or create an account to continue!!");
                window.location.href = "/login";
            }
            else {
                axios.get('/api/posts/'+user.uid)
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

    return (props.user!=null) ? (<Profile user={props.user} postsArray={postsArray} setPostsArray={setPostsArray}/>): (<Loading/>)

}

export default ProfileDoor;