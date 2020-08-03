import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import DemoCol from '../../components/Demographics/DemoCol'
import PostForm from '../../components/Emortions/Postform/PostForm'
import Emortion from "../../components/Emortions/Postbox/Emortion";
import CarouselComponent from "../../components/Emortions/Postbox/CarouselComponent";
import {
    isMobile, isBrowser
} from "react-device-detect";
// import io from 'socket.io-client';

import './Home.css'

// let socket;


const Home = (props) => {

    const [currUser, setCurrUser] = useState(props.user.name);
    const [showCount, setShowCount] = useState(8);
    const [currUserUid, setCurrUserUid] = useState(props.user.userId);
    const ENDPOINT = "/";
    // const [socketIO, setsocketIO] = useState(null);


    useEffect(() => {
        let room = "commonRoom";
        if (props.socket) {
            props.socket.on('message', message => {
                props.setPostsArray(message.posts);
            });
        }
    }, [props.socket]);


    const getPosts = () => {

        if (props.postsArray.length == 1 & props.socket!=null)
        {
            props.socket.emit('refresh', {
                currUser,
                userId: props.postsArray[0]._id,
                OnePost: true
            }, () => props.setPostsArray([]));}
        else if(props.socket!=null)
            props.socket.emit('refresh', {currUser}, () => props.setPostsArray([]));
        else
        {
            console.log('no socket')
        }
    }


    function NoPosts() {
        if (props.postsArray == null || props.postsArray.length == 0)
            return (<center>
                <div className="btn btn-warning font-weight-bold w-100">There are no posts in the storage :(</div>
            </center>)
        else
            return (<center><input type="button" className="btn btn-link" id="showmore" value="Show More"
                                   onClick={ShowMore}/></center>)
    }

    function ShowMore() {
        if (showCount + 5 < props.postsArray.length)
            setShowCount(showCount + 5);
        else {
            setShowCount(props.postsArray.length)
            document.getElementById("showmore").classList.add('d-none');
        }
    }

    return (

        <div className="container-fluid">
            {/* {socketFunc()} */}
            <div className='row'>
                <DemoCol user={props.user} message={"Welcome to the Den!"}/>
                <div className='col-md-6 col-lg-6 col-sm-12 p-sm-0'>
                    <div className={props.postClass}><PostForm getPosts={getPosts} postsArray={props.postsArray}
                                                               user={props.user}/></div>
                    <div id='emortions'>
                        {props.postsArray.slice(0, showCount).map((post, index) => (
                            <Emortion ENDPOINT={ENDPOINT} user={props.user} key={post._id}
                                      socket={props.socket} getPosts={getPosts} emortion={post}/>
                        ))}
                    </div>
                    <NoPosts/>
                </div>
                <div className="col-lg-2 col-md-2 d-sm-none"></div>
            </div>
        </div>
    )
}


export default Home;