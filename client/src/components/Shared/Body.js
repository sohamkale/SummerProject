import React, { useState, useEffect } from 'react';
import Home from "../../views/Home/Home"
import EmojiInputBox from "../Emortions/EmojiInputBox"
import DemoCol from '../Demographics/DemoCol'
import PostBox from '../Emortions/PostBox'
import CommentBox from "../Emortions/CommentBox";
import axios from 'axios';

function Body() {
    const [postsArray, setPostsArray] = useState([]);
    let posts = [];
    useEffect(() => {
      axios.get('/api/posts')
      .then((res)=>{
        if(res.data.length > 0){
            console.log("posts");
            console.log(res.data);
            res.data.map(post => posts.push(post))
        }
        console.log(posts);
        setPostsArray(posts);
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
            <PostBox />
          </div>
          <div className="col-12">
            <CommentBox
            postsArray = {postsArray}/>
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