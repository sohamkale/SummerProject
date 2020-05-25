import React from 'react';
import "./EmojiInputBox.css"
import {Button} from 'react-bootstrap'

function EmojiInputBox()
{
    return (
        <div>
            <div id='maintext' className='emoji-input-box'></div>
            <br></br>
            <Button className='d-inline' onClick={Erase} variant="danger">DELETE</Button>
            &nbsp;
            <Button className='d-inline' onClick={EraseAll} variant="danger">CLEAR</Button>
        </div>
    );
}

function Erase()
{
    var maintext = document.getElementById("maintext");
    try
    {maintext.removeChild(maintext.childNodes[maintext.childElementCount-1]);}
    catch{}
}

function EraseAll()
{
    var maintext = document.getElementById("maintext").innerHTML="";
}

export default EmojiInputBox;