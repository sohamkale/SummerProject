import React from 'react'
import EmojiInputBox from './EmojiInputBox'
import Emoji from "./Emoji"
import { Button } from 'react-bootstrap'
import $ from 'jquery'
const API_BASE = process.env.REACT_APP_PRODUCTION ? '' : 'http://localhost:5000';

function PostBox() {
    return (
        <div className="card bg-light mb-3">
            <b className="card-header">TELL ME AN EMORTION!</b>
            <div className="card-body">
                <form id='thePost' onSubmit={submit}>
                    <input hidden name="userId" value="SohamsFirstUser"></input>
                    <label for="type" className='form-check-label'>Type: &nbsp; </label>
                    <select name='type' className='form-control-sm'>
                        <option>Timer</option>
                    </select>
                    &nbsp;
                    &nbsp;
                    <label className='form-check-label'>Validity: &nbsp; </label>
                    <select name='validity' className='form-control-sm'>
                        <option>1h</option>
                        <option>2h</option>
                        <option>3h</option>
                    </select>
                    <br></br>
                    <br></br>
                    <EmojiInputBox />
                    <br></br>
                    <Emoji />
                    <br></br>
                    <label>Secret Answer</label>
                    <input id="secret" name="secretAnswer" className="form-control"></input>
                    <br></br>
                    <Button type='submit' className='d-inline' variant="info">POST</Button>
                    <br></br>
                </form>
            </div>
        </div>
    );
}

function submit(e)
{
    
    e.preventDefault();
    var form = $('#thePost').serializeArray();
    var emojis = (document.getElementById('maintext').childNodes);
    var emojiArray=[];
    emojis.forEach(function(item,index)
    {
         if(item.nodeName=="SPAN")
            emojiArray.push(item.style.backgroundPosition)
        else
            emojiArray.push(item.getElementsByTagName("SPAN")[0].style.backgroundPosition)
        
        
    });
    form.push({name:'emojiArray',value: emojiArray})
    $.ajax({
        url: '/api/posts/add',
        type:'POST',
        data: JSON.stringify(
           form
        ),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success:function(data){
            //whatever you wanna do after the form is successfully submitted
        }
    });
}

export default PostBox;