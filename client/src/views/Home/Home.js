import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import DemoCol from '../../components/Demographics/DemoCol'
import PostForm from '../../components/Emortions/PostForm'
import Emortion from "../../components/Emortions/Emortion";
import CarouselComponent from "../../components/Emortions/CarouselComponent";
import {
    isMobile, isBrowser
} from "react-device-detect";
import io from 'socket.io-client';

import './Home.css'

let socket;


const Home = (props) => {

    const [currUser, setCurrUser] = useState(props.user.name);
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
        socket.emit('addPosts', {currUser}, () => props.setPostsArray([]));
    }

    function DeviceView() {
        return (isBrowser) ? (
                <div id='emortions'>
                    {props.postsArray.map((post, index) => (
                        <Emortion ENDPOINT={ENDPOINT} user={props.user} key={post._id}
                                  socket={socket} getPosts={getPosts} emortion={post}/>
                    ))}
                </div>
            ) :
            (
                <CarouselComponent postsArray={props.postsArray} ENDPOINT={ENDPOINT} user={props.user} socket={socket} getPosts={getPosts}/>
            )
    }

    return (

        <div className="container-fluid">
            {/* {socketFunc()} */}
            <div className='row'>
                <DemoCol user={props.user} message={"Welcome to the Den!"}/>
                <div className='col-md-5 col-lg-5 col-sm-12 postCol'>
                    <PostForm getPosts={getPosts} postsArray={props.postsArray} user={props.user}/>
                    <DeviceView/>
                </div>
                <div className="col-lg-2 col-md-2 d-sm-none"></div>
            </div>
        </div>
    )
}


export default Home;