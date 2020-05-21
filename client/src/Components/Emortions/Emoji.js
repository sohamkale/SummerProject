import React, { useState } from './node_modules/react';
import './node_modules/emoji-mart/css/emoji-mart.css'
import { Picker } from './node_modules/emoji-mart'
 
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