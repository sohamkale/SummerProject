import React from './node_modules/react';
import "./EmojiInputBox.css"
import {Button} from './node_modules/react-bootstrap'

function EmojiInputBox()
{
    return (
        <div>
            <div id='maintext' class='emoji-input-box'></div>
            <br></br>
            <Button className='d-inline' onClick={Erase} variant="danger">DELETE</Button>
        </div>
    );
}

function Erase()
{
    var maintext = document.getElementById("maintext");
    maintext.removeChild(maintext.childNodes[maintext.childElementCount-1]);
}

export default EmojiInputBox;