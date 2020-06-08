import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import DemoCol from '../../components/Demographics/DemoCol'
import PostForm from '../../components/Emortions/PostForm'
import Emortion from "../../components/Emortions/Emortion";
import io from 'socket.io-client';

import '../Home/Home.css'
let socket;


const Profile = (props) => {

    const [currUser, setCurrUser] = useState(props.userv.name);
    const ENDPOINT = "/";
    const [socketIO, setsocketIO] = useState(null);


    useEffect(() => {
        let room = "commonRoom";
        // alert("SOCKET");
        socket = io(ENDPOINT);
        setsocketIO(socket);
        socket.emit('join', {currUser, room});
        socket.on('joinedRoom', message => {
            console.log(message);
            // alert(message.text);
        });
        socket.on('message', message => {
            props.setPostsArray(message.posts);
        });

    }, [ENDPOINT, currUser]);

    useEffect(() => {

    }, []);


    const getPosts = () => {
        socket.emit('addPosts', {currUser, userId:props.userv.userId}, () => props.setPostsArray([]));
    }

    return (

        <div className="container-fluid">
            {/* {socketFunc()} */}
            <div className='row'>
                <DemoCol user={props.userv}/>
                <div className='col-md-5 col-lg-5 col-sm-12 postCol'>
                    <div className="btn btn-secondary w-100 mb-3">Posts by {props.userv.name}</div>
                    {/*<PostForm getPosts={getPosts} postsArray={props.postsArray} username={props.uservname} userUid={props.uservUid} />*/}
                    {/*The Posts for the user*/}
                    <div id='emortions'>
                        {props.postsArray.map((post,index)=>(
                            <Emortion ENDPOINT={ENDPOINT} user={props.user} key={post._id}  socket={socket} getPosts={getPosts} emortion={post}/>
                        ))}
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 d-sm-none"></div>
            </div>
        </div>
    )
}




export default Profile;