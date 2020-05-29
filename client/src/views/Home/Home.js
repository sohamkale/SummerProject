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
      axios.get('/api/posts')
      .then((res)=>{
        if(res.data.length > 0){
            setPostsArray(res.data);
        }
    });

    fire.auth().onAuthStateChanged((user) => {
        if(user){
            axios.get(`/api/users/${user.uid}`).then((res) => {
              setCurrUser(res.data)
            })
            setUserUid(user.uid);
        }else {
            // alert("Please sign in or create an account to continue!!");
            window.location.href = "/login";
        }
    })
    }, []);



    const getPosts = (postsArray)  => {
      // if(event){
      //   event.preventDefault();
      // }
      // console.log("PostsArray: ");
      // console.log(postsArray);
      
      // console.log(socket);
      socket.emit('addPosts', {currUser}, () => setPostsArray([]));
  
      // axios.get('/api/posts')
      //     .then((res)=>{
      //       if(res.data.length > 0){
      //           //Copy the variable//
      //       setPostsArray(res.data)
      //       }
      //   }); 
    } 

    const addComment = (comment, allPosts) => {
      // console.log("ADD COMMENT: ");
      // console.log(allPosts);
      socket.emit('addComment', {currUser, comment, allPosts}, () => setPostsArray([]));
    } 

    return (
      
        <div className="App-width">
          {/* {socketFunc()} */}
        <center>
          Welcome to the Den
        </center>
        <div className=' App-width App-header row-fluid'>

          <div className='DemoCol col-3'>
            <DemoCol />
          </div>
          <div className='col-md-8 row-fluid App-width'>
          <br></br>
            <PostForm getPosts={getPosts} postsArray={postsArray} />
            {/*The Posts for the user*/}
            <div id='emortions'>
            {postsArray.map((post,index)=>(
              <Emortion currUser={currUser} key={post._id} postsArray={postsArray} socket={socketIO} addComment={addComment} getPosts={getPosts} emortion={post}/>
            ))}
            </div>
          </div>
        </div>
      </div>
      );  
      
      }

      
    

export default Home;