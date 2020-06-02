import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import DemoCol from '../../components/Demographics/DemoCol'
import PostForm from '../../components/Emortions/PostForm/PostForm'
import Emortion from "../../components/Emortions/Emortion";
import fire from '../../config/Fire'
import axios from 'axios';
import io from 'socket.io-client';
import "./Home.css";
let socket;


const Home = (props) => {
    // const socket = io('http://localhost:4000');
    
    const [postsArray, setPostsArray] = useState([]);
    const [userUid, setUserUid] = useState(null);
    const [currUser, setCurrUser] = useState(null);
    const ENDPOINT = "/";
    const [socketIO, setsocketIO] = useState(null);
    useEffect(() => {
      let room = "commonRoom";
      if(currUser != null){
        // alert("SOCKET");
        socket = io(ENDPOINT);
        setsocketIO(socket);
        socket.emit('join', {currUser, room});
        socket.on('joinedRoom', message => {
          console.log(message);
          // alert(message.text);
          });

          socket.on('message', message => {
            setPostsArray(message.posts);
            });
      }       

        
    }, [ENDPOINT, currUser]);


    // useEffect(() => {
    //   axios.get('/api/posts')
    //   .then((res)=>{
    //     if(res.data.length > 0){
    //         setPostsArray(res.data);
    //     } 
    // });
    // fire.auth().onAuthStateChanged((user) => {
    //     if(user){
    //       axios.get(`/api/users/${user.uid}`).then((res) => {
    //         setCurrUser(res.data)
    //       })
          
    //         setUserUid(user.uid);

    //     }else {
    //         // alert("Please sign in or create an account to continue!!");
    //         window.location.href = "/login";
    //     }
    // })

    // }, []);
    useEffect(() => {
    }, []);

    const getPosts = () => {
      axios.get('/api/posts')
          .then((res)=>{
            if(res.data.length > 0){
                //Copy the variable//
            props.setPostsArray(res.data)
            }
        });
    } 

    return (
      
        <div className="App-width">
          {/* {socketFunc()} */}
        <center>
          Welcome to the Den
        </center>
        <div className='row'>
          <div className='DemoCol col-2'>
            <DemoCol username={props.username}/>
          </div>
          <div className='col-md-8 row-fluid App-width'>
          <br></br>
            <PostForm userUid={props.userUid} getPosts={getPosts} />
            {/*The Posts for the user*/}
            <div id='emortions'>
            {props.postsArray.map((post,index)=>(
             <Emortion username={props.username} userUid={props.userUid} key={post._id} getPosts={getPosts} emortion={post} userUid={props.userUid}/>
            ))}
            </div>
          </div>
        </div>
      </div>
      );  
      
      }

      
    

export default Home;