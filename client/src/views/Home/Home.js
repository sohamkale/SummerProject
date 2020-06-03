import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import DemoCol from '../../components/Demographics/DemoCol'
import PostForm from '../../components/Emortions/PostForm/PostForm'
import Emortion from "../../components/Emortions/Emortion";
import fire from '../../config/Fire'
import axios from 'axios';
import io from 'socket.io-client';

import './Home.css'
let socket;


const Home = (props) => {
     //const socket = io('http://localhost:4000');

    /*const [postsArray, setPostsArray] = useState([]);
    const [userUid, setUserUid] = useState(null);*/
    const [currUser, setCurrUser] = useState(props.username);
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

    // }, []);
    useEffect(() => {
        // axios.get('/api/posts')
        //     .then((res)=>{
        //         if(res.data.length > 0){
        //             props.setPostsArray(res.data);
        //         }
        //     });

        // fire.auth().onAuthStateChanged((user) => {
        //     if(user){
        //         axios.get(`/api/users/${user.uid}`).then((res) => {
        //             setCurrUser(res.data)
        //         })
        //     }else {
        //         // alert("Please sign in or create an account to continue!!");
        //         //window.location.href = "/login";
        //     }
        // })
    }, []);

    const getPosts = (postsArray) => {
      /*axios.get('/api/posts')
          .then((res)=>{
            if(res.data.length > 0){
                //Copy the variable//
            props.setPostsArray(res.data)
            }
        });*/
        socket.emit('addPosts', {currUser}, () => props.setPostsArray([]));
    }

    const addComment = (comment, allPosts) => {
        // console.log("ADD COMMENT: ");
        // console.log(allPosts);
        socket.emit('addComment', {currUser, comment, allPosts}, () => props.setPostsArray([]));
    }

    return (

        <div className="">
            {/* {socketFunc()} */}
            <center>
                Welcome to the Den
            </center>
            <div className='row'>
                <div className='DemoCol col-2'>
                    <DemoCol username={props.username}/>
                </div>
                <div className='col-md-6 row-fluid App-width'>
                    <br></br>
                    <PostForm getPosts={getPosts} postsArray={props.postsArray} username={props.username} userUid={props.userUid} />
                    {/*The Posts for the user*/}
                    <div id='emortions'>
                        {props.postsArray.map((post,index)=>(
                            <Emortion username={props.username} userUid={props.userUid} key={post._id}  socket={socketIO} addComment={addComment} getPosts={getPosts} emortion={post}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

}

      
    

export default Home;