import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import DemoCol from '../../components/Demographics/DemoCol'
import PostForm from '../../components/Emortions/PostForm/PostForm'
import Emortion from "../../components/Emortions/Emortion";
import fire from '../../config/Fire'
import axios from 'axios';

const Home = (props) => {
    
    const [postsArray, setPostsArray] = useState([]);
    const [userUid, setUserUid] = useState(null);
    const [currUser, setCurrUser] = useState(null);
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

    const getPosts = () => {
      //alert('called')
      axios.get('/api/posts')
          .then((res)=>{
            if(res.data.length > 0){
                //Copy the variable//
            setPostsArray(res.data)
            }
        }); 
    } 

    return (
        <div>
        <center>
          Welcome to the Den
        </center>
        <div className='row'>

          <div className='DemoCol col-3'>
            <DemoCol />
          </div>
          <div className='col-6'>
          <br></br>
            <PostForm getPosts={getPosts} />
            {/*The Posts for the user*/}
            <div id='emortions'>
            {postsArray.map((post,index)=>(
              <Emortion currUser={currUser} key={post._id} getPosts={getPosts} emortion={post}/>
            ))}
            </div>
          </div>
        </div>
      </div>
      );  
      
      }

      
    

export default Home;