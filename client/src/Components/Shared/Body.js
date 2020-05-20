import React from 'react';
import Home from "../../Views/Home/Home"
import EmojiInputBox from "../Emortions/EmojiInputBox"
import DemoCol from '../Demographics/DemoCol'
import PostBox from '../Emortions/PostBox'

function Body() {
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