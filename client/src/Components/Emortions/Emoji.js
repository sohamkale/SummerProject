import React, { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
 
function Emoji()
{
   
    return (
        <div>
           <Picker onClick={AppendEmoji} /*include={["flags"]}*/ exclude={["recent"]} />
        </div>  
    );
}

function AppendEmoji(emoji,event)
{
    var ele = event.target.cloneNode(true);
    document.getElementById('maintext').appendChild(ele);
}


export default Emoji;