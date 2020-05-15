import React from 'react';
import Home from "../../Views/Home/Home"
import TextBox from "../Emortions/TextBox"
import Emoji from "../Emortions/Emoji"

function Body() {
    return (
      <div>
         <center>
             Type in your post!
             <TextBox onClick={showEmojiPicker}/>
             <Emoji/>
         </center>
      </div>
      );
}
const showEmojiPicker = () =>
{
  console.log( document.getElementById("picker") );
  //document.getElementById("picker").removeAttribute("classNam");
}
export default Body;