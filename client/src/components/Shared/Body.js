import React, { useState, useEffect } from 'react';
import Home from "../../views/Home/Home"
import EmojiInputBox from "../Emortions/EmojiInputBox"
import DemoCol from '../Demographics/DemoCol'
import PostForm from '../Emortions/PostForm'
import Emortion from "../Emortions/Emortion";
import axios from 'axios';

function Body() {
    const [postsArray, setPostsArray] = useState([]);
    useEffect(() => {
      axios.get('/api/posts')
      .then((res)=>{
        if(res.data.length > 0){
            setPostsArray(res.data);
        }
    });
    }, [])
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
            <PostForm />
            {/*The Posts for the user*/}
            {postsArray.map((post,index)=>(
              <Emortion emortion={post}/>
            ))}
           
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
export default Body;