import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import DemoCol from '../../components/Demographics/DemoCol'
import Emortion from "../../components/Emortions/Postbox/Emortion";
import Emoticon from "../../components/Emortions/Postform/Emoticon";
import io from 'socket.io-client';
import axios from 'axios'

import '../Home/Home.css'
import {Collapse, Dropdown} from "react-bootstrap";
let socket;


const Profile = (props) => {

    const [currUser, setCurrUser] = useState(props.user.name);
    const ENDPOINT = "/";
    const [socketIO, setsocketIO] = useState(null);
    const [comments, setComments] = useState([]);


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
        axios.get('/api/posts/commentsByUser/'+props.user.userId).then((res)=>{
            setComments(res.data);
        })
    }, [props]);

    const getPosts = () => {
        socket.emit('addPosts', {currUser,userId:props.user.userId}, () => props.setPostsArray([]));
    }

    function CommentsByCard(properties)
    {
        return(  <div className="card bg-light mb-2">
            <div className="card-body">
                <div className="blackburger-font text-sm-left" style={{fontSize:'14px'}}>Emortion: </div>
                <div>
                    {properties.comment.message.emojiArray.map((position, index) => (
                        <Emoticon key={index} position={position} />
                    ))}
                </div>
                <div className="text-sm-left" style={{fontWeight:'bold',fontFamily:'Ink Free'}}>Answered: {properties.comment.answer}</div>
                <a href={"/posts/"+properties.comment.postId}>Go To Post</a>
            </div>
        </div>);

    }
    function NoComments() {
        if(comments==null||comments.length==0)
            return (<center><div className="btn btn-warning font-weight-bold w-100">There are no comments in the storage :(</div></center>)
        else
            return (<div className='d-none'></div>)
    }

    function NoPosts() {
        if(props.postsArray==null||props.postsArray.length==0)
            return (<center><div className="btn btn-warning font-weight-bold w-100">There are no posts in the storage :(</div></center>)
        else
            return (<div className='d-none'></div>)
    }
    return (

        <div className="container-fluid">
            {/* {socketFunc()} */}
            <div className='row'>
                <DemoCol user={props.user}/>
                <div className='col-md-5 col-lg-5 col-sm-12 postCol'>
                    <div className="btn btn-secondary w-100 mb-3">Posts by {props.user.name}</div>
                    <NoPosts/>
                    {/*<PostForm getPosts={getPosts} postsArray={props.postsArray} username={props.username} userUid={props.userUid} />*/}
                    {/*The Posts for the user*/}
                    <div id='emortions'>
                        {props.postsArray.map((post,index)=>(
                            <Emortion ENDPOINT={ENDPOINT} user={props.user} key={post._id}  socket={socket} getPosts={getPosts} emortion={post}/>
                        ))}
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <div className="btn btn-secondary w-100 mb-3">Answers by {props.user.name}</div>
                    <NoComments/>
                    {comments.map((comment,index)=>(
                        <CommentsByCard user={props.user} key={comment._id} comment={comment}/>
                    ))}
                </div>
            </div>
        </div>
    )
}




export default Profile;