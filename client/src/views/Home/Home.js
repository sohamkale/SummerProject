import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import DemoCol from '../../components/Demographics/DemoCol'
import PostForm from '../../components/Emortions/PostForm/PostForm'
import Emortion from "../../components/Emortions/Emortion";
import fire from '../../config/Fire'
import axios from 'axios';

const Home = (props) => {
    //have the posts in props.postsarray
    console.log(props)
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
        <div>
        <center>
          Welcome to the Den
        </center>
        <div className='row'>
          <div className='DemoCol col-2'>
            <DemoCol username={props.username}/>
          </div>
          <div className='col-6'>
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