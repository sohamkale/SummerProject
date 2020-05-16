import React from 'react';
import "./EmojiInputBox.css"
import {Button} from 'react-bootstrap'

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