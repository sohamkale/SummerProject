import React,{useState} from 'react';
import "./EmojiInputBox.css"
import {Button} from 'react-bootstrap'
import {getEmojiDataFromNative, Emoji, Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import data from 'emoji-mart/data/all.json'
import './Emoji.css'

function EmojiInputBox(props)
{
    //const [emojis, setEmojis] = useState([]);
    // const emojiData = getEmojiDataFromNative('🏊🏽‍♀️', 'apple', data);
    // console.log(emojiData)
    return (
        <div>
            <div id='maintext' className='emoji-input-box'>
                {props.emojis.map((emojiData, index) => (
                    <Emoji
                        key={index}
                        emoji={emojiData}
                        skin={emojiData.skin || 1}
                        size={28}
                    />
                ))}
            </div>
            <Button size="sm" className='d-inline' onClick={Erase} variant="danger">DELETE</Button>
            <Button  size="sm" className='d-inline' onClick={EraseAll} variant="danger">CLEAR</Button>
        </div>
    );




    function Erase()
    {
        var maintext = document.getElementById("maintext");
        try
        {maintext.removeChild(maintext.childNodes[maintext.childElementCount-1]);}
        catch{}
    }

    function EraseAll()
    {
        document.getElementById("maintext").innerHTML="";
        document.getElementById("postType").value="Timer";
        document.getElementById("postValidity").value="1h";
        document.getElementById("postSecret").value="";

    }


}




export {EmojiInputBox};