import React from 'react';
import Home from "../../Views/Home/Home"
import EmojiInputBox from "../Emortions/EmojiInputBox"
import Emoji from "../Emortions/Emoji"

function Body() {
    return (
      <div>
        <center>
             Type in your post!
        </center>
        <div className='row'>
          <div className='col-5'>
            <EmojiInputBox onFocus={showEmojiPicker}/>
          </div>
          <div className='col-3'>
            <Emoji/>
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