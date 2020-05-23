import React, { useState, useEffect } from 'react';
import DemoCol from '../../components/Demographics/DemoCol'
import PostForm from '../../components/Emortions/PostForm/PostForm'
import Emortion from "../../components/Emortions/Emortion";
import axios from 'axios';

const Home = () => {
    const [postsArray, setPostsArray] = useState([]);
    useEffect(() => {
      axios.get('/api/posts')
      .then((res)=>{
        if(res.data.length > 0){
            setPostsArray(res.data);
        }
    });
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
            <PostForm postsArray={getPosts} />
            {/*The Posts for the user*/}
            <div id='emortions'>
            {postsArray.map((post,index)=>(
              <Emortion key={post._id} emortion={post}/>
            ))}
            </div>
          </div>
        </div>
      </div>
      );
      
    }
    
const showEmojiPicker = () =>
{
  console.log("focused")
  // console.log( document.getElementById("picker") );
  //document.getElementById("picker").removeAttribute("classNam");
}

export default Home;