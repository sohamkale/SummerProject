import React, { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css'
import './Emoji.css'
import { Picker } from 'emoji-mart'
 
function Emoji()
{
   
    return (
      <div>
        <div class="popup">
          <div onClick={myFunction}>
            <img src={require('./emoji.png')} width='30px;'></img>
          </div>
          <div className='popuptext' id='myPopup'>
            <Picker onClick={AppendEmoji}  /*include={["flags"]}*/ exclude={["recent"]} />
          </div>
          {/* <span class="popuptext" id="myPopup">Popup text...</span> */}

        </div>
      </div>
    );
}

function AppendEmoji(emoji,event)
{
    var ele = event.target.cloneNode(true);
    document.getElementById('maintext').appendChild(ele);
}
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

export default Emoji;