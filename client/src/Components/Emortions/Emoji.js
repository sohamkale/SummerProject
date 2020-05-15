import React, { useState } from 'react';
import { render } from 'react-dom';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
 
function Emoji()
{
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {
        //setChosenEmoji(emojiObject);
        document.getElementById("maintext").value+=emojiObject.emoji;
}
    return (
        <div id="picker" className="">
            <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
                {/* { chosenEmoji && <EmojiData chosenEmoji={chosenEmoji}/>} */}
        
        </div>
    );
}

export default Emoji;